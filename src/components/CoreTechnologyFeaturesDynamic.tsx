import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Play, Pause, ChevronDown } from 'lucide-react';
import { SectionTagBadge } from './admin/SectionTagBadge';

interface BulletPoint {
  text: string;
}

interface CardData {
  title: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  bulletPoints: BulletPoint[];
  button_text?: string;
  button_url?: string;
  audio_url?: string;
  audio_duration?: string;
  enable_learn_more?: boolean;
}

interface SectionData {
  title: string;
  subtitle: string;
  cards: CardData[];
}

const CoreTechnologyFeaturesDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'core_technology_features')
        .single();

      if (error) throw error;
      if (data) {
        setSection(data.content as unknown as SectionData);
      }
    } catch (error) {
      console.error('Error fetching section:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioPlay = (audioUrl: string, cardId: string) => {
    if (playingAudio === cardId) {
      audioRef.current?.pause();
      setPlayingAudio(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentAudio(audioUrl);
    setPlayingAudio(cardId);

    audio.play();
    audio.onended = () => {
      setPlayingAudio(null);
      setCurrentAudio(null);
    };
  };

  const handleAudioStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingAudio(null);
    setCurrentAudio(null);
  };

  if (loading) {
    return null;
  }

  if (!section) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-accent/5 relative">
      <SectionTagBadge 
        sectionTag="Core Technology Features" 
        adminPath="/admin/core-technology-features" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {section.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {section.cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/30 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} mb-6 shadow-lg`}>
                  <i className={`${card.icon} text-2xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {card.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {card.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {card.bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3">
                      <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {card.enable_learn_more && card.button_url && (
                    <a
                      href={card.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 border-primary/20 bg-background text-foreground hover:bg-primary/5 hover:border-primary/40 transition-colors"
                    >
                      <span>{card.button_text || 'Learn More'}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                  )}
                  
                  {card.audio_url && (
                    <button
                      onClick={() => handleAudioPlay(card.audio_url!, `card-${index}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 border-primary/20 bg-background text-foreground hover:bg-primary/5 hover:border-primary/40 transition-colors"
                    >
                      {playingAudio === `card-${index}` ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                      <span>Listen</span>
                      {card.audio_duration && (
                        <span className="ml-1 text-xs opacity-70">{card.audio_duration}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentAudio && (
        <audio ref={audioRef} src={currentAudio} />
      )}
    </section>
  );
};

export default CoreTechnologyFeaturesDynamic;
