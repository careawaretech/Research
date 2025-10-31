import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GrantProgressStep {
  id: string;
  step_title: string;
  description: string | null;
  status: string;
  completed: boolean;
  logo_url: string | null;
  logo_path: string | null;
  display_order: number;
}

const SortableStepRow = ({ step, onEdit, onDelete }: { step: GrantProgressStep; onEdit: () => void; onDelete: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusColors = {
    "Not Started": "bg-gray-500",
    "In Progress": "bg-blue-500",
    "Submitted": "bg-yellow-500",
    "Completed": "bg-green-500",
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      {step.logo_url && (
        <img src={step.logo_url} alt={step.step_title} className="w-12 h-12 object-contain" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">{step.step_title}</p>
          <span className={`px-2 py-1 text-xs rounded text-white ${statusColors[step.status as keyof typeof statusColors] || 'bg-gray-500'}`}>
            {step.status}
          </span>
        </div>
        {step.description && <p className="text-sm text-muted-foreground line-clamp-1">{step.description}</p>}
      </div>
      <div className="flex items-center gap-2">
        {step.completed && <span className="text-green-500 font-semibold text-sm">✓ Completed</span>}
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const GrantProgressManager = () => {
  const [steps, setSteps] = useState<GrantProgressStep[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<GrantProgressStep | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    step_title: "",
    description: "",
    status: "Not Started",
    completed: false,
    logo_url: "",
    logo_path: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    const { data, error } = await supabase
      .from("grant_progress_steps")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch grant steps");
      return;
    }
    setSteps(data || []);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = steps.findIndex((s) => s.id === active.id);
    const newIndex = steps.findIndex((s) => s.id === over.id);

    const newSteps = arrayMove(steps, oldIndex, newIndex);
    setSteps(newSteps);

    const updates = newSteps.map((step, index) => 
      supabase.from("grant_progress_steps").update({ display_order: index }).eq("id", step.id)
    );

    await Promise.all(updates);
    toast.success("Order updated");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("grant-logos")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Failed to upload logo");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("grant-logos")
      .getPublicUrl(filePath);

    setFormData({ ...formData, logo_url: publicUrl, logo_path: filePath });
    setUploading(false);
    toast.success("Logo uploaded");
  };

  const handleSubmit = async () => {
    if (!formData.step_title) {
      toast.error("Step title is required");
      return;
    }

    if (editingStep) {
      const { error } = await supabase
        .from("grant_progress_steps")
        .update(formData)
        .eq("id", editingStep.id);

      if (error) {
        toast.error("Failed to update step");
        return;
      }
      toast.success("Step updated");
    } else {
      const { error } = await supabase
        .from("grant_progress_steps")
        .insert({ ...formData, display_order: steps.length });

      if (error) {
        toast.error("Failed to add step");
        return;
      }
      toast.success("Step added");
    }

    setIsDialogOpen(false);
    setEditingStep(null);
    setFormData({ step_title: "", description: "", status: "Not Started", completed: false, logo_url: "", logo_path: "" });
    fetchSteps();
  };

  const handleDelete = async (id: string, logoPath: string | null) => {
    if (logoPath) {
      await supabase.storage.from("grant-logos").remove([logoPath]);
    }

    const { error } = await supabase.from("grant_progress_steps").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete step");
      return;
    }
    toast.success("Step deleted");
    fetchSteps();
  };

  const openEditDialog = (step: GrantProgressStep) => {
    setEditingStep(step);
    setFormData({
      step_title: step.step_title,
      description: step.description || "",
      status: step.status,
      completed: step.completed,
      logo_url: step.logo_url || "",
      logo_path: step.logo_path || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Grant Step
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingStep ? "Edit Grant Step" : "Add Grant Step"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="flex items-center gap-4 mt-2">
                {formData.logo_url && (
                  <img src={formData.logo_url} alt="Preview" className="w-16 h-16 object-contain border rounded p-2" />
                )}
                <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </div>
            </div>
            <div>
              <Label>Step Title *</Label>
              <Input value={formData.step_title} onChange={(e) => setFormData({ ...formData, step_title: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="completed">Mark as Completed</Label>
              <Switch
                id="completed"
                checked={formData.completed}
                onCheckedChange={(checked) => setFormData({ ...formData, completed: checked })}
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingStep ? "Update" : "Add"} Grant Step
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {steps.map((step) => (
              <SortableStepRow
                key={step.id}
                step={step}
                onEdit={() => openEditDialog(step)}
                onDelete={() => handleDelete(step.id, step.logo_path)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {steps.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No grant steps yet. Add one to get started.</p>
      )}
    </div>
  );
};

export default GrantProgressManager;
