import { motion } from 'framer-motion';

interface WaveDividerProps {
  className?: string;
  fillColor?: string;
  height?: number;
  flip?: boolean;
}

const WaveDivider = ({ 
  className = '', 
  fillColor = 'currentColor',
  height = 80,
  flip = false 
}: WaveDividerProps) => {
  return (
    <div 
      className={`absolute left-0 right-0 w-full overflow-hidden ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}
      style={{ height, lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
        style={{ transform: 'translateY(1px)' }}
      >
        <motion.path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={fillColor}
          initial={{ d: "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
              "M0,80 C240,20 480,100 720,40 C960,80 1200,40 1440,80 L1440,120 L0,120 Z",
              "M0,40 C240,100 480,20 720,80 C960,40 1200,100 1440,40 L1440,120 L0,120 Z",
              "M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Second wave layer for depth */}
        <motion.path
          d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z"
          fill={fillColor}
          opacity={0.5}
          initial={{ d: "M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z",
              "M0,60 C360,100 720,40 1080,80 C1260,60 1380,40 1440,90 L1440,120 L0,120 Z",
              "M0,90 C360,60 720,80 1080,40 C1260,80 1380,60 1440,50 L1440,120 L0,120 Z",
              "M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
