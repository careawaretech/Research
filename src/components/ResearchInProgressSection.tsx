import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { SectionTagBadge } from "@/components/admin/SectionTagBadge";
import { supabase } from '@/integrations/supabase/client';
import { Headphones, FileText, Video } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoPlayer from '@/components/ui/video-player';

interface HighlightData {
  id: string;
  title: string;
  icon_type: 'upload' | 'lucide';
  icon_url?: string;
  lucide_icon_name?: string;
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

const ResearchInProgressSection = () => {
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState<HighlightData[]>([]);
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  useEffect(() => {
    fetchSection();
    fetchHighlights();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'research-in-progress')
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

  const fetchHighlights = async () => {
    try {
      const { data, error } = await supabase
        .from('research_in_progress_highlights')
        .select('*')
        .eq('visible', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setHighlights((data || []) as HighlightData[]);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (highlight: HighlightData) => {
    if (highlight.icon_type === 'lucide' && highlight.lucide_icon_name) {
      const IconComponent = LucideIcons[highlight.lucide_icon_name as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-5 h-5 text-primary" />;
      }
    }
    if (highlight.icon_url) {
      return <img src={highlight.icon_url} alt={highlight.title} className="w-5 h-5 object-contain" />;
    }
    return null;
  };

  if (loading) return null;

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <SectionTagBadge 
        sectionTag="research-in-progress" 
        adminPath="/admin/research-in-progress"
        enabled={true}
      />
      
      <div className="max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-semibold text-primary">Research in Progress</span>
        </div>

        {/* Main Heading - Matching other sections */}
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {section?.title || 'Building the Future of Privacy-First Care Technology'}
        </h2>

        {/* Description - Matching other sections */}
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          {section?.subtitle || 'Care Aware Tech is a research-driven startup conducting advanced studies on wireless sensing for real-time fall and vital sign detection in assisted living and memory care settings. We\'re transforming innovative ideas into validated technology through grant funding and collaborative partnerships.'}
        </p>

        {/* Action Buttons */}
        {(section?.listen_button?.enabled || section?.read_button?.enabled || section?.watch_button?.enabled) && (
          <div className="flex justify-center gap-4 mb-8">
            {section?.read_button?.enabled && (
              <Button 
                variant="outline" 
                onClick={() => {
                  if (section.read_button?.url) {
                    if (section.read_button.url.startsWith('http')) {
                      window.open(section.read_button.url, '_blank');
                    } else {
                      window.location.href = section.read_button.url;
                    }
                  }
                }}
                disabled={!section.read_button?.url}
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

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
          {highlights.map((highlight) => (
            <div 
              key={highlight.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {renderIcon(highlight)}
              </div>
              <p className="text-sm text-foreground text-left font-medium">
                {highlight.title}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => navigate('/contact')}
            className="text-base"
          >
            Partner With Us
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/technology')}
            className="text-base"
          >
            Explore Our Technology
          </Button>
        </div>

        {/* Footnote */}
        <p className="text-sm text-muted-foreground mt-8 italic">
          Interested in piloting our technology or learning more about our research journey?
        </p>
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

export default ResearchInProgressSection;
