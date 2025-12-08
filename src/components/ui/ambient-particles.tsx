import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface AmbientParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const AmbientParticles = ({ 
  count = 20, 
  colors = ['rgba(239, 68, 68, 0.15)', 'rgba(168, 85, 247, 0.15)', 'rgba(249, 115, 22, 0.15)'],
  className = ''
}: AmbientParticlesProps) => {
  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -40, 20, -30, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
