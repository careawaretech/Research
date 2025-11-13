import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';
import { Button } from '@/components/ui/button';
import { Headphones, FileText, Video } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoPlayer from '@/components/ui/video-player';

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

const DiverseTechnologyApplications = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardData[]>([]);
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  useEffect(() => {
    fetchSection();
    fetchCards();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'diverse-technology-applications')
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
    <section className="relative py-16 bg-background">
      <SectionTagBadge sectionTag="diverse-technology-applications" adminPath="/admin/diverse-technology-applications" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {section?.title || 'Diverse Technology Applications'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {section?.subtitle || 'WiFi sensing technology deployed across multiple care environments - from hospitals to homes, with consistent privacy protection and HIPAA compliance.'}
          </p>
          
          {/* Action Buttons */}
          {(section?.listen_button?.enabled || section?.read_button?.enabled || section?.watch_button?.enabled) && (
            <div className="flex justify-center gap-4 mt-6">
              {section?.read_button?.enabled && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/technology-deployments')}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {section.read_button.text || 'Read More'}
                </Button>
              )}
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
              {section?.watch_button?.enabled && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (section.watch_button?.url) {
                      const url = section.watch_button.url;
                      const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/media-library/');
                      
                      if (isVideoFile) {
                        setCurrentVideoUrl(url);
                        setVideoModalOpen(true);
                      } else {
                        window.open(url, '_blank');
                      }
                    }
                  }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="animated-border-card transition-all duration-300 hover:scale-105"
            >
              <div className="card-border"></div>
              
              <div className="card-icon-container">
                {renderIcon(card)}
              </div>
              
              <h3 className="card-title">{card.title}</h3>
              
              {card.subtitle && (
                <p className="card-subtitle">{card.subtitle}</p>
              )}
              
              {card.bullet_points && card.bullet_points.length > 0 && (
                <>
                  <hr className="card-divider" />
                  <ul className="card-list">
                    {card.bullet_points.map((point, idx) => (
                      <li key={idx} className="card-list-item">
                        <div className="card-check">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        </div>
                        <span className="card-list-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-5xl p-6 bg-transparent border-none">
          {currentVideoUrl && <VideoPlayer src={currentVideoUrl} onClose={() => setVideoModalOpen(false)} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DiverseTechnologyApplications;
