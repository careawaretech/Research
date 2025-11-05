import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Image, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  accept: string;
  bucketName: string;
  fileType: 'image' | 'pdf';
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label,
  value,
  onChange,
  accept,
  bucketName,
  fileType
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = fileType === 'image' 
      ? ['image/png', 'image/jpeg', 'image/jpg']
      : ['application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error(`Please upload ${fileType === 'image' ? 'PNG or JPG' : 'PDF'} files only`);
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileType}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success(`${fileType === 'image' ? 'Image' : 'PDF'} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error);
      toast.error(`Failed to upload ${fileType}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept={accept}
          onChange={handleFileUpload}
          disabled={uploading}
        />
        {fileType === 'image' ? (
          <Image className="w-5 h-5 text-muted-foreground" />
        ) : (
          <FileText className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      {value && (
        <div className="mt-2">
          {fileType === 'image' ? (
            <img src={value} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />
          ) : (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View PDF
            </a>
          )}
        </div>
      )}
      <Input
        placeholder="Or paste URL directly"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2"
      />
    </div>
  );
};
