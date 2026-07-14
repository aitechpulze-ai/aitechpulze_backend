import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY } from '../data/content';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    // Stop pulse after 5 seconds
    const t = setTimeout(() => setPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const quickMessages = [
    "Hi! I need a quote for my project 👋",
    "Tell me about your internship program 🎓",
    "I need help with my final year project 💡",
    "What services do you offer? 🚀",
  ];

  const openWhatsApp = (msg) => {
    const encoded = encodeURIComponent(msg);
    const phone = COMPANY.whatsapp?.replace(/\D/g, '') || '919597025060';
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1100] flex flex-col items-end gap-3">
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 bg-[#0c0d21] border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20">
                  <img src="/favicon.png" alt="AiTechPulze" className="w-full h-full object-contain p-1.5" />
                </div>
                <div>
                  <div className="text-white font-extrabold text-sm">AiTechPulze Support</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-white/80 text-[10px] font-medium">Online · Usually replies instantly</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-auto text-white/60 hover:text-white text-xl transition-colors cursor-pointer"
                >✕</button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-5">
              {/* Greeting bubble */}
              <div className="flex items-start gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full overflow-hidden bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <img src="/favicon.png" alt="" className="w-full h-full object-contain p-1" />
                </div>
                <div className="bg-[#0d0e22] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-300 leading-relaxed max-w-[85%]">
                  👋 Hi there! How can we help you today?
                  <div className="text-[10px] text-slate-500 mt-1.5">AiTechPulze Team · just now</div>
                </div>
              </div>

              {/* Quick reply buttons */}
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 px-1">Quick Messages</div>
              <div className="space-y-2">
                {quickMessages.map((msg) => (
                  <button
                    key={msg}
                    onClick={() => openWhatsApp(msg)}
                    className="w-full text-left text-xs text-slate-300 bg-[#0d0e22] hover:bg-emerald-950/30 border border-white/8 hover:border-emerald-900/40 rounded-xl px-4 py-2.5 transition-all duration-200 cursor-pointer font-medium leading-snug"
                  >
                    {msg}
                  </button>
                ))}
              </div>

              {/* Direct WhatsApp CTA */}
              <button
                onClick={() => openWhatsApp("Hi AiTechPulze! I'd like to know more about your services.")}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Open WhatsApp Chat
              </button>

              <p className="text-center text-[9px] text-slate-600 mt-3">Powered by AiTechPulze · WhatsApp Business</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setPulse(false); }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.45)] cursor-pointer"
      >
        {/* Pulse ring */}
        {pulse && (
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              className="text-white text-xl font-bold">✕</motion.span>
          ) : (
            <motion.svg key="chat" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
