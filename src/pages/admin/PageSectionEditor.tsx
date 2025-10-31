import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Edit, Plus, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PageSection {
  id: string;
  section_type: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  section_order: number;
  metadata: any;
}

interface ContentPage {
  id: string;
  title: string;
  slug: string;
}

interface SortableSectionCardProps {
  section: PageSection;
  onEdit: (id: string) => void;
}

const SortableSectionCard = ({ section, onEdit }: SortableSectionCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div {...attributes} {...listeners} className="cursor-move">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {section.title || 'Untitled Section'}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {section.section_type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Order: {section.section_order}
                </span>
              </div>
            </div>
          </div>
          <Button size="sm" onClick={() => onEdit(section.id)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Section
          </Button>
        </div>
      </CardHeader>
      {(section.subtitle || section.content) && (
        <CardContent>
          {section.subtitle && (
            <p className="text-sm text-muted-foreground mb-2">
              {section.subtitle}
            </p>
          )}
          {section.content && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {section.content.substring(0, 150)}...
            </p>
          )}
          <div className="flex gap-2 mt-3 flex-wrap">
            {section.image_url && (
              <Badge variant="secondary">Has Image</Badge>
            )}
            {section.button_text && (
              <Badge variant="secondary">
                Button: {section.button_text}
              </Badge>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const PageSectionEditor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [page, setPage] = useState<ContentPage | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPageAndSections();
  }, [pageId]);

  const fetchPageAndSections = async () => {
    try {
      // Fetch page details
      const { data: pageData, error: pageError } = await (supabase as any)
        .from('content_pages')
        .select('id, title, slug')
        .eq('id', pageId)
        .single();

      if (pageError) throw pageError;
      setPage(pageData);

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('page_id', pageId)
        .order('section_order', { ascending: true });

      if (sectionsError) throw sectionsError;
      setSections(sectionsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load page sections',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((section) => section.id === active.id);
    const newIndex = sections.findIndex((section) => section.id === over.id);

    const newOrder = arrayMove(sections, oldIndex, newIndex);
    setSections(newOrder);

    // Update section_order in database
    try {
      const updates = newOrder.map((section, index) => ({
        id: section.id,
        section_order: index,
      }));

      for (const update of updates) {
        await supabase
          .from('page_sections' as any)
          .update({ section_order: update.section_order })
          .eq('id', update.id);
      }

      toast({
        title: 'Success',
        description: 'Section order updated',
      });

      fetchPageAndSections();
    } catch (error) {
      console.error('Error updating section order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update section order',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading sections...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Page not found</p>
          <Button onClick={() => navigate('/admin/content')} className="mt-4">
            Back to Content Management
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/content')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Edit Page Sections
              </h1>
              <p className="text-muted-foreground mt-1">
                {page.title} - Manage all sections
              </p>
            </div>
          </div>
          <Button onClick={() => navigate(`/admin/content/section/new/${pageId}`)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>

        {/* Sections List */}
        {sections.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No sections found</p>
              <Button onClick={() => navigate(`/admin/content/section/new/${pageId}`)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Section
              </Button>
            </CardContent>
          </Card>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {sections.map((section) => (
                  <SortableSectionCard
                    key={section.id}
                    section={section}
                    onEdit={(id) => navigate(`/admin/content/section/edit/${id}`)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </AdminLayout>
  );
};

export default PageSectionEditor;
