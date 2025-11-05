import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ShaderBackground from '@/components/ui/shader-background';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Headphones, Play, Pause, Square, BookOpen, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
interface SliderItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  order: number;
  title?: string;
  status?: string;
}
interface Card {
  id: string;
  title: string;
  subtitle: string;
  icon_url?: string;
  button_text?: string;
  button_url?: string;
  button_enabled?: boolean;
  audio_url?: string;
  audio_duration?: string;
}
interface HeroData {
  content: {
    title: string | null;
    subtitle: string | null;
    button_text?: string | null;
    button_url?: string | null;
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
    metadata: {
      slider?: SliderItem[];
      cards?: Card[];
      secondary_title?: string;
      rotating_titles?: string[];
    };
  };
}
interface HeroSectionProps {
  pageSlug?: string;
}

const HeroSection = ({ pageSlug = 'home' }: HeroSectionProps) => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    fetchHeroData();
  }, [pageSlug]);

  const fetchHeroData = async () => {
    try {
      console.log('🔍 Fetching hero data for page slug:', pageSlug);
      
      // First get the page ID from the slug
      const { data: pageData, error: pageError } = await (supabase as any)
        .from('content_pages')
        .select('id')
        .eq('page_slug', pageSlug)
        .maybeSingle();

      if (pageError) throw pageError;
      if (!pageData) {
        console.warn(`No page found for slug: ${pageSlug}`);
        setLoading(false);
        return;
      }

      console.log('📄 Page data:', pageData);

      // Then fetch the hero section for this page
      const { data, error } = await (supabase as any)
        .from('page_sections')
        .select('*')
        .eq('page_id', pageData.id)
        .eq('section_type', 'hero')
        .maybeSingle();

      if (error) throw error;
      
      console.log('🎯 Hero section data:', data);
      
      if (data) {
        // Ensure content structure exists
        if (!data.content) {
          data.content = {
            title: '',
            subtitle: '',
            metadata: { slider: [], cards: [], secondary_title: '', rotating_titles: [] },
          };
        }
        setHeroData(data);
        console.log('✅ Title:', data.content?.title);
        console.log('✅ Subtitle:', data.content?.subtitle);
        console.log('✅ Rotating titles:', data.content?.metadata?.rotating_titles);
      }
    } catch (error) {
      console.error('❌ Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (audioUrl: string) => {
    if (audioRef.current) {
      if (currentAudio === audioUrl && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (currentAudio === audioUrl && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio(audioUrl);
        audioRef.current.play();
        setCurrentAudio(audioUrl);
        setIsPlaying(true);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setCurrentAudio(null);
        };
      }
    } else {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setCurrentAudio(audioUrl);
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentAudio(null);
      };
    }
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAudio(null);
    }
  };

  const cards = heroData?.content?.metadata?.cards || [{
    id: 'card1',
    title: 'Video Content',
    subtitle: 'Watch tutorials & demos',
    icon_url: ''
  }, {
    id: 'card2',
    title: 'Podcast Series',
    subtitle: 'Expert discussions',
    icon_url: ''
  }, {
    id: 'card3',
    title: 'Research Reports',
    subtitle: 'Latest findings & data',
    icon_url: ''
  }, {
    id: 'card4',
    title: 'Partnerships',
    subtitle: 'Collaboration opportunities',
    icon_url: ''
  }];
  
  const title = heroData?.content?.title || "Two Privacy-First Technologies.";
  const rotatingTitles = heroData?.content?.metadata?.rotating_titles || ["One Mission: Safer Aging."];
  const subtitle = heroData?.content?.subtitle || "Contactless radar and WiFi sensing protect seniors without cameras or wearables—dignified monitoring where falls happen most.";
  
  console.log('🎨 Rendering with mainTitle:', title);
  console.log('🎨 Rotating subtitles:', rotatingTitles);
  console.log('📝 Subtitle:', subtitle);
  console.log('🃏 Cards:', cards);
  if (loading) {
    return <section className="w-full px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>;
  }
  const slider = heroData?.content?.metadata?.slider || [];

  return <section className="relative w-full h-screen max-h-[1080px] overflow-hidden">
      {/* Background Slider or Shader */}
      <div className="absolute inset-0">
        {slider.length > 0 ? (
          <Carousel
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              {slider.map((item) => (
                <CarouselItem key={item.id} className="h-full">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.title || 'Hero slide'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={item.url} 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <ShaderBackground />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Animated Hero Content with Buttons */}
      <AnimatedHero 
        mainTitle={title}
        rotatingSubtitles={rotatingTitles}
        subtitle={subtitle}
        listenButton={heroData?.content?.listen_button}
        readButton={heroData?.content?.read_button}
        watchButton={heroData?.content?.watch_button}
        onAudioPlay={handleAudioPlay}
        onAudioStop={handleAudioStop}
        isPlaying={isPlaying}
        currentAudio={currentAudio}
      />

      {/* Content overlay - Bottom Cards */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-20">
        {/* Bottom Cards - Responsive: 2x2 on mobile/tablet, 1x4 on desktop */}
        <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {cards.slice(0, 4).map(card => <div key={card.id} className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white/40 rounded-2xl p-4 sm:p-6 text-center hover:from-white/40 hover:to-white/20 transition-all duration-300 shadow-lg flex flex-col">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  {card.icon_url ? <img src={card.icon_url} alt={card.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain" /> : <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/40 rounded-full" />}
                </div>
                <h3 className="text-white font-semibold mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl drop-shadow-lg">{card.title}</h3>
                <p className="text-white/90 text-xs sm:text-sm drop-shadow mb-3 sm:mb-4 flex-1">{card.subtitle}</p>
                
                {card.button_enabled && card.button_text && (
                  <div className="mt-auto w-full">
                    <div className="flex w-full rounded-lg overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-sm">
                      <Button
                        variant="ghost"
                        className="rounded-none border-r-2 border-white/40 text-white hover:bg-primary hover:text-white flex-1 min-w-0 px-2 sm:px-4 transition-colors"
                        onClick={() => {
                          if (card.button_url) {
                            if (card.button_url.startsWith('http')) {
                              window.open(card.button_url, '_blank');
                            } else {
                              window.location.href = card.button_url;
                            }
                          }
                        }}
                      >
                        <span className="truncate">{card.button_text}</span>
                        <span className="ml-1 flex-shrink-0">▼</span>
                      </Button>
                      {(card.audio_url || card.audio_duration) && (
                        <>
                          <Button
                            variant="ghost"
                            className={`rounded-none text-white hover:bg-primary hover:text-white px-2 sm:px-3 flex-shrink-0 transition-colors ${currentAudio === card.audio_url ? 'border-r-2 border-white/40' : ''}`}
                            onClick={() => {
                              if (card.audio_url) {
                                handleAudioPlay(card.audio_url);
                              }
                            }}
                            disabled={!card.audio_url}
                          >
                            {currentAudio === card.audio_url && isPlaying ? (
                              <Pause className="w-4 h-4 flex-shrink-0" />
                            ) : (
                              <Play className="w-4 h-4 flex-shrink-0" />
                            )}
                            <span className="hidden sm:inline ml-1">Listen</span>
                            {card.audio_duration && (
                              <span className="text-xs opacity-70 ml-1 sm:ml-2 flex-shrink-0">{card.audio_duration}</span>
                            )}
                          </Button>
                          {currentAudio === card.audio_url && (
                            <Button
                              variant="ghost"
                              className="rounded-none text-white hover:bg-primary hover:text-white px-2 flex-shrink-0 transition-colors"
                              onClick={handleAudioStop}
                            >
                              <Square className="w-4 h-4" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;