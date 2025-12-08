import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MorphingIconProps {
  Icon: LucideIcon;
  className?: string;
  delay?: number;
}

const MorphingIcon = ({ Icon, className = '', delay = 0 }: MorphingIconProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: delay,
      }}
      whileHover={{
        scale: 1.15,
        rotate: [0, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 },
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-lg"
        style={{ backgroundColor: 'currentColor', opacity: 0.3 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Icon with pulse effect */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
      >
        <Icon className="relative z-10 w-full h-full" />
      </motion.div>
    </motion.div>
  );
};

export default MorphingIcon;
