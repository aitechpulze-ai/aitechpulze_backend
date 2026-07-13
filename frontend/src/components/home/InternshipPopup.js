import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InternshipPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem('internship-popup-dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('internship-popup-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[90%] rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-100 shadow-[0_20px_50px_rgba(37,99,235,0.15)] p-5 overflow-hidden"
        >
          {/* Decorative glowing gradient circle */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-cyan-400/10 rounded-full blur-lg pointer-events-none" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close Announcement"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Popup Content */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl shadow-inner">
              🎓
            </div>
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  New
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              </div>
              <h4 className="text-sm font-black text-slate-900 mb-1">
                Certified Internships Live!
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Build real-world AI & web products. Join our hybrid/remote summer cohorts.
              </p>
              <div className="flex gap-2">
                <Link
                  to="/internships"
                  onClick={handleDismiss}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
                >
                  Apply Now →
                </Link>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
