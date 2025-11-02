import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PAGE_OPTIONS = [
  { value: 'home', label: 'Home' },
  { value: 'technology', label: 'Technology' },
  { value: 'academic-validation', label: 'Academic Validation' },
  { value: 'clinical-validation', label: 'Clinical Validation' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'partners', label: 'Partners' },
  { value: 'roi', label: 'ROI' },
  { value: 'about', label: 'About' },
  { value: 'contact', label: 'Contact' },
  { value: 'privacy', label: 'Privacy' },
];

interface SliderItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  order: number;
  title?: string;
  description?: string;
  status?: string;
}

interface HeroCard {
  id: string;
  title: string;
  subtitle: string;
  icon_url?: string;
  order: number;
  status: string;
}

interface SectionData {
  id: string;
  title: string | null;
  subtitle: string | null;
  metadata: {
    slider?: SliderItem[];
    cards?: HeroCard[];
    secondary_title?: string;
    rotating_titles?: string[];
  } | null;
}

const HeroSectionManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<SectionData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageId, setPageId] = useState<string | null>(null);
  
  // Slide dialog state
  const [slideDialogOpen, setSlideDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SliderItem | null>(null);
  const [slideForm, setSlideForm] = useState({
    title: '',
    description: '',
    type: 'image' as 'image' | 'video',
    url: '',
    order: 0,
    status: 'active',
  });
  const [slideImagePreview, setSlideImagePreview] = useState<string>('');

  // Card dialog state
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<HeroCard | null>(null);
  const [cardForm, setCardForm] = useState({
    title: '',
    subtitle: '',
    icon_url: '',
    order: 0,
    status: 'active',
  });
  const [cardIconPreview, setCardIconPreview] = useState<string>('');

  // Rotating titles state
  const [rotatingTitleDialogOpen, setRotatingTitleDialogOpen] = useState(false);
  const [editingTitleIndex, setEditingTitleIndex] = useState<number | null>(null);
  const [rotatingTitleForm, setRotatingTitleForm] = useState('');

  useEffect(() => {
    fetchPageAndSection();
  }, [selectedPage]);

  const fetchPageAndSection = async () => {
    setLoading(true);
    try {
      // First, get or create the content page
      let { data: page, error: pageError } = await (supabase as any)
        .from('content_pages')
        .select('id')
        .eq('page_slug', selectedPage)
        .maybeSingle();

      if (pageError) throw pageError;

      if (!page) {
        // Create the page if it doesn't exist
        const { data: newPage, error: createError } = await (supabase as any)
          .from('content_pages')
          .insert({
            page_slug: selectedPage,
            title: PAGE_OPTIONS.find(p => p.value === selectedPage)?.label || selectedPage,
          })
          .select()
          .single();

        if (createError) throw createError;
        page = newPage;
      }

      setPageId(page.id);

      // Now fetch or create the hero section for this page
      let { data: heroSection, error: sectionError } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('page_id', page.id)
        .eq('section_type', 'hero')
        .maybeSingle();

      if (sectionError) throw sectionError;

      if (!heroSection) {
        // Create the hero section if it doesn't exist
        const { data: newSection, error: createSectionError } = await (supabase as any)
          .from('page_sections')
          .insert({
            page_id: page.id,
            section_type: 'hero',
            title: '',
            subtitle: '',
            section_order: 0,
            metadata: { slider: [], cards: [], secondary_title: '', rotating_titles: [] },
          })
          .select()
          .single();

        if (createSectionError) throw createSectionError;
        heroSection = newSection;
      }

      setSection(heroSection);
    } catch (error) {
      console.error('Error fetching section:', error);
      toast({
        title: 'Error',
        description: 'Failed to load hero section',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File, type: 'slide' | 'card') => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `sections/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (type === 'slide') {
        setSlideForm(prev => ({ ...prev, url: publicUrl }));
        setSlideImagePreview(publicUrl);
      } else {
        setCardForm(prev => ({ ...prev, icon_url: publicUrl }));
        setCardIconPreview(publicUrl);
      }

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const openSlideDialog = (slide?: SliderItem) => {
    if (slide) {
      setEditingSlide(slide);
      setSlideForm({
        title: slide.title || '',
        description: slide.description || '',
        type: slide.type,
        url: slide.url,
        order: slide.order,
        status: slide.status || 'active',
      });
      setSlideImagePreview(slide.url);
    } else {
      setEditingSlide(null);
      const maxOrder = Math.max(0, ...(section?.metadata?.slider?.map(s => s.order) || []));
      setSlideForm({
        title: '',
        description: '',
        type: 'image',
        url: '',
        order: maxOrder + 1,
        status: 'active',
      });
      setSlideImagePreview('');
    }
    setSlideDialogOpen(true);
  };

  const handleSaveSlide = async () => {
    if (!slideForm.url) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const currentSlider = section?.metadata?.slider || [];
      let newSlider;

      if (editingSlide) {
        newSlider = currentSlider.map(s =>
          s.id === editingSlide.id
            ? { ...s, ...slideForm }
            : s
        );
      } else {
        newSlider = [
          ...currentSlider,
          {
            id: Math.random().toString(36).substring(2),
            ...slideForm,
          },
        ];
      }

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            slider: newSlider,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      setSlideDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Slide saved successfully',
      });
    } catch (error) {
      console.error('Error saving slide:', error);
      toast({
        title: 'Error',
        description: 'Failed to save slide',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlide = async (slideId: string) => {
    setSaving(true);
    try {
      const currentSlider = section?.metadata?.slider || [];
      const newSlider = currentSlider.filter(s => s.id !== slideId);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            slider: newSlider,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      toast({
        title: 'Success',
        description: 'Slide deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete slide',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const openCardDialog = (card?: HeroCard) => {
    if (card) {
      setEditingCard(card);
      setCardForm({
        title: card.title,
        subtitle: card.subtitle,
        icon_url: card.icon_url || '',
        order: card.order,
        status: card.status,
      });
      setCardIconPreview(card.icon_url || '');
    } else {
      setEditingCard(null);
      const maxOrder = Math.max(0, ...(section?.metadata?.cards?.map(c => c.order) || []));
      setCardForm({
        title: '',
        subtitle: '',
        icon_url: '',
        order: maxOrder + 1,
        status: 'active',
      });
      setCardIconPreview('');
    }
    setCardDialogOpen(true);
  };

  const handleSaveCard = async () => {
    setSaving(true);
    try {
      const currentCards = section?.metadata?.cards || [];
      let newCards;

      if (editingCard) {
        newCards = currentCards.map(c =>
          c.id === editingCard.id
            ? { ...c, ...cardForm }
            : c
        );
      } else {
        newCards = [
          ...currentCards,
          {
            id: Math.random().toString(36).substring(2),
            ...cardForm,
          },
        ];
      }

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            cards: newCards,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      setCardDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Card saved successfully',
      });
    } catch (error) {
      console.error('Error saving card:', error);
      toast({
        title: 'Error',
        description: 'Failed to save card',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setSaving(true);
    try {
      const currentCards = section?.metadata?.cards || [];
      const newCards = currentCards.filter(c => c.id !== cardId);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            cards: newCards,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      toast({
        title: 'Success',
        description: 'Card deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete card',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const openRotatingTitleDialog = (index?: number) => {
    if (index !== undefined && index !== null) {
      setEditingTitleIndex(index);
      setRotatingTitleForm((section?.metadata?.rotating_titles || [])[index] || '');
    } else {
      setEditingTitleIndex(null);
      setRotatingTitleForm('');
    }
    setRotatingTitleDialogOpen(true);
  };

  const handleSaveRotatingTitle = async () => {
    if (!rotatingTitleForm.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a title',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const currentTitles = section?.metadata?.rotating_titles || [];
      let newTitles;

      if (editingTitleIndex !== null) {
        newTitles = currentTitles.map((t, i) =>
          i === editingTitleIndex ? rotatingTitleForm.trim() : t
        );
      } else {
        newTitles = [...currentTitles, rotatingTitleForm.trim()];
      }

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            rotating_titles: newTitles,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      setRotatingTitleDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Rotating title saved successfully',
      });
    } catch (error) {
      console.error('Error saving rotating title:', error);
      toast({
        title: 'Error',
        description: 'Failed to save rotating title',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRotatingTitle = async (index: number) => {
    setSaving(true);
    try {
      const currentTitles = section?.metadata?.rotating_titles || [];
      const newTitles = currentTitles.filter((_, i) => i !== index);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          metadata: {
            ...section?.metadata,
            rotating_titles: newTitles,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      toast({
        title: 'Success',
        description: 'Rotating title deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting rotating title:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete rotating title',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSection = async () => {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          title: section?.title,
          subtitle: section?.subtitle,
          metadata: section?.metadata,
          updated_at: new Date().toISOString(),
        })
        .eq('id', section?.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Hero titles updated successfully',
      });
    } catch (error) {
      console.error('Error updating section:', error);
      toast({
        title: 'Error',
        description: 'Failed to update section',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  const sliderItems = section?.metadata?.slider || [];
  const cards = section?.metadata?.cards || [];
  const rotatingTitles = section?.metadata?.rotating_titles || [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hero Section Manager</h1>
          <p className="text-muted-foreground mt-1">Manage hero sections for all pages</p>
        </div>

        {/* Page Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="page-selector">Choose which page's hero section to edit</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger id="page-selector" className="w-full">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_OPTIONS.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section Title & Subtitle */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section Titles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title-1">Hero Title 1 (Main Title)</Label>
              <Input
                id="hero-title-1"
                value={section?.title || ''}
                onChange={(e) => setSection(prev => ({ ...prev!, title: e.target.value }))}
                placeholder="e.g., Two Privacy-First Technologies."
              />
              <p className="text-sm text-muted-foreground">This will appear as the main white title</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-description">Hero Description</Label>
              <Textarea
                id="hero-description"
                value={section?.subtitle || ''}
                onChange={(e) => setSection(prev => ({ ...prev!, subtitle: e.target.value }))}
                placeholder="Enter hero section description"
                rows={3}
              />
            </div>
            <Button onClick={handleUpdateSection} disabled={saving}>
              {saving ? 'Saving...' : 'Save Hero Titles'}
            </Button>
          </CardContent>
        </Card>

        {/* Rotating Titles Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Rotating Titles (Animated Title 2)</CardTitle>
            <Button onClick={() => openRotatingTitleDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rotating Title
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add multiple titles that will rotate/animate after the main title. They will cycle through one after another.
            </p>
            {rotatingTitles.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
                No rotating titles yet. Click "Add Rotating Title" to get started.
              </div>
            ) : (
              <div className="space-y-2">
                {rotatingTitles.map((title, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">Order: {index + 1}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openRotatingTitleDialog(index)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRotatingTitle(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hero Slideshow */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hero Slideshow</CardTitle>
            <Button onClick={() => openSlideDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliderItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No slides yet. Click "Add Slide" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  sliderItems
                    .sort((a, b) => a.order - b.order)
                    .map((slide) => (
                      <TableRow key={slide.id}>
                        <TableCell className="font-medium">{slide.title || '-'}</TableCell>
                        <TableCell className="max-w-xs truncate">{slide.description || '-'}</TableCell>
                        <TableCell className="capitalize">{slide.type}</TableCell>
                        <TableCell>{slide.order}</TableCell>
                        <TableCell className="capitalize">{slide.status || 'active'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openSlideDialog(slide)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSlide(slide.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Hero Solution Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hero Solution Cards</CardTitle>
            <Button onClick={() => openCardDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No cards yet. Click "Add Card" to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  cards
                    .sort((a, b) => a.order - b.order)
                    .map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>
                          {card.icon_url ? (
                            <img src={card.icon_url} alt={card.title} className="w-12 h-12 object-contain" />
                          ) : (
                            <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center text-muted-foreground text-xs">
                              No Icon
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{card.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{card.subtitle}</TableCell>
                        <TableCell>{card.order}</TableCell>
                        <TableCell className="capitalize">{card.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openCardDialog(card)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCard(card.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Slide Dialog */}
      <Dialog open={slideDialogOpen} onOpenChange={setSlideDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSlide ? 'Edit Hero Slide' : 'Add Hero Slide'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slide-title">Title</Label>
              <Input
                id="slide-title"
                value={slideForm.title}
                onChange={(e) => setSlideForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="AI Enabled Physiological Monitoring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slide-description">Description</Label>
              <Textarea
                id="slide-description"
                value={slideForm.description}
                onChange={(e) => setSlideForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter slide description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Media Type</Label>
              <RadioGroup
                value={slideForm.type}
                onValueChange={(value) => setSlideForm(prev => ({ ...prev, type: value as 'image' | 'video' }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="type-image" />
                  <Label htmlFor="type-image">Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="video" id="type-video" />
                  <Label htmlFor="type-video">Video</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Slide Image (supports JPG, PNG, WEBP, AVIF, GIF) (1920x1080px)</Label>
              {slideImagePreview && (
                <div className="relative w-full h-48 bg-secondary rounded-lg overflow-hidden">
                  <img src={slideImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSlideImagePreview('');
                      setSlideForm(prev => ({ ...prev, url: '' }));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'slide');
                }}
                disabled={uploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slide-order">Display Order</Label>
              <Input
                id="slide-order"
                type="number"
                min="0"
                value={slideForm.order}
                onChange={(e) => setSlideForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="slide-active"
                checked={slideForm.status === 'active'}
                onCheckedChange={(checked) =>
                  setSlideForm(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))
                }
              />
              <Label htmlFor="slide-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSlideDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSlide} disabled={saving || uploading}>
              {saving ? 'Saving...' : 'Save Slide'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Card Dialog */}
      <Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCard ? 'Edit Hero Card' : 'Add Hero Card'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              {cardIconPreview && (
                <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden mx-auto">
                  <img src={cardIconPreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1"
                    onClick={() => {
                      setCardIconPreview('');
                      setCardForm(prev => ({ ...prev, icon_url: '' }));
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file, 'card');
                }}
                disabled={uploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-title">Title</Label>
              <Input
                id="card-title"
                value={cardForm.title}
                onChange={(e) => setCardForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Youtube"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-description">Description</Label>
              <Textarea
                id="card-description"
                value={cardForm.subtitle}
                onChange={(e) => setCardForm(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Watch tutorials & demos"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card-order">Display Order</Label>
              <Input
                id="card-order"
                type="number"
                min="0"
                value={cardForm.order}
                onChange={(e) => setCardForm(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="card-active"
                checked={cardForm.status === 'active'}
                onCheckedChange={(checked) =>
                  setCardForm(prev => ({ ...prev, status: checked ? 'active' : 'inactive' }))
                }
              />
              <Label htmlFor="card-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCardDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCard} disabled={saving || uploading}>
              {saving ? 'Saving...' : 'Save Card'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rotating Title Dialog */}
      <Dialog open={rotatingTitleDialogOpen} onOpenChange={setRotatingTitleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTitleIndex !== null ? 'Edit Rotating Title' : 'Add Rotating Title'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rotating-title">Title Text</Label>
              <Input
                id="rotating-title"
                value={rotatingTitleForm}
                onChange={(e) => setRotatingTitleForm(e.target.value)}
                placeholder="e.g., One Mission: Safer Aging."
              />
              <p className="text-sm text-muted-foreground">
                This title will rotate/animate after the main title along with other rotating titles.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRotatingTitleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRotatingTitle} disabled={saving}>
              {saving ? 'Saving...' : 'Save Title'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default HeroSectionManager;
