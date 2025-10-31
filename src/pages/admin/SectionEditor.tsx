import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Plus, Trash2, Upload, GripVertical, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface SliderItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  order: number;
  title?: string;
  description?: string;
  status?: string;
}

interface Card {
  id: string;
  title: string;
  subtitle: string;
  icon_url?: string;
  content?: string;
  button_text?: string;
  button_url?: string;
  button_enabled?: boolean;
}

interface SectionData {
  id: string;
  title: string | null;
  subtitle: string | null;
  button_text: string | null;
  button_url: string | null;
  section_type: string;
  metadata: {
    slider?: SliderItem[];
    cards?: Card[];
    secondary_title?: string;
  } | null;
}

const SectionEditor = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<SectionData | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSection();
  }, [sectionId]);

  const fetchSection = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('id', sectionId)
        .single();

      if (error) throw error;
      
      // Initialize cards if not present
      if (data && !data.metadata?.cards) {
        const defaultCards = [
          { id: 'card1', title: 'Video Content', subtitle: 'Watch tutorials & demos', icon_url: '' },
          { id: 'card2', title: 'Podcast Series', subtitle: 'Expert discussions', icon_url: '' },
          { id: 'card3', title: 'Research Reports', subtitle: 'Latest findings & data', icon_url: '' },
          { id: 'card4', title: 'Partnerships', subtitle: 'Collaboration opportunities', icon_url: '' },
        ];
        data.metadata = {
          ...data.metadata,
          cards: defaultCards,
        };
      }
      
      setSection(data);
    } catch (error) {
      console.error('Error fetching section:', error);
      toast({
        title: 'Error',
        description: 'Failed to load section',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'image' | 'video') => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const currentSlider = section?.metadata?.slider || [];
      const newSlider = [
        ...currentSlider,
        {
          id: Math.random().toString(36).substring(2),
          type,
          url: publicUrl,
          order: currentSlider.length,
          title: 'Privacy-First Monitoring',
          status: 'Active',
        },
      ];

      setSection(prev => ({
        ...prev!,
        metadata: {
          ...prev?.metadata,
          slider: newSlider,
        },
      }));

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeSliderItem = (itemId: string) => {
    const currentSlider = section?.metadata?.slider || [];
    const newSlider = currentSlider
      .filter(item => item.id !== itemId)
      .map((item, index) => ({ ...item, order: index }));

    setSection(prev => ({
      ...prev!,
      metadata: {
        ...prev?.metadata,
        slider: newSlider,
      },
    }));
  };

  const updateSliderItem = (itemId: string, field: 'title' | 'description' | 'status' | 'order', value: string | number) => {
    const currentSlider = section?.metadata?.slider || [];
    let newSlider = currentSlider.map(item =>
      item.id === itemId ? { ...item, [field]: value } : item
    );

    // If order was changed, re-sort the array
    if (field === 'order') {
      newSlider = newSlider.sort((a, b) => a.order - b.order);
    }

    setSection(prev => ({
      ...prev!,
      metadata: {
        ...prev?.metadata,
        slider: newSlider,
      },
    }));
  };

  const updateCard = (cardId: string, field: keyof Card, value: string) => {
    const currentCards = section?.metadata?.cards || [];
    const newCards = currentCards.map(card =>
      card.id === cardId ? { ...card, [field]: value } : card
    );

    setSection(prev => ({
      ...prev!,
      metadata: {
        ...prev?.metadata,
        cards: newCards,
      },
    }));
  };

  const handleCardIconUpload = async (file: File, cardId: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `card-icon-${cardId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      updateCard(cardId, 'icon_url', publicUrl);

      toast({
        title: 'Success',
        description: 'Icon uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload icon',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          title: section?.title,
          subtitle: section?.subtitle,
          button_text: section?.button_text,
          button_url: section?.button_url,
          metadata: section?.metadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sectionId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Section updated successfully',
      });
    } catch (error) {
      console.error('Error saving section:', error);
      toast({
        title: 'Error',
        description: 'Failed to save section',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading section...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!section) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Section not found</p>
        </div>
      </AdminLayout>
    );
  }

  const sliderItems = section.metadata?.slider || [];
  const cards = section.metadata?.cards || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Section</h1>
              <p className="text-muted-foreground mt-1">{section.title}</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList>
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (First Line)</Label>
                  <Input
                    id="title"
                    value={section.title || ''}
                    onChange={(e) => setSection(prev => ({ ...prev!, title: e.target.value }))}
                    placeholder="e.g., Two Privacy-First Technologies."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary_title">Secondary Title (Second Line)</Label>
                  <Input
                    id="secondary_title"
                    value={section.metadata?.secondary_title || ''}
                    onChange={(e) => setSection(prev => ({
                      ...prev!,
                      metadata: {
                        ...prev?.metadata,
                        secondary_title: e.target.value,
                      }
                    }))}
                    placeholder="e.g., One Mission: Safer Aging."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={section.subtitle || ''}
                    onChange={(e) => setSection(prev => ({ ...prev!, subtitle: e.target.value }))}
                    placeholder="Enter section subtitle"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="button_text">Button Text</Label>
                    <Input
                      id="button_text"
                      value={section.button_text || ''}
                      onChange={(e) => setSection(prev => ({ ...prev!, button_text: e.target.value }))}
                      placeholder="e.g., Learn More"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="button_url">Button URL</Label>
                    <Input
                      id="button_url"
                      value={section.button_url || ''}
                      onChange={(e) => setSection(prev => ({ ...prev!, button_url: e.target.value }))}
                      placeholder="e.g., /about"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Slider Tab */}
          <TabsContent value="slider" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Slider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const type = file.type.startsWith('video/') ? 'video' : 'image';
                        handleFileUpload(file, type);
                      }
                    }}
                    disabled={uploading}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {uploading ? 'Uploading...' : 'Click to upload image or video'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, MP4, WebM
                    </p>
                  </label>
                </div>

                <div className="space-y-4">
                  {sliderItems
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                      <Card key={item.id}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-32 h-32 bg-secondary rounded-lg overflow-hidden">
                              {item.type === 'image' ? (
                                <img src={item.url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <video src={item.url} className="w-full h-full object-cover" />
                              )}
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2">
                                <Label className="text-xs text-muted-foreground">Order:</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  value={item.order}
                                  onChange={(e) => updateSliderItem(item.id, 'order', parseInt(e.target.value) || 0)}
                                  className="w-20"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`slide-title-${item.id}`}>Slide Title</Label>
                                <Input
                                  id={`slide-title-${item.id}`}
                                  value={item.title || ''}
                                  onChange={(e) => updateSliderItem(item.id, 'title', e.target.value)}
                                  placeholder="e.g., Privacy-First Monitoring"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`slide-description-${item.id}`}>Description</Label>
                                <Textarea
                                  id={`slide-description-${item.id}`}
                                  value={item.description || ''}
                                  onChange={(e) => updateSliderItem(item.id, 'description', e.target.value)}
                                  placeholder="Enter slide description"
                                  rows={2}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`slide-status-${item.id}`}>Slide Status</Label>
                                <Input
                                  id={`slide-status-${item.id}`}
                                  value={item.status || ''}
                                  onChange={(e) => updateSliderItem(item.id, 'status', e.target.value)}
                                  placeholder="e.g., Active"
                                />
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeSliderItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {sliderItems.length === 0 && (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      No slider items yet. Upload images or videos to get started.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            {section.section_type === 'critical_gap' && (
              <Card>
                <CardContent className="pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentCards = section?.metadata?.cards || [];
                      const newCard: Card = {
                        id: `card-${Date.now()}`,
                        title: 'New Card',
                        subtitle: '',
                        content: '<ul><li>Add your content here</li></ul>',
                        icon_url: '',
                        button_text: 'Learn More',
                        button_url: '',
                        button_enabled: false,
                      };
                      setSection(prev => ({
                        ...prev!,
                        metadata: {
                          ...prev?.metadata,
                          cards: [...currentCards, newCard],
                        },
                      }));
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Card
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {cards.map((card, index) => (
                <Card key={card.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Card {index + 1}</CardTitle>
                      {section.section_type === 'critical_gap' && cards.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updatedCards = cards.filter(c => c.id !== card.id);
                            setSection(prev => ({
                              ...prev!,
                              metadata: {
                                ...prev?.metadata,
                                cards: updatedCards,
                              },
                            }));
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Card
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      {/* Icon Preview */}
                      <div className="flex-shrink-0">
                        <Label className="text-sm mb-2 block">Icon</Label>
                        <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                          {card.icon_url ? (
                            <img src={card.icon_url} alt={card.title} className="w-16 h-16 object-contain" />
                          ) : (
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCardIconUpload(file, card.id);
                          }}
                          className="mt-2 text-xs"
                          disabled={uploading}
                        />
                      </div>

                      {/* Card Details */}
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`card-title-${card.id}`}>Title</Label>
                          <Input
                            id={`card-title-${card.id}`}
                            value={card.title}
                            onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                            placeholder="Card title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`card-subtitle-${card.id}`}>Subtitle</Label>
                          <Textarea
                            id={`card-subtitle-${card.id}`}
                            value={card.subtitle}
                            onChange={(e) => updateCard(card.id, 'subtitle', e.target.value)}
                            placeholder="Card subtitle"
                            rows={2}
                          />
                        </div>

                        {/* Content editor for critical_gap sections */}
                        {section.section_type === 'critical_gap' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor={`card-content-${card.id}`}>Content</Label>
                              <ReactQuill
                                theme="snow"
                                value={card.content || ''}
                                onChange={(value) => updateCard(card.id, 'content', value)}
                                modules={{
                                  toolbar: [
                                    ['bold', 'italic', 'underline'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link'],
                                    ['clean'],
                                  ],
                                }}
                              />
                            </div>

                            {/* Button Configuration */}
                            <div className="space-y-4 border-t pt-4">
                              <div className="flex items-center justify-between">
                                <Label htmlFor={`card-button-enabled-${card.id}`}>Enable Button</Label>
                                <Switch
                                  id={`card-button-enabled-${card.id}`}
                                  checked={card.button_enabled || false}
                                  onCheckedChange={(checked) => updateCard(card.id, 'button_enabled', checked as any)}
                                />
                              </div>

                              {card.button_enabled && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`card-button-text-${card.id}`}>Button Text</Label>
                                    <Input
                                      id={`card-button-text-${card.id}`}
                                      value={card.button_text || ''}
                                      onChange={(e) => updateCard(card.id, 'button_text', e.target.value)}
                                      placeholder="Learn More"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`card-button-url-${card.id}`}>Button URL</Label>
                                    <Input
                                      id={`card-button-url-${card.id}`}
                                      value={card.button_url || ''}
                                      onChange={(e) => updateCard(card.id, 'button_url', e.target.value)}
                                      placeholder="/page-url or https://example.com"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SectionEditor;
