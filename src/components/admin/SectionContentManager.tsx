import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface SectionContent {
  id: string;
  section_key: string;
  title: string;
  subtitle: string | null;
}

const SectionContentManager = () => {
  const [content, setContent] = useState<SectionContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_key', 'research_credibility')
        .maybeSingle();

      if (error) throw error;
      setContent(data);
    } catch (error) {
      console.error('Error fetching section content:', error);
      toast({
        title: "Error",
        description: "Failed to load section content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      const { error } = await supabase
        .from('section_content')
        .update({
          title: content.title,
          subtitle: content.subtitle,
        })
        .eq('section_key', 'research_credibility');

      if (error) throw error;

      toast({
        title: "Success",
        description: "Section content updated successfully",
      });
    } catch (error) {
      console.error('Error updating section content:', error);
      toast({
        title: "Error",
        description: "Failed to update section content",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!content) {
    return <div className="text-center py-8">No content found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
          placeholder="Research Credibility & Publications"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Section Subtitle</Label>
        <Textarea
          id="subtitle"
          value={content.subtitle || ''}
          onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
          placeholder="Founded by PhD researchers with institutional backing..."
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </form>
  );
};

export default SectionContentManager;