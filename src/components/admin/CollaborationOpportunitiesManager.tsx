import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CollaborationOpportunity {
  id: string;
  program_name: string;
  description: string;
  button_text: string | null;
  button_url: string | null;
  display_order: number;
}

const SortableOpportunityRow = ({ opportunity, onEdit, onDelete }: { opportunity: CollaborationOpportunity; onEdit: () => void; onDelete: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{opportunity.program_name}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{opportunity.description}</p>
      </div>
      <div className="flex items-center gap-2">
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

const CollaborationOpportunitiesManager = () => {
  const [opportunities, setOpportunities] = useState<CollaborationOpportunity[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<CollaborationOpportunity | null>(null);
  const [formData, setFormData] = useState({
    program_name: "",
    description: "",
    button_text: "",
    button_url: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from("collaboration_opportunities")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch opportunities");
      return;
    }
    setOpportunities(data || []);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = opportunities.findIndex((o) => o.id === active.id);
    const newIndex = opportunities.findIndex((o) => o.id === over.id);

    const newOpportunities = arrayMove(opportunities, oldIndex, newIndex);
    setOpportunities(newOpportunities);

    const updates = newOpportunities.map((opp, index) => 
      supabase.from("collaboration_opportunities").update({ display_order: index }).eq("id", opp.id)
    );

    await Promise.all(updates);
    toast.success("Order updated");
  };

  const handleSubmit = async () => {
    if (!formData.program_name || !formData.description) {
      toast.error("Program name and description are required");
      return;
    }

    if (editingOpportunity) {
      const { error } = await supabase
        .from("collaboration_opportunities")
        .update(formData)
        .eq("id", editingOpportunity.id);

      if (error) {
        toast.error("Failed to update opportunity");
        return;
      }
      toast.success("Opportunity updated");
    } else {
      const { error } = await supabase
        .from("collaboration_opportunities")
        .insert({ ...formData, display_order: opportunities.length });

      if (error) {
        toast.error("Failed to add opportunity");
        return;
      }
      toast.success("Opportunity added");
    }

    setIsDialogOpen(false);
    setEditingOpportunity(null);
    setFormData({ program_name: "", description: "", button_text: "", button_url: "" });
    fetchOpportunities();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("collaboration_opportunities").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete opportunity");
      return;
    }
    toast.success("Opportunity deleted");
    fetchOpportunities();
  };

  const openEditDialog = (opportunity: CollaborationOpportunity) => {
    setEditingOpportunity(opportunity);
    setFormData({
      program_name: opportunity.program_name,
      description: opportunity.description,
      button_text: opportunity.button_text || "",
      button_url: opportunity.button_url || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Opportunity
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Program Name *</Label>
              <Input value={formData.program_name} onChange={(e) => setFormData({ ...formData, program_name: e.target.value })} />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} />
            </div>
            <div>
              <Label>Button Text</Label>
              <Input value={formData.button_text} onChange={(e) => setFormData({ ...formData, button_text: e.target.value })} placeholder="Learn More" />
            </div>
            <div>
              <Label>Button URL</Label>
              <Input value={formData.button_url} onChange={(e) => setFormData({ ...formData, button_url: e.target.value })} placeholder="https://..." />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingOpportunity ? "Update" : "Add"} Opportunity
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={opportunities.map((o) => o.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {opportunities.map((opportunity) => (
              <SortableOpportunityRow
                key={opportunity.id}
                opportunity={opportunity}
                onEdit={() => openEditDialog(opportunity)}
                onDelete={() => handleDelete(opportunity.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {opportunities.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No opportunities yet. Add one to get started.</p>
      )}
    </div>
  );
};

export default CollaborationOpportunitiesManager;
