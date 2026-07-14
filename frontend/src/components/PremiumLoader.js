import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  'SECURE PROTOCOL INTERFACE',
  'RESOLVING CORE DATAFRAMES',
  'SYNCHRONIZING GRAPHICS DRIVER',
  'COMPILING SYSTEMS...',
  'INTERFACE STABLE'
];

export default function PremiumLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const hasRun = sessionStorage.getItem('aitechpulze_loader_has_run');
    if (hasRun) {
      setIsVisible(false);
      if (onComplete) onComplete();
    } else {
      setIsVisible(true);
      
      // Cycle through status messages
      const interval = setInterval(() => {
        setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 500);

      // Finish loading
      const timer = setTimeout(() => {
        sessionStorage.setItem('aitechpulze_loader_has_run', 'true');
        setIsVisible(false);
        if (onComplete) {
          setTimeout(onComplete, 800);
        }
      }, 2800);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#05060f] overflow-hidden"
        >
          {/* Cyber grid background */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(18, 113, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 113, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }} 
          />

          {/* Futuristic laser scanning line */}
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
          />

          {/* Glowing central node */}
          <div className="absolute w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Multi-layered orbital HUD ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer dashed tech circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-blue-500/30"
              />
              {/* Mid ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border-2 border-transparent border-t-blue-500 border-b-cyan-400"
              />
              {/* Inner ring */}
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-dashed border-cyan-400/40"
              />
              {/* Glowing center symbol */}
              <div className="z-10 text-white font-black text-2xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                A
              </div>
            </div>

            {/* High-Tech status info */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-[10px] font-mono tracking-[0.3em] text-slate-500 uppercase">
                SYSTEM CORE ONLINE
              </div>
              <motion.div 
                key={stepIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono font-bold tracking-[0.15em] text-cyan-400 uppercase h-4"
              >
                &gt; {LOADING_STEPS[stepIndex]}
              </motion.div>
              
              {/* Minimal bar loading indicator */}
              <div className="w-48 h-[3px] bg-white/5 rounded-full overflow-hidden border border-white/5 mt-2">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
