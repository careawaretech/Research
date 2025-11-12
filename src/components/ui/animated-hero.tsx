import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Play, Pause, Square, BookOpen, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VideoPlayer from "@/components/ui/video-player";

interface ButtonConfig {
  text: string;
  url: string;
  enabled: boolean;
}

interface AnimatedHeroProps {
  mainTitle?: string;
  rotatingSubtitles?: string[];
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  researchPhaseText?: string;
  partnershipText?: string;
  listenButton?: ButtonConfig;
  readButton?: ButtonConfig;
  watchButton?: ButtonConfig;
  onAudioPlay?: (url: string) => void;
  onAudioStop?: () => void;
  isPlaying?: boolean;
  currentAudio?: string | null;
}

function AnimatedHero({
  mainTitle = "Contactless Clinical Safety for Aging-in-Place",
  rotatingSubtitles = ["One Mission", "Safer Aging"],
  subtitle = "Revolutionary fall detection and vital signs monitoring that protects privacy through physics, not policy",
  primaryButtonText = "Schedule Demo",
  secondaryButtonText = "Learn More",
  researchPhaseText,
  partnershipText,
  listenButton,
  readButton,
  watchButton,
  onAudioPlay,
  onAudioStop,
  isPlaying = false,
  currentAudio = null
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const animatedSubtitles = useMemo(() => rotatingSubtitles, [rotatingSubtitles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === animatedSubtitles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, animatedSubtitles]);

  return (
    <div className="w-full absolute inset-0 z-20 flex items-start justify-center pt-16 md:pt-24 lg:pt-32 pointer-events-none">
      <div className="container mx-auto px-4 pointer-events-auto">
        <div className="flex gap-2 md:gap-4 items-center justify-center flex-col">
          <div className="flex gap-2 md:gap-4 flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl max-w-4xl tracking-tight text-center font-semibold text-white leading-tight">
              {mainTitle}
            </h1>

            <div className="flex flex-col items-center gap-2 md:gap-3">
              {/* Line 1: Research Phase Badge - Always visible */}
              <div className="text-white/90 text-sm md:text-base font-medium flex items-center gap-2">
                <span>🔬 Research Phase</span>
              </div>
              
              {/* Line 2: Animated rotating words */}
              <div className="relative flex w-full justify-center overflow-hidden min-h-[40px] sm:min-h-[50px] md:min-h-[80px]">
                {animatedSubtitles.map((rotatingText, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary z-10 text-xl sm:text-2xl md:text-4xl lg:text-5xl"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {rotatingText}
                  </motion.span>
                ))}
              </div>
              
              {/* Line 3: Partnership Badge - Always visible */}
              <div className="text-white/90 text-sm md:text-base font-medium">
                Now Accepting Partners
              </div>
            </div>

            {/* Three Action Buttons */}
            {(listenButton?.enabled || readButton?.enabled || watchButton?.enabled) && (
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-3 md:mt-6">
                {listenButton?.enabled && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs sm:text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      onClick={() => {
                        if (listenButton.url && onAudioPlay) {
                          const url = listenButton.url;
                          const isAudioFile = url.match(/\.(mp3|wav|ogg|m4a)$/i) || url.includes('/audio/');
                          
                          if (isAudioFile) {
                            onAudioPlay(url);
                          } else if (url.startsWith('http')) {
                            window.open(url, '_blank');
                          } else {
                            window.location.href = url;
                          }
                        }
                      }}
                    >
                      {currentAudio === listenButton.url && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {listenButton.text}
                    </Button>
                    {currentAudio === listenButton.url && onAudioStop && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-white hover:border-primary transition-colors px-2"
                        onClick={onAudioStop}
                      >
                        <Square className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
                {readButton?.enabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs sm:text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={() => {
                      if (readButton.url) {
                        if (readButton.url.startsWith('http')) {
                          window.open(readButton.url, '_blank');
                        } else {
                          window.location.href = readButton.url;
                        }
                      }
                    }}
                  >
                    <BookOpen className="w-4 h-4" />
                    {readButton.text}
                  </Button>
                )}
                {watchButton?.enabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs sm:text-sm bg-background/80 backdrop-blur-sm text-foreground border-border hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Watch button clicked!', watchButton.url);
                      if (watchButton.url) {
                        const url = watchButton.url;
                        const isVideoFile = url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('/hero-buttons/') || url.includes('/media-library/');
                        
                        console.log('Is video file?', isVideoFile);
                        console.log('Video URL:', url);
                        
                        if (isVideoFile) {
                          console.log('Opening video modal...');
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
                    {watchButton.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-5xl p-6 bg-transparent border-none">
          {currentVideoUrl && <VideoPlayer src={currentVideoUrl} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { AnimatedHero };
