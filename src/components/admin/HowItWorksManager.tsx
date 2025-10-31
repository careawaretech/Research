import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface HowItWorksCard {
  id: string;
  title: string;
  description: string | null;
  icon_url: string | null;
  display_order: number;
  is_active: boolean;
}

const HowItWorksManager = () => {
  const [cards, setCards] = useState<HowItWorksCard[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<HowItWorksCard | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_url: '',
    display_order: 0,
    is_active: true,
  });

  const fetchCards = async () => {
    const { data, error } = await supabase
      .from('how_it_works_cards')
      .select('*')
      .order('display_order');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch cards',
        variant: 'destructive',
      });
      return;
    }

    setCards(data || []);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleOpenDialog = (card?: HowItWorksCard) => {
    if (card) {
      setEditing(card);
      setFormData({
        title: card.title,
        description: card.description || '',
        icon_url: card.icon_url || '',
        display_order: card.display_order,
        is_active: card.is_active,
      });
    } else {
      setEditing(null);
      setFormData({
        title: '',
        description: '',
        icon_url: '',
        display_order: cards.length + 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError, data } = await supabase.storage
        .from('how-it-works-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('how-it-works-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, icon_url: publicUrl }));
      
      toast({
        title: 'Success',
        description: 'Icon uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading icon:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload icon',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        variant: 'destructive',
      });
      return;
    }

    const data = {
      title: formData.title,
      description: formData.description || null,
      icon_url: formData.icon_url || null,
      display_order: formData.display_order,
      is_active: formData.is_active,
    };

    if (editing) {
      const { error } = await supabase
        .from('how_it_works_cards')
        .update(data)
        .eq('id', editing.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update card',
          variant: 'destructive',
        });
        return;
      }
    } else {
      const { error } = await supabase
        .from('how_it_works_cards')
        .insert([data]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create card',
          variant: 'destructive',
        });
        return;
      }
    }

    toast({
      title: 'Success',
      description: `Card ${editing ? 'updated' : 'created'} successfully`,
    });

    setIsDialogOpen(false);
    fetchCards();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from('how_it_works_cards')
      .delete()
      .eq('id', deleteId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete card',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Success',
      description: 'Card deleted successfully',
    });

    setIsDeleteDialogOpen(false);
    setDeleteId(null);
    fetchCards();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">How It Works Cards</h2>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell>
                {card.icon_url ? (
                  <img src={card.icon_url} alt={card.title} className="w-8 h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 border border-dashed rounded" />
                )}
              </TableCell>
              <TableCell className="font-medium">{card.title}</TableCell>
              <TableCell className="max-w-xs truncate">{card.description}</TableCell>
              <TableCell>{card.display_order}</TableCell>
              <TableCell>
                <span className={card.is_active ? 'text-green-600' : 'text-gray-400'}>
                  {card.is_active ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(card)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeleteId(card.id);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Card</DialogTitle>
            <DialogDescription>
              {editing ? 'Update the card details below.' : 'Add a new card to the How It Works section.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter card title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter card description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="icon">Icon (Recommended: 64x64px)</Label>
              <div className="space-y-2">
                {formData.icon_url && (
                  <div className="flex items-center gap-4">
                    <img src={formData.icon_url} alt="Preview" className="w-16 h-16 object-contain border rounded" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, icon_url: '' }))}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  disabled={uploading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the card.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HowItWorksManager;
