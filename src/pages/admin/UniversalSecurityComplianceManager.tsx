import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { IconPicker } from '@/components/admin/IconPicker';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_type: 'upload' | 'lucide';
  icon_url?: string;
  lucide_icon_name?: string;
  background_color: string;
  text_color: string;
  border_color: string;
  bullet_points: string[];
  display_order: number;
  visible: boolean;
}

const UniversalSecurityComplianceManager = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [newBulletPoint, setNewBulletPoint] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('universal_security_compliance')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCards((data || []) as CardData[]);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        newOrder.forEach(async (card, index) => {
          await supabase
            .from('universal_security_compliance')
            .update({ display_order: index })
            .eq('id', card.id);
        });

        return newOrder;
      });
      toast.success('Order updated');
    }
  };

  const handleAddCard = () => {
    const newCard: CardData = {
      id: crypto.randomUUID(),
      title: 'New Security Feature',
      subtitle: 'Add subtitle',
      description: '',
      icon_type: 'upload',
      background_color: 'rgba(59, 130, 246, 0.1)',
      text_color: '#ffffff',
      border_color: 'rgba(255, 255, 255, 0.2)',
      bullet_points: [],
      display_order: cards.length,
      visible: true,
    };
    setEditingCard(newCard);
  };

  const handleSaveCard = async () => {
    if (!editingCard) return;

    try {
      const isNew = !cards.find((c) => c.id === editingCard.id);
      
      if (isNew) {
        const { error } = await supabase
          .from('universal_security_compliance')
          .insert([editingCard]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('universal_security_compliance')
          .update(editingCard)
          .eq('id', editingCard.id);
        if (error) throw error;
      }

      toast.success('Card saved successfully');
      setEditingCard(null);
      fetchCards();
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Failed to save card');
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const { error } = await supabase
        .from('universal_security_compliance')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Card deleted successfully');
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const handleToggleVisibility = async (card: CardData) => {
    try {
      const { error } = await supabase
        .from('universal_security_compliance')
        .update({ visible: !card.visible })
        .eq('id', card.id);

      if (error) throw error;
      toast.success(`Card ${!card.visible ? 'shown' : 'hidden'}`);
      fetchCards();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const addBulletPoint = () => {
    if (!editingCard || !newBulletPoint.trim()) return;
    setEditingCard({
      ...editingCard,
      bullet_points: [...editingCard.bullet_points, newBulletPoint.trim()],
    });
    setNewBulletPoint('');
  };

  const removeBulletPoint = (index: number) => {
    if (!editingCard) return;
    setEditingCard({
      ...editingCard,
      bullet_points: editingCard.bullet_points.filter((_, i) => i !== index),
    });
  };

  const SortableCard = ({ card }: { card: CardData }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.subtitle}</p>
        </div>
        <Switch checked={card.visible} onCheckedChange={() => handleToggleVisibility(card)} />
        <Button variant="outline" size="sm" onClick={() => setEditingCard(card)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => handleDeleteCard(card.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Universal Security & Compliance</h1>
          <Button onClick={handleAddCard}>
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>

        {editingCard ? (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">
              {cards.find((c) => c.id === editingCard.id) ? 'Edit' : 'New'} Card
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={editingCard.subtitle}
                  onChange={(e) => setEditingCard({ ...editingCard, subtitle: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={editingCard.description}
                onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
              />
            </div>

            <div>
              <Label>Icon</Label>
              <IconPicker
                value={{
                  iconType: editingCard.icon_type,
                  iconUrl: editingCard.icon_url,
                  lucideIconName: editingCard.lucide_icon_name,
                }}
                onChange={(value) =>
                  setEditingCard({
                    ...editingCard,
                    icon_type: value.iconType,
                    icon_url: value.iconUrl,
                    lucide_icon_name: value.lucideIconName,
                  })
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={editingCard.background_color}
                  onChange={(e) => setEditingCard({ ...editingCard, background_color: e.target.value })}
                />
              </div>
              <div>
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={editingCard.text_color}
                  onChange={(e) => setEditingCard({ ...editingCard, text_color: e.target.value })}
                />
              </div>
              <div>
                <Label>Border Color</Label>
                <Input
                  type="color"
                  value={editingCard.border_color}
                  onChange={(e) => setEditingCard({ ...editingCard, border_color: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>Bullet Points</Label>
              <div className="space-y-2">
                {editingCard.bullet_points.map((point, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input value={point} readOnly />
                    <Button variant="destructive" size="sm" onClick={() => removeBulletPoint(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add bullet point"
                    value={newBulletPoint}
                    onChange={(e) => setNewBulletPoint(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBulletPoint()}
                  />
                  <Button onClick={addBulletPoint}>Add</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveCard}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditingCard(null)}>
                Cancel
              </Button>
            </div>
          </Card>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {cards.map((card) => (
                  <SortableCard key={card.id} card={card} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </AdminLayout>
  );
};

export default UniversalSecurityComplianceManager;
