import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Copy, 
  Trash2,
  Home,
  FileText,
  Shield,
  Building2,
  Beaker,
  Users,
  GripVertical,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  page_type: string;
  updated_at: string;
  author_id: string | null;
  page_order: number;
}

interface SortablePageRowProps {
  page: ContentPage;
  getPageIcon: (pageType: string) => JSX.Element;
  getStatusBadge: (status: string) => JSX.Element;
  formatDate: (dateString: string) => string;
  onEdit: (page: ContentPage) => void;
  onPreview: (slug: string) => void;
  onDuplicate: (page: ContentPage) => void;
  onDelete: (id: string, title: string) => void;
}

const SortablePageRow = ({
  page,
  getPageIcon,
  getStatusBadge,
  formatDate,
  onEdit,
  onPreview,
  onDuplicate,
  onDelete,
}: SortablePageRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div
          {...attributes}
          {...listeners}
          className="cursor-move flex items-center justify-center w-10 h-10"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50">
          {getPageIcon(page.page_type)}
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{page.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {page.excerpt || 'No description'}
          </div>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(page.status)}</TableCell>
      <TableCell>
        <div className="text-sm">
          <div>Last modified: {formatDate(page.updated_at)}</div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPreview(page.slug)}
            title="Preview"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(page)}
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(page)}
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(page.id, page.title)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ContentManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [filteredPages, setFilteredPages] = useState<ContentPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('order');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    filterPages();
  }, [pages, searchQuery, selectedStatus, sortBy]);

  const fetchPages = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('content_pages')
        .select('*')
        .order('page_order', { ascending: true });

      if (error) throw error;
      setPages((data || []) as any);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content pages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPages = () => {
    let filtered = [...pages];

    // Filter by status tab
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(page => page.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'order') {
      filtered.sort((a, b) => a.page_order - b.page_order);
    } else if (sortBy === 'updated') {
      filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredPages(filtered);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filteredPages.findIndex((page) => page.id === active.id);
    const newIndex = filteredPages.findIndex((page) => page.id === over.id);

    const newOrder = arrayMove(filteredPages, oldIndex, newIndex);
    setFilteredPages(newOrder);

    // Update page_order in database
    try {
      const updates = newOrder.map((page, index) => ({
        id: page.id,
        page_order: index,
      }));

      for (const update of updates) {
        await supabase
          .from('content_pages' as any)
          .update({ page_order: update.page_order })
          .eq('id', update.id);
      }

      toast({
        title: 'Success',
        description: 'Page order updated',
      });

      fetchPages();
    } catch (error) {
      console.error('Error updating page order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update page order',
        variant: 'destructive',
      });
    }
  };

  const getPageIcon = (pageType: string) => {
    const icons = {
      home: Home,
      page: FileText,
      about: Users,
      privacy: Shield,
      facility: Building2,
      research: Beaker,
    };
    const Icon = icons[pageType as keyof typeof icons] || FileText;
    return <Icon className="h-5 w-5" />;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'outline' | 'destructive', label: string }> = {
      published: { variant: 'default', label: 'Published' },
      draft: { variant: 'secondary', label: 'Draft' },
      archived: { variant: 'outline', label: 'Archived' },
    };
    const config = variants[status] || variants.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('content_pages' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete page',
        variant: 'destructive',
      });
    }
  };

  const handleDuplicatePage = async (page: ContentPage) => {
    try {
      const { error } = await (supabase as any)
        .from('content_pages')
        .insert({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy-${Date.now()}`,
          excerpt: page.excerpt,
          status: 'draft',
          page_type: page.page_type,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Page duplicated successfully',
      });
      fetchPages();
    } catch (error) {
      console.error('Error duplicating page:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate page',
        variant: 'destructive',
      });
    }
  };

  const getTabCounts = () => {
    return {
      all: pages.length,
      published: pages.filter(p => p.status === 'published').length,
      draft: pages.filter(p => p.status === 'draft').length,
      archived: pages.filter(p => p.status === 'archived').length,
    };
  };

  const counts = getTabCounts();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
            <p className="text-muted-foreground mt-1">
              Create, edit, and manage website pages and content
            </p>
          </div>
          <Button onClick={() => navigate('/admin/content/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Page
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
          <TabsList>
            <TabsTrigger value="all">All Pages ({counts.all})</TabsTrigger>
            <TabsTrigger value="published">Published ({counts.published})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({counts.draft})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({counts.archived})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="space-y-4 mt-6">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Custom Order</SelectItem>
                  <SelectItem value="updated">Last Modified</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content Table */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading pages...</p>
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pages found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? 'Try adjusting your search' : 'Get started by creating your first page'}
                </p>
                {!searchQuery && (
                  <Button onClick={() => navigate('/admin/content/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Page
                  </Button>
                )}
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Page</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <SortableContext
                      items={filteredPages.map((p) => p.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <TableBody>
                        {filteredPages.map((page) => (
                          <SortablePageRow
                            key={page.id}
                            page={page}
                            getPageIcon={getPageIcon}
                            getStatusBadge={getStatusBadge}
                            formatDate={formatDate}
                            onEdit={(page) => {
                              if (page.slug === 'home') {
                                navigate(`/admin/content/sections/${page.id}`);
                              } else {
                                navigate(`/admin/content/edit/${page.id}`);
                              }
                            }}
                            onPreview={(slug) => window.open(`/${slug}`, '_blank')}
                            onDuplicate={handleDuplicatePage}
                            onDelete={handleDeletePage}
                          />
                        ))}
                      </TableBody>
                    </SortableContext>
                  </Table>
                </DndContext>
              </div>
            )}

            {/* Footer */}
            {filteredPages.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Showing {filteredPages.length} of {pages.length} pages
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
