import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function PremiumCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  const ringSpringConfig = { damping: 40, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(ringX, ringSpringConfig);
  const ringYSpring = useSpring(ringY, ringSpringConfig);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Magnetic and Hover effects on interactive elements
    const updateHoverStates = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [data-cursor-interactive]');
      
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          // Reset magnetic offset if any
        });
        
        // Basic magnetic effect could be added here by modifying cursorX/Y to stick to element center
      });
    };

    updateHoverStates();

    // Re-bind when DOM changes
    const observer = new MutationObserver(updateHoverStates);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: '-50%',
          y: '-50%',
          scale: isClicking ? 0.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-blue-600/30 rounded-full pointer-events-none z-[9998]"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
          x: '-50%',
          y: '-50%',
          width: isHovering ? 50 : 32,
          height: isHovering ? 50 : 32,
          backgroundColor: isHovering ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
          scale: isClicking ? 0.8 : 1,
        }}
      />
    </>
  );
}
