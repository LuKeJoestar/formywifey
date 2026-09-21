import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart as HeartType } from '../types';

const COLORS = [
  '#eab308', // yellow-500
  '#facc15', // amber-500
  '#d4a017', // amber-600
  '#fde047', // amber-400
  '#f8d66d', // yellow-300
  '#d99a00', // vibrant crimson
  '#e9b949', // soft pastel pink
];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartType[]>([]);

  // Function to spawn a burst of hearts at a specific (x, y) coordinate
  const spawnBurst = useCallback((clickX: number, clickY: number, count: number = 8) => {
    const newHearts: HeartType[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      const speed = 1.5 + Math.random() * 2.5;
      const size = 12 + Math.random() * 18;
      
      newHearts.push({
        id: `burst-${Date.now()}-${i}-${Math.random()}`,
        x: clickX,
        y: clickY,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 1.5, // bias upwards
        },
        opacity: 1,
      });
    }
    setHearts((prev) => [...prev, ...newHearts].slice(-150)); // limit active hearts
  }, []);

  // Set up click listener on the entire window
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on interactive elements like buttons, inputs, etc.
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('.interactive-card')
      ) {
        // Still trigger a smaller burst for feedback
        spawnBurst(e.clientX, e.clientY, 4);
        return;
      }
      spawnBurst(e.clientX, e.clientY, 10);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [spawnBurst]);

  // Handle ambient floating hearts from the bottom
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      const x = Math.random() * window.innerWidth;
      const y = window.innerHeight + 20;
      const size = 10 + Math.random() * 15;
      
      const ambientHeart: HeartType = {
        id: `ambient-${Date.now()}-${Math.random()}`,
        x,
        y,
        size,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 40 - 20,
        velocity: {
          x: Math.random() * 1 - 0.5,
          y: -1 - Math.random() * 1.5, // float upwards
        },
        opacity: 0.8,
      };

      setHearts((prev) => [...prev, ambientHeart].slice(-150));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Update heart positions (physics frame simulation)
  useEffect(() => {
    let animationFrameId: number;
    
    const updatePhysics = () => {
      setHearts((prevHearts) => {
        return prevHearts
          .map((heart) => {
            // Decelerate horizontal speed slightly, keep upward floating force
            const newX = heart.x + heart.velocity.x;
            const newY = heart.y + heart.velocity.y;
            const isBurst = heart.id.startsWith('burst');
            
            return {
              ...heart,
              x: newX,
              y: newY,
              // Fade faster for bursts, slower for ambient floating hearts
              opacity: heart.opacity - (isBurst ? 0.015 : 0.005),
              velocity: {
                x: heart.velocity.x * 0.98,
                // apply a gentle upward acceleration to simulate rising
                y: heart.velocity.y - 0.02,
              }
            };
          })
          .filter((heart) => heart.opacity > 0 && heart.y > -50 && heart.x > -50 && heart.x < window.innerWidth + 50);
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.x,
            top: heart.y,
            width: heart.size,
            height: heart.size,
            transform: `translate(-50%, -50%) rotate(${heart.rotation}deg)`,
            color: heart.color,
            opacity: heart.opacity,
            transition: 'opacity 0.05s linear',
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          className="drop-shadow-md"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
