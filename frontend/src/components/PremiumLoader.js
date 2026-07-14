import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PremiumLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Artificial delay for loading demonstration
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 800); // wait for exit animation
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
               style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} 
          />

          {/* Glowing background blob */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.15 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute w-96 h-96 bg-blue-500 rounded-full blur-[100px]"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Logo Morph Placeholder - We use a sophisticated glowing ring for now */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-xl border border-blue-500/20 bg-gradient-to-tr from-blue-600/10 to-blue-400/10 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-lg border-t-2 border-r-2 border-blue-600"
              />
              <span className="font-bold text-xl tracking-tighter text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                A
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <h1 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
                Initializing Environment
              </h1>
              {/* Premium Progress Bar */}
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
