import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Save, X, ChevronUp, ChevronDown } from 'lucide-react';

interface Badge {
  text: string;
  color: string;
  bgColor: string;
}

interface FeaturedPaper {
  id: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url: string;
  badges: Badge[];
  display_order: number;
}

interface LatestPaper {
  id: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url: string;
  badges: Badge[];
  display_order: number;
}

interface Category {
  id: string;
  title: string;
  description: string;
  paper_count: number;
  icon_url: string;
  color: string;
  bg_gradient: string;
  display_order: number;
}

const ResearchHubManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [heroTitle, setHeroTitle] = useState('Discover Cutting-Edge Research');
  const [heroDescription, setHeroDescription] = useState('Explore the latest research papers, listen to expert discussions, and watch in-depth presentations from leading researchers worldwide');
  const [featuredPapers, setFeaturedPapers] = useState<FeaturedPaper[]>([]);
  const [latestPapers, setLatestPapers] = useState<LatestPaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingPaper, setEditingPaper] = useState<FeaturedPaper | null>(null);
  const [editingLatestPaper, setEditingLatestPaper] = useState<LatestPaper | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch hero section content
      const { data: heroData } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('section_type', 'research-hub-hero')
        .maybeSingle();

      if (heroData?.content) {
        setHeroTitle(heroData.content.title || heroTitle);
        setHeroDescription(heroData.content.description || heroDescription);
      }

      // Fetch featured papers
      const { data: featured } = await (supabase as any)
        .from('research_hub_featured_papers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (featured) setFeaturedPapers(featured);

      // Fetch latest papers
      const { data: latest } = await (supabase as any)
        .from('research_hub_latest_papers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (latest) setLatestPapers(latest);

      // Fetch categories
      const { data: cats } = await (supabase as any)
        .from('research_hub_categories')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (cats) setCategories(cats);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load research hub data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveHeroSection = async () => {
    try {
      await (supabase as any)
        .from('page_sections')
        .upsert({
          section_type: 'research-hub-hero',
          content: {
            title: heroTitle,
            description: heroDescription,
          },
        });

      toast({
        title: 'Success',
        description: 'Hero section updated successfully',
      });
    } catch (error) {
      console.error('Error saving hero section:', error);
      toast({
        title: 'Error',
        description: 'Failed to save hero section',
        variant: 'destructive',
      });
    }
  };

  const saveFeaturedPaper = async (paper: FeaturedPaper) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_featured_papers')
        .upsert(paper);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Featured paper saved successfully',
      });
      fetchData();
      setEditingPaper(null);
    } catch (error) {
      console.error('Error saving featured paper:', error);
      toast({
        title: 'Error',
        description: 'Failed to save featured paper',
        variant: 'destructive',
      });
    }
  };

  const deleteFeaturedPaper = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_featured_papers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Featured paper deleted successfully',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting featured paper:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete featured paper',
        variant: 'destructive',
      });
    }
  };

  const saveLatestPaper = async (paper: LatestPaper) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_latest_papers')
        .upsert(paper);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Latest paper saved successfully',
      });
      fetchData();
      setEditingLatestPaper(null);
    } catch (error) {
      console.error('Error saving latest paper:', error);
      toast({
        title: 'Error',
        description: 'Failed to save latest paper',
        variant: 'destructive',
      });
    }
  };

  const deleteLatestPaper = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_latest_papers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Latest paper deleted successfully',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting latest paper:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete latest paper',
        variant: 'destructive',
      });
    }
  };

  const saveCategory = async (category: Category) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_categories')
        .upsert(category);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Category saved successfully',
      });
      fetchData();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: 'Error',
        description: 'Failed to save category',
        variant: 'destructive',
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    }
  };

  const addBadge = (badge: Badge) => {
    if (editingPaper) {
      setEditingPaper({
        ...editingPaper,
        badges: [...(editingPaper.badges || []), badge],
      });
    }
  };

  const addLatestBadge = (badge: Badge) => {
    if (editingLatestPaper) {
      setEditingLatestPaper({
        ...editingLatestPaper,
        badges: [...(editingLatestPaper.badges || []), badge],
      });
    }
  };

  const removeBadge = (index: number) => {
    if (editingPaper) {
      setEditingPaper({
        ...editingPaper,
        badges: editingPaper.badges.filter((_, i) => i !== index),
      });
    }
  };

  const removeLatestBadge = (index: number) => {
    if (editingLatestPaper) {
      setEditingLatestPaper({
        ...editingLatestPaper,
        badges: editingLatestPaper.badges.filter((_, i) => i !== index),
      });
    }
  };

  if (adminLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Research Hub Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage Research Hub page content, featured papers, latest papers, and categories
          </p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="featured">Featured Papers</TabsTrigger>
            <TabsTrigger value="latest">Latest Papers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
                <CardDescription>Edit the main hero section title and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="Enter hero title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="Enter hero description"
                    rows={3}
                  />
                </div>
                <Button onClick={saveHeroSection}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Hero Section
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Papers (Hero Section)</CardTitle>
                <CardDescription>Manage featured research papers displayed in the hero section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      setEditingPaper({
                        id: crypto.randomUUID(),
                        title: '',
                        description: '',
                        author: '',
                        year: new Date().getFullYear().toString(),
                        views: '0',
                        comments: '0',
                        image_url: '',
                        badges: [],
                        display_order: featuredPapers.length + 1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Featured Paper
                  </Button>

                  {featuredPapers.map((paper) => (
                    <div key={paper.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{paper.title}</h4>
                          <p className="text-sm text-muted-foreground">{paper.author} ({paper.year})</p>
                          {paper.image_url && (
                            <img src={paper.image_url} alt={paper.title} className="mt-2 w-full h-32 object-cover rounded" />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingPaper(paper)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFeaturedPaper(paper.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingPaper && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Featured Paper</CardTitle>
                  <CardDescription>Update paper details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={editingPaper.title}
                        onChange={(e) =>
                          setEditingPaper({ ...editingPaper, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={editingPaper.author}
                        onChange={(e) =>
                          setEditingPaper({ ...editingPaper, author: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingPaper.description}
                      onChange={(e) =>
                        setEditingPaper({ ...editingPaper, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={editingPaper.year}
                        onChange={(e) =>
                          setEditingPaper({ ...editingPaper, year: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Views</Label>
                      <Input
                        value={editingPaper.views}
                        onChange={(e) =>
                          setEditingPaper({ ...editingPaper, views: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Comments</Label>
                      <Input
                        value={editingPaper.comments}
                        onChange={(e) =>
                          setEditingPaper({ ...editingPaper, comments: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={editingPaper.image_url}
                      onChange={(e) =>
                        setEditingPaper({ ...editingPaper, image_url: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badges</Label>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {editingPaper.badges?.map((badge, index) => (
                        <div key={index} className={`${badge.bgColor} ${badge.color} px-2 py-1 rounded text-xs flex items-center gap-1`}>
                          {badge.text}
                          <button onClick={() => removeBadge(index)} className="hover:opacity-70">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addBadge({ text: 'FEATURED', color: 'text-white', bgColor: 'bg-red-500' })}
                      >
                        Add FEATURED
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addBadge({ text: 'NEW', color: 'text-white', bgColor: 'bg-blue-500' })}
                      >
                        Add NEW
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addBadge({ text: 'TRENDING', color: 'text-gray-900', bgColor: 'bg-yellow-400' })}
                      >
                        Add TRENDING
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => saveFeaturedPaper(editingPaper)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Paper
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPaper(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Research Papers</CardTitle>
                <CardDescription>Manage papers in the "Latest Research Papers" section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      setEditingLatestPaper({
                        id: crypto.randomUUID(),
                        title: '',
                        description: '',
                        author: '',
                        year: new Date().getFullYear().toString(),
                        views: '0',
                        comments: '0',
                        image_url: '',
                        badges: [],
                        display_order: latestPapers.length + 1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Latest Paper
                  </Button>

                  {latestPapers.map((paper) => (
                    <div key={paper.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{paper.title}</h4>
                          <p className="text-sm text-muted-foreground">{paper.author} ({paper.year})</p>
                          {paper.image_url && (
                            <img src={paper.image_url} alt={paper.title} className="mt-2 w-full h-32 object-cover rounded" />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingLatestPaper(paper)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteLatestPaper(paper.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingLatestPaper && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Latest Paper</CardTitle>
                  <CardDescription>Update paper details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={editingLatestPaper.title}
                        onChange={(e) =>
                          setEditingLatestPaper({ ...editingLatestPaper, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author</Label>
                      <Input
                        value={editingLatestPaper.author}
                        onChange={(e) =>
                          setEditingLatestPaper({ ...editingLatestPaper, author: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingLatestPaper.description}
                      onChange={(e) =>
                        setEditingLatestPaper({ ...editingLatestPaper, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={editingLatestPaper.year}
                        onChange={(e) =>
                          setEditingLatestPaper({ ...editingLatestPaper, year: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Views</Label>
                      <Input
                        value={editingLatestPaper.views}
                        onChange={(e) =>
                          setEditingLatestPaper({ ...editingLatestPaper, views: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Comments</Label>
                      <Input
                        value={editingLatestPaper.comments}
                        onChange={(e) =>
                          setEditingLatestPaper({ ...editingLatestPaper, comments: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={editingLatestPaper.image_url}
                      onChange={(e) =>
                        setEditingLatestPaper({ ...editingLatestPaper, image_url: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badges</Label>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {editingLatestPaper.badges?.map((badge, index) => (
                        <div key={index} className={`${badge.bgColor} ${badge.color} px-2 py-1 rounded text-xs flex items-center gap-1`}>
                          {badge.text}
                          <button onClick={() => removeLatestBadge(index)} className="hover:opacity-70">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addLatestBadge({ text: 'Open Access', color: 'text-green-800', bgColor: 'bg-green-100' })}
                      >
                        Add Open Access
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addLatestBadge({ text: 'Peer Reviewed', color: 'text-blue-800', bgColor: 'bg-blue-100' })}
                      >
                        Add Peer Reviewed
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addLatestBadge({ text: 'Editor\'s Pick', color: 'text-yellow-800', bgColor: 'bg-yellow-100' })}
                      >
                        Add Editor's Pick
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => saveLatestPaper(editingLatestPaper)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Paper
                    </Button>
                    <Button variant="outline" onClick={() => setEditingLatestPaper(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Categories</CardTitle>
                <CardDescription>Manage research category cards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      setEditingCategory({
                        id: crypto.randomUUID(),
                        title: '',
                        description: '',
                        paper_count: 0,
                        icon_url: '',
                        color: 'text-purple-100',
                        bg_gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                        display_order: categories.length + 1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div 
                        key={category.id} 
                        className="rounded-lg p-4 space-y-2 text-white"
                        style={{ background: category.bg_gradient }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">{category.title}</h4>
                            <p className="text-sm opacity-90">
                              {category.paper_count} papers
                            </p>
                            {category.icon_url && (
                              <img src={category.icon_url} alt={category.title} className="mt-2 w-16 h-16 object-cover rounded" />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingCategory(category)}
                              className="text-white hover:bg-white/20"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteCategory(category.id)}
                              className="text-white hover:bg-white/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {editingCategory && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Category</CardTitle>
                  <CardDescription>Update category details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={editingCategory.title}
                        onChange={(e) =>
                          setEditingCategory({ ...editingCategory, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Paper Count</Label>
                      <Input
                        type="number"
                        value={editingCategory.paper_count}
                        onChange={(e) =>
                          setEditingCategory({
                            ...editingCategory,
                            paper_count: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingCategory.description}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon URL</Label>
                      <Input
                        value={editingCategory.icon_url}
                        onChange={(e) =>
                          setEditingCategory({ ...editingCategory, icon_url: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Text Color (Tailwind class)</Label>
                      <Input
                        value={editingCategory.color}
                        onChange={(e) =>
                          setEditingCategory({ ...editingCategory, color: e.target.value })
                        }
                        placeholder="e.g., text-purple-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Background Gradient (CSS)</Label>
                    <Input
                      value={editingCategory.bg_gradient}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, bg_gradient: e.target.value })
                      }
                      placeholder="e.g., linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => saveCategory(editingCategory)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Category
                    </Button>
                    <Button variant="outline" onClick={() => setEditingCategory(null)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ResearchHubManagement;