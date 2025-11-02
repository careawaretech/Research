import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Trash2, Edit2, Search, Image as ImageIcon, Video, Hexagon, FolderPlus, Folder, ChevronRight, Home, ArrowLeft, FileText, X, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

interface MediaFile {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: string;
  page_slug: string | null;
  alt_text: string | null;
  folder_thumbnail_url: string | null;
  created_at: string;
}

interface FolderItem {
  name: string;
  path: string;
  type: 'folder';
  thumbnailUrl: string | null;
}

const PAGE_TABS = [
  { value: 'all', label: 'All Media' },
  { value: 'home', label: 'Home' },
  { value: 'about-us', label: 'About Us' },
  { value: 'technology', label: 'Technology' },
  { value: 'clinical-validation', label: 'Clinical Validation' },
  { value: 'academic-validation', label: 'Academic Validation' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'partners', label: 'Partners' },
  { value: 'roi', label: 'ROI' },
  { value: 'contact', label: 'Contact' },
  { value: 'privacy', label: 'Privacy' },
];

const DEFAULT_PAGE_TABS = [...PAGE_TABS];

// Allow uploading any common media/document type
const ALL_ACCEPT = 'image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';

const FILE_TYPES = [
  { value: 'all', label: 'All Files', accept: ALL_ACCEPT },
  { value: 'images', label: 'Images', accept: 'image/*' },
  { value: 'icons', label: 'Icons', accept: 'image/svg+xml,image/png' },
  { value: 'videos', label: 'Videos', accept: 'video/*' },
  { value: 'documents', label: 'Documents', accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt' },
];

const computeCategory = (file: File): 'images' | 'videos' | 'icons' | 'documents' => {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  if (type.startsWith('video/')) return 'videos';
  if (type === 'image/svg+xml' || name.endsWith('.svg')) return 'icons';
  if (type.startsWith('image/')) return 'images';
  const docExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'];
  if (docExts.some(ext => name.endsWith(ext))) return 'documents';
  // Fallback to documents for unknown types
  return 'documents';
};

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [selectedPage, setSelectedPage] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [currentFolder, setCurrentFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [sectionTags, setSectionTags] = useState<string>('');
  const [searchSection, setSearchSection] = useState('');
  const [renamingFolder, setRenamingFolder] = useState<string | null>(null);
  const [newFolderNameEdit, setNewFolderNameEdit] = useState('');
  const [thumbnailFolder, setThumbnailFolder] = useState<string | null>(null);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [customPages, setCustomPages] = useState<Array<{ value: string; label: string }>>([]);
  const [showAddPageDialog, setShowAddPageDialog] = useState(false);
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageLabel, setNewPageLabel] = useState('');
  const [editingPageSlug, setEditingPageSlug] = useState<string | null>(null);
  const [editPageLabel, setEditPageLabel] = useState('');

  const allPages = [...DEFAULT_PAGE_TABS, ...customPages];

  useEffect(() => {
    fetchMediaFiles();
    loadCustomPages();
  }, []);

  const loadCustomPages = async () => {
    try {
      const defaultSlugs = DEFAULT_PAGE_TABS.map(t => t.value);

      // Prefer loading custom sections from backend so they persist even without media
      const { data, error } = await supabase
        .from('content_pages')
        .select('page_slug, title');

      if (error) throw error;

      const fromPages = (data || [])
        .filter((p: any) => p.page_slug && !defaultSlugs.includes(p.page_slug))
        .map((p: any) => ({
          value: p.page_slug as string,
          label: (p.title as string) ?? (p.page_slug as string)
            .split('-')
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' '),
        }));

      if (fromPages.length > 0) {
        setCustomPages(fromPages);
        return;
      }

      // Fallback: infer from existing media files
      const customSlugs = new Set<string>();
      mediaFiles.forEach(file => {
        if (file.page_slug && !defaultSlugs.includes(file.page_slug)) {
          customSlugs.add(file.page_slug);
        }
      });

      const fallbackList = Array.from(customSlugs).map(slug => ({
        value: slug,
        label: slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      }));

      setCustomPages(fallbackList);
    } catch (e) {
      console.error('Error loading custom pages:', e);
    }
  };

  const handleAddCustomPage = async () => {
    if (!newPageSlug.trim() || !newPageLabel.trim()) {
      toast.error('Please enter both slug and label');
      return;
    }

    const slug = newPageSlug.trim().toLowerCase().replace(/\s+/g, '-');

    if (allPages.some(p => p.value === slug)) {
      toast.error('Page section already exists');
      return;
    }

    try {
      // Persist the new section so it survives refresh and can be used elsewhere
      const { error } = await supabase
        .from('content_pages')
        .insert({ page_slug: slug, title: newPageLabel.trim() });
      if (error) throw error;

      setCustomPages(prev => [...prev, { value: slug, label: newPageLabel.trim() }]);
      setSelectedPage(slug);
      setNewPageSlug('');
      setNewPageLabel('');
      setShowAddPageDialog(false);
      toast.success('Page section added');
    } catch (e) {
      console.error('Error adding page section:', e);
      toast.error('Failed to add page section');
    }
  };

  const handleRenameCustomPage = async () => {
    if (!editingPageSlug || !editPageLabel.trim()) {
      toast.error('Please enter a label');
      return;
    }

    try {
      const { error } = await supabase
        .from('content_pages')
        .update({ title: editPageLabel.trim() })
        .eq('page_slug', editingPageSlug);
      if (error) throw error;

      setCustomPages(prev =>
        prev.map(p => (p.value === editingPageSlug ? { ...p, label: editPageLabel.trim() } : p))
      );
      setEditingPageSlug(null);
      setEditPageLabel('');
      toast.success('Page section renamed');
    } catch (e) {
      console.error('Error renaming page section:', e);
      toast.error('Failed to rename page section');
    }
  };

  const handleDeleteCustomPage = async (pageSlug: string) => {
    if (!confirm(`Delete page section "${pageSlug}"? Media files will remain but won't be associated with this section.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('content_pages')
        .delete()
        .eq('page_slug', pageSlug);
      if (error) throw error;

      setCustomPages(prev => prev.filter(p => p.value !== pageSlug));
      if (selectedPage === pageSlug) {
        setSelectedPage('all');
      }
      toast.success('Page section deleted');
    } catch (e) {
      console.error('Error deleting page section:', e);
      toast.error('Failed to delete page section');
    }
  };

  const fetchMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaFiles((data || []) as unknown as MediaFile[]);
      
      // Reload custom pages when files change
      if (data && data.length > 0) {
        const defaultSlugs = DEFAULT_PAGE_TABS.map(t => t.value);
        const customSlugs = new Set<string>();
        
        data.forEach((file: any) => {
          if (file.page_slug && !defaultSlugs.includes(file.page_slug)) {
            customSlugs.add(file.page_slug);
          }
        });
        
        const customPageList = Array.from(customSlugs).map(slug => ({
          value: slug,
          label: slug.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')
        }));
        
        setCustomPages(customPageList);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const getBasePrefix = () => {
    if (selectedPage === 'all') return '';
    if (selectedFileType === 'all') return `${selectedPage}/`;
    return `${selectedPage}/${selectedFileType}/`;
  };
  const getDirFromPath = (fp: string) => {
    if (selectedPage === 'all') return '';
    const pagePrefix = `${selectedPage}/`;
    if (!fp.startsWith(pagePrefix)) return '';
    const afterPage = fp.slice(pagePrefix.length); // category/dir/file
    const parts = afterPage.split('/');
    if (selectedFileType === 'all') {
      if (parts.length <= 2) return '';
      return parts.slice(1, -1).join('/');
    }
    if (parts[0] !== selectedFileType) return '';
    if (parts.length <= 2) return '';
    return parts.slice(1, -1).join('/');
  };

  const handleCreateFolder = async () => {
    if (selectedPage === 'all') {
      toast.error('Select a specific page first');
      return;
    }
    if (!newFolderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }

    const folderPath = currentFolder ? `${currentFolder}/${newFolderName.trim()}` : newFolderName.trim();
    const placeholderPath = `${selectedPage}/${selectedFileType}/${folderPath}/.folder`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(placeholderPath, new Blob(['folder']), {
          contentType: 'text/plain',
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(placeholderPath);

      const { error: dbError } = await supabase
        .from('media_library')
        .insert({
          file_name: '.folder',
          file_path: placeholderPath,
          file_url: publicUrl,
          file_type: 'text/plain',
          file_size: 0,
          category: selectedFileType,
          page_slug: selectedPage,
          alt_text: null,
        });
      if (dbError) throw dbError;

      toast.success('Folder created successfully');
      setNewFolderName('');
      setShowFolderDialog(false);
      fetchMediaFiles();
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error('Failed to create folder');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, pageSlug: string, _fileType: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const tagsArray = sectionTags.trim() ? sectionTags.split(',').map(t => t.trim()) : [];
      const tagsAlt = tagsArray.length > 0 ? tagsArray.join(', ') : null;

      for (const file of Array.from(files)) {
        const category = computeCategory(file);
        const fileName = `${Date.now()}_${file.name}`;
        const folderPrefix = currentFolder ? `${currentFolder}/` : '';
        const filePath = `${pageSlug}/${category}/${folderPrefix}${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media-library')
          .upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('media-library')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('media_library')
          .insert({
            file_name: file.name,
            file_path: filePath,
            file_url: publicUrl,
            file_type: file.type,
            file_size: file.size,
            category,
            page_slug: pageSlug,
            alt_text: tagsAlt,
          });
        if (dbError) throw dbError;
      }

      toast.success('Files uploaded successfully');
      setSectionTags('');
      fetchMediaFiles();
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRename = async (id: string) => {
    if (!editName.trim()) return;

    try {
      const { error } = await supabase
        .from('media_library')
        .update({ file_name: editName })
        .eq('id', id);

      if (error) throw error;

      toast.success('File renamed successfully');
      setEditingId(null);
      setEditName('');
      fetchMediaFiles();
    } catch (error) {
      console.error('Error renaming:', error);
      toast.error('Failed to rename file');
    }
  };

  const handleDownload = async (file: MediaFile) => {
    try {
      const response = await fetch(file.file_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('File downloaded');
    } catch (error) {
      console.error('Error downloading:', error);
      toast.error('Failed to download file');
    }
  };

  const handleDeleteFolder = async (folderPath: string) => {
    if (!confirm(`Delete folder "${folderPath}" and all its contents?`)) return;
    try {
      // Find all files in this folder (including subfolders)
      const folderFiles = mediaFiles.filter(f => {
        const dir = getDirFromPath(f.file_path);
        return dir === folderPath || dir.startsWith(`${folderPath}/`);
      });
      
      // Delete from storage and database
      for (const file of folderFiles) {
        await supabase.storage.from('media-library').remove([file.file_path]);
        await supabase.from('media_library').delete().eq('id', file.id);
      }
      
      toast.success('Folder deleted');
      fetchMediaFiles();
      if (currentFolder === folderPath || currentFolder.startsWith(`${folderPath}/`)) {
        setCurrentFolder('');
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Failed to delete folder');
    }
  };

  const handleRenameFolder = async (oldPath: string) => {
    if (!newFolderNameEdit.trim()) return;
    
    const parts = oldPath.split('/');
    parts[parts.length - 1] = newFolderNameEdit.trim();
    const newPath = parts.join('/');
    
    try {
      // Find all files in this folder (including the .folder marker)
      const folderFiles = mediaFiles.filter(f => {
        const dir = getDirFromPath(f.file_path);
        return dir === oldPath || dir.startsWith(`${oldPath}/`);
      });
      
      if (folderFiles.length === 0) {
        toast.error('No files found in folder');
        return;
      }
      
      // Move each file to new path
      for (const file of folderFiles) {
        // Get the part of the path after the old folder name
        const dir = getDirFromPath(file.file_path);
        const relativePath = dir === oldPath ? '' : dir.slice(oldPath.length + 1);
        const fileName = file.file_path.split('/').pop() || '';
        
        // Construct the new full path
        const pathParts = file.file_path.split('/');
        const oldFolderIndex = pathParts.findIndex((part, idx) => {
          return pathParts.slice(0, idx + 1).join('/').endsWith(oldPath);
        });
        
        if (oldFolderIndex === -1) continue;
        
        // Build new path by replacing the old folder name
        const newPathParts = [...pathParts];
        newPathParts[oldFolderIndex] = newPath.split('/').pop() || newPath;
        const newFilePath = newPathParts.join('/');
        
        // Move in storage
        const { error: moveError } = await supabase.storage
          .from('media-library')
          .move(file.file_path, newFilePath);
        if (moveError) {
          console.error('Move error:', moveError);
          throw moveError;
        }
        
        // Update database
        const { data: { publicUrl } } = supabase.storage
          .from('media-library')
          .getPublicUrl(newFilePath);
        const { error: updateError } = await supabase.from('media_library')
          .update({ file_path: newFilePath, file_url: publicUrl })
          .eq('id', file.id);
        
        if (updateError) throw updateError;
      }
      
      toast.success('Folder renamed');
      setRenamingFolder(null);
      setNewFolderNameEdit('');
      fetchMediaFiles();
      
      if (currentFolder === oldPath || currentFolder.startsWith(`${oldPath}/`)) {
        setCurrentFolder(newPath);
      }
    } catch (error) {
      console.error('Error renaming folder:', error);
      toast.error('Failed to rename folder. Files may have been moved.');
      fetchMediaFiles(); // Refresh to show current state
    }
  };

  const handleUploadThumbnail = async (folderPath: string, file: File) => {
    setUploadingThumbnail(true);
    try {
      const fileName = `thumbnail_${Date.now()}_${file.name}`;
      const thumbnailPath = `thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(thumbnailPath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media-library')
        .getPublicUrl(thumbnailPath);

      // Find the .folder marker file for this folder
      const folderRecord = mediaFiles.find(f => 
        f.file_name === '.folder' && 
        f.file_path.endsWith(`${folderPath}/.folder`)
      );

      if (folderRecord) {
        const { error: dbError } = await supabase
          .from('media_library')
          .update({ folder_thumbnail_url: publicUrl } as any)
          .eq('id', folderRecord.id);
        if (dbError) throw dbError;
        
        toast.success('Thumbnail uploaded successfully');
      } else {
        toast.error('Folder marker not found. Try creating the folder again.');
      }

      setThumbnailFolder(null);
      fetchMediaFiles();
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      toast.error('Failed to upload thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleRemoveThumbnail = async (folderPath: string) => {
    try {
      const folderRecord = mediaFiles.find(f => 
        f.file_name === '.folder' && 
        f.file_path.endsWith(`${folderPath}/.folder`)
      );

      if (folderRecord) {
        if (folderRecord.folder_thumbnail_url) {
          const thumbnailPath = folderRecord.folder_thumbnail_url.split('/media-library/')[1];
          if (thumbnailPath) {
            await supabase.storage.from('media-library').remove([thumbnailPath]);
          }
        }

        const { error: dbError } = await supabase
          .from('media_library')
          .update({ folder_thumbnail_url: null } as any)
          .eq('id', folderRecord.id);
        if (dbError) throw dbError;
        
        toast.success('Thumbnail removed successfully');
      }

      fetchMediaFiles();
    } catch (error) {
      console.error('Error removing thumbnail:', error);
      toast.error('Failed to remove thumbnail');
    }
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${file.file_name}"?`)) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('media-library')
        .remove([file.file_path]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', file.id);
      if (dbError) throw dbError;

      toast.success('File deleted successfully');
      fetchMediaFiles();
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete file');
    }
  };

  const getFolders = (): FolderItem[] => {
    const folderSet = new Set<string>();
    const filtered = mediaFiles.filter(file => (selectedPage === 'all' ? true : file.page_slug === selectedPage) && (selectedFileType === 'all' ? true : file.category === selectedFileType));

    filtered.forEach(file => {
      const dir = getDirFromPath(file.file_path);
      let relative = currentFolder ? (dir.startsWith(currentFolder) ? dir.slice(currentFolder.length) : '') : dir;
      if (relative.startsWith('/')) relative = relative.slice(1);
      const first = relative.split('/')[0];
      if (first) {
        const full = currentFolder ? `${currentFolder}/${first}` : first;
        folderSet.add(full);
      }
    });

    return Array.from(folderSet).map(path => {
      const folderRecord = mediaFiles.find(f => 
        f.file_name === '.folder' && 
        f.file_path.endsWith(`${path}/.folder`)
      );
      return {
        name: path.split('/').pop() || path,
        path,
        type: 'folder' as const,
        thumbnailUrl: folderRecord?.folder_thumbnail_url || null,
      };
    });
  };

  const filteredFiles = () => {
    let filtered = mediaFiles;

    if (selectedPage !== 'all') {
      filtered = filtered.filter(file => file.page_slug === selectedPage);
    }
    if (selectedFileType !== 'all') {
      filtered = filtered.filter(file => file.category === selectedFileType);
    }

    filtered = filtered.filter(file => {
      if (selectedPage === 'all') {
        return true; // show everything in All Media view
      }
      const dir = getDirFromPath(file.file_path);
      return currentFolder ? dir === currentFolder : dir === '';
    });

    filtered = filtered.filter(file => file.file_name !== '.folder');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(file =>
        file.file_name.toLowerCase().includes(q) || (file.alt_text ?? '').toLowerCase().includes(q)
      );
    }

    if (searchSection) {
      const s = searchSection.toLowerCase();
      filtered = filtered.filter(file => (file.alt_text ?? '').toLowerCase().includes(s));
    }

    return filtered;
  };

  const getFileTypeIcon = (fileType: string) => {
    if (fileType.startsWith('video/')) return <Video className="w-6 h-6" />;
    if (fileType.includes('icon') || fileType === 'image/svg+xml') return <Hexagon className="w-6 h-6" />;
    return <ImageIcon className="w-6 h-6" />;
  };

  const Breadcrumb = () => {
    if (!currentFolder) return null;
    const parts = currentFolder.split('/').filter(Boolean);

    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentFolder('')}
          className="h-8 px-2"
        >
          <Home className="w-4 h-4" />
        </Button>
        {parts.map((part, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentFolder(parts.slice(0, index + 1).join('/'))}
              className="h-8 px-2"
            >
              {part}
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const MediaGrid = () => {
    const files = filteredFiles();
    const folders = getFolders();
    const currentFileType = FILE_TYPES.find(t => t.value === selectedFileType);

    return (
      <div className="space-y-4">
        <Breadcrumb />

        <div className="flex flex-wrap gap-4 items-center">
          {/* New Folder Button opens modal */}
          <Button variant="outline" disabled={selectedPage === 'all'} onClick={() => setShowFolderDialog(true)}>
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>

          <Input
            type="file"
            multiple
            accept={ALL_ACCEPT}
            onChange={(e) => handleUpload(e, selectedPage === 'all' ? 'general' : selectedPage, selectedFileType)}
            className="hidden"
            id="upload-input"
          />
          <Button
            onClick={() => document.getElementById('upload-input')?.click()}
            disabled={uploading || selectedPage === 'all'}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>

          <div className="flex-1 min-w-[240px]">
            <Label htmlFor="section-tags" className="text-sm">Section Tags (comma-separated)</Label>
            <Input
              id="section-tags"
              value={sectionTags}
              onChange={(e) => setSectionTags(e.target.value)}
              placeholder="e.g., Clinical Crisis, Privacy Crisis"
              disabled={selectedPage === 'all'}
            />
          </div>

          {selectedPage === 'all' && (
            <p className="text-sm text-muted-foreground">Select a specific page to upload files</p>
          )}
        </div>

        {folders.length === 0 && files.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            {getFileTypeIcon('')}
            <p className="text-muted-foreground mt-4">No files in this section yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Folders */}
            {folders.map((folder) => (
              <Card key={folder.path} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="aspect-square relative group cursor-pointer overflow-hidden"
                  onClick={() => setCurrentFolder(folder.path)}
                >
                  {folder.thumbnailUrl ? (
                    <>
                      <img
                        src={folder.thumbnailUrl}
                        alt={folder.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white text-sm font-medium truncate">{folder.name}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Folder className="w-16 h-16 text-primary" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); setThumbnailFolder(folder.path); }} title="Set Thumbnail">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    {folder.thumbnailUrl && (
                      <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); handleRemoveThumbnail(folder.path); }} title="Remove Thumbnail">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); setRenamingFolder(folder.path); setNewFolderNameEdit(folder.name); }} title="Rename">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.path); }} title="Delete Folder">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  {renamingFolder === folder.path ? (
                    <div className="flex flex-col gap-2">
                      <Input value={newFolderNameEdit} onChange={(e) => setNewFolderNameEdit(e.target.value)} className="text-sm" autoFocus onKeyDown={(e) => { if (e.key === 'Enter') handleRenameFolder(folder.path); if (e.key === 'Escape') setRenamingFolder(null); }} />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleRenameFolder(folder.path)} className="flex-1">Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setRenamingFolder(null)} className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm font-medium truncate" title={folder.name}><Folder className="w-4 h-4 inline mr-2" />{folder.name}</p>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Files */}
            {files.map((file) => (
              <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative group bg-muted">
                  {file.file_type.startsWith('video/') ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                  ) : file.file_type.startsWith('image/') ? (
                    <img
                      src={file.file_url}
                      alt={file.file_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => handleDownload(file)}
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => {
                        setEditingId(file.id);
                        setEditName(file.file_name);
                      }}
                      title="Rename"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(file)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  {editingId === file.id ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="text-sm"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(file.id);
                          if (e.key === 'Escape') {
                            setEditingId(null);
                            setEditName('');
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleRename(file.id)} className="flex-1">
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(null);
                            setEditName('');
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium truncate" title={file.file_name}>
                        {file.file_name}
                      </p>
                      {file.alt_text && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.alt_text.split(',').map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>{(file.file_size / 1024 / 1024).toFixed(2)} MB</span>
                        <span>{format(new Date(file.created_at), 'MM/dd/yyyy')}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => navigate('/admin/dashboard')}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between flex-wrap gap-4">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Media Library
            </span>
            <div className="flex gap-2 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Input
                placeholder="Filter by section tag..."
                value={searchSection}
                onChange={(e) => setSearchSection(e.target.value)}
                className="w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>

        {/* Centralized Dialog to avoid re-mount flicker */}
        <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                Create a folder under {selectedPage}/{selectedFileType}{currentFolder ? `/${currentFolder}` : ''}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="folder-name">Folder Name</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g., Clinical Crisis"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateFolder} className="flex-1">
                  Create Folder
                </Button>
                <Button variant="outline" onClick={() => setShowFolderDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Thumbnail Upload Dialog */}
        <Dialog open={thumbnailFolder !== null} onOpenChange={(open) => !open && setThumbnailFolder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Folder Thumbnail</DialogTitle>
              <DialogDescription>
                Upload an image to use as the thumbnail for "{thumbnailFolder?.split('/').pop()}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="thumbnail-upload">Choose Image</Label>
                <Input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && thumbnailFolder) {
                      handleUploadThumbnail(thumbnailFolder, file);
                    }
                  }}
                  disabled={uploadingThumbnail}
                />
              </div>
              {uploadingThumbnail && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              <Button variant="outline" onClick={() => setThumbnailFolder(null)} className="w-full" disabled={uploadingThumbnail}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Custom Page Dialog */}
        <Dialog open={showAddPageDialog} onOpenChange={setShowAddPageDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Page Section</DialogTitle>
              <DialogDescription>
                Add a new page section to organize your media files
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="page-label">Display Name</Label>
                <Input
                  id="page-label"
                  value={newPageLabel}
                  onChange={(e) => setNewPageLabel(e.target.value)}
                  placeholder="e.g., Blog Posts"
                />
              </div>
              <div>
                <Label htmlFor="page-slug">Slug (URL-friendly)</Label>
                <Input
                  id="page-slug"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  placeholder="e.g., blog-posts"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddCustomPage} className="flex-1">
                  Add Section
                </Button>
                <Button variant="outline" onClick={() => setShowAddPageDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rename Custom Page Dialog */}
        <Dialog open={!!editingPageSlug} onOpenChange={(open) => !open && setEditingPageSlug(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename Page Section</DialogTitle>
              <DialogDescription>
                Change the display name for this page section
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-page-label">Display Name</Label>
                <Input
                  id="edit-page-label"
                  value={editPageLabel}
                  onChange={(e) => setEditPageLabel(e.target.value)}
                  placeholder="e.g., Blog Posts"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRenameCustomPage} className="flex-1">
                  Rename
                </Button>
                <Button variant="outline" onClick={() => setEditingPageSlug(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <CardContent>
          {/* Page Tabs */}
          <Tabs value={selectedPage} onValueChange={setSelectedPage}>
            <div className="flex items-center justify-between mb-4">
              <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-muted/50 p-2">
                {allPages.map((tab) => {
                  const isCustom = customPages.some(cp => cp.value === tab.value);
                  return (
                    <div key={tab.value} className="relative group">
                      <TabsTrigger value={tab.value} className="text-sm">
                        {tab.label}
                      </TabsTrigger>
                      {isCustom && (
                        <div className="absolute -top-1 -right-1 hidden group-hover:flex gap-0.5 bg-background border rounded shadow-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPageSlug(tab.value);
                              setEditPageLabel(tab.label);
                            }}
                            className="p-0.5 hover:bg-muted rounded"
                            title="Rename"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomPage(tab.value);
                            }}
                            className="p-0.5 hover:bg-destructive hover:text-destructive-foreground rounded"
                            title="Delete"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddPageDialog(true)}
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Page Section
              </Button>
            </div>

            {/* File Type Sub-tabs */}
            <div className="mt-6">
              <Tabs value={selectedFileType} onValueChange={setSelectedFileType}>
                <TabsList className="mb-4">
                  {FILE_TYPES.map((type) => (
                    <TabsTrigger key={type.value} value={type.value}>
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedFileType} className="mt-0">
                  <MediaGrid />
                </TabsContent>
              </Tabs>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibrary;
