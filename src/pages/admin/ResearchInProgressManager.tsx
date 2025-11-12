import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Plus, Trash2, Save, GripVertical, Upload, ChevronDown, ArrowLeft } from 'lucide-react';
import { IconPicker } from '@/components/admin/IconPicker';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';
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

interface HighlightData {
  id: string;
  title: string;
  icon_type: 'upload' | 'lucide';
  icon_url?: string;
  lucide_icon_name?: string;
  display_order: number;
  visible: boolean;
}

interface SectionData {
  title: string;
  subtitle: string;
  listen_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  read_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  watch_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
}

const ResearchInProgressManager = () => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<HighlightData | null>(null);
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);
  const [section, setSection] = useState<SectionData>({
    title: 'Building the Future of Privacy-First Care Technology',
    subtitle: 'Care Aware Tech is a research-driven startup conducting advanced studies on wireless sensing for real-time fall and vital sign detection in assisted living and memory care settings. We\'re transforming innovative ideas into validated technology through grant funding and collaborative partnerships.',
    listen_button: { text: 'Listen More', url: '', enabled: false },
    read_button: { text: 'Read More', url: '', enabled: false },
    watch_button: { text: 'Watch More', url: '', enabled: false },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchSection();
    fetchHighlights();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'research-in-progress')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const content = data.content as unknown as SectionData;
        setSection(content);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      toast.error('Failed to load section data');
    }
  };

  const fetchHighlights = async () => {
    try {
      const { data, error } = await supabase
        .from('research_in_progress_highlights')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setHighlights((data || []) as HighlightData[]);
    } catch (error) {
      console.error('Error fetching highlights:', error);
      toast.error('Failed to fetch highlights');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('section_content')
        .upsert({
          section_key: 'research-in-progress',
          content: section as any,
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;
      toast.success('Section updated successfully');
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  const handleButtonFileUpload = async (buttonType: 'listen' | 'read' | 'watch', file: File) => {
    setUploadingButton(buttonType);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${buttonType}-${Date.now()}.${fileExt}`;
      const filePath = `research-in-progress/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      if (buttonType === 'listen') {
        setSection(prev => ({
          ...prev,
          listen_button: { ...prev.listen_button!, url: publicUrl }
        }));
      } else if (buttonType === 'read') {
        setSection(prev => ({
          ...prev,
          read_button: { ...prev.read_button!, url: publicUrl }
        }));
      } else {
        setSection(prev => ({
          ...prev,
          watch_button: { ...prev.watch_button!, url: publicUrl }
        }));
      }

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploadingButton(null);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setHighlights((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Update display_order in database
        newOrder.forEach(async (highlight, index) => {
          await supabase
            .from('research_in_progress_highlights')
            .update({ display_order: index })
            .eq('id', highlight.id);
        });

        return newOrder;
      });
      toast.success('Order updated');
    }
  };

  const handleAddHighlight = () => {
    const newHighlight: HighlightData = {
      id: crypto.randomUUID(),
      title: 'New Highlight',
      icon_type: 'lucide',
      lucide_icon_name: 'Star',
      display_order: highlights.length,
      visible: true,
    };
    setEditingHighlight(newHighlight);
  };

  const handleSaveHighlight = async () => {
    if (!editingHighlight) return;

    try {
      const isNew = !highlights.find((h) => h.id === editingHighlight.id);
      
      if (isNew) {
        const { error } = await supabase
          .from('research_in_progress_highlights')
          .insert([editingHighlight]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('research_in_progress_highlights')
          .update(editingHighlight)
          .eq('id', editingHighlight.id);
        if (error) throw error;
      }

      toast.success('Highlight saved successfully');
      setEditingHighlight(null);
      fetchHighlights();
    } catch (error) {
      console.error('Error saving highlight:', error);
      toast.error('Failed to save highlight');
    }
  };

  const handleDeleteHighlight = async (id: string) => {
    if (!confirm('Are you sure you want to delete this highlight?')) return;

    try {
      const { error } = await supabase
        .from('research_in_progress_highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Highlight deleted successfully');
      fetchHighlights();
    } catch (error) {
      console.error('Error deleting highlight:', error);
      toast.error('Failed to delete highlight');
    }
  };

  const handleToggleVisibility = async (highlight: HighlightData) => {
    try {
      const { error } = await supabase
        .from('research_in_progress_highlights')
        .update({ visible: !highlight.visible })
        .eq('id', highlight.id);

      if (error) throw error;
      toast.success(`Highlight ${!highlight.visible ? 'shown' : 'hidden'}`);
      fetchHighlights();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const SortableHighlight = ({ highlight }: { highlight: HighlightData }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: highlight.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{highlight.title}</h3>
        </div>
        <Switch checked={highlight.visible} onCheckedChange={() => handleToggleVisibility(highlight)} />
        <Button variant="outline" size="sm" onClick={() => setEditingHighlight(highlight)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => handleDeleteHighlight(highlight.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Research In Progress Section</h1>
          </div>
          <Button onClick={handleSaveSection} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Section Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Section Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
              <Label className="text-sm font-semibold text-muted-foreground">Section Tag (Unique Identifier)</Label>
              <p className="text-lg font-mono font-bold text-primary mt-1">research-in-progress</p>
              <p className="text-xs text-muted-foreground mt-2">
                This unique tag identifies this section. It's used for HTML anchors and internal references. 
                Contact administrator to change.
              </p>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={section.title}
                onChange={(e) => setSection({ ...section, title: e.target.value })}
                placeholder="Building the Future of Privacy-First Care Technology"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                placeholder="Care Aware Tech is a research-driven startup..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Read Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-enabled"
                    checked={section.read_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="read-enabled">Enable Read Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.read_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, text: e.target.value }
                      })
                    }
                    placeholder="Read More"
                  />
                </div>
                <div>
                  <Label>File URL / Link</Label>
                  <Input
                    value={section.read_button?.url}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, url: e.target.value }
                      })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('read', file);
                      }}
                      disabled={uploadingButton === 'read'}
                    />
                    {uploadingButton === 'read' && <span className="text-sm">Uploading...</span>}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Listen Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="listen-enabled"
                    checked={section.listen_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="listen-enabled">Enable Listen Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.listen_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, text: e.target.value }
                      })
                    }
                    placeholder="Listen More"
                  />
                </div>
                <div>
                  <Label>File URL / Link</Label>
                  <Input
                    value={section.listen_button?.url}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, url: e.target.value }
                      })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('listen', file);
                      }}
                      disabled={uploadingButton === 'listen'}
                    />
                    {uploadingButton === 'listen' && <span className="text-sm">Uploading...</span>}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Watch Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watch-enabled"
                    checked={section.watch_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="watch-enabled">Enable Watch Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.watch_button?.text}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, text: e.target.value }
                      })
                    }
                    placeholder="Watch More"
                  />
                </div>
                <div>
                  <Label>File URL / Link</Label>
                  <Input
                    value={section.watch_button?.url}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, url: e.target.value }
                      })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleButtonFileUpload('watch', file);
                      }}
                      disabled={uploadingButton === 'watch'}
                    />
                    {uploadingButton === 'watch' && <span className="text-sm">Uploading...</span>}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Highlights Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Highlights</span>
              {!editingHighlight && (
                <Button onClick={handleAddHighlight} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {editingHighlight ? (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingHighlight.title}
                    onChange={(e) => setEditingHighlight({ ...editingHighlight, title: e.target.value })}
                    placeholder="Highlight text"
                  />
                </div>
                <div>
                  <Label>Icon</Label>
                  <IconPicker
                    value={{
                      iconType: editingHighlight.icon_type,
                      iconUrl: editingHighlight.icon_url,
                      lucideIconName: editingHighlight.lucide_icon_name,
                    }}
                    onChange={(value) => {
                      setEditingHighlight({
                        ...editingHighlight,
                        icon_type: value.iconType,
                        icon_url: value.iconUrl,
                        lucide_icon_name: value.lucideIconName,
                      });
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveHighlight}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Highlight
                  </Button>
                  <Button variant="outline" onClick={() => setEditingHighlight(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={highlights.map((h) => h.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {highlights.map((highlight) => (
                      <SortableHighlight key={highlight.id} highlight={highlight} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ResearchInProgressManager;
