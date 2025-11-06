import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ComparisonCard {
  title: string;
  type: "problem" | "solution";
  bullet_points: string[];
  border_color?: string;
  text_color?: string;
}

interface TechnologyBox {
  title: string;
  subtitle: string;
  icon_url?: string;
  icon_type?: string;
  lucide_icon_name?: string;
  bg_color: string;
  text_color: string;
  sub_text_color: string;
  description?: string;
  details?: {
    section_title: string;
    items: string[];
    bg_color: string;
    text_color: string;
  }[];
  footer_text?: string;
  footer_bg?: string;
  footer_icon?: string;
}

interface SectionData {
  title: string;
  subtitle: string;
  icon_url?: string;
  icon_type?: string;
  lucide_icon_name?: string;
  comparison_title: string;
  comparison_subtitle: string;
  comparison_cards: ComparisonCard[];
  tech_comparison_title: string;
  technology_boxes: TechnologyBox[];
  listen_button?: {
    text: string;
    url: string;
    audio_url?: string;
    audio_duration?: string;
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
}

const defaultSection: SectionData = {
  title: "No Cameras. Ever.",
  subtitle: "Privacy by Physics, Not Policy — Our technology makes privacy violations physically impossible",
  icon_type: "upload",
  comparison_title: "The Privacy Revolution",
  comparison_subtitle: "While others promise privacy through policies, we deliver it through physics.",
  comparison_cards: [
    {
      title: "Camera Systems (like SafelyYou)",
      type: "problem",
      bullet_points: [
        "Rely on policy promises (video deletion, no live streaming)",
        "Still capture visual data that could be misused",
        "Cannot operate in bathrooms due to privacy laws",
        "Family resistance and ethical concerns"
      ],
      border_color: "border-red-200",
      text_color: "text-red-800"
    },
    {
      title: "Care Aware Tech Approach",
      type: "solution",
      bullet_points: [
        "Physical impossibility of capturing faces or images",
        "Radar and WiFi only detect motion signatures",
        "Bathroom-safe monitoring preserves dignity",
        "Anonymous data collection by design"
      ],
      border_color: "border-green-200",
      text_color: "text-green-800"
    }
  ],
  tech_comparison_title: "What Different Technologies See",
  technology_boxes: [
    {
      title: "Camera Systems",
      subtitle: "Visual imagery (blurred for privacy but still captured)",
      icon_type: "upload",
      bg_color: "bg-red-50",
      text_color: "text-red-800",
      sub_text_color: "text-red-600",
      details: [
        {
          section_title: "What They Capture:",
          items: ["• Full visual imagery", "• Facial features", "• Personal moments"],
          bg_color: "bg-red-100",
          text_color: "text-red-800"
        }
      ],
      footer_text: "Still relies on trust and policy enforcement",
      footer_bg: "bg-red-200"
    },
    {
      title: "Physics-Based Sensing",
      subtitle: "Waveform data only (no visual information possible)",
      icon_type: "upload",
      bg_color: "bg-green-50",
      text_color: "text-green-800",
      sub_text_color: "text-green-600",
      details: [
        {
          section_title: "What We Detect:",
          items: ["• Motion signatures", "• Respiratory rhythms", "• Fall classifications"],
          bg_color: "bg-green-100",
          text_color: "text-green-800"
        }
      ],
      footer_text: "Privacy violations are physically impossible",
      footer_bg: "bg-green-200"
    },
    {
      title: "HIPAA-Aligned",
      subtitle: "",
      icon_type: "upload",
      bg_color: "bg-blue-50",
      text_color: "text-blue-800",
      sub_text_color: "text-blue-600",
      description: "Compliant with healthcare privacy standards"
    },
    {
      title: "FCC-Compliant",
      subtitle: "",
      icon_type: "upload",
      bg_color: "bg-purple-50",
      text_color: "text-purple-800",
      sub_text_color: "text-purple-600",
      description: "Approved wireless technology"
    },
    {
      title: "Research-Backed",
      subtitle: "",
      icon_type: "upload",
      bg_color: "bg-indigo-50",
      text_color: "text-indigo-800",
      sub_text_color: "text-indigo-600",
      description: "Validated by academic studies"
    }
  ],
  listen_button: {
    text: "Listen",
    url: "",
    enabled: false
  },
  read_button: {
    text: "Learn More",
    url: "",
    enabled: false
  },
  watch_button: {
    text: "Watch",
    url: "",
    enabled: false
  }
};

const FeatureComparisonManager = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [section, setSection] = useState<SectionData>(defaultSection);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from("section_content")
        .select("content")
        .eq("section_key", "feature_comparison")
        .single();

      if (error && error.code !== "PGRST116") throw error;
      
      if (data?.content) {
        setSection(data.content as SectionData);
      }
    } catch (error) {
      console.error("Error fetching section:", error);
      toast({
        title: "Error",
        description: "Failed to fetch section content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("section_content")
        .upsert(
          {
            section_key: "feature_comparison",
            content: section,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "section_key" }
        );

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section saved successfully",
      });
    } catch (error) {
      console.error("Error saving section:", error);
      toast({
        title: "Error",
        description: "Failed to save section",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (
    file: File,
    type: "icon" | "audio" | "box_icon",
    boxIndex?: number
  ) => {
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("media-library")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media-library")
        .getPublicUrl(filePath);

      if (type === "icon") {
        setSection((prev) => ({ ...prev, icon_url: publicUrl, icon_type: "upload" }));
      } else if (type === "audio") {
        setSection((prev) => ({
          ...prev,
          listen_button: { ...prev.listen_button!, audio_url: publicUrl },
        }));
      } else if (type === "box_icon" && boxIndex !== undefined) {
        const newBoxes = [...section.technology_boxes];
        newBoxes[boxIndex] = {
          ...newBoxes[boxIndex],
          icon_url: publicUrl,
          icon_type: "upload"
        };
        setSection((prev) => ({ ...prev, technology_boxes: newBoxes }));
      }

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateCard = (index: number, field: keyof ComparisonCard, value: any) => {
    const newCards = [...section.comparison_cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setSection({ ...section, comparison_cards: newCards });
  };

  const addBulletPoint = (cardIndex: number) => {
    const newCards = [...section.comparison_cards];
    newCards[cardIndex].bullet_points.push("");
    setSection({ ...section, comparison_cards: newCards });
  };

  const updateBulletPoint = (cardIndex: number, pointIndex: number, value: string) => {
    const newCards = [...section.comparison_cards];
    newCards[cardIndex].bullet_points[pointIndex] = value;
    setSection({ ...section, comparison_cards: newCards });
  };

  const removeBulletPoint = (cardIndex: number, pointIndex: number) => {
    const newCards = [...section.comparison_cards];
    newCards[cardIndex].bullet_points.splice(pointIndex, 1);
    setSection({ ...section, comparison_cards: newCards });
  };

  const updateBox = (index: number, field: keyof TechnologyBox, value: any) => {
    const newBoxes = [...section.technology_boxes];
    newBoxes[index] = { ...newBoxes[index], [field]: value };
    setSection({ ...section, technology_boxes: newBoxes });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Feature Comparison Manager</h1>
              <Badge variant="outline" className="mt-2">
                Section Key: feature_comparison
              </Badge>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
        </div>

        {/* Main Section */}
        <Card>
          <CardHeader>
            <CardTitle>Main Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={section.title}
                onChange={(e) => setSection({ ...section, title: e.target.value })}
                placeholder="No Cameras. Ever."
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea
                value={section.subtitle}
                onChange={(e) => setSection({ ...section, subtitle: e.target.value })}
                rows={2}
              />
            </div>
            <div>
              <Label>Icon</Label>
              <Tabs defaultValue="upload">
                <TabsList>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "icon");
                    }}
                    disabled={uploading}
                  />
                  {section.icon_url && (
                    <img src={section.icon_url} alt="Icon" className="w-20 h-20 mt-2 rounded" />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Collapsible>
          <Card>
            <CardHeader>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <CardTitle>Action Buttons</CardTitle>
                <ChevronDown className="w-4 h-4" />
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                {/* Listen Button */}
                <div className="space-y-4 border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={section.listen_button?.enabled}
                      onCheckedChange={(checked) =>
                        setSection({
                          ...section,
                          listen_button: { ...section.listen_button!, enabled: checked as boolean },
                        })
                      }
                    />
                    <Label>Enable Listen Button</Label>
                  </div>
                  {section.listen_button?.enabled && (
                    <>
                      <Input
                        placeholder="Button Text"
                        value={section.listen_button.text}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            listen_button: { ...section.listen_button!, text: e.target.value },
                          })
                        }
                      />
                      <Input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, "audio");
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Read Button */}
                <div className="space-y-4 border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={section.read_button?.enabled}
                      onCheckedChange={(checked) =>
                        setSection({
                          ...section,
                          read_button: { ...section.read_button!, enabled: checked as boolean },
                        })
                      }
                    />
                    <Label>Enable Read Button</Label>
                  </div>
                  {section.read_button?.enabled && (
                    <>
                      <Input
                        placeholder="Button Text"
                        value={section.read_button.text}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            read_button: { ...section.read_button!, text: e.target.value },
                          })
                        }
                      />
                      <Input
                        placeholder="Button URL"
                        value={section.read_button.url}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            read_button: { ...section.read_button!, url: e.target.value },
                          })
                        }
                      />
                    </>
                  )}
                </div>

                {/* Watch Button */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={section.watch_button?.enabled}
                      onCheckedChange={(checked) =>
                        setSection({
                          ...section,
                          watch_button: { ...section.watch_button!, enabled: checked as boolean },
                        })
                      }
                    />
                    <Label>Enable Watch Button</Label>
                  </div>
                  {section.watch_button?.enabled && (
                    <>
                      <Input
                        placeholder="Button Text"
                        value={section.watch_button.text}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            watch_button: { ...section.watch_button!, text: e.target.value },
                          })
                        }
                      />
                      <Input
                        placeholder="Button URL"
                        value={section.watch_button.url}
                        onChange={(e) =>
                          setSection({
                            ...section,
                            watch_button: { ...section.watch_button!, url: e.target.value },
                          })
                        }
                      />
                    </>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Comparison Section */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Revolution Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Section Title"
              value={section.comparison_title}
              onChange={(e) => setSection({ ...section, comparison_title: e.target.value })}
            />
            <Textarea
              placeholder="Section Subtitle"
              value={section.comparison_subtitle}
              onChange={(e) => setSection({ ...section, comparison_subtitle: e.target.value })}
              rows={2}
            />
          </CardContent>
        </Card>

        {/* Comparison Cards */}
        {section.comparison_cards?.map((card, idx) => (
          <Collapsible key={idx}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <CardTitle>Card {idx + 1}: {card.title || "Untitled"}</CardTitle>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Card Title"
                    value={card.title}
                    onChange={(e) => updateCard(idx, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Border Color (e.g., border-red-200)"
                    value={card.border_color || ""}
                    onChange={(e) => updateCard(idx, "border_color", e.target.value)}
                  />
                  <Input
                    placeholder="Text Color (e.g., text-red-800)"
                    value={card.text_color || ""}
                    onChange={(e) => updateCard(idx, "text_color", e.target.value)}
                  />
                  <div>
                    <Label>Bullet Points</Label>
                    {card.bullet_points?.map((point, i) => (
                      <div key={i} className="flex gap-2 mt-2">
                        <Input
                          value={point}
                          onChange={(e) => updateBulletPoint(idx, i, e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBulletPoint(idx, i)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addBulletPoint(idx)}
                      className="mt-2"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Bullet Point
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}

        {/* Technology Boxes */}
        <Card>
          <CardHeader>
            <CardTitle>Technology Comparison Section</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Section Title"
              value={section.tech_comparison_title}
              onChange={(e) => setSection({ ...section, tech_comparison_title: e.target.value })}
            />
          </CardContent>
        </Card>

        {section.technology_boxes?.map((box, idx) => (
          <Collapsible key={idx}>
            <Card>
              <CardHeader>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <CardTitle>Technology Box {idx + 1}: {box.title}</CardTitle>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={box.title}
                    onChange={(e) => updateBox(idx, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Subtitle"
                    value={box.subtitle}
                    onChange={(e) => updateBox(idx, "subtitle", e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={box.description || ""}
                    onChange={(e) => updateBox(idx, "description", e.target.value)}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "box_icon", idx);
                    }}
                  />
                  {box.icon_url && (
                    <img src={box.icon_url} alt="Box icon" className="w-16 h-16 rounded" />
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
    </AdminLayout>
  );
};

export default FeatureComparisonManager;
