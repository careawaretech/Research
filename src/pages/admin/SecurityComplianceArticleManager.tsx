import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, X, Save } from "lucide-react";

const SecurityComplianceArticleManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [articleId, setArticleId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [healthDataContent, setHealthDataContent] = useState("");
  const [healthDataBullets, setHealthDataBullets] = useState<string[]>([]);
  const [personnelDataContent, setPersonnelDataContent] = useState("");
  const [personnelDataBullets, setPersonnelDataBullets] = useState<string[]>([]);
  const [referenceText, setReferenceText] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("security_compliance_article")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setArticleId(data.id);
        setTitle(data.title);
        setSubtitle(data.subtitle || "");
        setHealthDataContent(data.health_data_content);
        setHealthDataBullets(data.health_data_bullets as string[]);
        setPersonnelDataContent(data.personnel_data_content);
        setPersonnelDataBullets(data.personnel_data_bullets as string[]);
        setReferenceText(data.reference_text || "");
        setReferenceUrl(data.reference_url || "");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error",
        description: "Failed to load article content",
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
        .from("security_compliance_article")
        .update({
          title,
          subtitle,
          health_data_content: healthDataContent,
          health_data_bullets: healthDataBullets,
          personnel_data_content: personnelDataContent,
          personnel_data_bullets: personnelDataBullets,
          reference_text: referenceText,
          reference_url: referenceUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", articleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Article content updated successfully",
      });
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to save article content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addHealthBullet = () => {
    setHealthDataBullets([...healthDataBullets, ""]);
  };

  const removeHealthBullet = (index: number) => {
    setHealthDataBullets(healthDataBullets.filter((_, i) => i !== index));
  };

  const updateHealthBullet = (index: number, value: string) => {
    const newBullets = [...healthDataBullets];
    newBullets[index] = value;
    setHealthDataBullets(newBullets);
  };

  const addPersonnelBullet = () => {
    setPersonnelDataBullets([...personnelDataBullets, ""]);
  };

  const removePersonnelBullet = (index: number) => {
    setPersonnelDataBullets(personnelDataBullets.filter((_, i) => i !== index));
  };

  const updatePersonnelBullet = (index: number, value: string) => {
    const newBullets = [...personnelDataBullets];
    newBullets[index] = value;
    setPersonnelDataBullets(newBullets);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Compliance Article</h1>
            <p className="text-muted-foreground mt-2">
              Manage the content for the security compliance detailed article page
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Article Subtitle</Label>
              <Textarea
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Article subtitle/introduction"
                rows={3}
              />
            </div>
          </div>

          {/* Health Data Section */}
          <div className="border-t border-border pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Health Data Section</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="healthContent">Health Data Content</Label>
                <Textarea
                  id="healthContent"
                  value={healthDataContent}
                  onChange={(e) => setHealthDataContent(e.target.value)}
                  placeholder="Main content for health data section"
                  rows={6}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Health Data Checklist</Label>
                  <Button onClick={addHealthBullet} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bullet Point
                  </Button>
                </div>
                <div className="space-y-2">
                  {healthDataBullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={bullet}
                        onChange={(e) => updateHealthBullet(index, e.target.value)}
                        placeholder="Bullet point text"
                      />
                      <Button
                        onClick={() => removeHealthBullet(index)}
                        size="icon"
                        variant="destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personnel Data Section */}
          <div className="border-t border-border pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Personnel Data Section</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="personnelContent">Personnel Data Content</Label>
                <Textarea
                  id="personnelContent"
                  value={personnelDataContent}
                  onChange={(e) => setPersonnelDataContent(e.target.value)}
                  placeholder="Main content for personnel data section"
                  rows={6}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Personnel Data Protection Issues</Label>
                  <Button onClick={addPersonnelBullet} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bullet Point
                  </Button>
                </div>
                <div className="space-y-2">
                  {personnelDataBullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={bullet}
                        onChange={(e) => updatePersonnelBullet(index, e.target.value)}
                        placeholder="Bullet point text"
                      />
                      <Button
                        onClick={() => removePersonnelBullet(index)}
                        size="icon"
                        variant="destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reference Section */}
          <div className="border-t border-border pt-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Reference Section</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="referenceText">Reference Text</Label>
                <Textarea
                  id="referenceText"
                  value={referenceText}
                  onChange={(e) => setReferenceText(e.target.value)}
                  placeholder="Reference text that appears at the bottom of the article"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="referenceUrl">Reference URL (optional)</Label>
                <Input
                  id="referenceUrl"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://example.com/source"
                  type="url"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  If provided, "original source" in the reference text will be linked to this URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SecurityComplianceArticleManager;
