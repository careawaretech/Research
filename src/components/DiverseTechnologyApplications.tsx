import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as LucideIcons from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';

interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon_type: 'upload' | 'lucide';
  icon_url?: string;
  lucide_icon_name?: string;
  background_color?: string;
  text_color?: string;
  border_color?: string;
  bullet_points?: string[];
  display_order: number;
  visible: boolean;
}

const DiverseTechnologyApplications = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('diverse_technology_applications')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCards((data || []) as CardData[]);
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (card: CardData) => {
    if (card.icon_type === 'lucide' && card.lucide_icon_name) {
      const IconComponent = LucideIcons[card.lucide_icon_name as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-10 h-10" />;
      }
    }
    if (card.icon_url) {
      return <img src={card.icon_url} alt={card.title} className="w-10 h-10 object-contain" />;
    }
    return null;
  };

  if (loading) return null;

  return (
    <section className="py-16 bg-background">
      <SectionTagBadge sectionTag="diverse-technology-applications" adminPath="/admin/diverse-technology-applications" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Diverse Technology Applications</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            WiFi sensing technology deployed across multiple care environments - from hospitals to homes, 
            with consistent privacy protection and HIPAA compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg p-6 transition-all duration-300 hover:shadow-lg border"
              style={card.background_color ? {
                backgroundColor: card.background_color,
                color: card.text_color || 'inherit',
                borderColor: card.border_color || 'transparent'
              } : undefined}
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                style={card.background_color ? {
                  backgroundColor: `${card.background_color}dd`,
                  color: card.text_color || 'inherit'
                } : undefined}
              >
                {renderIcon(card)}
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              {card.subtitle && (
                <p className="text-sm opacity-90 mb-4">{card.subtitle}</p>
              )}
              {card.bullet_points && card.bullet_points.length > 0 && (
                <ul className="space-y-2">
                  {card.bullet_points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="mr-2">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiverseTechnologyApplications;
