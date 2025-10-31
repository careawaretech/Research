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

interface AcademicPartner {
  id: string;
  institution_name: string;
  logo_url: string | null;
  logo_path: string | null;
  description: string | null;
  website_url: string | null;
  display_order: number;
}

const SortablePartnerRow = ({ partner, onEdit, onDelete }: { partner: AcademicPartner; onEdit: () => void; onDelete: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: partner.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      {partner.logo_url && (
        <img src={partner.logo_url} alt={partner.institution_name} className="w-16 h-16 object-contain" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{partner.institution_name}</p>
        {partner.website_url && (
          <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate block">
            {partner.website_url}
          </a>
        )}
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

const AcademicPartnersManager = () => {
  const [partners, setPartners] = useState<AcademicPartner[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<AcademicPartner | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    institution_name: "",
    description: "",
    website_url: "",
    logo_url: "",
    logo_path: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("academic_partners")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch partners");
      return;
    }
    setPartners(data || []);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = partners.findIndex((p) => p.id === active.id);
    const newIndex = partners.findIndex((p) => p.id === over.id);

    const newPartners = arrayMove(partners, oldIndex, newIndex);
    setPartners(newPartners);

    const updates = newPartners.map((partner, index) => 
      supabase.from("academic_partners").update({ display_order: index }).eq("id", partner.id)
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
      .from("partner-logos")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Failed to upload logo");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("partner-logos")
      .getPublicUrl(filePath);

    setFormData({ ...formData, logo_url: publicUrl, logo_path: filePath });
    setUploading(false);
    toast.success("Logo uploaded");
  };

  const handleSubmit = async () => {
    if (!formData.institution_name) {
      toast.error("Institution name is required");
      return;
    }

    if (editingPartner) {
      const { error } = await supabase
        .from("academic_partners")
        .update(formData)
        .eq("id", editingPartner.id);

      if (error) {
        toast.error("Failed to update partner");
        return;
      }
      toast.success("Partner updated");
    } else {
      const { error } = await supabase
        .from("academic_partners")
        .insert({ ...formData, display_order: partners.length });

      if (error) {
        toast.error("Failed to add partner");
        return;
      }
      toast.success("Partner added");
    }

    setIsDialogOpen(false);
    setEditingPartner(null);
    setFormData({ institution_name: "", description: "", website_url: "", logo_url: "", logo_path: "" });
    fetchPartners();
  };

  const handleDelete = async (id: string, logoPath: string | null) => {
    if (logoPath) {
      await supabase.storage.from("partner-logos").remove([logoPath]);
    }

    const { error } = await supabase.from("academic_partners").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete partner");
      return;
    }
    toast.success("Partner deleted");
    fetchPartners();
  };

  const openEditDialog = (partner: AcademicPartner) => {
    setEditingPartner(partner);
    setFormData({
      institution_name: partner.institution_name,
      description: partner.description || "",
      website_url: partner.website_url || "",
      logo_url: partner.logo_url || "",
      logo_path: partner.logo_path || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPartner ? "Edit Partner" : "Add Partner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Logo</Label>
              <div className="flex items-center gap-4 mt-2">
                {formData.logo_url && (
                  <img src={formData.logo_url} alt="Preview" className="w-20 h-20 object-contain border rounded p-2" />
                )}
                <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </div>
            </div>
            <div>
              <Label>Institution Name *</Label>
              <Input value={formData.institution_name} onChange={(e) => setFormData({ ...formData, institution_name: e.target.value })} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Website URL</Label>
              <Input value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })} placeholder="https://..." />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingPartner ? "Update" : "Add"} Partner
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={partners.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {partners.map((partner) => (
              <SortablePartnerRow
                key={partner.id}
                partner={partner}
                onEdit={() => openEditDialog(partner)}
                onDelete={() => handleDelete(partner.id, partner.logo_path)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {partners.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No partners yet. Add one to get started.</p>
      )}
    </div>
  );
};

export default AcademicPartnersManager;
