import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AlertTriangle, Shield, Wrench, Loader2 } from 'lucide-react';

interface CardData {
  title: string;
  subtitle: string;
  content: string;
  icon_url: string;
  button_text: string;
  button_url: string;
  button_enabled: boolean;
  audio_url?: string;
  audio_duration?: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  podcast_text?: string;
  podcast_url?: string;
  metadata: {
    cards: CardData[];
  };
}

const iconOptions = [
  { value: 'AlertTriangle', label: 'Alert Triangle', icon: AlertTriangle },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Wrench', label: 'Wrench', icon: Wrench },
];

const CriticalGapSectionManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [section, setSection] = useState<SectionData>({
    title: '',
    subtitle: '',
    podcast_text: '',
    podcast_url: '',
    metadata: {
      cards: [],
    },
  });

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'critical_gap')
        .single();

      if (error) throw error;

      if (data?.content) {
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
    try {
      setSaving(true);
      const { error } = await supabase
        .from('section_content')
        .update({ content: section as any })
        .eq('section_key', 'critical_gap');

      if (error) throw error;

      toast.success('Section updated successfully');
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  const updateCard = (index: number, field: keyof CardData, value: string | boolean) => {
    setSection((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        cards: prev.metadata.cards.map((card, i) =>
          i === index ? { ...card, [field]: value } : card
        ),
      },
    }));
  };

  const handleAudioUpload = async (index: number, file: File) => {
    try {
      setUploading(index);
      const fileExt = file.name.split('.').pop();
      const fileName = `critical-gap-${index}-${Date.now()}.${fileExt}`;
      const filePath = `audio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      updateCard(index, 'audio_url', publicUrl);
      toast.success('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Critical Gap Section Manager</h1>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={section.title}
                onChange={(e) => setSection({ ...section, title: e.target.value })}
                placeholder="The Critical Gap in Senior Safety"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                placeholder="Current fall detection solutions fail..."
                rows={2}
              />
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Podcast Line (Optional)</h3>
              <div>
                <Label htmlFor="podcast-text">Podcast Text</Label>
                <Input
                  id="podcast-text"
                  value={section.podcast_text || ''}
                  onChange={(e) => setSection({ ...section, podcast_text: e.target.value })}
                  placeholder="e.g., Listen to our podcast about The Critical Gap in Senior Safety"
                />
              </div>
              <div>
                <Label htmlFor="podcast-url">Podcast URL</Label>
                <Input
                  id="podcast-url"
                  value={section.podcast_url || ''}
                  onChange={(e) => setSection({ ...section, podcast_url: e.target.value })}
                  placeholder="e.g., https://podcast-channel-url.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {section.metadata.cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {iconOptions.find((opt) => opt.value === card.icon_url)?.icon && (
                  <>
                    {(() => {
                      const IconComponent = iconOptions.find(
                        (opt) => opt.value === card.icon_url
                      )?.icon;
                      return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
                    })()}
                  </>
                )}
                Card {index + 1}: {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`card-${index}-title`}>Card Title</Label>
                <Input
                  id={`card-${index}-title`}
                  value={card.title}
                  onChange={(e) => updateCard(index, 'title', e.target.value)}
                  placeholder="Clinical Crisis"
                />
              </div>

              <div>
                <Label htmlFor={`card-${index}-icon`}>Icon</Label>
                <select
                  id={`card-${index}-icon`}
                  value={card.icon_url}
                  onChange={(e) => updateCard(index, 'icon_url', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor={`card-${index}-content`}>Content (Bullet Points)</Label>
                <ReactQuill
                  theme="snow"
                  value={card.content}
                  onChange={(value) => updateCard(index, 'content', value)}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link'],
                      ['clean'],
                    ],
                  }}
                  className="bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`card-${index}-button-text`}>Button Text</Label>
                  <Input
                    id={`card-${index}-button-text`}
                    value={card.button_text}
                    onChange={(e) => updateCard(index, 'button_text', e.target.value)}
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <Label htmlFor={`card-${index}-button-url`}>Button URL</Label>
                  <Input
                    id={`card-${index}-button-url`}
                    value={card.button_url}
                    onChange={(e) => updateCard(index, 'button_url', e.target.value)}
                    placeholder="#"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`card-${index}-button-enabled`}
                  checked={card.button_enabled}
                  onChange={(e) => updateCard(index, 'button_enabled', e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor={`card-${index}-button-enabled`}>Show Button</Label>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-semibold">Audio for Listen Button</h4>
                
                <div>
                  <Label htmlFor={`card-${index}-audio`}>Upload Audio File</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id={`card-${index}-audio`}
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAudioUpload(index, file);
                      }}
                      disabled={uploading === index}
                    />
                    {uploading === index && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                  </div>
                  {card.audio_url && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Current: {card.audio_url.split('/').pop()}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`card-${index}-audio-duration`}>Audio Duration</Label>
                  <Input
                    id={`card-${index}-audio-duration`}
                    value={card.audio_duration || ''}
                    onChange={(e) => updateCard(index, 'audio_duration', e.target.value)}
                    placeholder="3 min"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CriticalGapSectionManager;
