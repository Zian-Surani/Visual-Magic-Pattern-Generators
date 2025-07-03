import React, { useEffect, useState, useRef } from 'react';
interface KaleidoscopeCanvasProps {
  segments: number;
  colorScheme: string;
  brushSize: number;
  mirrorMode: boolean;
}
const KaleidoscopeCanvas: React.FC<KaleidoscopeCanvasProps> = ({
  segments,
  colorScheme,
  brushSize,
  mirrorMode
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({
    width: 600,
    height: 600
  });
  const [lastPoint, setLastPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // Get a color based on the scheme and position
  const getColor = (x: number, y: number, scheme: string): string => {
    const distance = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x);
    switch (scheme) {
      case 'rainbow':
        return `hsl(${(angle * 180 / Math.PI + 180) % 360}, 100%, 50%)`;
      case 'ocean':
        return `hsl(${200 + distance % 40}, ${70 + distance % 30}%, ${40 + distance % 30}%)`;
      case 'fire':
        return `hsl(${10 + distance % 30}, ${90 - distance % 20}%, ${40 + distance % 30}%)`;
      case 'forest':
        return `hsl(${100 + distance % 60}, ${60 + distance % 40}%, ${30 + distance % 30}%)`;
      case 'monochrome':
        return `hsl(0, 0%, ${50 + distance % 50}%)`;
      default:
        return `hsl(${(angle * 180 / Math.PI + 180) % 360}, 100%, 50%)`;
    }
  };
  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth, container.clientHeight) - 40;
        setCanvasSize({
          width: size,
          height: size
        });
        canvas.width = size;
        canvas.height = size;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  // Draw functions
  const drawPoint = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    // Convert to relative coordinates from center
    const relX = x - centerX;
    const relY = y - centerY;
    // Calculate distance and angle from center
    const distance = Math.sqrt(relX * relX + relY * relY);
    const angle = Math.atan2(relY, relX);
    // Draw the initial point
    ctx.fillStyle = getColor(relX, relY, colorScheme);
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    // Draw mirrored points based on segments
    for (let i = 0; i < segments; i++) {
      const segmentAngle = Math.PI * 2 / segments;
      const newAngle = angle + segmentAngle * i;
      const newX = centerX + Math.cos(newAngle) * distance;
      const newY = centerY + Math.sin(newAngle) * distance;
      ctx.fillStyle = getColor(Math.cos(newAngle) * distance, Math.sin(newAngle) * distance, colorScheme);
      ctx.beginPath();
      ctx.arc(newX, newY, brushSize, 0, Math.PI * 2);
      ctx.fill();
      if (mirrorMode) {
        // Add reflection across the center
        const reflectedX = centerX - Math.cos(newAngle) * distance;
        const reflectedY = centerY - Math.sin(newAngle) * distance;
        ctx.fillStyle = getColor(-Math.cos(newAngle) * distance, -Math.sin(newAngle) * distance, colorScheme);
        ctx.beginPath();
        ctx.arc(reflectedX, reflectedY, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    // Calculate the distance between the two points
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // If the distance is very small, just draw a point
    if (distance < 1) {
      drawPoint(ctx, x2, y2);
      return;
    }
    // Otherwise, interpolate points along the line
    const steps = Math.max(Math.floor(distance / 2), 1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + dx * t;
      const y = y1 + dy * t;
      drawPoint(ctx, x, y);
    }
  };
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawPoint(ctx, x, y);
      setLastPoint({
        x,
        y
      });
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawLine(ctx, lastPoint.x, lastPoint.y, x, y);
      setLastPoint({
        x,
        y
      });
    }
  };
  const handleMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawPoint(ctx, x, y);
      setLastPoint({
        x,
        y
      });
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !lastPoint) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawLine(ctx, lastPoint.x, lastPoint.y, x, y);
      setLastPoint({
        x,
        y
      });
    }
  };
  const handleTouchEnd = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };
  return <div className="relative">
      <canvas id="kaleidoscope" ref={canvasRef} width={canvasSize.width} height={canvasSize.height} className="bg-black rounded-full shadow-lg border-4 border-gray-700 cursor-crosshair" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} />
    </div>;
};
export default KaleidoscopeCanvas;