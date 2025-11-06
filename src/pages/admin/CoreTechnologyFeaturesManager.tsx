import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface BulletPoint {
  text: string;
}

interface CardData {
  title: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  bulletPoints: BulletPoint[];
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
  description: '',
  icon: 'fas fa-shield-halved',
  gradientFrom: 'from-purple-600',
  gradientTo: 'to-blue-700',
  bulletPoints: [{ text: '' }, { text: '' }, { text: '' }],
  button_text: 'Learn More',
  button_url: '',
  audio_url: '',
  audio_duration: '',
  enable_learn_more: true,
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

  const updateCard = (cardIndex: number, field: string, value: any) => {
    const updatedCards = [...section.cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      [field]: value,
    };
    setSection({ ...section, cards: updatedCards });
  };

  const updateBulletPoint = (cardIndex: number, pointIndex: number, value: string) => {
    const updatedCards = [...section.cards];
    updatedCards[cardIndex].bulletPoints[pointIndex] = { text: value };
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
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          <Card key={cardIndex}>
            <CardHeader>
              <CardTitle>Card {cardIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={card.title}
                    onChange={(e) => updateCard(cardIndex, 'title', e.target.value)}
                    placeholder="Feature Title"
                  />
                </div>
                <div>
                  <Label>Icon (Font Awesome class)</Label>
                  <Input
                    value={card.icon}
                    onChange={(e) => updateCard(cardIndex, 'icon', e.target.value)}
                    placeholder="fas fa-shield-halved"
                  />
                </div>
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
                <Label>Bullet Points</Label>
                {card.bulletPoints.map((point, pointIndex) => (
                  <Input
                    key={pointIndex}
                    value={point.text}
                    onChange={(e) => updateBulletPoint(cardIndex, pointIndex, e.target.value)}
                    placeholder={`Bullet point ${pointIndex + 1}`}
                    className="mb-2"
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={card.button_text}
                    onChange={(e) => updateCard(cardIndex, 'button_text', e.target.value)}
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <Label>Button URL</Label>
                  <Input
                    value={card.button_url}
                    onChange={(e) => updateCard(cardIndex, 'button_url', e.target.value)}
                    placeholder="/privacy"
                  />
                </div>
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Audio Duration (e.g., "2:30")</Label>
                  <Input
                    value={card.audio_duration}
                    onChange={(e) => updateCard(cardIndex, 'audio_duration', e.target.value)}
                    placeholder="2:30"
                  />
                </div>
                <div>
                  <Label>Audio File</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAudioUpload(cardIndex, file);
                      }}
                      disabled={uploadingAudio === cardIndex}
                    />
                    {uploadingAudio === cardIndex && <p className="text-sm">Uploading...</p>}
                  </div>
                  {card.audio_url && (
                    <p className="text-sm text-muted-foreground mt-1">Audio uploaded</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default CoreTechnologyFeaturesManager;
