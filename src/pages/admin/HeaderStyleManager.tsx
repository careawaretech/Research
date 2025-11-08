import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, ArrowLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

interface HeaderStyles {
  background_color: string;
  text_color: string;
  border_color: string;
}

const HeaderStyleManager = () => {
  const navigate = useNavigate();
  const [styles, setStyles] = useState<HeaderStyles>({
    background_color: 'rgba(15, 23, 42, 0.95)',
    text_color: '#ffffff',
    border_color: 'rgba(255, 255, 255, 0.1)',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'header_styles')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data?.setting_value) {
        setStyles(JSON.parse(data.setting_value));
      }
    } catch (error) {
      console.error('Error fetching styles:', error);
      toast.error('Failed to load header styles');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'header_styles',
          setting_value: JSON.stringify(styles),
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;
      toast.success('Header styles updated successfully');
    } catch (error) {
      console.error('Error saving styles:', error);
      toast.error('Failed to save header styles');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Header Style Manager</h1>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Header Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="bg-color"
                  type="color"
                  value={styles.background_color.startsWith('rgba') ? '#0f172a' : styles.background_color}
                  onChange={(e) => setStyles({ ...styles, background_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.background_color}
                  onChange={(e) => setStyles({ ...styles, background_color: e.target.value })}
                  placeholder="rgba(15, 23, 42, 0.95) or #0f172a"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Use hex (#000000), rgb, or rgba values
              </p>
            </div>

            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="text-color"
                  type="color"
                  value={styles.text_color}
                  onChange={(e) => setStyles({ ...styles, text_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.text_color}
                  onChange={(e) => setStyles({ ...styles, text_color: e.target.value })}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="border-color">Border Color</Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="border-color"
                  type="color"
                  value={styles.border_color.startsWith('rgba') ? '#ffffff' : styles.border_color}
                  onChange={(e) => setStyles({ ...styles, border_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  type="text"
                  value={styles.border_color}
                  onChange={(e) => setStyles({ ...styles, border_color: e.target.value })}
                  placeholder="rgba(255, 255, 255, 0.1) or #ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="p-6 rounded-lg border" style={{
              backgroundColor: styles.background_color,
              color: styles.text_color,
              borderColor: styles.border_color,
            }}>
              <h3 className="text-xl font-semibold mb-2">Preview</h3>
              <p>This is how your header colors will look.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default HeaderStyleManager;
