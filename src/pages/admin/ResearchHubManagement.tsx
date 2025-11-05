import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { IconPicker } from '@/components/admin/IconPicker';
import { FileUploader } from '@/components/admin/FileUploader';
import { toast } from 'sonner';

interface Badge {
  text: string;
  color: string;
  bgColor: string;
}

interface FeaturedPaper {
  id?: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url?: string;
  pdf_url?: string;
  category?: string;
  badges: Badge[];
  display_order: number;
}

interface LatestPaper {
  id?: string;
  title: string;
  description: string;
  author: string;
  year: string;
  views: string;
  comments: string;
  image_url?: string;
  pdf_url?: string;
  category?: string;
  badges: Badge[];
  display_order: number;
}

interface Category {
  id?: string;
  title: string;
  description: string;
  paper_count: number;
  icon_url?: string;
  icon_type: 'upload' | 'lucide';
  lucide_icon_name?: string;
  color: string;
  bg_gradient: string;
  display_order: number;
}

interface TrendingTopic {
  id?: string;
  rank: number;
  title: string;
  paper_count: number;
  growth: string;
  icon_url?: string;
  icon_type: 'upload' | 'lucide';
  lucide_icon_name?: string;
  color: string;
  border_color: string;
  display_order: number;
}

interface Collection {
  id?: string;
  title: string;
  description: string;
  paper_count: number;
  background_image?: string;
  features: string[];
  display_order: number;
}

const ResearchHubManagement = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [heroTitle, setHeroTitle] = useState('Discover Cutting-Edge Research');
  const [heroDescription, setHeroDescription] = useState('Explore the latest research papers');
  const [featuredPapers, setFeaturedPapers] = useState<FeaturedPaper[]>([]);
  const [latestPapers, setLatestPapers] = useState<LatestPaper[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editingPaper, setEditingPaper] = useState<FeaturedPaper | null>(null);
  const [editingLatestPaper, setEditingLatestPaper] = useState<LatestPaper | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTrendingTopic, setEditingTrendingTopic] = useState<TrendingTopic | null>(null);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [newFeature, setNewFeature] = useState('');
  const [newBadge, setNewBadge] = useState<Badge>({ text: '', color: '', bgColor: '' });
  const [newLatestBadge, setNewLatestBadge] = useState<Badge>({ text: '', color: '', bgColor: '' });

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
      
      const { data: heroData } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('section_type', 'research-hub-hero')
        .maybeSingle();

      if (heroData?.content) {
        setHeroTitle(heroData.content.title || heroTitle);
        setHeroDescription(heroData.content.description || heroDescription);
      }

      const { data: featured } = await (supabase as any)
        .from('research_hub_featured_papers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (featured) setFeaturedPapers(featured);

      const { data: latest } = await (supabase as any)
        .from('research_hub_latest_papers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (latest) setLatestPapers(latest);

      const { data: cats } = await (supabase as any)
        .from('research_hub_categories')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (cats) setCategories(cats);

      const { data: topics } = await (supabase as any)
        .from('research_hub_trending_topics')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (topics) setTrendingTopics(topics);

      const { data: colls } = await (supabase as any)
        .from('research_hub_collections')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (colls) setCollections(colls);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load research hub data');
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
          content: { title: heroTitle, description: heroDescription },
        });

      toast.success('Hero section updated successfully');
    } catch (error) {
      console.error('Error saving hero section:', error);
      toast.error('Failed to save hero section');
    }
  };

  const saveFeaturedPaper = async () => {
    if (!editingPaper) return;
    try {
      const { error } = await (supabase as any)
        .from('research_hub_featured_papers')
        .upsert(editingPaper);

      if (error) throw error;

      toast.success('Featured paper saved successfully');
      fetchData();
      setEditingPaper(null);
    } catch (error) {
      console.error('Error saving featured paper:', error);
      toast.error('Failed to save featured paper');
    }
  };

  const deleteFeaturedPaper = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_featured_papers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Featured paper deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting featured paper:', error);
      toast.error('Failed to delete featured paper');
    }
  };

  const saveLatestPaper = async () => {
    if (!editingLatestPaper) return;
    try {
      const { error } = await (supabase as any)
        .from('research_hub_latest_papers')
        .upsert(editingLatestPaper);

      if (error) throw error;

      toast.success('Latest paper saved successfully');
      fetchData();
      setEditingLatestPaper(null);
    } catch (error) {
      console.error('Error saving latest paper:', error);
      toast.error('Failed to save latest paper');
    }
  };

  const deleteLatestPaper = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_latest_papers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Latest paper deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting latest paper:', error);
      toast.error('Failed to delete latest paper');
    }
  };

  const saveCategory = async () => {
    if (!editingCategory) return;
    try {
      const { error } = await (supabase as any)
        .from('research_hub_categories')
        .upsert(editingCategory);

      if (error) throw error;

      toast.success('Category saved successfully');
      fetchData();
      setEditingCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Category deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  const saveTrendingTopic = async () => {
    if (!editingTrendingTopic) return;
    try {
      const { error } = await (supabase as any)
        .from('research_hub_trending_topics')
        .upsert(editingTrendingTopic);

      if (error) throw error;

      toast.success('Trending topic saved successfully');
      fetchData();
      setEditingTrendingTopic(null);
    } catch (error) {
      console.error('Error saving trending topic:', error);
      toast.error('Failed to save trending topic');
    }
  };

  const deleteTrendingTopic = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_trending_topics')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Trending topic deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting trending topic:', error);
      toast.error('Failed to delete trending topic');
    }
  };

  const saveCollection = async () => {
    if (!editingCollection) return;
    try {
      const { error } = await (supabase as any)
        .from('research_hub_collections')
        .upsert(editingCollection);

      if (error) throw error;

      toast.success('Collection saved successfully');
      fetchData();
      setEditingCollection(null);
    } catch (error) {
      console.error('Error saving collection:', error);
      toast.error('Failed to save collection');
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      const { error } = await (supabase as any)
        .from('research_hub_collections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Collection deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast.error('Failed to delete collection');
    }
  };

  const addBadge = () => {
    if (editingPaper && newBadge.text) {
      setEditingPaper({
        ...editingPaper,
        badges: [...(editingPaper.badges || []), newBadge],
      });
      setNewBadge({ text: '', color: '', bgColor: '' });
    }
  };

  const addLatestBadge = () => {
    if (editingLatestPaper && newLatestBadge.text) {
      setEditingLatestPaper({
        ...editingLatestPaper,
        badges: [...(editingLatestPaper.badges || []), newLatestBadge],
      });
      setNewLatestBadge({ text: '', color: '', bgColor: '' });
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

  const addFeature = () => {
    if (editingCollection && newFeature.trim()) {
      setEditingCollection({
        ...editingCollection,
        features: [...editingCollection.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    if (editingCollection) {
      setEditingCollection({
        ...editingCollection,
        features: editingCollection.features.filter((_, i) => i !== index),
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
            Manage all Research Hub sections including papers, categories, trending topics, and collections
          </p>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Edit the main hero section</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Title</Label>
                  <Input
                    id="hero-title"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description">Description</Label>
                  <Textarea
                    id="hero-description"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={saveHeroSection}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Papers</CardTitle>
                <CardDescription>Manage featured papers in hero section</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    setEditingPaper({
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
                  Add Paper
                </Button>

                <div className="mt-4 space-y-2">
                  {featuredPapers.map((paper) => (
                    <div key={paper.id} className="flex items-center justify-between border p-3 rounded">
                      <div>
                        <h4 className="font-semibold">{paper.title}</h4>
                        <p className="text-sm text-muted-foreground">{paper.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingPaper(paper)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => paper.id && deleteFeaturedPaper(paper.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingPaper.title}
                        onChange={(e) => setEditingPaper({ ...editingPaper, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={editingPaper.author}
                        onChange={(e) => setEditingPaper({ ...editingPaper, author: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingPaper.description}
                      onChange={(e) => setEditingPaper({ ...editingPaper, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={editingPaper.year}
                        onChange={(e) => setEditingPaper({ ...editingPaper, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Views</Label>
                      <Input
                        value={editingPaper.views}
                        onChange={(e) => setEditingPaper({ ...editingPaper, views: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Comments</Label>
                      <Input
                        value={editingPaper.comments}
                        onChange={(e) => setEditingPaper({ ...editingPaper, comments: e.target.value })}
                      />
                    </div>
                  </div>
                  <FileUploader
                    label="Paper Image"
                    value={editingPaper.image_url}
                    onChange={(url) => setEditingPaper({ ...editingPaper, image_url: url })}
                    accept="image/png,image/jpeg,image/jpg"
                    bucketName="media-library"
                    fileType="image"
                  />
                  <FileUploader
                    label="Paper PDF"
                    value={editingPaper.pdf_url}
                    onChange={(url) => setEditingPaper({ ...editingPaper, pdf_url: url })}
                    accept="application/pdf"
                    bucketName="media-library"
                    fileType="pdf"
                  />
                  <div>
                    <Label>Category</Label>
                    <Input
                      placeholder="e.g., AI & Machine Learning"
                      value={editingPaper.category || ''}
                      onChange={(e) => setEditingPaper({ ...editingPaper, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Badges</Label>
                    <div className="space-y-2 mt-2">
                      {editingPaper.badges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 border p-2 rounded">
                          <span className="flex-1">{badge.text}</span>
                          <Button variant="ghost" size="icon" onClick={() => removeBadge(idx)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Badge text"
                          value={newBadge.text}
                          onChange={(e) => setNewBadge({ ...newBadge, text: e.target.value })}
                        />
                        <Input
                          placeholder="Color"
                          value={newBadge.color}
                          onChange={(e) => setNewBadge({ ...newBadge, color: e.target.value })}
                        />
                        <Input
                          placeholder="BG Color"
                          value={newBadge.bgColor}
                          onChange={(e) => setNewBadge({ ...newBadge, bgColor: e.target.value })}
                        />
                        <Button onClick={addBadge}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveFeaturedPaper}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingPaper(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="latest" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest Papers</CardTitle>
                <CardDescription>Manage latest research papers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    setEditingLatestPaper({
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
                  Add Paper
                </Button>

                <div className="mt-4 space-y-2">
                  {latestPapers.map((paper) => (
                    <div key={paper.id} className="flex items-center justify-between border p-3 rounded">
                      <div>
                        <h4 className="font-semibold">{paper.title}</h4>
                        <p className="text-sm text-muted-foreground">{paper.author}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingLatestPaper(paper)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => paper.id && deleteLatestPaper(paper.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingLatestPaper.title}
                        onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Author</Label>
                      <Input
                        value={editingLatestPaper.author}
                        onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, author: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingLatestPaper.description}
                      onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={editingLatestPaper.year}
                        onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Views</Label>
                      <Input
                        value={editingLatestPaper.views}
                        onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, views: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Comments</Label>
                      <Input
                        value={editingLatestPaper.comments}
                        onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, comments: e.target.value })}
                      />
                    </div>
                  </div>
                  <FileUploader
                    label="Paper Image"
                    value={editingLatestPaper.image_url}
                    onChange={(url) => setEditingLatestPaper({ ...editingLatestPaper, image_url: url })}
                    accept="image/png,image/jpeg,image/jpg"
                    bucketName="media-library"
                    fileType="image"
                  />
                  <FileUploader
                    label="Paper PDF"
                    value={editingLatestPaper.pdf_url}
                    onChange={(url) => setEditingLatestPaper({ ...editingLatestPaper, pdf_url: url })}
                    accept="application/pdf"
                    bucketName="media-library"
                    fileType="pdf"
                  />
                  <div>
                    <Label>Category</Label>
                    <Input
                      placeholder="e.g., AI & Machine Learning"
                      value={editingLatestPaper.category || ''}
                      onChange={(e) => setEditingLatestPaper({ ...editingLatestPaper, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Badges</Label>
                    <div className="space-y-2 mt-2">
                      {editingLatestPaper.badges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 border p-2 rounded">
                          <span className="flex-1">{badge.text}</span>
                          <Button variant="ghost" size="icon" onClick={() => removeLatestBadge(idx)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Badge text"
                          value={newLatestBadge.text}
                          onChange={(e) => setNewLatestBadge({ ...newLatestBadge, text: e.target.value })}
                        />
                        <Input
                          placeholder="Color"
                          value={newLatestBadge.color}
                          onChange={(e) => setNewLatestBadge({ ...newLatestBadge, color: e.target.value })}
                        />
                        <Input
                          placeholder="BG Color"
                          value={newLatestBadge.bgColor}
                          onChange={(e) => setNewLatestBadge({ ...newLatestBadge, bgColor: e.target.value })}
                        />
                        <Button onClick={addLatestBadge}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveLatestPaper}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingLatestPaper(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage research categories</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    setEditingCategory({
                      title: '',
                      description: '',
                      paper_count: 0,
                      icon_type: 'upload',
                      color: 'text-white',
                      bg_gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display_order: categories.length + 1,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>

                <div className="mt-4 space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between border p-3 rounded">
                      <div>
                        <h4 className="font-semibold">{cat.title}</h4>
                        <p className="text-sm text-muted-foreground">{cat.paper_count} papers</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingCategory(cat)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => cat.id && deleteCategory(cat.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingCategory && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingCategory.title}
                      onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Paper Count</Label>
                    <Input
                      type="number"
                      value={editingCategory.paper_count}
                      onChange={(e) => setEditingCategory({ ...editingCategory, paper_count: parseInt(e.target.value) })}
                    />
                  </div>
                  <IconPicker
                    value={{
                      iconType: editingCategory.icon_type,
                      iconUrl: editingCategory.icon_url,
                      lucideIconName: editingCategory.lucide_icon_name,
                    }}
                    onChange={(value) =>
                      setEditingCategory({
                        ...editingCategory,
                        icon_type: value.iconType,
                        icon_url: value.iconUrl,
                        lucide_icon_name: value.lucideIconName,
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Color</Label>
                      <Input
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Background Gradient</Label>
                      <Input
                        value={editingCategory.bg_gradient}
                        onChange={(e) => setEditingCategory({ ...editingCategory, bg_gradient: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveCategory}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
                <CardDescription>Manage trending research topics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    setEditingTrendingTopic({
                      rank: trendingTopics.length + 1,
                      title: '',
                      paper_count: 0,
                      growth: '+0%',
                      icon_type: 'upload',
                      color: 'text-primary',
                      border_color: 'border-primary/20',
                      display_order: trendingTopics.length + 1,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Topic
                </Button>

                <div className="mt-4 space-y-2">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between border p-3 rounded">
                      <div>
                        <h4 className="font-semibold">#{topic.rank} {topic.title}</h4>
                        <p className="text-sm text-muted-foreground">{topic.paper_count} papers • {topic.growth}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingTrendingTopic(topic)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => topic.id && deleteTrendingTopic(topic.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingTrendingTopic && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Trending Topic</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Rank</Label>
                      <Input
                        type="number"
                        value={editingTrendingTopic.rank}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, rank: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingTrendingTopic.title}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, title: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Paper Count</Label>
                      <Input
                        type="number"
                        value={editingTrendingTopic.paper_count}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, paper_count: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Growth</Label>
                      <Input
                        value={editingTrendingTopic.growth}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, growth: e.target.value })}
                      />
                    </div>
                  </div>
                  <IconPicker
                    value={{
                      iconType: editingTrendingTopic.icon_type,
                      iconUrl: editingTrendingTopic.icon_url,
                      lucideIconName: editingTrendingTopic.lucide_icon_name,
                    }}
                    onChange={(value) =>
                      setEditingTrendingTopic({
                        ...editingTrendingTopic,
                        icon_type: value.iconType,
                        icon_url: value.iconUrl,
                        lucide_icon_name: value.lucideIconName,
                      })
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Color (text color for rank)</Label>
                      <Input
                        type="color"
                        value={editingTrendingTopic.color?.startsWith('#') ? editingTrendingTopic.color : '#0ea5e9'}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, color: e.target.value })}
                        className="h-10"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Or use Tailwind classes like "text-blue-500"
                      </p>
                    </div>
                    <div>
                      <Label>Border Color</Label>
                      <Input
                        type="color"
                        value={editingTrendingTopic.border_color?.startsWith('#') ? editingTrendingTopic.border_color : '#0ea5e9'}
                        onChange={(e) => setEditingTrendingTopic({ ...editingTrendingTopic, border_color: e.target.value })}
                        className="h-10"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Or use Tailwind classes like "border-blue-500/20"
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveTrendingTopic}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingTrendingTopic(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="collections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Collections</CardTitle>
                <CardDescription>Manage curated research collections</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() =>
                    setEditingCollection({
                      title: '',
                      description: '',
                      paper_count: 0,
                      features: [],
                      display_order: collections.length + 1,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Collection
                </Button>

                <div className="mt-4 space-y-2">
                  {collections.map((coll) => (
                    <div key={coll.id} className="flex items-center justify-between border p-3 rounded">
                      <div>
                        <h4 className="font-semibold">{coll.title}</h4>
                        <p className="text-sm text-muted-foreground">{coll.paper_count} papers</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditingCollection(coll)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => coll.id && deleteCollection(coll.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingCollection && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingCollection.title}
                      onChange={(e) => setEditingCollection({ ...editingCollection, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingCollection.description}
                      onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Paper Count</Label>
                    <Input
                      type="number"
                      value={editingCollection.paper_count}
                      onChange={(e) => setEditingCollection({ ...editingCollection, paper_count: parseInt(e.target.value) })}
                    />
                  </div>
                  <FileUploader
                    label="Background Image"
                    value={editingCollection.background_image}
                    onChange={(url) => setEditingCollection({ ...editingCollection, background_image: url })}
                    accept="image/png,image/jpeg,image/jpg"
                    bucketName="media-library"
                    fileType="image"
                  />
                  <div>
                    <Label>Features</Label>
                    <div className="space-y-2 mt-2">
                      {editingCollection.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 border p-2 rounded">
                          <span className="flex-1">{feature}</span>
                          <Button variant="ghost" size="icon" onClick={() => removeFeature(idx)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add feature"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                        />
                        <Button onClick={addFeature}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveCollection}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingCollection(null)}>Cancel</Button>
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
