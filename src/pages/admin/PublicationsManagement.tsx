import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, FileText, Download, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  citation_count: number;
  badges: string[];
  tags: string[];
  pdf_url: string | null;
  pdf_path: string | null;
  citation_text: string | null;
  abstract: string | null;
  doi: string | null;
  project_link: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function PublicationsManagement() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [selectedPublications, setSelectedPublications] = useState<string[]>([]);
  
  // Dynamic badges and tags from all publications
  const [availableBadges, setAvailableBadges] = useState<string[]>(['High Impact', 'Featured', 'Open Access', 'Peer Reviewed']);
  const [availableTags, setAvailableTags] = useState<string[]>(['Radar', 'WiFi', 'Fall Detection', 'Privacy']);
  const [newBadge, setNewBadge] = useState('');
  const [newTag, setNewTag] = useState('');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    citation_count: 0,
    badges: [] as string[],
    tags: [] as string[],
    citation_text: '',
    abstract: '',
    doi: '',
    project_link: '',
    featured: false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [publications, searchQuery, yearFilter, tagFilter, badgeFilter]);

  useEffect(() => {
    // Extract unique badges and tags from all publications
    const allBadges = new Set(availableBadges);
    const allTags = new Set(availableTags);
    
    publications.forEach(pub => {
      pub.badges.forEach(badge => allBadges.add(badge));
      pub.tags.forEach(tag => allTags.add(tag));
    });
    
    setAvailableBadges(Array.from(allBadges));
    setAvailableTags(Array.from(allTags));
  }, [publications]);

  const fetchPublications = async () => {
    try {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPublications(data || []);
    } catch (error) {
      console.error('Error fetching publications:', error);
      toast.error('Failed to load publications');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...publications];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(pub =>
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some(author => author.toLowerCase().includes(query)) ||
        pub.journal.toLowerCase().includes(query)
      );
    }

    // Year filter
    if (yearFilter !== 'all') {
      filtered = filtered.filter(pub => pub.year.toString() === yearFilter);
    }

    // Tag filter
    if (tagFilter !== 'all') {
      filtered = filtered.filter(pub => pub.tags.includes(tagFilter));
    }

    // Badge filter
    if (badgeFilter !== 'all') {
      filtered = filtered.filter(pub => pub.badges.includes(badgeFilter));
    }

    setFilteredPublications(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let pdfUrl = editingPublication?.pdf_url || null;
      let pdfPath = editingPublication?.pdf_path || null;

      // Upload PDF if new file selected
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('publication-pdfs')
          .upload(filePath, pdfFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('publication-pdfs')
          .getPublicUrl(filePath);

        pdfUrl = urlData.publicUrl;
        pdfPath = filePath;

        // Delete old PDF if editing
        if (editingPublication?.pdf_path) {
          await supabase.storage
            .from('publication-pdfs')
            .remove([editingPublication.pdf_path]);
        }
      }

      const publicationData = {
        ...formData,
        authors: formData.authors.split(',').map(a => a.trim()).filter(a => a),
        pdf_url: pdfUrl,
        pdf_path: pdfPath,
      };

      if (editingPublication) {
        const { error } = await supabase
          .from('publications')
          .update(publicationData)
          .eq('id', editingPublication.id);

        if (error) throw error;
        toast.success('Publication updated successfully');
      } else {
        const { error } = await supabase
          .from('publications')
          .insert([publicationData]);

        if (error) throw error;
        toast.success('Publication added successfully');
      }

      setDialogOpen(false);
      resetForm();
      fetchPublications();
    } catch (error) {
      console.error('Error saving publication:', error);
      toast.error('Failed to save publication');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this publication?')) return;

    try {
      const pub = publications.find(p => p.id === id);
      
      // Delete PDF from storage if exists
      if (pub?.pdf_path) {
        await supabase.storage
          .from('publication-pdfs')
          .remove([pub.pdf_path]);
      }

      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Publication deleted successfully');
      fetchPublications();
    } catch (error) {
      console.error('Error deleting publication:', error);
      toast.error('Failed to delete publication');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPublications.length === 0) {
      toast.error('No publications selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedPublications.length} publications?`)) return;

    try {
      // Delete PDFs from storage
      const pdfPaths = publications
        .filter(p => selectedPublications.includes(p.id) && p.pdf_path)
        .map(p => p.pdf_path!);

      if (pdfPaths.length > 0) {
        await supabase.storage
          .from('publication-pdfs')
          .remove(pdfPaths);
      }

      const { error } = await supabase
        .from('publications')
        .delete()
        .in('id', selectedPublications);

      if (error) throw error;
      toast.success(`${selectedPublications.length} publications deleted`);
      setSelectedPublications([]);
      fetchPublications();
    } catch (error) {
      console.error('Error bulk deleting:', error);
      toast.error('Failed to delete publications');
    }
  };

  const openEditDialog = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title,
      authors: publication.authors.join(', '),
      journal: publication.journal,
      year: publication.year,
      citation_count: publication.citation_count,
      badges: publication.badges,
      tags: publication.tags,
      citation_text: publication.citation_text || '',
      abstract: publication.abstract || '',
      doi: publication.doi || '',
      project_link: publication.project_link || '',
      featured: publication.featured,
    });
    setPdfFile(null);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPublication(null);
    setFormData({
      title: '',
      authors: '',
      journal: '',
      year: new Date().getFullYear(),
      citation_count: 0,
      badges: [],
      tags: [],
      citation_text: '',
      abstract: '',
      doi: '',
      project_link: '',
      featured: false,
    });
    setPdfFile(null);
  };

  const toggleBadge = (badge: string) => {
    setFormData(prev => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge]
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const toggleSelectAll = () => {
    if (selectedPublications.length === filteredPublications.length) {
      setSelectedPublications([]);
    } else {
      setSelectedPublications(filteredPublications.map(p => p.id));
    }
  };

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citation_count, 0);
  const uniqueYears = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);

  return (
    <AdminLayout>
    <div className="container mx-auto p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Citations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCitations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publications.filter(p => p.featured).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">With PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{publications.filter(p => p.pdf_url).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Publications Management</h1>
          <p className="text-muted-foreground">Manage research publications, PDFs, and metadata</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPublication ? 'Edit Publication' : 'Add New Publication'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authors">Authors * (comma-separated)</Label>
                <Input
                  id="authors"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="John Doe, Jane Smith"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="journal">Journal *</Label>
                  <Input
                    id="journal"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="citation_count">Citation Count</Label>
                <Input
                  id="citation_count"
                  type="number"
                  value={formData.citation_count}
                  onChange={(e) => setFormData({ ...formData, citation_count: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label>Badges</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {availableBadges.map(badge => (
                    <Badge
                      key={badge}
                      variant={formData.badges.includes(badge) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleBadge(badge)}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new badge"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newBadge.trim() && !availableBadges.includes(newBadge.trim())) {
                          setAvailableBadges([...availableBadges, newBadge.trim()]);
                          toggleBadge(newBadge.trim());
                          setNewBadge('');
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (newBadge.trim() && !availableBadges.includes(newBadge.trim())) {
                        setAvailableBadges([...availableBadges, newBadge.trim()]);
                        toggleBadge(newBadge.trim());
                        setNewBadge('');
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={formData.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newTag.trim() && !availableTags.includes(newTag.trim())) {
                          setAvailableTags([...availableTags, newTag.trim()]);
                          toggleTag(newTag.trim());
                          setNewTag('');
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (newTag.trim() && !availableTags.includes(newTag.trim())) {
                        setAvailableTags([...availableTags, newTag.trim()]);
                        toggleTag(newTag.trim());
                        setNewTag('');
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf">PDF File</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                />
                {editingPublication?.pdf_url && (
                  <p className="text-sm text-muted-foreground">Current PDF: {editingPublication.pdf_path}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="abstract">Abstract</Label>
                <Textarea
                  id="abstract"
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="citation_text">Citation Text</Label>
                <Textarea
                  id="citation_text"
                  value={formData.citation_text}
                  onChange={(e) => setFormData({ ...formData, citation_text: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doi">DOI Link</Label>
                  <Input
                    id="doi"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    placeholder="https://doi.org/..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_link">Project Link</Label>
                  <Input
                    id="project_link"
                    value={formData.project_link}
                    onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <Label htmlFor="featured" className="cursor-pointer">Mark as Featured</Label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingPublication ? 'Update' : 'Add')} Publication
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {uniqueYears.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {availableTags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={badgeFilter} onValueChange={setBadgeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Badges</SelectItem>
                {availableBadges.map(badge => (
                  <SelectItem key={badge} value={badge}>{badge}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedPublications.length > 0 && (
        <div className="flex items-center gap-4 bg-muted p-4 rounded-lg">
          <span className="text-sm font-medium">{selectedPublications.length} selected</span>
          <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}

      {/* Publications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedPublications.length === filteredPublications.length && filteredPublications.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-4 text-left font-medium">Title</th>
                  <th className="p-4 text-left font-medium">Authors</th>
                  <th className="p-4 text-left font-medium">Journal</th>
                  <th className="p-4 text-left font-medium">Year</th>
                  <th className="p-4 text-left font-medium">Citations</th>
                  <th className="p-4 text-left font-medium">Tags</th>
                  <th className="p-4 text-left font-medium">PDF</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      Loading publications...
                    </td>
                  </tr>
                ) : filteredPublications.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-muted-foreground">
                      No publications found
                    </td>
                  </tr>
                ) : (
                  filteredPublications.map((publication) => (
                    <tr key={publication.id} className="border-t hover:bg-muted/50">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedPublications.includes(publication.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPublications([...selectedPublications, publication.id]);
                            } else {
                              setSelectedPublications(selectedPublications.filter(id => id !== publication.id));
                            }
                          }}
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{publication.title}</div>
                        {publication.featured && (
                          <Badge variant="secondary" className="mt-1">Featured</Badge>
                        )}
                      </td>
                      <td className="p-4 text-sm">{publication.authors.slice(0, 2).join(', ')}{publication.authors.length > 2 && '...'}</td>
                      <td className="p-4 text-sm">{publication.journal}</td>
                      <td className="p-4 text-sm">{publication.year}</td>
                      <td className="p-4 text-sm">{publication.citation_count}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {publication.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        {publication.pdf_url ? (
                          <a href={publication.pdf_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">No PDF</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(publication)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(publication.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
