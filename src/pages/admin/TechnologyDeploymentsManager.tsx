import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash2, Save, MoveUp, MoveDown, Eye, EyeOff, GripVertical } from 'lucide-react';
import { FileUploader } from '@/components/admin/FileUploader';
import { IconPicker } from '@/components/admin/IconPicker';

interface Feature {
  title: string;
  description: string;
}

interface Section {
  id: string;
  badge_text: string;
  badge_color: string;
  badge_bg_color: string;
  title: string;
  description: string;
  image_url?: string;
  image_position: 'left' | 'right';
  features: Feature[];
  display_order: number;
  visible: boolean;
}

interface SliderItem {
  type: 'image' | 'video';
  url: string;
}

interface CardButton {
  text: string;
  action: 'navigate' | 'audio' | 'external';
  url?: string;
  audioUrl?: string;
}

interface HeroCard {
  icon: string;
  title: string;
  subtitle: string;
  button?: CardButton;
}

interface HeroContent {
  title: string;
  subtitle: string;
  listen_button?: { text: string; url: string; enabled: boolean };
  read_button?: { text: string; url: string; enabled: boolean };
  watch_button?: { text: string; url: string; enabled: boolean };
  metadata: {
    secondary_title?: string;
    rotating_titles?: string[];
    slider: SliderItem[];
    cards: HeroCard[];
  };
}

const TechnologyDeploymentsManager = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    listen_button: { text: 'Listen', url: '', enabled: false },
    read_button: { text: 'Read', url: '', enabled: false },
    watch_button: { text: 'Watch', url: '', enabled: false },
    metadata: {
      secondary_title: '',
      rotating_titles: [],
      slider: [],
      cards: []
    }
  });
  const [pageId, setPageId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [comparison, setComparison] = useState<any>(null);
  const [cta, setCta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch page ID for technology-deployments
      const { data: pageData } = await supabase
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'technology-deployments')
        .maybeSingle();

      if (pageData) {
        setPageId(pageData.id);

        // Fetch hero section from page_sections
        const { data: heroSectionData } = await supabase
          .from('page_sections')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('section_type', 'hero')
          .maybeSingle();

        if (heroSectionData) {
          setSectionId(heroSectionData.id);
          const content = heroSectionData.content as any;
          setHeroContent({
            title: content.title || '',
            subtitle: content.subtitle || '',
            listen_button: content.listen_button || { text: 'Listen', url: '', enabled: false },
            read_button: content.read_button || { text: 'Read', url: '', enabled: false },
            watch_button: content.watch_button || { text: 'Watch', url: '', enabled: false },
            metadata: {
              secondary_title: content.metadata?.secondary_title || '',
              rotating_titles: content.metadata?.rotating_titles || [],
              slider: content.metadata?.slider || [],
              cards: content.metadata?.cards || []
            }
          });
        }
      }

      // Fetch other sections
      const [sectionsRes, comparisonRes, ctaRes] = await Promise.all([
        supabase.from('technology_deployments_sections').select('*').order('display_order'),
        supabase.from('technology_deployments_comparison').select('*').single(),
        supabase.from('technology_deployments_cta').select('*').single()
      ]);

      if (sectionsRes.data) setSections(sectionsRes.data as any);
      if (comparisonRes.data) setComparison(comparisonRes.data as any);
      if (ctaRes.data) setCta(ctaRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const saveHero = async () => {
    if (!pageId) {
      toast.error('Page ID not found');
      return;
    }

    try {
      if (sectionId) {
        // Update existing section
        const { error } = await supabase
          .from('page_sections')
          .update({ content: heroContent as any })
          .eq('id', sectionId);

        if (error) throw error;
      } else {
        // Insert new section
        const { error } = await supabase
          .from('page_sections')
          .insert({
            page_id: pageId,
            section_type: 'hero',
            content: heroContent as any,
            display_order: 0
          } as any);

        if (error) throw error;
      }

      toast.success('Hero section saved');
      fetchData();
    } catch (error) {
      console.error('Error saving hero:', error);
      toast.error('Failed to save hero section');
    }
  };

  const addSliderItem = () => {
    setHeroContent({
      ...heroContent,
      metadata: {
        ...heroContent.metadata,
        slider: [...heroContent.metadata.slider, { type: 'image', url: '' }]
      }
    });
  };

  const removeSliderItem = (index: number) => {
    setHeroContent({
      ...heroContent,
      metadata: {
        ...heroContent.metadata,
        slider: heroContent.metadata.slider.filter((_, i) => i !== index)
      }
    });
  };

  const updateSliderItem = (index: number, field: keyof SliderItem, value: string) => {
    const newSlider = [...heroContent.metadata.slider];
    newSlider[index] = { ...newSlider[index], [field]: value };
    setHeroContent({ 
      ...heroContent, 
      metadata: {
        ...heroContent.metadata,
        slider: newSlider
      }
    });
  };

  const addCard = () => {
    setHeroContent({
      ...heroContent,
      metadata: {
        ...heroContent.metadata,
        cards: [
          ...heroContent.metadata.cards,
          {
            icon: 'Activity',
            title: '',
            subtitle: '',
            button: { text: '', action: 'navigate', url: '' }
          }
        ]
      }
    });
  };

  const removeCard = (index: number) => {
    setHeroContent({
      ...heroContent,
      metadata: {
        ...heroContent.metadata,
        cards: heroContent.metadata.cards.filter((_, i) => i !== index)
      }
    });
  };

  const updateCard = (index: number, field: keyof HeroCard, value: any) => {
    const newCards = [...heroContent.metadata.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setHeroContent({ 
      ...heroContent, 
      metadata: {
        ...heroContent.metadata,
        cards: newCards
      }
    });
  };

  const saveSection = async (section: Section) => {
    try {
      const { error } = await supabase
        .from('technology_deployments_sections')
        .update(section as any)
        .eq('id', section.id);

      if (error) throw error;
      toast.success('Section saved');
      fetchData();
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const addSection = async () => {
    try {
      const maxOrder = Math.max(...sections.map(s => s.display_order), 0);
      const { error } = await supabase
        .from('technology_deployments_sections')
        .insert({
          badge_text: 'New Section',
          title: 'New Section Title',
          description: 'Section description',
          image_position: 'right',
          features: [],
          display_order: maxOrder + 1
        });

      if (error) throw error;
      toast.success('Section added');
      fetchData();
    } catch (error) {
      console.error('Error adding section:', error);
      toast.error('Failed to add section');
    }
  };

  const deleteSection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('technology_deployments_sections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Section deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error('Failed to delete section');
    }
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

    newSections.forEach((section, idx) => {
      section.display_order = idx;
    });

    setSections(newSections);

    try {
      await Promise.all(
        newSections.map(section =>
          supabase
            .from('technology_deployments_sections')
            .update({ display_order: section.display_order })
            .eq('id', section.id)
        )
      );
      toast.success('Order updated');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
      fetchData();
    }
  };

  const toggleVisibility = async (section: Section) => {
    try {
      const { error } = await supabase
        .from('technology_deployments_sections')
        .update({ visible: !section.visible })
        .eq('id', section.id);

      if (error) throw error;
      toast.success('Visibility updated');
      fetchData();
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const saveComparison = async () => {
    try {
      const { error } = await supabase
        .from('technology_deployments_comparison')
        .update(comparison)
        .eq('id', comparison.id);

      if (error) throw error;
      toast.success('Comparison section saved');
    } catch (error) {
      console.error('Error saving comparison:', error);
      toast.error('Failed to save comparison');
    }
  };

  const saveCTA = async () => {
    try {
      const { error } = await supabase
        .from('technology_deployments_cta')
        .update(cta)
        .eq('id', cta.id);

      if (error) throw error;
      toast.success('CTA section saved');
    } catch (error) {
      console.error('Error saving CTA:', error);
      toast.error('Failed to save CTA');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Technology Deployments Page</h1>
          <p className="text-muted-foreground">Manage the technology deployments page content</p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="sections">Deployment Sections</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section Titles</CardTitle>
                  <CardDescription>Main title and subtitle for the hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Hero Title</Label>
                    <Input
                      value={heroContent.title}
                      onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                      placeholder="Hero title"
                    />
                  </div>
                  <div>
                    <Label>Hero Subtitle</Label>
                    <Textarea
                      value={heroContent.subtitle}
                      onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                      placeholder="Hero subtitle"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Secondary Title (Animated Title 1)</Label>
                    <Input
                  value={heroContent.metadata.secondary_title || ''}
                  onChange={(e) => setHeroContent({ 
                    ...heroContent, 
                    metadata: { 
                      ...heroContent.metadata, 
                      secondary_title: e.target.value 
                    } 
                  })}
                      placeholder="Secondary animated title"
                    />
                  </div>
                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Hero Titles
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hero Subtitle Rotating Titles (Animated Title 2)</CardTitle>
                  <CardDescription>Titles that rotate/animate after the main title</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heroContent.metadata.rotating_titles && heroContent.metadata.rotating_titles.length > 0 ? (
                    heroContent.metadata.rotating_titles.map((title, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                        <Input
                        value={title}
                        onChange={(e) => {
                          const newTitles = [...(heroContent.metadata.rotating_titles || [])];
                          newTitles[index] = e.target.value;
                          setHeroContent({ 
                            ...heroContent, 
                            metadata: { 
                              ...heroContent.metadata, 
                              rotating_titles: newTitles 
                            } 
                          });
                        }}
                          placeholder="Rotating title text"
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                        onClick={() => {
                          const newTitles = heroContent.metadata.rotating_titles?.filter((_, i) => i !== index) || [];
                          setHeroContent({ 
                            ...heroContent, 
                            metadata: { 
                              ...heroContent.metadata, 
                              rotating_titles: newTitles 
                            } 
                          });
                        }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No rotating titles yet. Add one below.</p>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setHeroContent({
                        ...heroContent,
                        metadata: {
                          ...heroContent.metadata,
                          rotating_titles: [...(heroContent.metadata.rotating_titles || []), '']
                        }
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Rotating Title
                  </Button>
                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Rotating Titles
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Action Buttons</CardTitle>
                  <CardDescription>Configure Listen, Read, and Watch action buttons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Listen Button */}
                  <div className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Listen Button</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="listen-enabled" className="text-sm">Enabled</Label>
                        <Switch
                          id="listen-enabled"
                          checked={heroContent.listen_button?.enabled || false}
                          onCheckedChange={(checked) => {
                            setHeroContent({
                              ...heroContent,
                              listen_button: { ...heroContent.listen_button!, enabled: checked }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={heroContent.listen_button?.text || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            listen_button: { ...heroContent.listen_button!, text: e.target.value }
                          });
                        }}
                        placeholder="Listen"
                      />
                    </div>
                    <div>
                      <Label>Audio URL</Label>
                      <Input
                        value={heroContent.listen_button?.url || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            listen_button: { ...heroContent.listen_button!, url: e.target.value }
                          });
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Read Button */}
                  <div className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Read Button</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="read-enabled" className="text-sm">Enabled</Label>
                        <Switch
                          id="read-enabled"
                          checked={heroContent.read_button?.enabled || false}
                          onCheckedChange={(checked) => {
                            setHeroContent({
                              ...heroContent,
                              read_button: { ...heroContent.read_button!, enabled: checked }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={heroContent.read_button?.text || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            read_button: { ...heroContent.read_button!, text: e.target.value }
                          });
                        }}
                        placeholder="Read"
                      />
                    </div>
                    <div>
                      <Label>Document URL</Label>
                      <Input
                        value={heroContent.read_button?.url || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            read_button: { ...heroContent.read_button!, url: e.target.value }
                          });
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Watch Button */}
                  <div className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Watch Button</Label>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="watch-enabled" className="text-sm">Enabled</Label>
                        <Switch
                          id="watch-enabled"
                          checked={heroContent.watch_button?.enabled || false}
                          onCheckedChange={(checked) => {
                            setHeroContent({
                              ...heroContent,
                              watch_button: { ...heroContent.watch_button!, enabled: checked }
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={heroContent.watch_button?.text || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            watch_button: { ...heroContent.watch_button!, text: e.target.value }
                          });
                        }}
                        placeholder="Watch"
                      />
                    </div>
                    <div>
                      <Label>Video URL</Label>
                      <Input
                        value={heroContent.watch_button?.url || ''}
                        onChange={(e) => {
                          setHeroContent({
                            ...heroContent,
                            watch_button: { ...heroContent.watch_button!, url: e.target.value }
                          });
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Action Buttons
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hero Slideshow</CardTitle>
                  <CardDescription>Background images or videos for the hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heroContent.metadata.slider.map((item, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Slide {index + 1}</h3>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSliderItem(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>Type</Label>
                        <select
                          value={item.type}
                          onChange={(e) => updateSliderItem(index, 'type', e.target.value)}
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                      <div>
                        <FileUploader
                          label="URL"
                          value={item.url}
                          onChange={(url) => updateSliderItem(index, 'url', url)}
                          accept={item.type === 'image' ? 'image/*' : 'video/*'}
                          bucketName="media-library"
                          fileType={item.type}
                        />
                      </div>
                    </div>
                  ))}
                  <Button onClick={addSliderItem} variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Slide
                  </Button>
                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Slider
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hero Solution Cards</CardTitle>
                  <CardDescription>Cards displayed at the bottom of the hero section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heroContent.metadata.cards.map((card, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Card {index + 1}</h3>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeCard(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <Label>Icon</Label>
                        <IconPicker
                          value={{
                            iconType: 'lucide',
                            lucideIconName: card.icon
                          }}
                          onChange={(iconData) => {
                            const iconName = iconData.iconType === 'lucide' ? iconData.lucideIconName : 'Activity';
                            updateCard(index, 'icon', iconName || 'Activity');
                          }}
                        />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={card.title}
                          onChange={(e) => {
                            const newCards = [...heroContent.metadata.cards];
                            newCards[index].title = e.target.value;
                            setHeroContent({ ...heroContent, metadata: { ...heroContent.metadata, cards: newCards } });
                          }}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input
                          value={card.subtitle}
                          onChange={(e) => {
                            const newCards = [...heroContent.metadata.cards];
                            newCards[index].subtitle = e.target.value;
                            setHeroContent({ ...heroContent, metadata: { ...heroContent.metadata, cards: newCards } });
                          }}
                        />
                      </div>
                      {card.button && (
                        <div className="space-y-2">
                          <Label>Button</Label>
                          <Input
                            placeholder="Button text"
                            value={card.button.text}
                            onChange={(e) => {
                              const newCards = [...heroContent.metadata.cards];
                              newCards[index].button = { ...newCards[index].button!, text: e.target.value };
                              setHeroContent({ ...heroContent, metadata: { ...heroContent.metadata, cards: newCards } });
                            }}
                          />
                          <select
                            value={card.button.action}
                            onChange={(e) => {
                              const newCards = [...heroContent.metadata.cards];
                              newCards[index].button = { ...newCards[index].button!, action: e.target.value as any };
                              setHeroContent({ ...heroContent, metadata: { ...heroContent.metadata, cards: newCards } });
                            }}
                            className="w-full border rounded px-3 py-2"
                          >
                            <option value="navigate">Navigate</option>
                            <option value="audio">Play Audio</option>
                            <option value="external">External Link</option>
                          </select>
                          <Input
                            placeholder={card.button.action === 'audio' ? 'Audio URL' : 'URL'}
                            value={card.button.action === 'audio' ? card.button.audioUrl : card.button.url}
                            onChange={(e) => {
                              const newCards = [...heroContent.metadata.cards];
                              if (card.button!.action === 'audio') {
                                newCards[index].button = { ...newCards[index].button!, audioUrl: e.target.value };
                              } else {
                                newCards[index].button = { ...newCards[index].button!, url: e.target.value };
                              }
                              setHeroContent({ ...heroContent, metadata: { ...heroContent.metadata, cards: newCards } });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <Button onClick={addCard} variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Card
                  </Button>
                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Cards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sections">
            <div className="space-y-4">
              <Button onClick={addSection}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>

              {sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{section.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleVisibility(section)}
                        >
                          {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                        >
                          <MoveUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === sections.length - 1}
                        >
                          <MoveDown className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteSection(section.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Badge Text</Label>
                        <Input
                          value={section.badge_text}
                          onChange={(e) => {
                            const newSections = [...sections];
                            newSections[index].badge_text = e.target.value;
                            setSections(newSections);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Badge Color</Label>
                        <Input
                          type="color"
                          value={section.badge_color}
                          onChange={(e) => {
                            const newSections = [...sections];
                            newSections[index].badge_color = e.target.value;
                            setSections(newSections);
                          }}
                        />
                      </div>
                      <div>
                        <Label>Badge Background</Label>
                        <Input
                          type="color"
                          value={section.badge_bg_color}
                          onChange={(e) => {
                            const newSections = [...sections];
                            newSections[index].badge_bg_color = e.target.value;
                            setSections(newSections);
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].title = e.target.value;
                          setSections(newSections);
                        }}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={section.description}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].description = e.target.value;
                          setSections(newSections);
                        }}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Image Position</Label>
                      <select
                        className="w-full p-2 border rounded"
                        value={section.image_position}
                        onChange={(e) => {
                          const newSections = [...sections];
                          newSections[index].image_position = e.target.value as 'left' | 'right';
                          setSections(newSections);
                        }}
                      >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div>
                      <FileUploader
                        label="Image"
                        value={section.image_url}
                        onChange={(url) => {
                          const newSections = [...sections];
                          newSections[index].image_url = url;
                          setSections(newSections);
                        }}
                        accept="image/*"
                        bucketName="media-library"
                        fileType="image"
                      />
                    </div>
                    <div>
                      <Label>Features (JSON)</Label>
                      <Textarea
                        value={JSON.stringify(section.features, null, 2)}
                        onChange={(e) => {
                          try {
                            const newSections = [...sections];
                            newSections[index].features = JSON.parse(e.target.value);
                            setSections(newSections);
                          } catch (error) {
                            // Invalid JSON, ignore
                          }
                        }}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button onClick={() => saveSection(section)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Section
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            {comparison && (
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={comparison.title}
                      onChange={(e) => setComparison({ ...comparison, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Textarea
                      value={comparison.subtitle}
                      onChange={(e) => setComparison({ ...comparison, subtitle: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Comparison Data (JSON)</Label>
                    <Textarea
                      value={JSON.stringify(comparison.comparison_data, null, 2)}
                      onChange={(e) => {
                        try {
                          setComparison({ ...comparison, comparison_data: JSON.parse(e.target.value) });
                        } catch (error) {
                          // Invalid JSON, ignore
                        }
                      }}
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button onClick={saveComparison}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Comparison
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cta">
            {cta && (
              <Card>
                <CardHeader>
                  <CardTitle>CTA Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={cta.title}
                      onChange={(e) => setCta({ ...cta, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={cta.description}
                      onChange={(e) => setCta({ ...cta, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Button Text</Label>
                    <Input
                      value={cta.button_text}
                      onChange={(e) => setCta({ ...cta, button_text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Button URL</Label>
                    <Input
                      value={cta.button_url || ''}
                      onChange={(e) => setCta({ ...cta, button_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <Button onClick={saveCTA}>
                    <Save className="w-4 h-4 mr-2" />
                    Save CTA
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default TechnologyDeploymentsManager;
