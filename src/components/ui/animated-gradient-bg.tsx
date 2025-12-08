import { motion } from 'framer-motion';

interface AnimatedGradientBgProps {
  className?: string;
}

const AnimatedGradientBg = ({ className = '' }: AnimatedGradientBgProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Primary gradient blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
          left: '-10%',
          top: '-20%',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary gradient blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          right: '-5%',
          top: '10%',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Tertiary gradient blob */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
          left: '30%',
          bottom: '-15%',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default AnimatedGradientBg;
