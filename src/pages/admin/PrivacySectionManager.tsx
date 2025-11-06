import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [uploadingAudio, setUploadingAudio] = useState(false);
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
        setSection(data.content as unknown as PrivacySectionData);
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

  const handleAudioUpload = async (file: File) => {
    setUploadingAudio(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `privacy-section/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      setSection({ ...section, audio_url: publicUrl });
      toast.success('Audio uploaded successfully');
    } catch (error) {
      console.error('Error uploading audio:', error);
      toast.error('Failed to upload audio');
    } finally {
      setUploadingAudio(false);
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
            <h1 className="text-3xl font-bold">No Cameras Ever Section</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Main Header Section */}
        <Card>
          <CardHeader>
            <CardTitle>Main Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                      <p className="text-xs text-green-600 font-medium">Icon uploaded - remember to Save!</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Comparison Cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Left Section Title</Label>
              <Input
                value={section.left_section_title}
                onChange={(e) => setSection({ ...section, left_section_title: e.target.value })}
                placeholder="The Privacy Revolution"
              />
            </div>

            {section.comparison_cards.map((card, cardIndex) => (
              <Card key={cardIndex}>
                <CardHeader>
                  <CardTitle>Card {cardIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Card Title</Label>
                    <Input
                      value={card.title}
                      onChange={(e) => updateComparisonCard(cardIndex, 'title', e.target.value)}
                      placeholder="Camera Systems"
                    />
                  </div>

                  <div>
                    <Label>Card Type</Label>
                    <Select
                      value={card.card_type}
                      onValueChange={(value) => {
                        const colors = value === 'negative' 
                          ? { border_color: 'border-red-600', bg_color: 'bg-red-50/50', text_color: 'text-red-800' }
                          : { border_color: 'border-green-600', bg_color: 'bg-green-50/50', text_color: 'text-green-800' };
                        updateComparisonCard(cardIndex, 'card_type', value);
                        updateComparisonCard(cardIndex, 'border_color', colors.border_color);
                        updateComparisonCard(cardIndex, 'bg_color', colors.bg_color);
                        updateComparisonCard(cardIndex, 'text_color', colors.text_color);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="negative">Negative (Red)</SelectItem>
                        <SelectItem value="positive">Positive (Green)</SelectItem>
                      </SelectContent>
                    </Select>
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
                    {card.bullet_points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex gap-2 mb-2">
                        <Input
                          value={point}
                          onChange={(e) => updateBulletPoint(cardIndex, pointIndex, e.target.value)}
                          placeholder={`Bullet point ${pointIndex + 1}`}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeBulletPoint(cardIndex, pointIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Visualization Boxes */}
        <Card>
          <CardHeader>
            <CardTitle>What Technologies See</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Right Section Title</Label>
              <Input
                value={section.right_section_title}
                onChange={(e) => setSection({ ...section, right_section_title: e.target.value })}
                placeholder="What Different Technologies See"
              />
            </div>

            {section.visualization_boxes.map((box, boxIndex) => (
              <Card key={boxIndex}>
                <CardHeader>
                  <CardTitle>Visualization Box {boxIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Box Title</Label>
                    <Input
                      value={box.title}
                      onChange={(e) => updateVisualizationBox(boxIndex, 'title', e.target.value)}
                      placeholder="Camera Systems"
                    />
                  </div>

                  <div>
                    <Label>Icon</Label>
                    <Tabs 
                      value={box.icon_type || 'fontawesome'} 
                      onValueChange={(v) => updateVisualizationBox(boxIndex, 'icon_type', v)}
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-2">
                        <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                        <TabsTrigger value="lucide">Lucide</TabsTrigger>
                        <TabsTrigger value="upload">Upload Image</TabsTrigger>
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
                        {uploadingBoxIcon === boxIndex && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                        {box.icon_url && box.icon_type === 'upload' && (
                          <div className="mt-2 flex items-center gap-2">
                            <img src={box.icon_url} alt="Icon preview" className="w-16 h-16 object-contain bg-gray-100 rounded p-2" />
                            <p className="text-xs text-green-600 font-medium">Icon uploaded - remember to Save!</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={box.description}
                      onChange={(e) => updateVisualizationBox(boxIndex, 'description', e.target.value)}
                      placeholder="Visual imagery (blurred for privacy but still captured)"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Compliance Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.compliance_badges.map((badge, badgeIndex) => (
              <Card key={badgeIndex}>
                <CardHeader>
                  <CardTitle>Badge {badgeIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Badge Title</Label>
                    <Input
                      value={badge.title}
                      onChange={(e) => updateComplianceBadge(badgeIndex, 'title', e.target.value)}
                      placeholder="HIPAA-Aligned"
                    />
                  </div>

                  <div>
                    <Label>Icon</Label>
                    <Tabs 
                      value={badge.icon_type || 'fontawesome'} 
                      onValueChange={(v) => updateComplianceBadge(badgeIndex, 'icon_type', v)}
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-2">
                        <TabsTrigger value="fontawesome">Font Awesome</TabsTrigger>
                        <TabsTrigger value="lucide">Lucide</TabsTrigger>
                        <TabsTrigger value="upload">Upload Image</TabsTrigger>
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
                        {uploadingBadgeIcon === badgeIndex && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                        {badge.icon_url && badge.icon_type === 'upload' && (
                          <div className="mt-2 flex items-center gap-2">
                            <img src={badge.icon_url} alt="Icon preview" className="w-16 h-16 object-contain bg-gray-100 rounded p-2" />
                            <p className="text-xs text-green-600 font-medium">Icon uploaded - remember to Save!</p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div>
                    <Label>Icon Color</Label>
                    <Input
                      value={badge.icon_color}
                      onChange={(e) => updateComplianceBadge(badgeIndex, 'icon_color', e.target.value)}
                      placeholder="text-blue-600"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Action Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="enable-learn-more"
                  checked={section.enable_learn_more}
                  onCheckedChange={(checked) => setSection({ ...section, enable_learn_more: checked as boolean })}
                />
                <Label htmlFor="enable-learn-more">
                  Enable Learn More Button
                </Label>
              </div>
              <p className="text-xs text-muted-foreground -mt-2">
                Button will show when enabled and button text is provided. Clicking requires a URL.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Button Text (Required to show button)</Label>
                  <Input
                    value={section.button_text}
                    onChange={(e) => setSection({ ...section, button_text: e.target.value })}
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <Label>Button URL (Optional - button disabled if empty)</Label>
                  <Input
                    value={section.button_url}
                    onChange={(e) => setSection({ ...section, button_url: e.target.value })}
                    placeholder="/privacy"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Audio Duration (e.g., "2:30")</Label>
                <Input
                  value={section.audio_duration}
                  onChange={(e) => setSection({ ...section, audio_duration: e.target.value })}
                  placeholder="2:30"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Duration shows the time. Upload audio file for playback functionality.
                </p>
              </div>
              <div>
                <Label>Audio File</Label>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAudioUpload(file);
                  }}
                  disabled={uploadingAudio}
                />
                {uploadingAudio && (
                  <p className="text-sm text-muted-foreground mt-1">Uploading audio...</p>
                )}
                {section.audio_url && (
                  <p className="text-sm text-green-600 font-medium mt-1">Audio uploaded - remember to Save!</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Listen button shows when audio exists. Upload required for playback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PrivacySectionManager;
