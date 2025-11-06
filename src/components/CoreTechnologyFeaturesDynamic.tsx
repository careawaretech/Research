import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Play, Pause, Headphones, BookOpen, Video, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTagBadge } from './admin/SectionTagBadge';
import * as LucideIcons from 'lucide-react';

interface MetricBox {
  value: string;
  label: string;
}

interface CardData {
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  icon_type?: 'fontawesome' | 'lucide' | 'upload';
  icon_url?: string;
  lucide_icon_name?: string;
  gradientFrom: string;
  gradientTo: string;
  background_color?: string;
  text_color?: string;
  border_color?: string;
  bulletPoints: string | any[]; // HTML content or legacy array format
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

  const renderIcon = (card: CardData) => {
    if (card.icon_type === 'upload' && card.icon_url) {
      return <img src={card.icon_url} alt={card.title} className="w-12 h-12 object-contain" />;
    }
    if (card.icon_type === 'lucide' && card.lucide_icon_name) {
      const IconComponent = LucideIcons[card.lucide_icon_name as keyof typeof LucideIcons] as React.ComponentType<any>;
      if (IconComponent) {
        return <IconComponent className="w-12 h-12 text-white" />;
      }
    }
    // Default to Font Awesome
    return <i className={`${card.icon} text-4xl text-white`}></i>;
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

          {/* Action Buttons */}
          {(section.listen_button?.enabled || section.read_button?.enabled || section.watch_button?.enabled) && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {section.listen_button?.enabled && (
                <>
                  <Button
                    onClick={() => {
                      if (section.listen_button?.url) {
                        if (playingAudio === 'section-listen') {
                          handleAudioStop();
                        } else {
                          handleAudioPlay(section.listen_button.url, 'section-listen');
                        }
                      }
                    }}
                    variant="default"
                    size="lg"
                    className="gap-2"
                  >
                    {playingAudio === 'section-listen' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Headphones className="w-4 h-4" />
                    )}
                    {section.listen_button.text || 'Listen More'}
                  </Button>
                  {playingAudio === 'section-listen' && (
                    <Button
                      onClick={handleAudioStop}
                      variant="destructive"
                      size="lg"
                      className="gap-2"
                    >
                      <Square className="w-4 h-4" />
                      Stop
                    </Button>
                  )}
                </>
              )}

              {section.read_button?.enabled && (
                <Button
                  onClick={() => {
                    if (section.read_button?.url) {
                      if (section.read_button.url.startsWith('http')) {
                        window.open(section.read_button.url, '_blank');
                      } else {
                        window.location.href = section.read_button.url;
                      }
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  {section.read_button.text || 'Read More'}
                </Button>
              )}

              {section.watch_button?.enabled && (
                <Button
                  onClick={() => {
                    if (section.watch_button?.url) {
                      if (section.watch_button.url.startsWith('http')) {
                        window.open(section.watch_button.url, '_blank');
                      } else {
                        window.location.href = section.watch_button.url;
                      }
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Video className="w-4 h-4" />
                  {section.watch_button.text || 'Watch More'}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* First 3 cards in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {section.cards.slice(0, 3).map((card, index) => {
            const cardStyle = card.background_color ? {
              backgroundColor: card.background_color,
              color: card.text_color || '#ffffff',
              borderColor: card.border_color || 'transparent',
              borderWidth: '2px'
            } : {};
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl p-8 overflow-hidden shadow-xl ${card.background_color ? '' : `bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} text-white`}`}
                style={card.background_color ? cardStyle : {}}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16" style={{ backgroundColor: card.text_color || '#ffffff' }}></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  {renderIcon(card)}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className="text-lg font-semibold text-white/95 mb-3">
                    {card.subtitle}
                  </p>
                )}

                <p className="text-white/90 mb-6">
                  {card.description}
                </p>

                {card.bulletPoints && (
                  typeof card.bulletPoints === 'string' && card.bulletPoints.trim() ? (
                    <div 
                      className="space-y-2 mb-6 text-sm text-white/90 leading-relaxed prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: card.bulletPoints }}
                    />
                  ) : Array.isArray(card.bulletPoints) && (card.bulletPoints as any).some((p: any) => p.text) ? (
                    <div className="space-y-3 mb-6">
                      {(card.bulletPoints as any).filter((p: any) => p.text).map((point: any, pointIndex: number) => (
                        <div key={pointIndex} className="flex items-start space-x-3">
                          <i className="fa-solid fa-check-circle text-green-300 mt-0.5 flex-shrink-0"></i>
                          <span className="text-sm text-white/90 leading-relaxed">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                )}

                {card.metrics && card.metrics.length > 0 && (
                  <div className={`grid ${card.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
                    {card.metrics.filter(m => m.value || m.label).map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-white/90">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {((card.enable_learn_more && card.button_text) || card.audio_url || card.audio_duration) && (
                  <div className="flex w-auto rounded-lg overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-sm">
                    {card.enable_learn_more && card.button_text && (
                      <button
                        onClick={() => {
                          if (card.button_url) {
                            if (card.button_url.startsWith('http')) {
                              window.open(card.button_url, '_blank');
                            } else {
                              window.location.href = card.button_url;
                            }
                          }
                        }}
                        disabled={!card.button_url}
                        className={`px-4 py-2 text-sm font-medium text-white transition-colors ${
                          (card.audio_url || card.audio_duration) ? 'border-r-2 border-white/40' : ''
                        } ${
                          card.button_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <span>{card.button_text}</span>
                        <span className="ml-1">▼</span>
                      </button>
                    )}
                    
                    {(card.audio_url || card.audio_duration) && (
                      <>
                        <button
                          onClick={() => card.audio_url && handleAudioPlay(card.audio_url, `card-${index}`)}
                          disabled={!card.audio_url}
                          className={`px-3 py-2 text-sm font-medium text-white transition-colors flex items-center gap-1 ${
                            playingAudio === `card-${index}` ? 'border-r-2 border-white/40' : ''
                          } ${
                            card.audio_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                          }`}
                        >
                          {playingAudio === `card-${index}` ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                          <span>Listen</span>
                          {card.audio_duration && (
                            <span className="text-xs opacity-70 ml-1">{card.audio_duration}</span>
                          )}
                        </button>
                        {playingAudio === `card-${index}` && (
                          <button
                            onClick={handleAudioStop}
                            className="px-2 py-2 text-sm font-medium text-white hover:bg-primary hover:text-white transition-colors"
                          >
                            <i className="fa-solid fa-stop text-sm"></i>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>

        {/* Last 2 cards in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {section.cards.slice(3, 5).map((card, index) => {
            const cardStyle = card.background_color ? {
              backgroundColor: card.background_color,
              color: card.text_color || '#ffffff',
              borderColor: card.border_color || 'transparent',
              borderWidth: '2px'
            } : {};
            
            return (
              <div
                key={index + 3}
                className={`relative rounded-2xl p-8 overflow-hidden shadow-xl ${card.background_color ? '' : `bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} text-white`}`}
                style={card.background_color ? cardStyle : {}}
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16" style={{ backgroundColor: card.text_color || '#ffffff' }}></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                  {renderIcon(card)}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {card.title}
                </h3>

                {card.subtitle && (
                  <p className="text-lg font-semibold text-white/95 mb-3">
                    {card.subtitle}
                  </p>
                )}

                <p className="text-white/90 mb-6">
                  {card.description}
                </p>

                {card.bulletPoints && (
                  typeof card.bulletPoints === 'string' && card.bulletPoints.trim() ? (
                    <div 
                      className="space-y-2 mb-6 text-sm text-white/90 leading-relaxed prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: card.bulletPoints }}
                    />
                  ) : Array.isArray(card.bulletPoints) && (card.bulletPoints as any).some((p: any) => p.text) ? (
                    <div className="space-y-3 mb-6">
                      {(card.bulletPoints as any).filter((p: any) => p.text).map((point: any, pointIndex: number) => (
                        <div key={pointIndex} className="flex items-start space-x-3">
                          <i className="fa-solid fa-check-circle text-green-300 mt-0.5 flex-shrink-0"></i>
                          <span className="text-sm text-white/90 leading-relaxed">{point.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                )}

                {card.metrics && card.metrics.length > 0 && (
                  <div className={`grid ${card.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4 mb-6`}>
                    {card.metrics.filter(m => m.value || m.label).map((metric, metricIndex) => (
                      <div key={metricIndex} className="text-center p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-white/90">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {((card.enable_learn_more && card.button_text) || card.audio_url || card.audio_duration) && (
                  <div className="flex w-auto rounded-lg overflow-hidden border-2 border-white/40 bg-white/10 backdrop-blur-sm">
                    {card.enable_learn_more && card.button_text && (
                      <button
                        onClick={() => {
                          if (card.button_url) {
                            if (card.button_url.startsWith('http')) {
                              window.open(card.button_url, '_blank');
                            } else {
                              window.location.href = card.button_url;
                            }
                          }
                        }}
                        disabled={!card.button_url}
                        className={`px-4 py-2 text-sm font-medium text-white transition-colors ${
                          (card.audio_url || card.audio_duration) ? 'border-r-2 border-white/40' : ''
                        } ${
                          card.button_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <span>{card.button_text}</span>
                        <span className="ml-1">▼</span>
                      </button>
                    )}
                    
                    {(card.audio_url || card.audio_duration) && (
                      <>
                        <button
                          onClick={() => card.audio_url && handleAudioPlay(card.audio_url, `card-${index + 3}`)}
                          disabled={!card.audio_url}
                          className={`px-3 py-2 text-sm font-medium text-white transition-colors flex items-center gap-1 ${
                            playingAudio === `card-${index + 3}` ? 'border-r-2 border-white/40' : ''
                          } ${
                            card.audio_url ? 'hover:bg-primary hover:text-white cursor-pointer' : 'opacity-60 cursor-not-allowed'
                          }`}
                        >
                          {playingAudio === `card-${index + 3}` ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                          <span>Listen</span>
                          {card.audio_duration && (
                            <span className="text-xs opacity-70 ml-1">{card.audio_duration}</span>
                          )}
                        </button>
                        {playingAudio === `card-${index + 3}` && (
                          <button
                            onClick={handleAudioStop}
                            className="px-2 py-2 text-sm font-medium text-white hover:bg-primary hover:text-white transition-colors"
                          >
                            <i className="fa-solid fa-stop text-sm"></i>
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {currentAudio && (
        <audio ref={audioRef} src={currentAudio} />
      )}
    </section>
  );
};

export default CoreTechnologyFeaturesDynamic;
