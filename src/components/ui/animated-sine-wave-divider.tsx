import { useEffect, useRef } from 'react';

interface AnimatedSineWaveDividerProps {
  className?: string;
  height?: number;
  waveColor?: string;
  circleColor?: string;
  bgColor?: string;
  showCircle?: boolean;
}

const AnimatedSineWaveDivider = ({
  className = '',
  height = 150,
  waveColor = '#3b82f6',
  circleColor = '#3b82f6',
  bgColor = '#0f172a',
  showCircle = true,
}: AnimatedSineWaveDividerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const historyRef = useRef<number[]>([]);

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

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const canvasHeight = rect.height;
      const centerY = canvasHeight / 2;

      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, canvasHeight);

      const circleRadius = canvasHeight * 0.35;
      const circleX = showCircle ? circleRadius + 40 : 0;
      const waveStartX = showCircle ? circleX + circleRadius + 20 : 0;
      const waveWidth = width - waveStartX;
      const waveAmplitude = circleRadius;

      // Calculate current point on circle
      const angle = angleRef.current;
      const pointY = Math.sin(angle) * circleRadius;

      // Add to history
      historyRef.current.unshift(pointY);
      
      // Limit history length based on wave width
      const maxHistory = Math.floor(waveWidth / 2);
      if (historyRef.current.length > maxHistory) {
        historyRef.current = historyRef.current.slice(0, maxHistory);
      }

      if (showCircle) {
        // Draw circle (dashed)
        ctx.beginPath();
        ctx.arc(circleX, centerY, circleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = circleColor;
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw circle axes
        ctx.beginPath();
        ctx.moveTo(circleX - circleRadius - 10, centerY);
        ctx.lineTo(circleX + circleRadius + 10, centerY);
        ctx.moveTo(circleX, centerY - circleRadius - 10);
        ctx.lineTo(circleX, centerY + circleRadius + 10);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw rotating line from center to point
        const pointOnCircleX = circleX + Math.cos(angle) * circleRadius;
        const pointOnCircleY = centerY + pointY;

        ctx.beginPath();
        ctx.moveTo(circleX, centerY);
        ctx.lineTo(pointOnCircleX, pointOnCircleY);
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw point on circle
        ctx.beginPath();
        ctx.arc(pointOnCircleX, pointOnCircleY, 5, 0, Math.PI * 2);
        ctx.fillStyle = waveColor;
        ctx.fill();

        // Draw horizontal line connecting to wave
        ctx.beginPath();
        ctx.moveTo(pointOnCircleX, pointOnCircleY);
        ctx.lineTo(waveStartX, centerY + pointY);
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw vertical axis for wave
      ctx.beginPath();
      ctx.moveTo(waveStartX, centerY - waveAmplitude - 10);
      ctx.lineTo(waveStartX, centerY + waveAmplitude + 10);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw horizontal axis for wave
      ctx.beginPath();
      ctx.moveTo(waveStartX, centerY);
      ctx.lineTo(width, centerY);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw sine wave from history
      if (historyRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(waveStartX, centerY + historyRef.current[0]);
        
        for (let i = 1; i < historyRef.current.length; i++) {
          const x = waveStartX + i * 2;
          const y = centerY + historyRef.current[i];
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Draw current point on wave
      ctx.beginPath();
      ctx.arc(waveStartX, centerY + pointY, 5, 0, Math.PI * 2);
      ctx.fillStyle = waveColor;
      ctx.fill();

      // Increment angle
      angleRef.current += 0.03;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [waveColor, circleColor, bgColor, showCircle]);

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

export default AnimatedSineWaveDivider;
