import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

const AnimatedNumber = ({ value, duration = 10000, className }: AnimatedNumberProps) => {
  const displayValue = useAnimatedCounter(value, {
    duration,
    loop: true,
    pauseBetweenLoops: 2000,
  });

  return <span className={className}>{displayValue}</span>;
};

export default AnimatedNumber;
