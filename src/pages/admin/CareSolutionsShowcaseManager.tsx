import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical, Eye, EyeOff } from "lucide-react";
import { FileUploader } from "@/components/admin/FileUploader";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CareSolutionItem {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  image_path: string | null;
  link_url: string | null;
  display_order: number;
  visible: boolean;
}

interface SectionContent {
  socialProof: {
    text: string;
    avatars: string[];
  };
}

function SortableItem({ item, onUpdate, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-4 mb-4">
      <div className="flex items-start gap-4">
        <button
          {...attributes}
          {...listeners}
          className="mt-2 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={item.title}
                onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                placeholder="e.g., Fall Detection & Prevention"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={item.category}
                onChange={(e) => onUpdate(item.id, { category: e.target.value })}
                placeholder="e.g., ASSISTED LIVING"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Link URL</Label>
              <Input
                value={item.link_url || ""}
                onChange={(e) => onUpdate(item.id, { link_url: e.target.value })}
                placeholder="/technology"
              />
            </div>
            <div>
              <Label>Image</Label>
              <FileUploader
                label="Image"
                value={item.image_url || ""}
                onChange={(url) => onUpdate(item.id, { image_url: url })}
                accept="image/*"
                bucketName="media-library"
                fileType="image"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={item.visible ? "outline" : "secondary"}
              onClick={() => onUpdate(item.id, { visible: !item.visible })}
            >
              {item.visible ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {item.visible ? "Visible" : "Hidden"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function CareSolutionsShowcaseManager() {
  const [items, setItems] = useState<CareSolutionItem[]>([]);
  const [sectionContent, setSectionContent] = useState<SectionContent>({
    socialProof: {
      text: "Trusted by 50+ care facilities",
      avatars: [],
    },
  });
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsResult, contentResult] = await Promise.all([
        supabase
          .from("care_solutions_showcase")
          .select("*")
          .order("display_order"),
        supabase
          .from("section_content")
          .select("content")
          .eq("section_key", "care-solutions-showcase")
          .single(),
      ]);

      if (itemsResult.error) throw itemsResult.error;
      if (itemsResult.data) setItems(itemsResult.data);

      if (contentResult.data?.content) {
        const content = contentResult.data.content as any;
        if (content && typeof content === 'object' && 'socialProof' in content) {
          setSectionContent(content as SectionContent);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const { data, error } = await supabase
        .from("care_solutions_showcase")
        .insert({
          title: "New Solution",
          category: "CATEGORY",
          display_order: items.length,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) setItems([...items, data]);
      toast.success("Item added");
    } catch (error: any) {
      toast.error("Failed to add item: " + error.message);
    }
  };

  const handleUpdateItem = async (id: string, updates: Partial<CareSolutionItem>) => {
    try {
      const { error } = await supabase
        .from("care_solutions_showcase")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
      toast.success("Updated");
    } catch (error: any) {
      toast.error("Failed to update: " + error.message);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    try {
      const { error } = await supabase
        .from("care_solutions_showcase")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setItems(items.filter((item) => item.id !== id));
      toast.success("Deleted");
    } catch (error: any) {
      toast.error("Failed to delete: " + error.message);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);

    try {
      const updates = newItems.map((item, index) => ({
        id: item.id,
        display_order: index,
      }));

      for (const update of updates) {
        await supabase
          .from("care_solutions_showcase")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }

      toast.success("Order updated");
    } catch (error: any) {
      toast.error("Failed to update order: " + error.message);
      fetchData();
    }
  };

  const handleUpdateSectionContent = async () => {
    try {
      const { error } = await supabase
        .from("section_content")
        .upsert([{
          section_key: "care-solutions-showcase",
          content: sectionContent as any,
        }]);

      if (error) throw error;
      toast.success("Social proof updated");
    } catch (error: any) {
      toast.error("Failed to update: " + error.message);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Care Solutions Showcase</h2>
          <p className="text-muted-foreground">Manage the carousel items on the homepage</p>
          <SectionTagBadge sectionTag="care-solutions-showcase" adminPath="/admin/care-solutions-showcase" />
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Social Proof</h3>
        <div className="space-y-4">
          <div>
            <Label>Text</Label>
            <Input
              value={sectionContent.socialProof.text}
              onChange={(e) =>
                setSectionContent({
                  ...sectionContent,
                  socialProof: { ...sectionContent.socialProof, text: e.target.value },
                })
              }
              placeholder="Trusted by 50+ care facilities"
            />
          </div>
          <div>
            <Label>Avatar URLs (one per line)</Label>
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md"
              value={sectionContent.socialProof.avatars.join("\n")}
              onChange={(e) =>
                setSectionContent({
                  ...sectionContent,
                  socialProof: {
                    ...sectionContent.socialProof,
                    avatars: e.target.value.split("\n").filter((url) => url.trim()),
                  },
                })
              }
              placeholder="https://images.unsplash.com/..."
            />
          </div>
          <Button onClick={handleUpdateSectionContent}>Save Social Proof</Button>
        </div>
      </Card>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
