import { useEffect, useRef } from 'react';

interface SineLinesDividerProps {
  className?: string;
  height?: number;
  lineColor?: string;
  bgColor?: string;
}

const SineLinesDivider = ({
  className = '',
  height = 120,
  lineColor = '#1e3a5f',
  bgColor = '#0f172a',
}: SineLinesDividerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const scaleVal = 8.0;
    const angleInc = 0.15;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const canvasHeight = rect.height;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, canvasHeight);

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;

      const time = timeRef.current;

      for (let offset = -10; offset < width + 10; offset += 12) {
        let angle = time * 0.5;
        let y = 0;
        let velocity = 0;
        const acceleration = 0.008;

        ctx.beginPath();
        
        while (y <= canvasHeight) {
          const x = offset + Math.sin(angle) * scaleVal;
          
          if (y === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          angle += angleInc;
          velocity += acceleration;
          y += 2 + velocity;
        }
        
        ctx.stroke();
      }

      timeRef.current += 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [lineColor, bgColor]);

  return (
    <div className={`absolute left-0 right-0 bottom-0 w-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height }}
      />
    </div>
  );
};

export default SineLinesDivider;
