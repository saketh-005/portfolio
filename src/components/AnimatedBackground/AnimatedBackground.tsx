import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Box } from '@mui/material';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  targetX: number;
  targetY: number;
  update(this: Particle): void;
  draw(this: Particle, ctx: CanvasRenderingContext2D): void;
}

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef<{x: number | null; y: number | null}>({ x: null, y: null });
  const [time, setTime] = useState(0);
  
  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: null, y: null };
  }, []);

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const size = Math.random() * 3 + 1;
    
    return {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      size: size,
      baseSize: size,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      targetX: 0,
      targetY: 0,
      update: function() {
        // Add some noise to movement
        this.x += this.speedX + Math.sin(time * 0.001 + this.x * 0.01) * 0.5;
        this.y += this.speedY + Math.cos(time * 0.001 + this.y * 0.01) * 0.5;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
        
        // Mouse interaction
        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = mousePos.current.x - this.x;
          const dy = mousePos.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / 150) * 0.2;
            this.speedX += Math.cos(angle) * force;
            this.speedY += Math.sin(angle) * force;
          }
        }
        
        // Apply friction
        this.speedX *= 0.99;
        this.speedY *= 0.99;
        
        // Pulsing effect
        this.size = this.baseSize + Math.sin(time * 0.002) * 0.5;
      },
      draw: function(ctx) {
        // Updated to match the new theme's primary color
        ctx.fillStyle = 'rgba(124, 77, 255, 0.4)'; // Primary color from theme
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  };

  const initParticles = useCallback((count: number): Particle[] => {
    const canvas = canvasRef.current;
    if (!canvas) return [];
    
    // Create array of particles using a simple for loop
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      result.push(createParticle(canvas));
    }
    return result;
  }, []);

  const connectParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    // Create connections between particles
    for (let a = 0; a < particles.length; a++) {
      // Connect to nearest 3 particles for better performance
      const nearest: {index: number, distance: number}[] = [];
      
      for (let b = 0; b < particles.length; b++) {
        if (a === b) continue;
        
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) { // Increased connection range
          nearest.push({ index: b, distance });
        }
      }
      
      // Sort by distance and take the closest 3
      nearest.sort((a, b) => a.distance - b.distance).slice(0, 3).forEach(neighbor => {
        const b = neighbor.index;
        const distance = neighbor.distance;
        const opacity = 1 - (distance / 150);
        
        // Create gradient for connection lines
        const gradient = ctx.createLinearGradient(
          particles[a].x, particles[a].y,
          particles[b].x, particles[b].y
        );
        
        gradient.addColorStop(0, `rgba(0, 229, 255, ${opacity * 0.2})`);
        gradient.addColorStop(1, `rgba(124, 77, 255, ${opacity * 0.2})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.5 + (Math.sin(time * 0.005) * 0.2); // Subtle pulse effect
        
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      });
    }
  }, []);

  const animate = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    // Clear with a slight fade effect for motion trails
    ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update time for animations
    setTime((prev: number) => prev + 1);
    
    // Draw name in the background
    ctx.save();
    const fontSize = Math.min(canvas.width / 12, 120);
    ctx.font = `900 ${fontSize}px 'Poppins', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create a more visible gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'rgba(124, 77, 255, 0.1)');
    gradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(124, 77, 255, 0.1)');
    ctx.fillStyle = gradient;
    
    // Add subtle movement to the text
    const offsetX = Math.sin(time * 0.001) * 10;
    const offsetY = Math.cos(time * 0.0007) * 8;
    
    // Draw name with outline for better visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Draw name in the center
    ctx.fillText('SAKETH JANGALA', 
      canvas.width / 2 + offsetX, 
      canvas.height / 2 + offsetY
    );
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    
    // Add a subtle glow effect
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
    ctx.lineWidth = 3;
    ctx.strokeText('SAKETH JANGALA', 
      canvas.width / 2 + offsetX, 
      canvas.height / 2 + offsetY
    );
    
    ctx.restore();
    
    // Sort particles by y-position for better depth
    const sortedParticles = [...particles.current].sort((a, b) => a.y - b.y);
    
    // Draw connections first (behind particles)
    connectParticles(ctx, sortedParticles);
    
    // Update and draw particles
    sortedParticles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });
    
    const id = requestAnimationFrame(() => animate(canvas, ctx));
    animationFrameId.current = id;
  }, [connectParticles]);

  const handleResize = useCallback((canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas size
    handleResize(canvas);
    
    // Initialize particles
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    particles.current = initParticles(particleCount);
    
    // Start animation
    animate(canvas, ctx);

    // Handle window resize
    const handleWindowResize = () => {
      handleResize(canvas);
    };
    
    window.addEventListener('resize', handleWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        cursor: 'none',
        transition: 'opacity 0.5s ease-in-out',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    />
  );
};

export default AnimatedBackground;
