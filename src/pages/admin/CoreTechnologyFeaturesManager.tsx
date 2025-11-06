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
    cards: Array(5).fill(null).map(() => ({ ...defaultCard })),
  });
  const [uploadingAudio, setUploadingAudio] = useState<number | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState<number | null>(null);

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
        setSection(data.content as unknown as SectionData);
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
                <Tabs 
                  value={card.icon_type || 'fontawesome'} 
                  onValueChange={(v) => updateCard(cardIndex, 'icon_type', v)}
                >
                  <TabsList className="grid w-full grid-cols-3 mb-2">
                    <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                    <TabsTrigger value="lucide">Lucide Icons</TabsTrigger>
                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  </TabsList>
                  <TabsContent value="fontawesome">
                    <Input
                      value={card.icon}
                      onChange={(e) => updateCard(cardIndex, 'icon', e.target.value)}
                      placeholder="fas fa-shield-halved"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Enter Font Awesome class</p>
                  </TabsContent>
                  <TabsContent value="lucide">
                    <Input
                      value={card.lucide_icon_name || ''}
                      onChange={(e) => {
                        updateCard(cardIndex, 'lucide_icon_name', e.target.value);
                      }}
                      placeholder="Shield"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter Lucide icon name (e.g., Shield, Brain, Lock, Users, Zap)
                    </p>
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleIconUpload(cardIndex, file);
                        }}
                        disabled={uploadingIcon === cardIndex}
                      />
                      {uploadingIcon === cardIndex && <p className="text-sm text-muted-foreground">Uploading...</p>}
                      {card.icon_url && card.icon_type === 'upload' && (
                        <div className="mt-2 flex items-center gap-2">
                          <img src={card.icon_url} alt="Icon preview" className="w-16 h-16 object-contain bg-gray-100 rounded p-2" />
                          <p className="text-xs text-green-600 font-medium">Icon uploaded - remember to Save!</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Gradient From</Label>
                  <Input
                    value={card.gradientFrom}
                    onChange={(e) => updateCard(cardIndex, 'gradientFrom', e.target.value)}
                    placeholder="from-purple-600"
                  />
                </div>
                <div>
                  <Label>Gradient To</Label>
                  <Input
                    value={card.gradientTo}
                    onChange={(e) => updateCard(cardIndex, 'gradientTo', e.target.value)}
                    placeholder="to-blue-700"
                  />
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
