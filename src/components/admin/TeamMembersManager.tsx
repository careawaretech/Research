import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical, Upload } from "lucide-react";
import { toast } from "sonner";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TeamMember {
  id: string;
  name: string;
  photo_url: string | null;
  photo_path: string | null;
  title: string;
  affiliation: string | null;
  biography: string | null;
  publication_count: number;
  display_order: number;
}

const SortableTeamMemberRow = ({ member, onEdit, onDelete }: { member: TeamMember; onEdit: () => void; onDelete: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card border rounded-lg">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      {member.photo_url && (
        <img src={member.photo_url} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{member.name}</p>
        <p className="text-sm text-muted-foreground truncate">{member.title}</p>
        {member.affiliation && <p className="text-xs text-muted-foreground truncate">{member.affiliation}</p>}
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

const TeamMembersManager = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    affiliation: "",
    biography: "",
    publication_count: 0,
    photo_url: "",
    photo_path: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch team members");
      return;
    }
    setMembers(data || []);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = members.findIndex((m) => m.id === active.id);
    const newIndex = members.findIndex((m) => m.id === over.id);

    const newMembers = arrayMove(members, oldIndex, newIndex);
    setMembers(newMembers);

    const updates = newMembers.map((member, index) => 
      supabase.from("team_members").update({ display_order: index }).eq("id", member.id)
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

    const { error: uploadError, data } = await supabase.storage
      .from("team-photos")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Failed to upload photo");
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("team-photos")
      .getPublicUrl(filePath);

    setFormData({ ...formData, photo_url: publicUrl, photo_path: filePath });
    setUploading(false);
    toast.success("Photo uploaded");
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.title) {
      toast.error("Name and title are required");
      return;
    }

    if (editingMember) {
      const { error } = await supabase
        .from("team_members")
        .update(formData)
        .eq("id", editingMember.id);

      if (error) {
        toast.error("Failed to update team member");
        return;
      }
      toast.success("Team member updated");
    } else {
      const { error } = await supabase
        .from("team_members")
        .insert({ ...formData, display_order: members.length });

      if (error) {
        toast.error("Failed to add team member");
        return;
      }
      toast.success("Team member added");
    }

    setIsDialogOpen(false);
    setEditingMember(null);
    setFormData({ name: "", title: "", affiliation: "", biography: "", publication_count: 0, photo_url: "", photo_path: "" });
    fetchMembers();
  };

  const handleDelete = async (id: string, photoPath: string | null) => {
    if (photoPath) {
      await supabase.storage.from("team-photos").remove([photoPath]);
    }

    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete team member");
      return;
    }
    toast.success("Team member deleted");
    fetchMembers();
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      affiliation: member.affiliation || "",
      biography: member.biography || "",
      publication_count: member.publication_count,
      photo_url: member.photo_url || "",
      photo_path: member.photo_path || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Photo</Label>
              <div className="flex items-center gap-4 mt-2">
                {formData.photo_url && (
                  <img src={formData.photo_url} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                )}
                <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              </div>
            </div>
            <div>
              <Label>Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <Label>Title *</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <Label>Affiliation</Label>
              <Input value={formData.affiliation} onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })} />
            </div>
            <div>
              <Label>Biography (use bullet points)</Label>
              <div className="mt-2">
                <ReactQuill
                  theme="snow"
                  value={formData.biography}
                  onChange={(value) => setFormData({ ...formData, biography: value })}
                  placeholder="Add biography with bullet points..."
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['clean']
                    ]
                  }}
                  style={{ minHeight: '150px' }}
                />
              </div>
            </div>
            <div>
              <Label>Publication Count</Label>
              <Input type="number" value={formData.publication_count} onChange={(e) => setFormData({ ...formData, publication_count: parseInt(e.target.value) || 0 })} />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              {editingMember ? "Update" : "Add"} Team Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={members.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {members.map((member) => (
              <SortableTeamMemberRow
                key={member.id}
                member={member}
                onEdit={() => openEditDialog(member)}
                onDelete={() => handleDelete(member.id, member.photo_path)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {members.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No team members yet. Add one to get started.</p>
      )}
    </div>
  );
};

export default TeamMembersManager;
