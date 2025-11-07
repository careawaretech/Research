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
import { Plus, Trash2, Save, GripVertical, ChevronDown, ArrowLeft } from 'lucide-react';
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

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_type: 'upload' | 'lucide';
  icon_url?: string;
  lucide_icon_name?: string;
  background_color: string;
  text_color: string;
  border_color: string;
  bullet_points: string[];
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

const UniversalSecurityComplianceManager = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [newBulletPoint, setNewBulletPoint] = useState('');
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);
  const [section, setSection] = useState<SectionData>({
    title: 'Universal Security & Compliance',
    subtitle: 'Regardless of deployment environment, your data remains secure, private, and fully compliant with healthcare regulations.',
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
    fetchCards();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'universal-security-compliance')
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

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('universal_security_compliance')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCards((data || []) as CardData[]);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Failed to fetch cards');
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
          section_key: 'universal-security-compliance',
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
      const filePath = `security-compliance/${fileName}`;

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
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        newOrder.forEach(async (card, index) => {
          await supabase
            .from('universal_security_compliance')
            .update({ display_order: index })
            .eq('id', card.id);
        });

        return newOrder;
      });
      toast.success('Order updated');
    }
  };

  const handleAddCard = () => {
    const newCard: CardData = {
      id: crypto.randomUUID(),
      title: 'New Security Feature',
      subtitle: 'Add subtitle',
      description: '',
      icon_type: 'upload',
      background_color: 'rgba(59, 130, 246, 0.1)',
      text_color: '#ffffff',
      border_color: 'rgba(59, 130, 246, 0.3)',
      bullet_points: [],
      display_order: cards.length,
      visible: true,
    };
    setEditingCard(newCard);
  };

  const handleSaveCard = async () => {
    if (!editingCard) return;

    try {
      const isNew = !cards.find((c) => c.id === editingCard.id);
      
      if (isNew) {
        const { error } = await supabase
          .from('universal_security_compliance')
          .insert([editingCard]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('universal_security_compliance')
          .update(editingCard)
          .eq('id', editingCard.id);
        if (error) throw error;
      }

      toast.success('Card saved successfully');
      setEditingCard(null);
      fetchCards();
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save card');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const { error } = await supabase
        .from('universal_security_compliance')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Card deleted successfully');
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const handleToggleVisibility = async (card: CardData) => {
    try {
      const { error } = await supabase
        .from('universal_security_compliance')
        .update({ visible: !card.visible })
        .eq('id', card.id);

      if (error) throw error;
      toast.success(`Card ${!card.visible ? 'shown' : 'hidden'}`);
      fetchCards();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const addBulletPoint = () => {
    if (!editingCard || !newBulletPoint.trim()) return;
    setEditingCard({
      ...editingCard,
      bullet_points: [...editingCard.bullet_points, newBulletPoint.trim()],
    });
    setNewBulletPoint('');
  };

  const removeBulletPoint = (index: number) => {
    if (!editingCard) return;
    setEditingCard({
      ...editingCard,
      bullet_points: editingCard.bullet_points.filter((_, i) => i !== index),
    });
  };

  const SortableCard = ({ card }: { card: CardData }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.subtitle}</p>
        </div>
        <Switch checked={card.visible} onCheckedChange={() => handleToggleVisibility(card)} />
        <Button variant="outline" size="sm" onClick={() => setEditingCard(card)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => handleDeleteCard(card.id)}>
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
            <h1 className="text-3xl font-bold">Universal Security & Compliance</h1>
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
              <p className="text-lg font-mono font-bold text-primary mt-1">universal-security-compliance</p>
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
                placeholder="Universal Security & Compliance"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                placeholder="Regardless of deployment environment..."
                rows={2}
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

        {/* Cards Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Security Cards</CardTitle>
              <Button onClick={handleAddCard}>
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editingCard ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  {cards.find((c) => c.id === editingCard.id) ? 'Edit' : 'New'} Card
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingCard.title}
                      onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={editingCard.subtitle}
                      onChange={(e) => setEditingCard({ ...editingCard, subtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingCard.description}
                    onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Icon</Label>
                  <IconPicker
                    value={{
                      iconType: editingCard.icon_type,
                      lucideIconName: editingCard.lucide_icon_name,
                      iconUrl: editingCard.icon_url,
                    }}
                    onChange={(iconData) =>
                      setEditingCard({
                        ...editingCard,
                        icon_type: iconData.iconType,
                        lucide_icon_name: iconData.lucideIconName,
                        icon_url: iconData.iconUrl,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Background Color</Label>
                    <Input
                      type="color"
                      value={editingCard.background_color}
                      onChange={(e) => setEditingCard({ ...editingCard, background_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Text Color</Label>
                    <Input
                      type="color"
                      value={editingCard.text_color}
                      onChange={(e) => setEditingCard({ ...editingCard, text_color: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Border Color</Label>
                    <Input
                      type="color"
                      value={editingCard.border_color}
                      onChange={(e) => setEditingCard({ ...editingCard, border_color: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Bullet Points</Label>
                  <div className="space-y-2">
                    {editingCard.bullet_points.map((point, index) => (
                      <div key={index} className="flex gap-2">
                        <Input value={point} readOnly />
                        <Button variant="destructive" size="sm" onClick={() => removeBulletPoint(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        value={newBulletPoint}
                        onChange={(e) => setNewBulletPoint(e.target.value)}
                        placeholder="Add new bullet point"
                        onKeyPress={(e) => e.key === 'Enter' && addBulletPoint()}
                      />
                      <Button onClick={addBulletPoint}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveCard}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Card
                  </Button>
                  <Button variant="outline" onClick={() => setEditingCard(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {cards.map((card) => (
                      <SortableCard key={card.id} card={card} />
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

export default UniversalSecurityComplianceManager;
