import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ShaderBackground from '@/components/ui/shader-background';
import { AnimatedHero } from '@/components/ui/animated-hero';
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
}
interface HeroData {
  title: string | null;
  subtitle: string | null;
  button_text: string | null;
  button_url: string | null;
  metadata: {
    slider?: SliderItem[];
    cards?: Card[];
    secondary_title?: string;
    rotating_titles?: string[];
  } | null;
}
interface HeroSectionProps {
  pageSlug?: string;
}

const HeroSection = ({ pageSlug = 'home' }: HeroSectionProps) => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

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
        .eq('slug', pageSlug)
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
        setHeroData(data);
        console.log('✅ Title:', data.title);
        console.log('✅ Subtitle:', data.subtitle);
        console.log('✅ Rotating titles:', data.metadata?.rotating_titles);
      }
    } catch (error) {
      console.error('❌ Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };
  const cards = heroData?.metadata?.cards || [{
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
  
  const title = heroData?.title || "Two Privacy-First Technologies.";
  const rotatingTitles = heroData?.metadata?.rotating_titles || ["One Mission: Safer Aging."];
  const subtitle = heroData?.subtitle || "Contactless radar and WiFi sensing protect seniors without cameras or wearables—dignified monitoring where falls happen most.";
  
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
  const slider = heroData?.metadata?.slider || [];
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

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

      {/* Animated Hero Content */}
      <AnimatedHero 
        mainTitle={title}
        rotatingSubtitles={rotatingTitles}
        subtitle={subtitle}
      />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 px-6 lg:px-20">
        {/* Bottom Cards - Responsive: 2x2 on mobile/tablet, 1x4 on desktop */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.slice(0, 4).map(card => <div key={card.id} className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border border-white/40 rounded-2xl p-6 text-center hover:from-white/40 hover:to-white/20 transition-all duration-300 cursor-pointer shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  {card.icon_url ? <img src={card.icon_url} alt={card.title} className="w-10 h-10 object-contain" /> : <div className="w-10 h-10 bg-white/40 rounded-full" />}
                </div>
                <h3 className="text-white font-semibold mb-2 text-2xl drop-shadow-lg">{card.title}</h3>
                <p className="text-white/90 text-sm drop-shadow">{card.subtitle}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;