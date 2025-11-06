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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, X, Upload, Link as LinkIcon, Image as ImageIcon, Loader2, Play, Download, Edit2 } from 'lucide-react';
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
  button_text?: string;
  button_url?: string;
  button_enabled?: boolean;
  audio_url?: string;
  audio_duration?: string;
  visible?: boolean;
}

interface SectionData {
  id: string;
  content: {
    title: string | null;
    subtitle: string | null;
    listen_button?: {
      text: string;
      url: string;
      enabled: boolean;
    };
    read_button?: {
      text: string;
      url: string;
      enabled: boolean;
    };
    watch_button?: {
      text: string;
      url: string;
      enabled: boolean;
    };
    metadata: {
      slider?: SliderItem[];
      cards?: HeroCard[];
      secondary_title?: string;
      rotating_titles?: string[];
    };
  };
}

const HeroSectionManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<SectionData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageId, setPageId] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [heroMediaFiles, setHeroMediaFiles] = useState<any[]>([]);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');
  
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
    button_text: '',
    button_url: '',
    button_enabled: false,
    audio_url: '',
    audio_duration: '',
  });
  const [cardIconPreview, setCardIconPreview] = useState<string>('');

  // Rotating titles state
  const [rotatingTitleDialogOpen, setRotatingTitleDialogOpen] = useState(false);
  const [editingTitleIndex, setEditingTitleIndex] = useState<number | null>(null);
  const [rotatingTitleForm, setRotatingTitleForm] = useState('');

  useEffect(() => {
    fetchPageAndSection();
    fetchMediaLibrary();
  }, [selectedPage]);

  const fetchMediaLibrary = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaLibrary(data || []);

      // Filter hero section files
      const heroFiles = (data || []).filter((item: any) => 
        item.category === 'hero-section' || 
        item.file_path?.includes('hero-buttons/')
      );
      setHeroMediaFiles(heroFiles);
    } catch (error) {
      console.error('Error fetching media library:', error);
    }
  };

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
            display_order: 0,
            content: {
              title: '',
              subtitle: '',
              metadata: { slider: [], cards: [], secondary_title: '', rotating_titles: [] },
            },
          })
          .select()
          .single();

        if (createSectionError) throw createSectionError;
        heroSection = newSection;
      }

      // Ensure content structure exists
      if (!heroSection.content) {
        heroSection.content = {
          title: '',
          subtitle: '',
          metadata: { slider: [], cards: [], secondary_title: '', rotating_titles: [] },
        };
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
      .from('media-library')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('media-library')
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

  const handleAudioUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-card-audio-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `audio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      setCardForm(prev => ({ ...prev, audio_url: publicUrl }));

      toast({
        title: 'Success',
        description: 'Audio uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload audio',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleButtonFileUpload = async (buttonType: 'listen' | 'read' | 'watch', file: File) => {
    setUploadingButton(buttonType);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${buttonType}-${Date.now()}.${fileExt}`;
      const filePath = `hero-buttons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      // Save to media_library table
      await supabase.from('media_library').insert({
        file_name: fileName,
        file_path: filePath,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        category: 'hero-section',
        page_slug: selectedPage,
      });

      const buttonKey = `${buttonType}_button` as 'listen_button' | 'read_button' | 'watch_button';
      setSection(prev => ({
        ...prev!,
        content: {
          ...prev!.content,
          [buttonKey]: {
            ...(prev!.content?.[buttonKey] as any),
            url: publicUrl,
          }
        }
      }));

      await fetchMediaLibrary();

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
      setUploadingButton(null);
    }
  };

  const handleDeleteMediaFile = async (fileId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media-library')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      await fetchMediaLibrary();

      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive',
      });
    }
  };

  const handleRenameMediaFile = async (fileId: string, oldPath: string) => {
    if (!newFileName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a new file name',
        variant: 'destructive',
      });
      return;
    }

    try {
      const fileExt = oldPath.split('.').pop();
      const newPath = oldPath.replace(/[^/]+$/, `${newFileName}.${fileExt}`);

      // Download the file
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('media-library')
        .download(oldPath);

      if (downloadError) throw downloadError;

      // Upload with new name
      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(newPath, fileData);

      if (uploadError) throw uploadError;

      // Delete old file
      const { error: deleteError } = await supabase.storage
        .from('media-library')
        .remove([oldPath]);

      if (deleteError) throw deleteError;

      // Get new public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(newPath);

      // Update database
      const { error: dbError } = await supabase
        .from('media_library')
        .update({
          file_name: `${newFileName}.${fileExt}`,
          file_path: newPath,
          file_url: publicUrl,
        })
        .eq('id', fileId);

      if (dbError) throw dbError;

      await fetchMediaLibrary();
      setRenamingFile(null);
      setNewFileName('');

      toast({
        title: 'Success',
        description: 'File renamed successfully',
      });
    } catch (error) {
      console.error('Error renaming file:', error);
      toast({
        title: 'Error',
        description: 'Failed to rename file',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('media-library')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to download file',
        variant: 'destructive',
      });
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
      const maxOrder = Math.max(0, ...(section?.content?.metadata?.slider?.map(s => s.order) || []));
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
      const currentSlider = section?.content?.metadata?.slider || [];
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
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              slider: newSlider,
            },
          },
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
      const currentSlider = section?.content?.metadata?.slider || [];
      const newSlider = currentSlider.filter(s => s.id !== slideId);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              slider: newSlider,
            },
          },
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
        button_text: card.button_text || '',
        button_url: card.button_url || '',
        button_enabled: card.button_enabled || false,
        audio_url: card.audio_url || '',
        audio_duration: card.audio_duration || '',
      });
      setCardIconPreview(card.icon_url || '');
    } else {
      setEditingCard(null);
      const maxOrder = Math.max(0, ...(section?.content?.metadata?.cards?.map(c => c.order) || []));
      setCardForm({
        title: '',
        subtitle: '',
        icon_url: '',
        order: maxOrder + 1,
        status: 'active',
        button_text: '',
        button_url: '',
        button_enabled: false,
        audio_url: '',
        audio_duration: '',
      });
      setCardIconPreview('');
    }
    setCardDialogOpen(true);
  };

  const handleSaveCard = async () => {
    setSaving(true);
    try {
      const currentCards = section?.content?.metadata?.cards || [];
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
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              cards: newCards,
            },
          },
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

  const handleToggleCardVisibility = async (cardId: string, visible: boolean) => {
    const currentCards = section?.content?.metadata?.cards || [];
    const updatedCards = currentCards.map((card: HeroCard) =>
      card.id === cardId ? { ...card, visible } : card
    );

    try {
      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              cards: updatedCards
            }
          }
        })
        .eq('id', section?.id);

      if (error) throw error;

      await fetchPageAndSection();
      toast({
        title: 'Success',
        description: 'Card visibility updated',
      });
    } catch (error) {
      console.error('Error updating card visibility:', error);
      toast({
        title: 'Error',
        description: 'Failed to update card visibility',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    setSaving(true);
    try {
      const currentCards = section?.content?.metadata?.cards || [];
      const newCards = currentCards.filter(c => c.id !== cardId);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              cards: newCards,
            },
          },
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
      setRotatingTitleForm((section?.content?.metadata?.rotating_titles || [])[index] || '');
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
      const currentTitles = section?.content?.metadata?.rotating_titles || [];
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
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              rotating_titles: newTitles,
            },
          },
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
      const currentTitles = section?.content?.metadata?.rotating_titles || [];
      const newTitles = currentTitles.filter((_, i) => i !== index);

      const { error } = await (supabase as any)
        .from('page_sections')
        .update({
          content: {
            ...section?.content,
            metadata: {
              ...section?.content?.metadata,
              rotating_titles: newTitles,
            },
          },
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
          content: section?.content,
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

  const sliderItems = section?.content?.metadata?.slider || [];
  const cards = section?.content?.metadata?.cards || [];
  const rotatingTitles = section?.content?.metadata?.rotating_titles || [];

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
                value={section?.content?.title || ''}
                onChange={(e) => setSection(prev => ({
                  ...prev!,
                  content: {
                    ...prev!.content,
                    title: e.target.value
                  }
                }))}
                placeholder="e.g., Two Privacy-First Technologies."
              />
              <p className="text-sm text-muted-foreground">This will appear as the main white title</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-description">Hero Description</Label>
              <Textarea
                id="hero-description"
                value={section?.content?.subtitle || ''}
                onChange={(e) => setSection(prev => ({
                  ...prev!,
                  content: {
                    ...prev!.content,
                    subtitle: e.target.value
                  }
                }))}
                placeholder="Enter hero section description"
                rows={3}
              />
            </div>
            <Button onClick={handleUpdateSection} disabled={saving}>
              {saving ? 'Saving...' : 'Save Hero Titles'}
            </Button>
          </CardContent>
        </Card>

        {/* Three Buttons (Listen More, Read More, Watch More) */}
        <Card>
          <CardHeader>
            <CardTitle>Action Buttons (Under Rotating Title)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Listen Button */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Listen More Button</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="listen-enabled"
                    checked={section?.content?.listen_button?.enabled || false}
                    onCheckedChange={(checked) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        listen_button: {
                          ...prev!.content?.listen_button,
                          text: prev!.content?.listen_button?.text || 'Listen More',
                          url: prev!.content?.listen_button?.url || '',
                          enabled: checked as boolean
                        }
                      }
                    }))}
                  />
                  <Label htmlFor="listen-enabled">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={section?.content?.listen_button?.text || 'Listen More'}
                  onChange={(e) => setSection(prev => ({
                    ...prev!,
                    content: {
                      ...prev!.content,
                      listen_button: {
                        ...prev!.content?.listen_button,
                        text: e.target.value,
                        url: prev!.content?.listen_button?.url || '',
                        enabled: prev!.content?.listen_button?.enabled || false
                      }
                    }
                  }))}
                  placeholder="Listen More"
                />
              </div>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="library">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Library
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-2">
                  <Label htmlFor="listen-url">External URL</Label>
                  <Input
                    id="listen-url"
                    value={section?.content?.listen_button?.url || ''}
                    onChange={(e) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        listen_button: {
                          ...prev!.content?.listen_button,
                          text: prev!.content?.listen_button?.text || 'Listen More',
                          url: e.target.value,
                          enabled: prev!.content?.listen_button?.enabled || false
                        }
                      }
                    }))}
                    placeholder="https://podcast.com or /page-path"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-2">
                  <Label htmlFor="listen-file">Upload File (Audio, Video, PDF, etc.)</Label>
                  <Input
                    id="listen-file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleButtonFileUpload('listen', file);
                    }}
                    disabled={uploadingButton === 'listen'}
                  />
                  {uploadingButton === 'listen' && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  {section?.content?.listen_button?.url && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium mb-2">Current File:</p>
                      {section.content.listen_button.url.match(/\.(mp3|wav|ogg|m4a)$/i) && (
                        <audio controls className="w-full mb-2">
                          <source src={section.content.listen_button.url} />
                        </audio>
                      )}
                      {section.content.listen_button.url.match(/\.(mp4|webm|ogg|mov)$/i) && (
                        <video controls className="w-full mb-2 max-h-40">
                          <source src={section.content.listen_button.url} />
                        </video>
                      )}
                      <p className="text-xs text-muted-foreground break-all">
                        {section.content.listen_button.url.split('/').pop()}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="library" className="space-y-2">
                  <Label>Select from Media Library</Label>
                  <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                    {mediaLibrary.map((media) => (
                      <div
                        key={media.id}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded cursor-pointer"
                        onClick={() => setSection(prev => ({
                          ...prev!,
                          content: {
                            ...prev!.content,
                            listen_button: {
                              ...prev!.content?.listen_button,
                              text: prev!.content?.listen_button?.text || 'Listen More',
                              url: media.file_url,
                              enabled: prev!.content?.listen_button?.enabled || false
                            }
                          }
                        }))}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{media.file_name}</p>
                          <p className="text-xs text-muted-foreground">{media.file_type}</p>
                        </div>
                        {section?.content?.listen_button?.url === media.file_url && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    ))}
                    {mediaLibrary.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No media files available
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Read Button */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Read More Button</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-enabled"
                    checked={section?.content?.read_button?.enabled || false}
                    onCheckedChange={(checked) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        read_button: {
                          ...prev!.content?.read_button,
                          text: prev!.content?.read_button?.text || 'Read More',
                          url: prev!.content?.read_button?.url || '',
                          enabled: checked as boolean
                        }
                      }
                    }))}
                  />
                  <Label htmlFor="read-enabled">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={section?.content?.read_button?.text || 'Read More'}
                  onChange={(e) => setSection(prev => ({
                    ...prev!,
                    content: {
                      ...prev!.content,
                      read_button: {
                        ...prev!.content?.read_button,
                        text: e.target.value,
                        url: prev!.content?.read_button?.url || '',
                        enabled: prev!.content?.read_button?.enabled || false
                      }
                    }
                  }))}
                  placeholder="Read More"
                />
              </div>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="library">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Library
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-2">
                  <Label htmlFor="read-url">External URL</Label>
                  <Input
                    id="read-url"
                    value={section?.content?.read_button?.url || ''}
                    onChange={(e) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        read_button: {
                          ...prev!.content?.read_button,
                          text: prev!.content?.read_button?.text || 'Read More',
                          url: e.target.value,
                          enabled: prev!.content?.read_button?.enabled || false
                        }
                      }
                    }))}
                    placeholder="https://blog.com/article or /page-path"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-2">
                  <Label htmlFor="read-file">Upload File (PDF, Documents, etc.)</Label>
                  <Input
                    id="read-file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleButtonFileUpload('read', file);
                    }}
                    disabled={uploadingButton === 'read'}
                  />
                  {uploadingButton === 'read' && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  {section?.content?.read_button?.url && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium mb-2">Current File:</p>
                      {section.content.read_button.url.match(/\.(pdf)$/i) && (
                        <div className="flex items-center gap-2 p-2 bg-background rounded">
                          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600 dark:text-red-400">PDF</span>
                          </div>
                          <span className="text-sm">PDF Document</span>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground break-all mt-2">
                        {section.content.read_button.url.split('/').pop()}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="library" className="space-y-2">
                  <Label>Select from Media Library</Label>
                  <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                    {mediaLibrary.map((media) => (
                      <div
                        key={media.id}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded cursor-pointer"
                        onClick={() => setSection(prev => ({
                          ...prev!,
                          content: {
                            ...prev!.content,
                            read_button: {
                              ...prev!.content?.read_button,
                              text: prev!.content?.read_button?.text || 'Read More',
                              url: media.file_url,
                              enabled: prev!.content?.read_button?.enabled || false
                            }
                          }
                        }))}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{media.file_name}</p>
                          <p className="text-xs text-muted-foreground">{media.file_type}</p>
                        </div>
                        {section?.content?.read_button?.url === media.file_url && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    ))}
                    {mediaLibrary.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No media files available
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Watch Button */}
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Watch More Button</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watch-enabled"
                    checked={section?.content?.watch_button?.enabled || false}
                    onCheckedChange={(checked) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        watch_button: {
                          ...prev!.content?.watch_button,
                          text: prev!.content?.watch_button?.text || 'Watch More',
                          url: prev!.content?.watch_button?.url || '',
                          enabled: checked as boolean
                        }
                      }
                    }))}
                  />
                  <Label htmlFor="watch-enabled">Enabled</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Button Text</Label>
                <Input
                  value={section?.content?.watch_button?.text || 'Watch More'}
                  onChange={(e) => setSection(prev => ({
                    ...prev!,
                    content: {
                      ...prev!.content,
                      watch_button: {
                        ...prev!.content?.watch_button,
                        text: e.target.value,
                        url: prev!.content?.watch_button?.url || '',
                        enabled: prev!.content?.watch_button?.enabled || false
                      }
                    }
                  }))}
                  placeholder="Watch More"
                />
              </div>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="url">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="library">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Library
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="space-y-2">
                  <Label htmlFor="watch-url">External URL</Label>
                  <Input
                    id="watch-url"
                    value={section?.content?.watch_button?.url || ''}
                    onChange={(e) => setSection(prev => ({
                      ...prev!,
                      content: {
                        ...prev!.content,
                        watch_button: {
                          ...prev!.content?.watch_button,
                          text: prev!.content?.watch_button?.text || 'Watch More',
                          url: e.target.value,
                          enabled: prev!.content?.watch_button?.enabled || false
                        }
                      }
                    }))}
                    placeholder="https://youtube.com or /page-path"
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-2">
                  <Label htmlFor="watch-file">Upload File (Video, etc.)</Label>
                  <Input
                    id="watch-file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleButtonFileUpload('watch', file);
                    }}
                    disabled={uploadingButton === 'watch'}
                  />
                  {uploadingButton === 'watch' && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                  {section?.content?.watch_button?.url && (
                    <div className="mt-2 p-3 border rounded-md bg-muted/50">
                      <p className="text-sm font-medium mb-2">Current File:</p>
                      {section.content.watch_button.url.match(/\.(mp4|webm|ogg|mov)$/i) && (
                        <video controls className="w-full mb-2 max-h-40 rounded">
                          <source src={section.content.watch_button.url} />
                        </video>
                      )}
                      <p className="text-xs text-muted-foreground break-all">
                        {section.content.watch_button.url.split('/').pop()}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="library" className="space-y-2">
                  <Label>Select from Media Library</Label>
                  <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                    {mediaLibrary.map((media) => (
                      <div
                        key={media.id}
                        className="flex items-center justify-between p-2 hover:bg-accent rounded cursor-pointer"
                        onClick={() => setSection(prev => ({
                          ...prev!,
                          content: {
                            ...prev!.content,
                            watch_button: {
                              ...prev!.content?.watch_button,
                              text: prev!.content?.watch_button?.text || 'Watch More',
                              url: media.file_url,
                              enabled: prev!.content?.watch_button?.enabled || false
                            }
                          }
                        }))}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{media.file_name}</p>
                          <p className="text-xs text-muted-foreground">{media.file_type}</p>
                        </div>
                        {section?.content?.watch_button?.url === media.file_url && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    ))}
                    {mediaLibrary.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No media files available
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Button onClick={handleUpdateSection} disabled={saving}>
              {saving ? 'Saving...' : 'Save Action Buttons'}
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
                  <TableHead>Visible</TableHead>
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
                          <Switch
                            checked={card.visible !== false}
                            onCheckedChange={(checked) => handleToggleCardVisibility(card.id, checked)}
                          />
                        </TableCell>
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

        {/* Hero Section Media Files */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section Media Files</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage all files uploaded for this page's hero section buttons
            </p>
          </CardHeader>
          <CardContent>
            {heroMediaFiles.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
                No files uploaded yet. Use the action buttons above to upload media.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {heroMediaFiles.map((media) => (
                  <div key={media.id} className="border rounded-lg p-4 space-y-3">
                    {/* File Preview */}
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                      {media.file_type?.startsWith('video/') ? (
                        <video controls className="w-full h-full object-contain">
                          <source src={media.file_url} />
                        </video>
                      ) : media.file_type?.startsWith('audio/') ? (
                        <div className="w-full p-4">
                          <audio controls className="w-full">
                            <source src={media.file_url} />
                          </audio>
                        </div>
                      ) : media.file_type?.startsWith('image/') ? (
                        <img src={media.file_url} alt={media.file_name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center">
                            <span className="text-sm font-bold uppercase">
                              {media.file_name?.split('.').pop()?.substring(0, 3)}
                            </span>
                          </div>
                          <span className="text-xs">Document</span>
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="space-y-2">
                      {renamingFile === media.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            placeholder="New file name"
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleRenameMediaFile(media.id, media.file_path)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setRenamingFile(null);
                              setNewFileName('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium truncate">{media.file_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {media.file_type} • {(media.file_size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleDownloadFile(media.file_path, media.file_name)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setRenamingFile(media.id);
                          setNewFileName(media.file_name.replace(/\.[^/.]+$/, ''));
                        }}
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Rename
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteMediaFile(media.id, media.file_path)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold">Button & Audio Settings</h4>
              
              <div className="space-y-2">
                <Label htmlFor="card-button-text">Button Text</Label>
                <Input
                  id="card-button-text"
                  value={cardForm.button_text}
                  onChange={(e) => setCardForm(prev => ({ ...prev, button_text: e.target.value }))}
                  placeholder="Learn More"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-button-url">Button URL</Label>
                <Input
                  id="card-button-url"
                  value={cardForm.button_url}
                  onChange={(e) => setCardForm(prev => ({ ...prev, button_url: e.target.value }))}
                  placeholder="#"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="card-button-enabled"
                  checked={cardForm.button_enabled}
                  onCheckedChange={(checked) =>
                    setCardForm(prev => ({ ...prev, button_enabled: checked === true }))
                  }
                />
                <Label htmlFor="card-button-enabled">Show Button</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-audio">Upload Audio File</Label>
                <Input
                  id="card-audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAudioUpload(file);
                  }}
                  disabled={uploading}
                />
                {cardForm.audio_url && (
                  <p className="text-sm text-muted-foreground">
                    Current: {cardForm.audio_url.split('/').pop()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-audio-duration">Audio Duration</Label>
                <Input
                  id="card-audio-duration"
                  value={cardForm.audio_duration}
                  onChange={(e) => setCardForm(prev => ({ ...prev, audio_duration: e.target.value }))}
                  placeholder="3 min"
                />
              </div>
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
