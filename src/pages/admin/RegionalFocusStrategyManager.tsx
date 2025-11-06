import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import AdminLayout from '@/components/admin/AdminLayout';

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface FocusDetail {
  label: string;
  value: string;
}

interface RegionFocus {
  title: string;
  details: FocusDetail[];
  bgColor: string;
}

interface RegionData {
  name: string;
  title: string;
  stats: StatItem[];
  focus: RegionFocus;
}

interface CardData {
  id: string;
  title: string;
  regions?: RegionData[];
  items?: string[];
  revenueItems?: { label: string; value: string; color: string }[];
  audio_url?: string;
  audio_duration?: string;
  button_url?: string;
  button_text?: string;
  enable_learn_more?: boolean;
}

interface SectionData {
  title: string;
  cards: CardData[];
}

const RegionalFocusStrategyManager = () => {
  const [section, setSection] = useState<SectionData>({
    title: 'Regional Focus Strategy',
    cards: [
      {
        id: 'market_entry',
        title: 'Market Entry',
        regions: [
          {
            name: 'Oregon',
            title: 'Oregon Pilot Market',
            stats: [
              { value: '650K', label: 'Thousand Seniors (65+)', color: 'bg-blue-50' },
              { value: '400', label: 'Assisted Living Facilities', color: 'bg-green-50' }
            ],
            focus: {
              title: 'Portland Metro Focus',
              details: [
                { label: '158K Seniors', value: '60+' },
                { label: '150 AL Facilities', value: '' }
              ],
              bgColor: 'bg-orange-50'
            }
          },
          {
            name: 'US',
            title: 'US National Expansion',
            stats: [
              { value: '54M', label: 'Million Seniors (65+)', color: 'bg-blue-50' },
              { value: '30K', label: 'AL Facilities', color: 'bg-green-50' }
            ],
            focus: {
              title: 'Key Growth States',
              details: [
                { label: 'California', value: '5.8M seniors' },
                { label: 'Florida', value: '4.2M seniors' },
                { label: 'Texas', value: '3.2M seniors' }
              ],
              bgColor: 'bg-purple-50'
            }
          }
        ],
        audio_url: '',
        audio_duration: '3 min',
        button_url: '',
        button_text: 'Learn More',
        enable_learn_more: true
      },
      {
        id: 'first_mover',
        title: 'First-Mover Advantage',
        items: [
          'Only privacy-first bathroom monitoring solution',
          'Dual technology approach (radar + WiFi)',
          'Academic research foundation',
          'NIH/NSF institutional backing'
        ],
        audio_url: '',
        audio_duration: '3 min',
        button_url: '',
        button_text: 'Learn More',
        enable_learn_more: true
      },
      {
        id: 'revenue_model',
        title: 'Revenue Model',
        revenueItems: [
          { label: 'Hardware (Radar)', value: '$2,500-4,000/unit', color: 'text-blue-600' },
          { label: 'Software (WiFi)', value: '$50-100/room/month', color: 'text-green-600' },
          { label: 'Support & Analytics', value: '$25-50/room/month', color: 'text-purple-600' }
        ],
        audio_url: '',
        audio_duration: '3 min',
        button_url: '',
        button_text: 'Learn More',
        enable_learn_more: true
      }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'regional_focus_strategy')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data?.content) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('section_content')
        .upsert({
          section_key: 'regional_focus_strategy',
          content: section as any,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Regional Focus Strategy section updated successfully'
      });
    } catch (error) {
      console.error('Error saving section:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, cardId: string) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${cardId}-${Date.now()}.${fileExt}`;
      const filePath = `regional-focus/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      const updatedCards = section.cards.map(card =>
        card.id === cardId ? { ...card, audio_url: publicUrl } : card
      );

      setSection({ ...section, cards: updatedCards });

      toast({
        title: 'Success',
        description: 'Audio file uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Regional Focus Strategy Manager</h1>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="section-title">Section Title</Label>
              <Input
                id="section-title"
                value={section.title}
                onChange={(e) => setSection({ ...section, title: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {section.cards.map((card, cardIdx) => (
          <Card key={card.id} className="p-6">
            <h3 className="text-xl font-bold mb-4">{card.title}</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Card Title</Label>
                <Input
                  value={card.title}
                  onChange={(e) => {
                    const updatedCards = [...section.cards];
                    updatedCards[cardIdx].title = e.target.value;
                    setSection({ ...section, cards: updatedCards });
                  }}
                />
              </div>

              {card.items && (
                <div>
                  <Label>List Items</Label>
                  {card.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => {
                          const updatedCards = [...section.cards];
                          updatedCards[cardIdx].items![itemIdx] = e.target.value;
                          setSection({ ...section, cards: updatedCards });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const updatedCards = [...section.cards];
                          updatedCards[cardIdx].items!.splice(itemIdx, 1);
                          setSection({ ...section, cards: updatedCards });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updatedCards = [...section.cards];
                      updatedCards[cardIdx].items!.push('New item');
                      setSection({ ...section, cards: updatedCards });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              )}

              {/* Enable Learn More Button */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`enable-learn-more-${card.id}`}
                  checked={card.enable_learn_more ?? true}
                  onCheckedChange={(checked) => {
                    const updatedCards = [...section.cards];
                    updatedCards[cardIdx].enable_learn_more = checked as boolean;
                    setSection({ ...section, cards: updatedCards });
                  }}
                />
                <Label htmlFor={`enable-learn-more-${card.id}`}>
                  Enable Learn More Button
                </Label>
              </div>

              {/* Button Text */}
              <div>
                <Label htmlFor={`button-text-${card.id}`}>Button Text</Label>
                <Input
                  id={`button-text-${card.id}`}
                  value={card.button_text || 'Learn More'}
                  onChange={(e) => {
                    const updatedCards = [...section.cards];
                    updatedCards[cardIdx].button_text = e.target.value;
                    setSection({ ...section, cards: updatedCards });
                  }}
                  placeholder="Learn More"
                />
              </div>

              {/* Button URL */}
              <div>
                <Label htmlFor={`url-${card.id}`}>Button URL</Label>
                <Input
                  id={`url-${card.id}`}
                  value={card.button_url || ''}
                  onChange={(e) => {
                    const updatedCards = [...section.cards];
                    updatedCards[cardIdx].button_url = e.target.value;
                    setSection({ ...section, cards: updatedCards });
                  }}
                  placeholder="https://..."
                />
              </div>

              {/* Audio File */}
              <div>
                <Label htmlFor={`audio-${card.id}`}>Audio File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id={`audio-${card.id}`}
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, card.id);
                    }}
                    disabled={uploading}
                    className="flex-1"
                  />
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
                {card.audio_url && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Current: {card.audio_url.split('/').pop()}
                  </p>
                )}
              </div>

              {/* Audio Duration */}
              <div>
                <Label htmlFor={`audio-duration-${card.id}`}>Audio Duration (e.g., "3 min")</Label>
                <Input
                  id={`audio-duration-${card.id}`}
                  value={card.audio_duration || ''}
                  onChange={(e) => {
                    const updatedCards = [...section.cards];
                    updatedCards[cardIdx].audio_duration = e.target.value;
                    setSection({ ...section, cards: updatedCards });
                  }}
                  placeholder="3 min"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default RegionalFocusStrategyManager;
