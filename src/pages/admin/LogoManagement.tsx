import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const LogoManagement = () => {
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCurrentLogo();
  }, []);

  const fetchCurrentLogo = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'active_logo_url')
        .single();

      if (error) throw error;
      setCurrentLogo(data?.setting_value || null);
    } catch (error: any) {
      console.error('Error fetching logo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, GIF, WebP, or SVG)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      // Update site settings
      const { error: updateError } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'active_logo_url',
          setting_value: publicUrl
        }, {
          onConflict: 'setting_key'
        });

      if (updateError) throw updateError;

      setCurrentLogo(publicUrl);
      toast({
        title: "Success",
        description: "Logo updated successfully",
      });

      // Reload the page to update the header
      window.location.reload();
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload logo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveLogo = async () => {
    if (!currentLogo) return;

    try {
      // Update site settings to remove logo
      const { error } = await supabase
        .from('site_settings')
        .update({ setting_value: null })
        .eq('setting_key', 'active_logo_url');

      if (error) throw error;

      setCurrentLogo(null);
      toast({
        title: "Success",
        description: "Logo removed successfully",
      });

      // Reload the page to update the header
      window.location.reload();
    } catch (error: any) {
      console.error('Error removing logo:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove logo",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logo Management</h1>
          <p className="text-muted-foreground">Upload and manage your website logo</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Current Logo</CardTitle>
              <CardDescription>The logo currently displayed on your website</CardDescription>
            </CardHeader>
            <CardContent>
              {currentLogo ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 bg-muted rounded-lg">
                    <img
                      src={currentLogo}
                      alt="Current Logo"
                      className="max-h-32 max-w-full object-contain"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    onClick={handleRemoveLogo}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Logo
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No logo uploaded</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload New Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Upload New Logo</CardTitle>
              <CardDescription>
                Supported formats: PNG, JPG, GIF, WebP, SVG (Max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Choose Image</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
              <Button
                onClick={() => document.getElementById('logo-upload')?.click()}
                disabled={uploading}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Logo'}
              </Button>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Recommended size: 200x200px to 400x400px</p>
                <p>• For best results, use a square image with transparent background</p>
                <p>• The logo will be automatically optimized for display</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LogoManagement;
