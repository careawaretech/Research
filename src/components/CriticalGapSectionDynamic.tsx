import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Shield, Wrench, Headphones, BookOpen, Video, Play, Pause, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/typewriter-text';
import { SectionTagBadge } from '@/components/admin/SectionTagBadge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import VideoPlayer from '@/components/ui/video-player';
import AmbientParticles from '@/components/ui/ambient-particles';
import AnimatedGradientBg from '@/components/ui/animated-gradient-bg';
import MorphingIcon from '@/components/ui/morphing-icon';
import AnimatedSineWaveDivider from '@/components/ui/animated-sine-wave-divider';
import { motion } from 'framer-motion';
interface CardData {
  title: string;
  subtitle: string;
  content: string;
  icon_url: string;
  button_text: string;
  button_url: string;
  button_enabled: boolean;
  audio_url?: string;
  audio_duration?: string;
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

const iconMap: Record<string, any> = {
  'AlertTriangle': AlertTriangle,
  'Shield': Shield,
  'Wrench': Wrench,
};

const colorMap: Record<number, { bg: string; border: string; text: string; icon: string }> = {
  0: { bg: 'bg-red-50/50', border: 'border-red-600', text: 'text-red-800', icon: 'text-red-600' },
  1: { bg: 'bg-purple-50/50', border: 'border-purple-600', text: 'text-purple-800', icon: 'text-purple-600' },
  2: { bg: 'bg-orange-50/50', border: 'border-orange-600', text: 'text-orange-800', icon: 'text-orange-600' },
};

const CriticalGapSectionDynamic = () => {
  const [section, setSection] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const { data: sectionData, error: sectionError } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_key', 'critical_gap')
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
      <section className="bg-white w-full py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </section>
    );
  }

  if (!section) {
    return null;
  }

  return (
    <section id="critical-gap" className="relative bg-white w-full py-16 lg:py-20 px-6 lg:px-8 overflow-hidden">
      {/* Ambient Background Effects */}
      <AnimatedGradientBg className="z-0" />
      <AmbientParticles count={15} className="z-0" />
      
      <SectionTagBadge sectionTag="critical-gap" adminPath="/admin/critical-gap" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-foreground text-3xl font-bold leading-none self-center max-md:max-w-full">
              <Typewriter
                text={section.title}
                speed={50}
                loop={false}
                className="text-foreground text-3xl font-bold leading-none"
              />
            </h2>
            <p className="text-muted-foreground text-lg leading-7 mt-[29px] max-md:max-w-full">
              {section.subtitle}
            </p>
            
            {(section.listen_button?.enabled || section.read_button?.enabled || section.watch_button?.enabled) && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                {section.listen_button?.enabled && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                        className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                    className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                    className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={() => {
                      if (section.watch_button?.url) {
                        const url = section.watch_button.url;
                        const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/media-library/');
                        
                        if (isVideoFile) {
                          setCurrentVideoUrl(url);
                          setVideoModalOpen(true);
                        } else if (url.startsWith('http')) {
                          window.open(url, '_blank');
                        } else {
                          window.location.href = url;
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {section.metadata.cards.map((card, index) => {
            const Icon = iconMap[card.icon_url] || AlertTriangle;
            const colors = colorMap[index] || colorMap[0];

            return (
              <motion.article
                key={index}
                className={`${colors.bg} backdrop-blur-sm border-l-[6px] ${colors.border} flex flex-col px-8 py-8 h-full`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <MorphingIcon 
                    Icon={Icon} 
                    className={`w-8 h-8 ${colors.icon} flex-shrink-0`}
                    delay={index * 0.2}
                  />
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.text}`}>{card.title}</h3>
                    {card.subtitle && (
                      <p className={`text-sm ${colors.text} opacity-80 mt-1`}>{card.subtitle}</p>
                    )}
                  </div>
                </div>
                <div
                  className={`text-base ${colors.text.replace('800', '700')} flex-1 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2 [&_li]:pl-1`}
                  dangerouslySetInnerHTML={{ __html: card.content }}
                />
                {card.button_enabled && card.button_text && (
                  <div className="mt-6 w-full">
                    <div className={`flex w-full rounded-lg overflow-hidden border-2 ${colors.border}`}>
                      <Button
                        variant="ghost"
                        className={`rounded-none border-r-2 ${colors.border} ${colors.text} hover:bg-primary hover:text-white hover:border-primary flex-1 min-w-0 px-2 sm:px-4 transition-colors`}
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
                            className={`rounded-none ${colors.text} hover:bg-primary hover:text-white px-2 sm:px-3 flex-shrink-0 transition-colors ${currentAudio === card.audio_url ? 'border-r-2 ' + colors.border : ''}`}
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
                              className={`rounded-none ${colors.text} hover:bg-primary hover:text-white px-2 flex-shrink-0 transition-colors`}
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
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-5xl p-6 bg-transparent border-none">
          {currentVideoUrl && <VideoPlayer src={currentVideoUrl} />}
        </DialogContent>
      </Dialog>
    </section>
  );
};

// Wrapper component that includes the sine wave divider
const CriticalGapWithDivider = () => {
  return (
    <>
      <CriticalGapSectionDynamic />
      <AnimatedSineWaveDivider 
        height={150} 
        waveColor="#3b82f6" 
        circleColor="#3b82f6" 
        bgColor="hsl(0, 0%, 100%)" 
      />
    </>
  );
};

export default CriticalGapWithDivider;