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
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

interface FeaturedPaper {
  id: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image: string;
  order: number;
}

interface Category {
  id: string;
  title: string;
  description: string;
  paper_count: number;
  icon: string;
  order: number;
}

const ResearchHubManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [heroTitle, setHeroTitle] = useState('Discover Cutting-Edge Research');
  const [heroDescription, setHeroDescription] = useState('Explore the latest research papers, listen to expert discussions, and watch in-depth presentations from leading researchers worldwide');
  const [featuredPapers, setFeaturedPapers] = useState<FeaturedPaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingPaper, setEditingPaper] = useState<FeaturedPaper | null>(null);
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
      // Fetch hero section data
      const { data: pageData } = await (supabase as any)
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'research-hub')
        .maybeSingle();

      if (pageData) {
        const { data: heroData } = await (supabase as any)
          .from('page_sections')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('section_type', 'research-hub-hero')
          .maybeSingle();

        if (heroData?.content) {
          setHeroTitle(heroData.content.title || heroTitle);
          setHeroDescription(heroData.content.description || heroDescription);
          setFeaturedPapers(heroData.content.featured_papers || []);
        }

        // Fetch categories
        const { data: categoriesData } = await (supabase as any)
          .from('page_sections')
          .select('*')
          .eq('page_id', pageData.id)
          .eq('section_type', 'research-hub-categories')
          .maybeSingle();

        if (categoriesData?.content?.categories) {
          setCategories(categoriesData.content.categories);
        }
      }
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
      const { data: pageData } = await (supabase as any)
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'research-hub')
        .maybeSingle();

      if (!pageData) {
        toast({
          title: 'Error',
          description: 'Research Hub page not found',
          variant: 'destructive',
        });
        return;
      }

      await (supabase as any)
        .from('page_sections')
        .upsert({
          page_id: pageData.id,
          section_type: 'research-hub-hero',
          content: {
            title: heroTitle,
            description: heroDescription,
            featured_papers: featuredPapers,
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

  const saveCategories = async () => {
    try {
      const { data: pageData } = await (supabase as any)
        .from('content_pages')
        .select('id')
        .eq('page_slug', 'research-hub')
        .maybeSingle();

      if (!pageData) return;

      await (supabase as any)
        .from('page_sections')
        .upsert({
          page_id: pageData.id,
          section_type: 'research-hub-categories',
          content: {
            categories,
          },
        });

      toast({
        title: 'Success',
        description: 'Categories updated successfully',
      });
    } catch (error) {
      console.error('Error saving categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to save categories',
        variant: 'destructive',
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
            Manage Research Hub page content, featured papers, and categories
          </p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="papers">Featured Papers</TabsTrigger>
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

          <TabsContent value="papers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Papers</CardTitle>
                <CardDescription>Manage featured research papers displayed in the hero section</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      setEditingPaper({
                        id: Date.now().toString(),
                        title: '',
                        description: '',
                        author: '',
                        year: new Date().getFullYear().toString(),
                        views: '0',
                        comments: '0',
                        image: '',
                        order: featuredPapers.length + 1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Featured Paper
                  </Button>

                  {featuredPapers.map((paper) => (
                    <div key={paper.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{paper.title}</h4>
                          <p className="text-sm text-muted-foreground">{paper.author} ({paper.year})</p>
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
                            onClick={() => {
                              setFeaturedPapers(featuredPapers.filter((p) => p.id !== paper.id));
                            }}
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
                  <CardTitle>Edit Paper</CardTitle>
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
                      value={editingPaper.image}
                      onChange={(e) =>
                        setEditingPaper({ ...editingPaper, image: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const existing = featuredPapers.find((p) => p.id === editingPaper.id);
                        if (existing) {
                          setFeaturedPapers(
                            featuredPapers.map((p) =>
                              p.id === editingPaper.id ? editingPaper : p
                            )
                          );
                        } else {
                          setFeaturedPapers([...featuredPapers, editingPaper]);
                        }
                        setEditingPaper(null);
                      }}
                    >
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
                        id: Date.now().toString(),
                        title: '',
                        description: '',
                        paper_count: 0,
                        icon: '',
                        order: categories.length + 1,
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{category.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {category.paper_count} papers
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingCategory(category)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCategories(categories.filter((c) => c.id !== category.id));
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button onClick={saveCategories}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Categories
                  </Button>
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
                            paper_count: parseInt(e.target.value),
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
                  <div className="space-y-2">
                    <Label>Icon URL</Label>
                    <Input
                      value={editingCategory.icon}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, icon: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const existing = categories.find((c) => c.id === editingCategory.id);
                        if (existing) {
                          setCategories(
                            categories.map((c) =>
                              c.id === editingCategory.id ? editingCategory : c
                            )
                          );
                        } else {
                          setCategories([...categories, editingCategory]);
                        }
                        setEditingCategory(null);
                      }}
                    >
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
