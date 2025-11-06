import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComparisonCard {
  title: string;
  description: string;
  bullet_points: string[];
  card_type: 'negative' | 'positive';
  border_color: string;
  bg_color: string;
  text_color: string;
}

interface VisualizationBox {
  title: string;
  icon_type: 'fontawesome' | 'lucide' | 'upload';
  icon: string;
  icon_url?: string;
  lucide_icon_name?: string;
  description: string;
  bg_color: string;
  text_color: string;
}

interface ComplianceBadge {
  title: string;
  icon_type: 'fontawesome' | 'lucide' | 'upload';
  icon: string;
  icon_url?: string;
  lucide_icon_name?: string;
  icon_color: string;
}

interface PrivacySectionData {
  main_title: string;
  main_subtitle: string;
  main_icon_type: 'fontawesome' | 'lucide' | 'upload';
  main_icon?: string;
  main_icon_url?: string;
  main_lucide_icon_name?: string;
  
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
  
  left_section_title: string;
  comparison_cards: ComparisonCard[];
  
  right_section_title: string;
  visualization_boxes: VisualizationBox[];
  compliance_badges: ComplianceBadge[];
  
  enable_learn_more?: boolean;
  button_text?: string;
  button_url?: string;
  audio_url?: string;
  audio_duration?: string;
}

const defaultSection: PrivacySectionData = {
  main_title: 'No Cameras. Ever.',
  main_subtitle: 'Privacy by Physics, Not Policy — Our technology makes privacy violations physically impossible',
  main_icon_type: 'lucide',
  main_icon: 'VideoOff',
  main_lucide_icon_name: 'VideoOff',
  
  listen_button: { text: 'Listen More', url: '', enabled: false },
  read_button: { text: 'Read More', url: '', enabled: false },
  watch_button: { text: 'Watch More', url: '', enabled: false },
  
  left_section_title: 'The Privacy Revolution',
  comparison_cards: [
    {
      title: 'Camera Systems',
      description: '',
      bullet_points: ['Rely on policy promises', 'Still capture visual data', 'Cannot operate in bathrooms', 'Family resistance'],
      card_type: 'negative',
      border_color: 'border-red-600',
      bg_color: 'bg-red-50/50',
      text_color: 'text-red-800'
    },
    {
      title: 'Care Aware Tech Approach',
      description: '',
      bullet_points: ['Physical impossibility of capturing faces', 'Only detect motion signatures', 'Bathroom-safe monitoring', 'Anonymous data by design'],
      card_type: 'positive',
      border_color: 'border-green-600',
      bg_color: 'bg-green-50/50',
      text_color: 'text-green-800'
    }
  ],
  
  right_section_title: 'What Different Technologies See',
  visualization_boxes: [
    {
      title: 'Camera Systems',
      icon_type: 'lucide',
      icon: 'VideoOff',
      lucide_icon_name: 'VideoOff',
      description: 'Visual imagery (blurred for privacy but still captured)',
      bg_color: 'bg-red-100',
      text_color: 'text-red-600'
    },
    {
      title: 'Physics-Based Sensing',
      icon_type: 'lucide',
      icon: 'Radio',
      lucide_icon_name: 'Radio',
      description: 'Waveform data only (no visual information possible)',
      bg_color: 'bg-green-100',
      text_color: 'text-green-600'
    }
  ],
  
  compliance_badges: [
    {
      title: 'HIPAA-Aligned',
      icon_type: 'lucide',
      icon: 'Settings',
      lucide_icon_name: 'Settings',
      icon_color: 'text-blue-600'
    },
    {
      title: 'FCC-Compliant',
      icon_type: 'lucide',
      icon: 'Shield',
      lucide_icon_name: 'Shield',
      icon_color: 'text-blue-600'
    },
    {
      title: 'Research-Backed',
      icon_type: 'lucide',
      icon: 'Building2',
      lucide_icon_name: 'Building2',
      icon_color: 'text-purple-600'
    }
  ],
  
  enable_learn_more: false,
  button_text: 'Learn More',
  button_url: '',
  audio_url: '',
  audio_duration: ''
};

const PrivacySectionManager = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<PrivacySectionData>(defaultSection);
  const [uploadingMainIcon, setUploadingMainIcon] = useState(false);
  const [uploadingButton, setUploadingButton] = useState<string | null>(null);
  const [uploadingBoxIcon, setUploadingBoxIcon] = useState<number | null>(null);
  const [uploadingBadgeIcon, setUploadingBadgeIcon] = useState<number | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'privacy_section')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const content = data.content as unknown as PrivacySectionData;
        // Ensure button properties exist
        if (!content.listen_button) content.listen_button = { text: 'Listen More', url: '', enabled: false };
        if (!content.read_button) content.read_button = { text: 'Read More', url: '', enabled: false };
        if (!content.watch_button) content.watch_button = { text: 'Watch More', url: '', enabled: false };
        setSection(content);
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
          section_key: 'privacy_section',
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

  const handleButtonFileUpload = async (buttonType: 'listen' | 'read' | 'watch', file: File) => {
    setUploadingButton(buttonType);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${buttonType}-${Date.now()}.${fileExt}`;
      const filePath = `privacy-section/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      if (buttonType === 'listen') {
        setSection(prev => ({
          ...prev,
          listen_button: { ...prev.listen_button!, url: publicUrl }
        }));
      } else if (buttonType === 'read') {
        setSection(prev => ({
          ...prev,
          read_button: { ...prev.read_button!, url: publicUrl }
        }));
      } else {
        setSection(prev => ({
          ...prev,
          watch_button: { ...prev.watch_button!, url: publicUrl }
        }));
      }

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploadingButton(null);
    }
  };

  const handleMainIconUpload = async (file: File) => {
    setUploadingMainIcon(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `main-icon-${Date.now()}.${fileExt}`;
      const filePath = `privacy-section/icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      setSection({
        ...section,
        main_icon_url: publicUrl,
        main_icon_type: 'upload',
      });
      toast.success('Icon uploaded successfully');
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast.error('Failed to upload icon');
    } finally {
      setUploadingMainIcon(false);
    }
  };

  const handleBoxIconUpload = async (file: File, boxIndex: number) => {
    setUploadingBoxIcon(boxIndex);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `box-icon-${Date.now()}.${fileExt}`;
      const filePath = `privacy-section/icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      const updatedBoxes = [...section.visualization_boxes];
      updatedBoxes[boxIndex] = {
        ...updatedBoxes[boxIndex],
        icon_url: publicUrl,
        icon_type: 'upload',
      };

      setSection({ ...section, visualization_boxes: updatedBoxes });
      toast.success('Icon uploaded successfully');
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast.error('Failed to upload icon');
    } finally {
      setUploadingBoxIcon(null);
    }
  };

  const handleBadgeIconUpload = async (file: File, badgeIndex: number) => {
    setUploadingBadgeIcon(badgeIndex);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `badge-icon-${Date.now()}.${fileExt}`;
      const filePath = `privacy-section/icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      const updatedBadges = [...section.compliance_badges];
      updatedBadges[badgeIndex] = {
        ...updatedBadges[badgeIndex],
        icon_url: publicUrl,
        icon_type: 'upload',
      };

      setSection({ ...section, compliance_badges: updatedBadges });
      toast.success('Icon uploaded successfully');
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast.error('Failed to upload icon');
    } finally {
      setUploadingBadgeIcon(null);
    }
  };

  const updateComparisonCard = (index: number, field: keyof ComparisonCard, value: any) => {
    const updatedCards = [...section.comparison_cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setSection({ ...section, comparison_cards: updatedCards });
  };

  const updateBulletPoint = (cardIndex: number, pointIndex: number, value: string) => {
    const updatedCards = [...section.comparison_cards];
    updatedCards[cardIndex].bullet_points[pointIndex] = value;
    setSection({ ...section, comparison_cards: updatedCards });
  };

  const addBulletPoint = (cardIndex: number) => {
    const updatedCards = [...section.comparison_cards];
    updatedCards[cardIndex].bullet_points.push('');
    setSection({ ...section, comparison_cards: updatedCards });
  };

  const removeBulletPoint = (cardIndex: number, pointIndex: number) => {
    const updatedCards = [...section.comparison_cards];
    updatedCards[cardIndex].bullet_points.splice(pointIndex, 1);
    setSection({ ...section, comparison_cards: updatedCards });
  };

  const updateVisualizationBox = (index: number, field: keyof VisualizationBox, value: any) => {
    const updatedBoxes = [...section.visualization_boxes];
    updatedBoxes[index] = { ...updatedBoxes[index], [field]: value };
    setSection({ ...section, visualization_boxes: updatedBoxes });
  };

  const updateComplianceBadge = (index: number, field: keyof ComplianceBadge, value: any) => {
    const updatedBadges = [...section.compliance_badges];
    updatedBadges[index] = { ...updatedBadges[index], [field]: value };
    setSection({ ...section, compliance_badges: updatedBadges });
  };

  const addVisualizationBox = () => {
    setSection({
      ...section,
      visualization_boxes: [
        ...section.visualization_boxes,
        {
          title: 'New Technology',
          icon_type: 'lucide',
          icon: 'CircleDot',
          lucide_icon_name: 'CircleDot',
          description: 'Description here',
          bg_color: 'bg-gray-100',
          text_color: 'text-gray-600'
        }
      ]
    });
  };

  const removeVisualizationBox = (index: number) => {
    const updatedBoxes = [...section.visualization_boxes];
    updatedBoxes.splice(index, 1);
    setSection({ ...section, visualization_boxes: updatedBoxes });
  };

  const addComplianceBadge = () => {
    setSection({
      ...section,
      compliance_badges: [
        ...section.compliance_badges,
        {
          title: 'New Badge',
          icon_type: 'lucide',
          icon: 'CheckCircle',
          lucide_icon_name: 'CheckCircle',
          icon_color: 'text-blue-600'
        }
      ]
    });
  };

  const removeComplianceBadge = (index: number) => {
    const updatedBadges = [...section.compliance_badges];
    updatedBadges.splice(index, 1);
    setSection({ ...section, compliance_badges: updatedBadges });
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
            <h1 className="text-3xl font-bold">No Cameras. Ever.</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Main Header Section */}
        <Card>
          <CardHeader>
            <CardTitle>No Cameras. Ever. Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
              <Label className="text-sm font-semibold text-muted-foreground">Section Tag (Unique Identifier)</Label>
              <p className="text-lg font-mono font-bold text-primary mt-1">privacy-section</p>
              <p className="text-xs text-muted-foreground mt-2">
                This unique tag identifies this section. It's used for HTML anchors and internal references. 
                Contact administrator to change.
              </p>
            </div>

            <div>
              <Label>Main Title</Label>
              <Input
                value={section.main_title}
                onChange={(e) => setSection({ ...section, main_title: e.target.value })}
                placeholder="No Cameras. Ever."
              />
            </div>

            <div>
              <Label>Main Subtitle</Label>
              <Textarea
                value={section.main_subtitle}
                onChange={(e) => setSection({ ...section, main_subtitle: e.target.value })}
                placeholder="Privacy by Physics, Not Policy..."
                rows={2}
              />
            </div>

            <div>
              <Label>Main Icon</Label>
              <Tabs 
                value={section.main_icon_type || 'fontawesome'} 
                onValueChange={(v) => setSection({ ...section, main_icon_type: v as any })}
              >
                <TabsList className="grid w-full grid-cols-3 mb-2">
                  <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                  <TabsTrigger value="lucide">Lucide</TabsTrigger>
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                </TabsList>
                <TabsContent value="fontawesome">
                  <Input
                    value={section.main_icon || ''}
                    onChange={(e) => setSection({ ...section, main_icon: e.target.value })}
                    placeholder="fa-solid fa-video-slash"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter Font Awesome class</p>
                </TabsContent>
                <TabsContent value="lucide">
                  <Input
                    value={section.main_lucide_icon_name || ''}
                    onChange={(e) => setSection({ ...section, main_lucide_icon_name: e.target.value })}
                    placeholder="VideoOff"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter Lucide icon name (e.g., VideoOff, Shield, Radio)
                  </p>
                </TabsContent>
                <TabsContent value="upload">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMainIconUpload(file);
                    }}
                    disabled={uploadingMainIcon}
                  />
                  {uploadingMainIcon && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                  {section.main_icon_url && section.main_icon_type === 'upload' && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={section.main_icon_url} alt="Icon preview" className="w-16 h-16 object-contain bg-gray-100 rounded p-2" />
                      <p className="text-xs text-green-600 font-medium">Icon uploaded</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Configuration */}
        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Listen Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="listen-enabled"
                    checked={section.listen_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="listen-enabled">Enable Listen Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.listen_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        listen_button: { ...section.listen_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.listen_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          listen_button: { ...section.listen_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="audio/*,video/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('listen', file);
                        }}
                        disabled={uploadingButton === 'listen'}
                      />
                      {uploadingButton === 'listen' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Read Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="read-enabled"
                    checked={section.read_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="read-enabled">Enable Read Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.read_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        read_button: { ...section.read_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.read_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          read_button: { ...section.read_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('read', file);
                        }}
                        disabled={uploadingButton === 'read'}
                      />
                      {uploadingButton === 'read' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Watch Button</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="watch-enabled"
                    checked={section.watch_button?.enabled}
                    onCheckedChange={(checked) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, enabled: checked as boolean }
                      })
                    }
                  />
                  <Label htmlFor="watch-enabled">Enable Watch Button</Label>
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={section.watch_button?.text || ''}
                    onChange={(e) =>
                      setSection({
                        ...section,
                        watch_button: { ...section.watch_button!, text: e.target.value }
                      })
                    }
                  />
                </div>
                <Tabs defaultValue="url">
                  <TabsList>
                    <TabsTrigger value="url">URL</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url">
                    <Input
                      placeholder="Enter URL"
                      value={section.watch_button?.url || ''}
                      onChange={(e) =>
                        setSection({
                          ...section,
                          watch_button: { ...section.watch_button!, url: e.target.value }
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleButtonFileUpload('watch', file);
                        }}
                        disabled={uploadingButton === 'watch'}
                      />
                      {uploadingButton === 'watch' && <span>Uploading...</span>}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Comparison Cards */}
        <Collapsible defaultOpen>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Comparison Cards</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <Label>Left Section Title</Label>
                  <Input
                    value={section.left_section_title}
                    onChange={(e) => setSection({ ...section, left_section_title: e.target.value })}
                    placeholder="The Privacy Revolution"
                  />
                </div>

                {section.comparison_cards.map((card, cardIndex) => (
                  <Collapsible key={cardIndex} defaultOpen={cardIndex === 0}>
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                          <CardTitle className="flex items-center justify-between text-base">
                            <span>{card.title || `Card ${cardIndex + 1}`}</span>
                            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="space-y-4 pt-4">
                          <div>
                            <Label>Card Title</Label>
                            <Input
                              value={card.title}
                              onChange={(e) => updateComparisonCard(cardIndex, 'title', e.target.value)}
                              placeholder="Camera Systems"
                            />
                          </div>

                          <div>
                            <Label>Border Color</Label>
                            <Input
                              value={card.border_color}
                              onChange={(e) => updateComparisonCard(cardIndex, 'border_color', e.target.value)}
                              placeholder="border-red-600"
                            />
                          </div>

                          <div>
                            <Label>Background Color</Label>
                            <Input
                              value={card.bg_color}
                              onChange={(e) => updateComparisonCard(cardIndex, 'bg_color', e.target.value)}
                              placeholder="bg-red-50/50"
                            />
                          </div>

                          <div>
                            <Label>Text Color</Label>
                            <Input
                              value={card.text_color}
                              onChange={(e) => updateComparisonCard(cardIndex, 'text_color', e.target.value)}
                              placeholder="text-red-800"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Bullet Points</Label>
                              <Button 
                                type="button" 
                                size="sm" 
                                variant="outline"
                                onClick={() => addBulletPoint(cardIndex)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Point
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {card.bullet_points.map((point, pointIndex) => (
                                <div key={pointIndex} className="flex gap-2">
                                  <Input
                                    value={point}
                                    onChange={(e) => updateBulletPoint(cardIndex, pointIndex, e.target.value)}
                                    placeholder={`Point ${pointIndex + 1}`}
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeBulletPoint(cardIndex, pointIndex)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Visualization Boxes */}
        <Collapsible defaultOpen>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Visualization Boxes</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <Label>Right Section Title</Label>
                  <Input
                    value={section.right_section_title}
                    onChange={(e) => setSection({ ...section, right_section_title: e.target.value })}
                    placeholder="What Different Technologies See"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Technology Boxes</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addVisualizationBox}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Box
                  </Button>
                </div>

                {section.visualization_boxes.map((box, boxIndex) => (
                  <Collapsible key={boxIndex} defaultOpen={boxIndex === 0}>
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                          <CardTitle className="flex items-center justify-between text-base">
                            <span>{box.title || `Box ${boxIndex + 1}`}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeVisualizationBox(boxIndex);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                            </div>
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="space-y-4 pt-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={box.title}
                              onChange={(e) => updateVisualizationBox(boxIndex, 'title', e.target.value)}
                              placeholder="Camera Systems"
                            />
                          </div>

                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={box.description}
                              onChange={(e) => updateVisualizationBox(boxIndex, 'description', e.target.value)}
                              placeholder="Description text"
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label>Background Color</Label>
                            <Input
                              value={box.bg_color}
                              onChange={(e) => updateVisualizationBox(boxIndex, 'bg_color', e.target.value)}
                              placeholder="bg-red-100"
                            />
                          </div>

                          <div>
                            <Label>Text Color</Label>
                            <Input
                              value={box.text_color}
                              onChange={(e) => updateVisualizationBox(boxIndex, 'text_color', e.target.value)}
                              placeholder="text-red-600"
                            />
                          </div>

                          <div>
                            <Label>Icon</Label>
                            <Tabs 
                              value={box.icon_type} 
                              onValueChange={(v) => updateVisualizationBox(boxIndex, 'icon_type', v)}
                            >
                              <TabsList className="grid w-full grid-cols-3 mb-2">
                                <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                                <TabsTrigger value="lucide">Lucide</TabsTrigger>
                                <TabsTrigger value="upload">Upload</TabsTrigger>
                              </TabsList>
                              <TabsContent value="fontawesome">
                                <Input
                                  value={box.icon}
                                  onChange={(e) => updateVisualizationBox(boxIndex, 'icon', e.target.value)}
                                  placeholder="fa-solid fa-video-slash"
                                />
                              </TabsContent>
                              <TabsContent value="lucide">
                                <Input
                                  value={box.lucide_icon_name || ''}
                                  onChange={(e) => updateVisualizationBox(boxIndex, 'lucide_icon_name', e.target.value)}
                                  placeholder="VideoOff"
                                />
                              </TabsContent>
                              <TabsContent value="upload">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleBoxIconUpload(file, boxIndex);
                                  }}
                                  disabled={uploadingBoxIcon === boxIndex}
                                />
                                {uploadingBoxIcon === boxIndex && <p>Uploading...</p>}
                                {box.icon_url && box.icon_type === 'upload' && (
                                  <img src={box.icon_url} alt="Icon" className="w-12 h-12 mt-2" />
                                )}
                              </TabsContent>
                            </Tabs>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Compliance Badges */}
        <Collapsible defaultOpen>
          <Card className="border-2">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <span>Compliance Badges</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform" />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <Label>Badges</Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addComplianceBadge}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Badge
                  </Button>
                </div>

                {section.compliance_badges.map((badge, badgeIndex) => (
                  <Collapsible key={badgeIndex} defaultOpen={badgeIndex === 0}>
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                          <CardTitle className="flex items-center justify-between text-base">
                            <span>{badge.title || `Badge ${badgeIndex + 1}`}</span>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeComplianceBadge(badgeIndex);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                              <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                            </div>
                          </CardTitle>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="space-y-4 pt-4">
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={badge.title}
                              onChange={(e) => updateComplianceBadge(badgeIndex, 'title', e.target.value)}
                              placeholder="HIPAA-Aligned"
                            />
                          </div>

                          <div>
                            <Label>Icon Color</Label>
                            <Input
                              value={badge.icon_color}
                              onChange={(e) => updateComplianceBadge(badgeIndex, 'icon_color', e.target.value)}
                              placeholder="text-blue-600"
                            />
                          </div>

                          <div>
                            <Label>Icon</Label>
                            <Tabs 
                              value={badge.icon_type} 
                              onValueChange={(v) => updateComplianceBadge(badgeIndex, 'icon_type', v)}
                            >
                              <TabsList className="grid w-full grid-cols-3 mb-2">
                                <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                                <TabsTrigger value="lucide">Lucide</TabsTrigger>
                                <TabsTrigger value="upload">Upload</TabsTrigger>
                              </TabsList>
                              <TabsContent value="fontawesome">
                                <Input
                                  value={badge.icon}
                                  onChange={(e) => updateComplianceBadge(badgeIndex, 'icon', e.target.value)}
                                  placeholder="fa-solid fa-shield"
                                />
                              </TabsContent>
                              <TabsContent value="lucide">
                                <Input
                                  value={badge.lucide_icon_name || ''}
                                  onChange={(e) => updateComplianceBadge(badgeIndex, 'lucide_icon_name', e.target.value)}
                                  placeholder="Shield"
                                />
                              </TabsContent>
                              <TabsContent value="upload">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleBadgeIconUpload(file, badgeIndex);
                                  }}
                                  disabled={uploadingBadgeIcon === badgeIndex}
                                />
                                {uploadingBadgeIcon === badgeIndex && <p>Uploading...</p>}
                                {badge.icon_url && badge.icon_type === 'upload' && (
                                  <img src={badge.icon_url} alt="Icon" className="w-8 h-8 mt-2" />
                                )}
                              </TabsContent>
                            </Tabs>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </AdminLayout>
  );
};

export default PrivacySectionManager;
