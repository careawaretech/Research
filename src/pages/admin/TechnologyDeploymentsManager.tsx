import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Plus, Trash2, Save, MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';
import { FileUploader } from '@/components/admin/FileUploader';

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

const TechnologyDeploymentsManager = () => {
  const [hero, setHero] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [comparison, setComparison] = useState<any>(null);
  const [cta, setCta] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [heroRes, sectionsRes, comparisonRes, ctaRes] = await Promise.all([
        supabase.from('technology_deployments_hero').select('*').single(),
        supabase.from('technology_deployments_sections').select('*').order('display_order'),
        supabase.from('technology_deployments_comparison').select('*').single(),
        supabase.from('technology_deployments_cta').select('*').single()
      ]);

      if (heroRes.data) setHero(heroRes.data);
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
    try {
      const { error } = await supabase
        .from('technology_deployments_hero')
        .update(hero)
        .eq('id', hero.id);

      if (error) throw error;
      toast.success('Hero section saved');
    } catch (error) {
      console.error('Error saving hero:', error);
      toast.error('Failed to save hero section');
    }
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
            {hero && (
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={hero.title}
                      onChange={(e) => setHero({ ...hero, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subtitle</Label>
                    <Textarea
                      value={hero.subtitle}
                      onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Primary Button Text</Label>
                      <Input
                        value={hero.cta_primary_text}
                        onChange={(e) => setHero({ ...hero, cta_primary_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Primary Button URL</Label>
                      <Input
                        value={hero.cta_primary_url || ''}
                        onChange={(e) => setHero({ ...hero, cta_primary_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Secondary Button Text</Label>
                      <Input
                        value={hero.cta_secondary_text}
                        onChange={(e) => setHero({ ...hero, cta_secondary_text: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Secondary Button URL</Label>
                      <Input
                        value={hero.cta_secondary_url || ''}
                        onChange={(e) => setHero({ ...hero, cta_secondary_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <Button onClick={saveHero}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Hero
                  </Button>
                </CardContent>
              </Card>
            )}
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
