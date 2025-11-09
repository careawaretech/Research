import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FileUploader } from "@/components/admin/FileUploader";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";

interface CareSolution {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  image_path: string | null;
  link_url: string | null;
  display_order: number;
  visible: boolean;
}

interface SocialProof {
  text: string;
  avatars: string[];
}

function SortableItem({ solution, onUpdate, onDelete }: {
  solution: CareSolution;
  onUpdate: (id: string, field: string, value: any) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: solution.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4 mb-4">
      <div className="flex items-start gap-4">
        <button {...attributes} {...listeners} className="cursor-move mt-2">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={solution.title}
                onChange={(e) => onUpdate(solution.id, "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Category (e.g., ASSISTED LIVING)</Label>
              <Input
                value={solution.category}
                onChange={(e) => onUpdate(solution.id, "category", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Link URL</Label>
            <Input
              value={solution.link_url || ""}
              onChange={(e) => onUpdate(solution.id, "link_url", e.target.value)}
              placeholder="/technology"
            />
          </div>

          <div>
            <Label>Image</Label>
            <FileUploader
              label="Image"
              value={solution.image_url || ""}
              onChange={(url) => {
                onUpdate(solution.id, "image_url", url);
              }}
              accept="image/*"
              bucketName="media-library"
              fileType="image"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={solution.visible ? "outline" : "secondary"}
              size="sm"
              onClick={() => onUpdate(solution.id, "visible", !solution.visible)}
            >
              {solution.visible ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
              {solution.visible ? "Visible" : "Hidden"}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(solution.id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CareSolutionsShowcaseManager() {
  const queryClient = useQueryClient();
  const [socialProofText, setSocialProofText] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { data: solutions = [], isLoading } = useQuery({
    queryKey: ["care-solutions-showcase"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_solutions_showcase")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as CareSolution[];
    },
  });

  const { data: sectionContent } = useQuery({
    queryKey: ["section-content", "care-solutions-showcase"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_key", "care-solutions-showcase")
        .single();
      if (error) throw error;
      const content = data?.content as any;
      return content as { socialProof: SocialProof } | undefined;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CareSolution> }) => {
      const { error } = await supabase
        .from("care_solutions_showcase")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["care-solutions-showcase"] });
      toast.success("Updated successfully");
    },
    onError: () => toast.error("Failed to update"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("care_solutions_showcase")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["care-solutions-showcase"] });
      toast.success("Deleted successfully");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const maxOrder = Math.max(...solutions.map(s => s.display_order), 0);
      const { error } = await supabase
        .from("care_solutions_showcase")
        .insert({
          title: "New Solution",
          category: "CATEGORY",
          display_order: maxOrder + 1,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["care-solutions-showcase"] });
      toast.success("Added new solution");
    },
    onError: () => toast.error("Failed to add"),
  });

  const updateSocialProofMutation = useMutation({
    mutationFn: async (updates: Partial<SocialProof>) => {
      const currentContent = sectionContent || { socialProof: { text: "", avatars: [] } };
      const newContent = {
        ...currentContent,
        socialProof: {
          ...currentContent.socialProof,
          ...updates,
        },
      };

      const { error } = await supabase
        .from("section_content")
        .upsert({
          section_key: "care-solutions-showcase",
          content: newContent,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["section-content", "care-solutions-showcase"] });
      toast.success("Social proof updated");
    },
    onError: () => toast.error("Failed to update social proof"),
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = solutions.findIndex((s) => s.id === active.id);
    const newIndex = solutions.findIndex((s) => s.id === over.id);

    const newSolutions = [...solutions];
    const [moved] = newSolutions.splice(oldIndex, 1);
    newSolutions.splice(newIndex, 0, moved);

    const updates = newSolutions.map((solution, index) => ({
      id: solution.id,
      display_order: index,
    }));

    for (const update of updates) {
      await supabase
        .from("care_solutions_showcase")
        .update({ display_order: update.display_order })
        .eq("id", update.id);
    }

    queryClient.invalidateQueries({ queryKey: ["care-solutions-showcase"] });
    toast.success("Order updated");
  };

  const handleAddAvatar = () => {
    if (!newAvatarUrl.trim()) return;
    const currentAvatars = sectionContent?.socialProof?.avatars || [];
    updateSocialProofMutation.mutate({ avatars: [...currentAvatars, newAvatarUrl] });
    setNewAvatarUrl("");
  };

  const handleRemoveAvatar = (index: number) => {
    const currentAvatars = sectionContent?.socialProof?.avatars || [];
    const newAvatars = currentAvatars.filter((_, i) => i !== index);
    updateSocialProofMutation.mutate({ avatars: newAvatars });
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">Care Solutions Showcase</h1>
            <SectionTagBadge 
              sectionTag="care-solutions-showcase" 
              adminPath="/admin/care-solutions-showcase"
            />
          </div>
          <p className="text-muted-foreground">
            Manage the scrolling carousel of care solutions displayed on the homepage
          </p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Social Proof</h2>
          <div className="space-y-4">
            <div>
              <Label>Text (e.g., "Trusted by 50+ care facilities")</Label>
              <div className="flex gap-2">
                <Input
                  value={socialProofText || sectionContent?.socialProof?.text || ""}
                  onChange={(e) => setSocialProofText(e.target.value)}
                  placeholder="Trusted by 50+ care facilities"
                />
                <Button
                  onClick={() => {
                    updateSocialProofMutation.mutate({ text: socialProofText });
                    setSocialProofText("");
                  }}
                >
                  Update
                </Button>
              </div>
            </div>

            <div>
              <Label>Avatar URLs</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                />
                <Button onClick={handleAddAvatar}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sectionContent?.socialProof?.avatars?.map((avatar, index) => (
                  <div key={index} className="relative group">
                    <img src={avatar} alt="" className="w-12 h-12 rounded-full" />
                    <button
                      onClick={() => handleRemoveAvatar(index)}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Carousel Items</h2>
            <Button onClick={() => addMutation.mutate()}>Add New Solution</Button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={solutions.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {solutions.map((solution) => (
                <SortableItem
                  key={solution.id}
                  solution={solution}
                  onUpdate={(id, field, value) =>
                    updateMutation.mutate({ id, updates: { [field]: value } })
                  }
                  onDelete={(id) => deleteMutation.mutate(id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </AdminLayout>
  );
}
