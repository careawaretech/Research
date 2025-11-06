import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Play, Pause, ChevronDown } from 'lucide-react';
import { SectionTagBadge } from './admin/SectionTagBadge';

interface BulletPoint {
  text: string;
}

interface MetricBox {
  value: string;
  label: string;
}

interface CardData {
  title: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  bulletPoints: BulletPoint[];
  metrics?: MetricBox[];
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

        {/* First 3 cards in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {section.cards.slice(0, 3).map((card, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 text-white overflow-hidden shadow-xl bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <i className={`${card.icon} text-3xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {card.title}
                </h3>

                <p className="text-white/90 mb-6">
                  {card.description}
                </p>

                <div className="space-y-3 mb-6">
                  {card.bulletPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center space-x-3">
                      <i className="fa-solid fa-check-circle text-green-300"></i>
                      <span className="text-sm text-white">{point.text}</span>
                    </div>
                  ))}
                </div>

                {card.metrics && card.metrics.length > 0 && (
                  <div className={`grid ${card.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
                    {card.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-white/90">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {card.enable_learn_more && card.button_url && (
                    <a
                      href={card.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-colors"
                    >
                      <span>{card.button_text || 'Learn More'}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                  )}
                  
                  {card.audio_url && (
                    <button
                      onClick={() => handleAudioPlay(card.audio_url!, `card-${index}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-colors"
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

        {/* Last 2 cards in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {section.cards.slice(3, 5).map((card, index) => (
            <div
              key={index + 3}
              className={`relative rounded-2xl p-8 text-white overflow-hidden shadow-xl bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  <i className={`${card.icon} text-3xl text-white`}></i>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {card.title}
                </h3>

                <p className="text-white/90 mb-6">
                  {card.description}
                </p>

                <div className="space-y-3 mb-6">
                  {card.bulletPoints.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-center space-x-3">
                      <i className="fa-solid fa-check-circle text-green-300"></i>
                      <span className="text-sm text-white">{point.text}</span>
                    </div>
                  ))}
                </div>

                {card.metrics && card.metrics.length > 0 && (
                  <div className={`grid ${card.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
                    {card.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-white/90">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {card.enable_learn_more && card.button_url && (
                    <a
                      href={card.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-colors"
                    >
                      <span>{card.button_text || 'Learn More'}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                  )}
                  
                  {card.audio_url && (
                    <button
                      onClick={() => handleAudioPlay(card.audio_url!, `card-${index + 3}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-colors"
                    >
                      {playingAudio === `card-${index + 3}` ? (
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
