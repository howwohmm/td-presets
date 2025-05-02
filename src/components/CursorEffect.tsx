
import React, { useState, useEffect } from 'react';

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState<{ x: number; y: number; size: number; opacity: number; }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add a new dot at current position
      setDots(prev => [
        ...prev, 
        { 
          x: e.clientX, 
          y: e.clientY, 
          size: Math.random() * 5 + 3,
          opacity: 1 
        }
      ].slice(-15)); // Keep only the last 15 dots
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation loop for dots fading
    const fadeInterval = setInterval(() => {
      setDots(prev => prev.map(dot => ({
        ...dot,
        opacity: Math.max(0, dot.opacity - 0.05)
      })).filter(dot => dot.opacity > 0));
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(fadeInterval);
    };
  }, []);

  // Main cursor dot
  const cursorDot = (
    <div 
      className="fixed pointer-events-none z-50 rounded-full mix-blend-difference"
      style={{
        width: '12px',
        height: '12px',
        backgroundColor: 'white',
        transform: `translate(${position.x - 6}px, ${position.y - 6}px)`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );

  // Trail dots
  const trailDots = dots.map((dot, index) => (
    <div 
      key={index}
      className="fixed pointer-events-none z-40 rounded-full"
      style={{
        width: `${dot.size}px`,
        height: `${dot.size}px`,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        transform: `translate(${dot.x - dot.size / 2}px, ${dot.y - dot.size / 2}px)`,
        opacity: dot.opacity,
      }}
    />
  ));

  return (
    <>
      {cursorDot}
      {trailDots}
    </>
  );
};

export default CursorEffect;
