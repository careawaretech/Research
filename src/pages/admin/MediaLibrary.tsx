import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Trash2, Edit2, Search, Image as ImageIcon, Video, Hexagon, FolderPlus, Folder, ChevronRight, Home, ArrowLeft } from 'lucide-react';
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
  created_at: string;
}

interface FolderItem {
  name: string;
  path: string;
  type: 'folder';
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

const FILE_TYPES = [
  { value: 'images', label: 'Images', accept: 'image/*' },
  { value: 'icons', label: 'Icons', accept: 'image/svg+xml,image/png' },
  { value: 'videos', label: 'Videos', accept: 'video/*' },
];

const MediaLibrary = () => {
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [selectedPage, setSelectedPage] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('images');
  const [currentFolder, setCurrentFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [sectionTags, setSectionTags] = useState<string>('');
  const [searchSection, setSearchSection] = useState('');

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const getBasePrefix = () => `${selectedPage}/${selectedFileType}/`;
  const getDirFromPath = (fp: string) => {
    const base = getBasePrefix();
    if (selectedPage === 'all') return '';
    if (!fp.startsWith(base)) return '';
    const remainder = fp.slice(base.length);
    const parts = remainder.split('/');
    if (parts.length <= 1) return '';
    return parts.slice(0, -1).join('/');
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, pageSlug: string, fileType: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const tagsArray = sectionTags.trim() ? sectionTags.split(',').map(t => t.trim()) : [];
      const tagsAlt = tagsArray.length > 0 ? tagsArray.join(', ') : null;

      for (const file of Array.from(files)) {
        const fileName = `${Date.now()}_${file.name}`;
        const folderPrefix = currentFolder ? `${currentFolder}/` : '';
        const filePath = `${pageSlug}/${fileType}/${folderPrefix}${fileName}`;

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
            category: fileType,
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
    const filtered = mediaFiles.filter(file => (selectedPage === 'all' ? true : file.page_slug === selectedPage) && file.category === selectedFileType);

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

    return Array.from(folderSet).map(path => ({
      name: path.split('/').pop() || path,
      path,
      type: 'folder' as const,
    }));
  };

  const filteredFiles = () => {
    let filtered = mediaFiles;

    if (selectedPage !== 'all') {
      filtered = filtered.filter(file => file.page_slug === selectedPage);
    }
    filtered = filtered.filter(file => file.category === selectedFileType);

    filtered = filtered.filter(file => {
      if (selectedPage === 'all') {
        // When viewing all pages, show top-level only
        return !file.file_path.includes('/') ? true : true;
      }
      const dir = getDirFromPath(file.file_path);
      return currentFolder ? dir === currentFolder : dir === '';
    });

    // Exclude folder placeholder entries from file cards
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
            accept={currentFileType?.accept || '*/*'}
            onChange={(e) => handleUpload(e, selectedPage === 'all' ? 'general' : selectedPage, selectedFileType)}
            className="hidden"
            id="upload-input"
          />
          <Button
            onClick={() => document.getElementById('upload-input')?.click()}
            disabled={uploading || selectedPage === 'all'}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : `Upload ${currentFileType?.label || 'Files'}`}
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
            <p className="text-muted-foreground mt-4">No {currentFileType?.label.toLowerCase()} in this section yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Folders */}
            {folders.map((folder) => (
              <Card
                key={folder.path}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setCurrentFolder(folder.path)}
              >
                <div className="aspect-square relative group bg-muted flex items-center justify-center">
                  <Folder className="w-16 h-16 text-primary" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate" title={folder.name}>
                    <Folder className="w-4 h-4 inline mr-2" />
                    {folder.name}
                  </p>
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
                  ) : (
                    <img
                      src={file.file_url}
                      alt={file.file_name}
                      className="w-full h-full object-cover"
                    />
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
          onClick={() => navigate('/admin')}
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

        <CardContent>
          {/* Page Tabs */}
          <Tabs value={selectedPage} onValueChange={setSelectedPage}>
            <TabsList className="w-full flex flex-wrap h-auto justify-start gap-1 bg-muted/50 p-2">
              {PAGE_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

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
