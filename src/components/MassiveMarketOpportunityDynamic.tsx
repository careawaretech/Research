import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Headphones, BookOpen, Video, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  button_text?: string;
  button_url?: string;
  button_enabled?: boolean;
  audio_url?: string;
  audio_duration?: string;
  items?: Array<{
    label: string;
    value: string;
  }>;
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
  metadata: {
    cards: CardData[];
  };
}

const MassiveMarketOpportunityDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data: sectionData, error: sectionError } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'massive_market_opportunity')
        .maybeSingle();

      if (sectionError || !sectionData) {
        console.log('Section not found');
        return;
      }
      
      setSection(sectionData.content as unknown as SectionData);
    } catch (error) {
      console.error('Error fetching section:', error);
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

  if (loading) {
    return (
      <div className="rounded-3xl p-12 text-white">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!section) {
    return null;
  }

  return (
    <div className="rounded-3xl p-12 text-white">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold mb-4">{section.title}</h3>
        <p className="text-xl opacity-90 mb-6">
          {section.subtitle}
        </p>
        
        {(section.listen_button?.enabled || section.read_button?.enabled || section.watch_button?.enabled) && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {section.listen_button?.enabled && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="gap-2 text-white border-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  onClick={() => {
                    if (section.listen_button?.url) {
                      const url = section.listen_button.url;
                      const isAudioFile = url.match(/\.(mp3|wav|ogg|m4a)$/i) || url.includes('/audio/');
                      
                      if (isAudioFile) {
                        handleAudioPlay(url);
                      } else if (url.startsWith('http')) {
                        window.open(url, '_blank');
                      } else {
                        window.location.href = url;
                      }
                    }
                  }}
                >
                  {currentAudio === section.listen_button.url && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {section.listen_button.text}
                </Button>
                {currentAudio === section.listen_button.url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-white border-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={handleAudioStop}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
            {section.read_button?.enabled && (
              <Button
                variant="outline"
                className="gap-2 text-white border-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                onClick={() => {
                  if (section.read_button?.url) {
                    if (section.read_button.url.startsWith('http')) {
                      window.open(section.read_button.url, '_blank');
                    } else {
                      window.location.href = section.read_button.url;
                    }
                  }
                }}
              >
                <BookOpen className="w-4 h-4" />
                {section.read_button.text}
              </Button>
            )}
            {section.watch_button?.enabled && (
              <Button
                variant="outline"
                className="gap-2 text-white border-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
                onClick={() => {
                  if (section.watch_button?.url) {
                    if (section.watch_button.url.startsWith('http')) {
                      window.open(section.watch_button.url, '_blank');
                    } else {
                      window.location.href = section.watch_button.url;
                    }
                  }
                }}
              >
                <Video className="w-4 h-4" />
                {section.watch_button.text}
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* First row: 3 cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {section.metadata.cards.slice(0, 3).map((card) => (
          <div key={card.id} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-5xl font-bold mb-2 text-yellow-300">{card.title}</div>
            <div className="text-lg font-semibold mb-2">{card.subtitle}</div>
            <div className="text-sm opacity-80">{card.description}</div>
            
            {card.button_enabled && card.button_text && (
              <div className="mt-6 flex justify-center">
                <div className="flex w-auto rounded-lg overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    className="rounded-none border-r-2 border-white/40 text-white hover:bg-primary hover:text-white hover:border-primary px-4 transition-colors"
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
                    <span>{card.button_text}</span>
                    <span className="ml-1">▼</span>
                  </Button>
                  {(card.audio_url || card.audio_duration) && (
                    <>
                      <Button
                        variant="ghost"
                        className={`rounded-none text-white hover:bg-primary hover:text-white px-3 flex-shrink-0 transition-colors ${currentAudio === card.audio_url ? 'border-r-2 border-white/40' : ''}`}
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
                        <span className="ml-1">Listen</span>
                        {card.audio_duration && (
                          <span className="text-xs opacity-70 ml-2">{card.audio_duration}</span>
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
          </div>
        ))}
      </div>

      {/* Second row: 2 larger cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {section.metadata.cards.slice(3, 5).map((card) => (
          <div key={card.id} className="text-left bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-white">{card.title}</h3>
            
            {card.items && card.items.length > 0 ? (
              <div className="space-y-4 text-base">
                {card.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="opacity-80">{item.label}</span>
                    <span className="text-yellow-300 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-base">
                {card.subtitle && (
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">{card.subtitle}</span>
                    <span className="text-yellow-300 font-semibold">{card.description}</span>
                  </div>
                )}
              </div>
            )}
            
            {card.button_enabled && card.button_text && (
              <div className="mt-6 flex justify-start">
                <div className="flex w-auto rounded-lg overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    className="rounded-none border-r-2 border-white/40 text-white hover:bg-primary hover:text-white hover:border-primary px-4 transition-colors"
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
                    <span>{card.button_text}</span>
                    <span className="ml-1">▼</span>
                  </Button>
                  {(card.audio_url || card.audio_duration) && (
                    <>
                      <Button
                        variant="ghost"
                        className={`rounded-none text-white hover:bg-primary hover:text-white px-3 flex-shrink-0 transition-colors ${currentAudio === card.audio_url ? 'border-r-2 border-white/40' : ''}`}
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
                        <span className="ml-1">Listen</span>
                        {card.audio_duration && (
                          <span className="text-xs opacity-70 ml-2">{card.audio_duration}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MassiveMarketOpportunityDynamic;
