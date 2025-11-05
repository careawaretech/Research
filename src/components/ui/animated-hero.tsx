import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Play, Pause, Square, BookOpen, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  listenButton,
  readButton,
  watchButton,
  onAudioPlay,
  onAudioStop,
  isPlaying = false,
  currentAudio = null
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
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
    <div className="w-full absolute inset-0 z-10 flex items-start justify-center pt-32">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-4xl md:text-6xl max-w-4xl tracking-tight text-center font-semibold text-white">
              {mainTitle}
            </h1>

            <h2 className="text-3xl md:text-5xl tracking-tight text-center font-regular min-h-[60px] md:min-h-[80px] w-full">
              <div className="relative flex w-full justify-center overflow-hidden min-h-[60px] md:min-h-[80px]">
                {animatedSubtitles.map((rotatingText, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary z-10"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {rotatingText}
                  </motion.span>
                ))}
              </div>
            </h2>

            {/* Three Action Buttons */}
            {(listenButton?.enabled || readButton?.enabled || watchButton?.enabled) && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {listenButton?.enabled && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                        size="icon"
                        className="hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                    className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
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
                    className="gap-2 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    onClick={() => {
                      if (watchButton.url) {
                        if (watchButton.url.startsWith('http')) {
                          window.open(watchButton.url, '_blank');
                        } else {
                          window.location.href = watchButton.url;
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
    </div>
  );
}

export { AnimatedHero };
