import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const AnimatedLogo = ({ src, alt, className = '' }: AnimatedLogoProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-primary/30 blur-md"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Logo image */}
      <motion.img
        src={src}
        alt={alt}
        className="relative z-10 h-10 w-10 rounded-lg object-contain"
        animate={{
          filter: [
            'drop-shadow(0 0 2px hsl(var(--primary) / 0.4))',
            'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))',
            'drop-shadow(0 0 2px hsl(var(--primary) / 0.4))',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
