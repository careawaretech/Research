import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedHeroProps {
  mainTitle?: string;
  rotatingSubtitles?: string[];
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

function AnimatedHero({
  mainTitle = "Contactless Clinical Safety for Aging-in-Place",
  rotatingSubtitles = ["One Mission", "Safer Aging"],
  subtitle = "Revolutionary fall detection and vital signs monitoring that protects privacy through physics, not policy",
  primaryButtonText = "Schedule Demo",
  secondaryButtonText = "Learn More"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
