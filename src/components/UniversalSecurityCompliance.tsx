import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';
import { Headphones, FileText, Video, Shield } from 'lucide-react';

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

interface SectionData {
  title: string;
  subtitle: string;
  listen_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  read_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
  watch_button?: {
    text: string;
    url: string;
    enabled: boolean;
  };
}

const UniversalSecurityCompliance = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSection();
    fetchCards();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'universal-security-compliance')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('universal_security_compliance')
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
    <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
      <SectionTagBadge sectionTag="universal-security-compliance" adminPath="/admin/universal-security-compliance" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {section?.title || 'Universal Security & Compliance'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {section?.subtitle || 'Regardless of deployment environment, your data remains secure, private, and fully compliant with healthcare regulations.'}
          </p>
          
          {/* Action Buttons */}
          {(section?.listen_button?.enabled || section?.read_button?.enabled || section?.watch_button?.enabled) && (
            <div className="flex justify-center gap-4 mt-6">
              {section?.listen_button?.enabled && (
                <Button 
                  variant="outline" 
                  onClick={() => section.listen_button?.url && window.open(section.listen_button.url, '_blank')}
                  disabled={!section.listen_button?.url}
                  className="flex items-center gap-2"
                >
                  <Headphones className="w-4 h-4" />
                  {section.listen_button.text}
                </Button>
              )}
              {section?.read_button?.enabled && (
                <Button 
                  variant="outline" 
                  onClick={() => section.read_button?.url && window.open(section.read_button.url, '_blank')}
                  disabled={!section.read_button?.url}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {section.read_button.text}
                </Button>
              )}
              {section?.watch_button?.enabled && (
                <Button 
                  variant="outline" 
                  onClick={() => section.watch_button?.url && window.open(section.watch_button.url, '_blank')}
                  disabled={!section.watch_button?.url}
                  className="flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  {section.watch_button.text}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg border"
              style={card.background_color ? {
                backgroundColor: card.background_color,
                color: card.text_color || 'inherit',
                borderColor: card.border_color || 'rgba(255,255,255,0.2)'
              } : {
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderColor: 'rgba(255,255,255,0.2)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto"
                style={card.background_color ? {
                  backgroundColor: `${card.background_color}dd`,
                  color: card.text_color || 'inherit'
                } : {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }}
              >
                {renderIcon(card)}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{card.title}</h3>
              {card.subtitle && (
                <p className="text-sm opacity-90 mb-4 text-center">{card.subtitle}</p>
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

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <Shield className="w-5 h-5 text-primary" />
          <p>Our commitment to security is unwavering across all deployment environments</p>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Download Security Whitepaper
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UniversalSecurityCompliance;
