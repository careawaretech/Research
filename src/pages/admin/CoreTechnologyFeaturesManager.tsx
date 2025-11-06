import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Plus, Trash2, ChevronDown } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconPicker } from '@/components/admin/IconPicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MetricBox {
  value: string;
  label: string;
}

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  icon_type?: 'fontawesome' | 'lucide' | 'upload';
  icon_url?: string;
  lucide_icon_name?: string;
  gradientFrom: string;
  gradientTo: string;
  background_color?: string;
  text_color?: string;
  border_color?: string;
  bulletPoints: string; // HTML content from rich text editor
  metrics?: MetricBox[];
  button_text?: string;
  button_url?: string;
  audio_url?: string;
  audio_duration?: string;
  enable_learn_more?: boolean;
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
  cards: CardData[];
}

const defaultCard: CardData = {
  title: '',
  subtitle: '',
  description: '',
  icon: 'fas fa-shield-halved',
  icon_type: 'fontawesome',
  gradientFrom: 'from-purple-600',
  gradientTo: 'to-blue-700',
  background_color: '#8b5cf6',
  text_color: '#ffffff',
  border_color: '#a855f7',
  bulletPoints: '<ul><li>Bullet point 1</li><li>Bullet point 2</li><li>Bullet point 3</li></ul>',
  metrics: [],
  button_text: 'Learn More',
  button_url: '',
  audio_url: '',
  audio_duration: '',
  enable_learn_more: true,
};

const quillModules = {
  toolbar: [
    ['bold', 'italic'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  ]
};

const CoreTechnologyFeaturesManager = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<SectionData>({
    title: 'Core Technology Features',
    subtitle: '',
    listen_button: { text: 'Listen More', url: '', enabled: false },
    read_button: { text: 'Read More', url: '', enabled: false },
    watch_button: { text: 'Watch More', url: '', enabled: false },
    cards: Array(5).fill(null).map(() => ({ ...defaultCard })),
  });
  const [uploadingAudio, setUploadingAudio] = useState<number | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState<number | null>(null);
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'core_technology_features')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const content = data.content as unknown as SectionData;
        // Convert old bullet point format to HTML string
        if (content.cards) {
          content.cards = content.cards.map(card => {
            if (Array.isArray(card.bulletPoints)) {
              // Convert array format to HTML
              const bulletText = (card.bulletPoints as any[])
                .filter((p: any) => p.text)
                .map((p: any) => `<li>${p.text}</li>`)
                .join('');
              return {
                ...card,
                bulletPoints: bulletText ? `<ul>${bulletText}</ul>` : '<ul><li>Bullet point 1</li></ul>',
                subtitle: card.subtitle || ''
              };
            }
            return {
              ...card,
              subtitle: card.subtitle || ''
            };
          });
        }
        setSection(content);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      toast.error('Failed to load section data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('section_content')
        .upsert({
          section_key: 'core_technology_features',
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
      const filePath = `core-technology/${fileName}`;

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

  const handleAudioUpload = async (cardIndex: number, file: File) => {
    setUploadingAudio(cardIndex);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `core-technology/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      const updatedCards = [...section.cards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        audio_url: publicUrl,
      };

      setSection({ ...section, cards: updatedCards });
      toast.success('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio');
    } finally {
      setUploadingAudio(null);
    }
  };

  const handleIconUpload = async (cardIndex: number, file: File) => {
    setUploadingIcon(cardIndex);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `icon-${Date.now()}.${fileExt}`;
      const filePath = `core-technology/icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      const updatedCards = [...section.cards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        icon_url: publicUrl,
        icon_type: 'upload',
      };

      setSection({ ...section, cards: updatedCards });
      toast.success('Icon uploaded successfully');
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast.error('Failed to upload icon');
    } finally {
      setUploadingIcon(null);
    }
  };

  const updateCard = (cardIndex: number, field: string, value: any) => {
    const updatedCards = [...section.cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      [field]: value,
    };
    setSection({ ...section, cards: updatedCards });
  };


  const addMetric = (cardIndex: number) => {
    const updatedCards = [...section.cards];
    if (!updatedCards[cardIndex].metrics) {
      updatedCards[cardIndex].metrics = [];
    }
    updatedCards[cardIndex].metrics!.push({ value: '', label: '' });
    setSection({ ...section, cards: updatedCards });
  };

  const removeMetric = (cardIndex: number, metricIndex: number) => {
    const updatedCards = [...section.cards];
    updatedCards[cardIndex].metrics!.splice(metricIndex, 1);
    setSection({ ...section, cards: updatedCards });
  };

  const updateMetric = (cardIndex: number, metricIndex: number, field: 'value' | 'label', value: string) => {
    const updatedCards = [...section.cards];
    if (!updatedCards[cardIndex].metrics) {
      updatedCards[cardIndex].metrics = [];
    }
    updatedCards[cardIndex].metrics![metricIndex][field] = value;
    setSection({ ...section, cards: updatedCards });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/content')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Core Technology Features</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Core Technology Features Section Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
              <Label className="text-sm font-semibold text-muted-foreground">Section Tag (Unique Identifier)</Label>
              <p className="text-lg font-mono font-bold text-primary mt-1">core-technology-features</p>
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
                placeholder="Core Technology Features"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                placeholder="Advanced capabilities designed for healthcare..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Configuration */}
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
                    value={section.listen_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.listen_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          listen_button: { ...section.listen_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="audio/*,video/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('listen', file);
                        }}
                        disabled={uploadingButton === 'listen'}
                      />
                      {uploadingButton === 'listen' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
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
                    value={section.read_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.read_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          read_button: { ...section.read_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="audio/*,video/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('read', file);
                        }}
                        disabled={uploadingButton === 'read'}
                      />
                      {uploadingButton === 'read' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
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
                    value={section.watch_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.watch_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          watch_button: { ...section.watch_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="audio/*,video/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('watch', file);
                        }}
                        disabled={uploadingButton === 'watch'}
                      />
                      {uploadingButton === 'watch' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {section.cards.map((card, cardIndex) => (
          <Collapsible key={cardIndex}>
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardTitle className="flex items-center justify-between">
                    <span>Card {cardIndex + 1}{card.title ? `: ${card.title}` : ''}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6 pt-6">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => updateCard(cardIndex, 'title', e.target.value)}
                      placeholder="Feature Title"
                    />
                  </div>

                  <div>
                    <Label>Subtitle</Label>
                    <Input
                      value={card.subtitle}
                      onChange={(e) => updateCard(cardIndex, 'subtitle', e.target.value)}
                      placeholder="Brief subtitle"
                    />
                  </div>

              <div>
                <Label>Icon</Label>
                <IconPicker
                  value={{
                    iconType: card.icon_type === 'fontawesome' ? 'upload' : (card.icon_type || 'upload'),
                    iconUrl: card.icon_url,
                    lucideIconName: card.lucide_icon_name,
                  }}
                  onChange={(value) => {
                    const newCards = [...section.cards];
                    newCards[cardIndex] = {
                      ...card,
                      icon_type: value.iconType === 'upload' && !value.iconUrl ? 'fontawesome' : value.iconType,
                      icon_url: value.iconUrl,
                      lucide_icon_name: value.lucideIconName,
                    };
                    setSection({ ...section, cards: newCards });
                  }}
                />
                {card.icon_type === 'fontawesome' && (
                  <div className="mt-2">
                    <Label className="text-xs">Font Awesome Class (Legacy)</Label>
                    <Input
                      value={card.icon}
                      onChange={(e) => updateCard(cardIndex, 'icon', e.target.value)}
                      placeholder="fas fa-shield-halved"
                      className="text-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={card.description}
                  onChange={(e) => updateCard(cardIndex, 'description', e.target.value)}
                  placeholder="Feature description..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Card Styling</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Background Color</Label>
                    <Input
                      type="color"
                      value={card.background_color?.startsWith('#') ? card.background_color : '#8b5cf6'}
                      onChange={(e) => updateCard(cardIndex, 'background_color', e.target.value)}
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Card background
                    </p>
                  </div>
                  <div>
                    <Label>Text Color</Label>
                    <Input
                      type="color"
                      value={card.text_color?.startsWith('#') ? card.text_color : '#ffffff'}
                      onChange={(e) => updateCard(cardIndex, 'text_color', e.target.value)}
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Text color
                    </p>
                  </div>
                  <div>
                    <Label>Border Color</Label>
                    <Input
                      type="color"
                      value={card.border_color?.startsWith('#') ? card.border_color : '#a855f7'}
                      onChange={(e) => updateCard(cardIndex, 'border_color', e.target.value)}
                      className="h-10"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Border color
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <Label className="text-xs">Gradient From (Legacy - optional)</Label>
                    <Input
                      value={card.gradientFrom}
                      onChange={(e) => updateCard(cardIndex, 'gradientFrom', e.target.value)}
                      placeholder="from-purple-600"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Gradient To (Legacy - optional)</Label>
                    <Input
                      value={card.gradientTo}
                      onChange={(e) => updateCard(cardIndex, 'gradientTo', e.target.value)}
                      placeholder="to-blue-700"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

                  <div>
                    <Label>Bullet Points (Rich Text Editor)</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Use the toolbar to format text with bold, italic, and lists. HTML will be rendered on the frontend.
                    </p>
                    <ReactQuill
                      theme="snow"
                      value={card.bulletPoints}
                      onChange={(value) => updateCard(cardIndex, 'bulletPoints', value)}
                      modules={quillModules}
                      placeholder="Add bullet points here..."
                      className="bg-background"
                    />
                  </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`enable-learn-more-${cardIndex}`}
                    checked={card.enable_learn_more}
                    onCheckedChange={(checked) => updateCard(cardIndex, 'enable_learn_more', checked)}
                  />
                  <Label htmlFor={`enable-learn-more-${cardIndex}`}>
                    Enable Learn More Button
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground -mt-2">
                  Button will show when enabled and button text is provided. Clicking requires a URL.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Button Text (Required to show button)</Label>
                    <Input
                      value={card.button_text}
                      onChange={(e) => updateCard(cardIndex, 'button_text', e.target.value)}
                      placeholder="Learn More"
                    />
                  </div>
                  <div>
                    <Label>Button URL (Optional - button disabled if empty)</Label>
                    <Input
                      value={card.button_url}
                      onChange={(e) => updateCard(cardIndex, 'button_url', e.target.value)}
                      placeholder="/privacy"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Metric Boxes (for bottom cards like "15min", "24/7")</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => addMetric(cardIndex)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Metric
                  </Button>
                </div>
                {card.metrics && card.metrics.length > 0 && (
                  <div className="space-y-2">
                    {card.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="grid grid-cols-2 gap-2 p-3 border rounded-lg">
                        <Input
                          value={metric.value}
                          onChange={(e) => updateMetric(cardIndex, metricIndex, 'value', e.target.value)}
                          placeholder="15min"
                        />
                        <Input
                          value={metric.label}
                          onChange={(e) => updateMetric(cardIndex, metricIndex, 'label', e.target.value)}
                          placeholder="Installation Time"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMetric(cardIndex, metricIndex)}
                          className="col-span-2"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Audio Duration (e.g., "2:30")</Label>
                  <Input
                    value={card.audio_duration}
                    onChange={(e) => updateCard(cardIndex, 'audio_duration', e.target.value)}
                    placeholder="2:30"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Duration shows the time. Upload audio file for playback functionality.
                  </p>
                </div>
                <div>
                  <Label>Audio File</Label>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload(cardIndex, file);
                    }}
                    disabled={uploadingAudio === cardIndex}
                  />
                  {uploadingAudio === cardIndex && (
                    <p className="text-sm text-muted-foreground mt-1">Uploading audio...</p>
                  )}
                  {card.audio_url && (
                    <p className="text-sm text-green-600 font-medium mt-1">Audio uploaded - remember to Save!</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Listen button shows when audio exists. Upload required for playback.
                  </p>
                </div>
              </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </AdminLayout>
  );
};

export default CoreTechnologyFeaturesManager;
