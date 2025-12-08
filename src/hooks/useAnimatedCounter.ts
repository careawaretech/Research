import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterOptions {
  duration?: number;
  loop?: boolean;
  pauseBetweenLoops?: number;
}

export const useAnimatedCounter = (
  targetValue: string,
  options: AnimatedCounterOptions = {}
) => {
  const { duration = 10000, loop = true, pauseBetweenLoops = 2000 } = options;
  const [displayValue, setDisplayValue] = useState('');
  const animationRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Parse the target value to extract number and formatting
    const parseValue = (value: string) => {
      const prefix = value.match(/^[^\d]*/)?.[0] || '';
      const suffix = value.match(/[^\d.]*$/)?.[0] || '';
      const numberMatch = value.match(/[\d.]+/);
      const number = numberMatch ? parseFloat(numberMatch[0]) : 0;
      const decimals = numberMatch?.[0].includes('.') 
        ? numberMatch[0].split('.')[1]?.length || 0 
        : 0;
      
      return { prefix, suffix, number, decimals };
    };

    const { prefix, suffix, number, decimals } = parseValue(targetValue);

    const animate = () => {
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentNumber = number * easeOutQuart;
        const formattedNumber = decimals > 0 
          ? currentNumber.toFixed(decimals)
          : Math.round(currentNumber).toString();
        
        setDisplayValue(`${prefix}${formattedNumber}${suffix}`);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else if (loop) {
          // Reset and loop after pause
          timeoutRef.current = setTimeout(() => {
            setDisplayValue(`${prefix}0${decimals > 0 ? '.' + '0'.repeat(decimals) : ''}${suffix}`);
            setTimeout(() => animate(), 100);
          }, pauseBetweenLoops);
        }
      };
      
      animationRef.current = requestAnimationFrame(step);
    };

    // Start animation
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [targetValue, duration, loop, pauseBetweenLoops]);

  return displayValue;
};
