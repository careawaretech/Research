import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

interface IconPickerProps {
  value: {
    iconType: 'upload' | 'lucide';
    iconUrl?: string;
    lucideIconName?: string;
  };
  onChange: (value: { iconType: 'upload' | 'lucide'; iconUrl?: string; lucideIconName?: string }) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);

  const lucideIconNames = Object.keys(LucideIcons).filter(
    (name) => name !== 'createLucideIcon' && name !== 'default'
  );

  const filteredIcons = lucideIconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      toast.error('Please upload PNG or JPG files only');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `icons/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('media-library')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      onChange({
        iconType: 'upload',
        iconUrl: publicUrl,
        lucideIconName: undefined,
      });

      toast.success('Icon uploaded successfully');
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast.error('Failed to upload icon');
    } finally {
      setUploading(false);
    }
  };

  const handleLucideIconSelect = (iconName: string) => {
    onChange({
      iconType: 'lucide',
      iconUrl: undefined,
      lucideIconName: iconName,
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    if (!IconComponent) return null;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={value.iconType} onValueChange={(v) => onChange({ ...value, iconType: v as 'upload' | 'lucide' })}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Icon</TabsTrigger>
          <TabsTrigger value="lucide">Lucide Icons</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div>
            <Label htmlFor="icon-upload">Upload Icon (PNG/JPG)</Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                id="icon-upload"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
            {value.iconUrl && (
              <div className="mt-2">
                <img src={value.iconUrl} alt="Selected icon" className="w-16 h-16 rounded-lg object-cover" />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lucide" className="space-y-4">
          <div>
            <Label htmlFor="icon-search">Search Lucide Icons</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="icon-search"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto p-2 border rounded-lg">
            {filteredIcons.slice(0, 100).map((iconName) => (
              <button
                key={iconName}
                onClick={() => handleLucideIconSelect(iconName)}
                className={`p-2 rounded hover:bg-accent transition-colors ${
                  value.lucideIconName === iconName ? 'bg-accent ring-2 ring-primary' : ''
                }`}
                title={iconName}
              >
                {renderIcon(iconName)}
              </button>
            ))}
          </div>
          {value.lucideIconName && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Selected:</span>
              {renderIcon(value.lucideIconName)}
              <span className="text-sm">{value.lucideIconName}</span>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
