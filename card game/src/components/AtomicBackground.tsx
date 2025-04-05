import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  opacity: number;
}

export function AtomicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const colors = ['#93c5fd', '#818cf8', '#c084fc', '#f472b6'];
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.1 + Math.random() * 0.2
      });
    }

    // Draw paint splash
    function drawSplash(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      // Create irregular paint splash shape
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = size * (0.7 + Math.random() * 0.6);
        const controlRadius = size * (1 + Math.random() * 0.5);
        
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        
        const cp1x = Math.cos(angle - 0.2) * controlRadius;
        const cp1y = Math.sin(angle - 0.2) * controlRadius;
        const cp2x = Math.cos(angle + 0.2) * controlRadius;
        const cp2y = Math.sin(angle + 0.2) * controlRadius;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py);
        }
      }

      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add some texture
      ctx.globalAlpha = opacity * 0.3;
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }

    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += 0.002;

        // Bounce off walls with some randomness
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.vx += (Math.random() - 0.5) * 0.2;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.vy += (Math.random() - 0.5) * 0.2;
        }

        // Draw paint splash
        drawSplash(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.rotation,
          particle.opacity
        );
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom right, #ffffff, #f8fafc)' }}
    />
  );
}