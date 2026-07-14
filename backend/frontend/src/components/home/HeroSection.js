import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROTATING_TEXTS = [
  "Web Experiences",
  "AI Automation",
  "Business Intelligence",
  "Cloud Platforms",
  "AI Agents",
  "Machine Learning",
  "SaaS Products"
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const laptopHover = {
    y: -8,
    scale: 1.01,
  };
  const phoneHover = {
    y: -10,
    scale: 1.03,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Mesh Gradient / Aurora */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-blue-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-[700px] h-[700px] bg-sky-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000" />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)`,
               backgroundSize: '40px 40px',
               perspective: '1000px',
               transform: 'rotateX(60deg) scale(2) translateY(-100px)',
               transformOrigin: 'top center',
             }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AiTechPulze 3.0 is Live
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4"
          >
            Architecting <br className="hidden lg:block" />
            Intelligent <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Digital Experiences
            </span>
          </motion.h1>

          <div className="h-12 lg:h-16 flex items-center mb-6 overflow-hidden">
            <span className="text-2xl lg:text-4xl font-semibold text-slate-400 mr-3">For</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ y: 40, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -40, opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.5, ease: "anticipate" }}
                className="text-2xl lg:text-4xl font-bold text-blue-600"
                style={{ transformOrigin: "bottom center" }}
              >
                {ROTATING_TEXTS[textIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed"
          >
            We transform complex business challenges into elegant, AI-driven digital 
            solutions. Experience the pinnacle of performance, design, and intelligent automation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="premium-btn group w-full sm:w-auto">
              <span>Build Your Future</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="premium-btn premium-btn-secondary w-full sm:w-auto">
              Book Strategy Call
            </button>
          </motion.div>
        </div>

        {/* Right AI Visualization */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative mt-16 lg:mt-0 perspective-1000">
          <motion.div 
            className="absolute inset-0 w-full h-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ambient rings behind the mockups */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full border border-blue-200/35" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full border border-cyan-200/35" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full border border-blue-200/25" />

            {/* Laptop Mockup */}
            <motion.div 
              className="absolute right-2 top-32 w-[640px] max-w-[92%] rounded-[2rem] bg-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.22)] border border-slate-800 p-3"
              whileHover={laptopHover}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="w-full h-[360px] rounded-[1.4rem] bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden border border-slate-200 relative">
                <div className="absolute top-0 left-0 right-0 h-14 bg-white/90 border-b border-slate-200 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mx-auto w-56 h-5 rounded-full bg-slate-100 border border-slate-200" />
                </div>

                <div className="absolute inset-0 pt-20 p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400" />
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-[0.25em]">AiTechPulze</div>
                      <div className="text-slate-900 font-extrabold text-xl tracking-tight">Modern Architecture</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-7 rounded-[1.2rem] bg-white border border-slate-200 shadow-sm p-5">
                      <div className="w-32 h-4 rounded-full bg-slate-100 mb-3" />
                      <div className="w-52 h-10 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100" />
                      <div className="mt-5 h-24 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex items-end px-4 pb-4">
                        <div className="w-full h-16 rounded-full bg-gradient-to-r from-blue-200/80 via-cyan-200/60 to-blue-200/80" />
                      </div>
                    </div>

                    <div className="col-span-5 rounded-[1.2rem] bg-white border border-slate-200 shadow-sm p-5">
                      <div className="w-24 h-4 rounded-full bg-slate-100 mb-4" />
                      <div className="space-y-3">
                        <div className="h-8 rounded-lg bg-slate-100" />
                        <div className="h-8 rounded-lg bg-slate-100" />
                        <div className="h-8 rounded-lg bg-slate-100" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-4">
                    {["AI Agents", "Cloud Ops", "Dashboards"].map((item) => (
                      <div key={item} className="rounded-[1.1rem] bg-white border border-slate-200 shadow-sm p-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 mb-3" />
                        <div className="text-sm font-bold text-slate-900">{item}</div>
                        <div className="text-xs text-slate-400 mt-1">Live preview</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div 
              className="absolute right-0 bottom-0 w-44 md:w-60 aspect-[9/19] rounded-[2.2rem] bg-slate-900 shadow-[0_24px_70px_rgba(15,23,42,0.28)] border-[6px] border-slate-800 p-1.5 z-20"
              whileHover={phoneHover}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
            >
              <div className="w-full h-full rounded-[1.7rem] bg-gradient-to-b from-blue-600 to-indigo-600 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-slate-950 rounded-b-2xl z-10" />
                <div className="pt-10 px-4 pb-4 h-full flex flex-col">
                  <div className="w-2/3 h-5 rounded-full bg-white/20 mb-3" />
                  <div className="rounded-[1.4rem] bg-white/10 border border-white/20 backdrop-blur-md p-4">
                    <div className="text-white/80 text-[11px] font-bold uppercase tracking-[0.22em] mb-2">AiTechPulze</div>
                    <div className="text-white font-extrabold leading-tight text-lg">
                      AI products that feel premium on every device.
                    </div>
                  </div>
                  <div className="mt-4 rounded-[1.4rem] bg-white p-4 shadow-lg flex-1 flex flex-col gap-3">
                    <div className="h-7 rounded-xl bg-slate-100" />
                    <div className="h-7 rounded-xl bg-slate-100" />
                    <div className="mt-auto h-24 rounded-[1rem] bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-900">Live Demo</div>
                        <div className="text-xs text-slate-500">Mobile first UI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
