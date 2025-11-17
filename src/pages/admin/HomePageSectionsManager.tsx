import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface HomePageSection {
  id: string;
  section_key: string;
  section_name: string;
  visible: boolean;
  display_order: number;
}

const HomePageSectionsManager = () => {
  const { isAdmin, loading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('home_page_sections')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from('home_page_sections')
        .update({ visible: !currentVisible })
        .eq('id', id);

      if (error) throw error;

      setSections(sections.map(section => 
        section.id === id ? { ...section, visible: !currentVisible } : section
      ));
      
      toast.success(`Section ${!currentVisible ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error('Failed to update section');
    } finally {
      setUpdating(null);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
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
          <h1 className="text-3xl font-bold">Home Page Sections</h1>
          <p className="text-muted-foreground mt-2">
            Control which sections are visible on the home page
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Section Visibility</CardTitle>
            <CardDescription>
              Toggle sections on or off to control what visitors see on your home page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{section.section_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.section_key}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {section.visible ? 'Visible' : 'Hidden'}
                    </span>
                    <Switch
                      checked={section.visible}
                      onCheckedChange={() => toggleVisibility(section.id, section.visible)}
                      disabled={updating === section.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default HomePageSectionsManager;
