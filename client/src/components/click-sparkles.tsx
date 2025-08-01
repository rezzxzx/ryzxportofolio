import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function ClickSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Throttle sparkles for performance
      if (sparkles.length > 15) return;
      
      const newSparkles: Sparkle[] = [];
      const sparkleCount = 4; // Reduced from 8 to 4
      
      for (let i = 0; i < sparkleCount; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 3, // Smaller sparkles
          delay: i * 0.08
        });
      }
      
      setSparkles(prev => [...prev, ...newSparkles]);
      
      // Remove sparkles after animation
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => 
          !newSparkles.some(newSparkle => newSparkle.id === sparkle.id)
        ));
      }, 800); // Shorter duration
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, [sparkles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute rounded-full bg-blue-400 shadow-lg"
            style={{
              left: sparkle.x - sparkle.size / 2,
              top: sparkle.y - sparkle.size / 2,
              width: sparkle.size,
              height: sparkle.size,
              boxShadow: '0 0 6px #60A5FA'
            }}
            initial={{ 
              scale: 0, 
              opacity: 1,
              rotate: 0
            }}
            animate={{ 
              scale: [0, 1.2, 0],
              opacity: [1, 0.8, 0],
              rotate: 360,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100 - 50
            }}
            exit={{ 
              scale: 0, 
              opacity: 0 
            }}
            transition={{ 
              duration: 0.8,
              delay: sparkle.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}