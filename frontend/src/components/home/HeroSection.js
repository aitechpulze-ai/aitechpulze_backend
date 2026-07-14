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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060713] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Mesh Gradient / Aurora */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-blue-600/10 rounded-full filter blur-[120px] opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-[700px] h-[700px] bg-cyan-600/10 rounded-full filter blur-[120px] opacity-70 animate-blob animation-delay-4000" />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" 
             style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0e22] border border-white/10 text-blue-400 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AiTechPulze 3.0 is Live
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-4"
          >
            Architecting <br className="hidden lg:block" />
            Intelligent <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
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
                className="text-2xl lg:text-4xl font-bold text-cyan-400"
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
            className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed"
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
            <button className="premium-btn group w-full sm:w-auto cursor-pointer">
              <span>Build Your Future</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="premium-btn premium-btn-secondary w-full sm:w-auto cursor-pointer">
              Book Strategy Call
            </button>
          </motion.div>
        </div>

        {/* Right AI Visualization */}
        <div className="w-full lg:w-1/2 h-[550px] lg:h-[700px] relative mt-16 lg:mt-0 flex items-center justify-center">
          <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">
            {/* Circle 1: Outer Rotating Cyber Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-16px] rounded-full border border-dashed border-blue-500/20"
            />

            {/* Circle 3: Mid Hexagonal Grid Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full border border-double border-cyan-500/20"
              style={{
                backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.05) 2px, transparent 2px)`,
                backgroundSize: '16px 16px'
              }}
            />

            {/* Circle 4: Inner Rotating Tech Gear */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute inset-24 rounded-full border-2 border-transparent border-t-purple-500/40 border-b-blue-500/40"
            />

            {/* Glowing Central Cyber Core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 rounded-full blur-[30px] opacity-80 flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.6)]"
            />

            <div className="absolute w-32 h-32 rounded-full bg-white p-4 border-[8px] border-[#05060f] flex items-center justify-center z-10 shadow-[0_0_35px_rgba(6,182,212,0.4)]">
              <img
                src="/images/favicon.png"
                alt="AiTechPulze Brand Icon"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Futuristic Telemetry Card 1 - Top Left */}
            <motion.div
              initial={{ x: -50, y: -50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-2 left-2 p-4 bg-[#0d0e22]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl z-20 w-52 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">SEO PERFORMANCE</span>
              </div>
              <div className="text-white text-sm font-bold font-mono">Google SEO Rating</div>
              <div className="text-[9px] text-slate-400 font-mono mt-1">CORE WEB VITALS: 100%</div>
              <div className="w-full bg-white/10 h-[2px] mt-3 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ['20%', '100%', '60%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />
              </div>
            </motion.div>

            {/* Futuristic Telemetry Card 2 - Bottom Right */}
            <motion.div
              initial={{ x: 50, y: 50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-2 right-2 p-4 bg-[#0d0e22]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl z-20 w-52 cursor-pointer"
            >
              <div className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">DEVELOPMENT SERVICES</div>
              <div className="text-white text-sm font-bold font-mono">SaaS, AI & Web Dev</div>
              <div className="text-[9px] text-slate-400 font-mono mt-0.5 mb-2">SCALABLE ARCHITECTURES</div>
              {/* Micro-sparkline using SVG */}
              <svg className="w-full h-8 stroke-cyan-400 fill-none" viewBox="0 0 100 30">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                  strokeWidth="1.5"
                  d="M0,25 Q15,5 30,20 T60,10 T90,25"
                />
              </svg>
            </motion.div>

            {/* Futuristic Telemetry Card 3 - Bottom Left */}
            <motion.div
              initial={{ x: -50, y: 50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-10 left-2 p-4 bg-[#0d0e22]/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl z-20 w-52 cursor-pointer"
            >
              <div className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-wider mb-1">INTERNSHIP PORTAL</div>
              <div className="text-white text-xs font-bold font-mono">Domain-Specific Tracks</div>
              <div className="text-[9px] text-purple-300 font-mono mt-1">APPLICATIONS: OPEN & ACTIVE</div>
            </motion.div>

            {/* Cyber Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-400/20 fill-none stroke-dasharray-5" viewBox="0 0 500 500">
              <line x1="90" y1="90" x2="190" y2="190" strokeWidth="1" />
              <line x1="410" y1="410" x2="310" y2="310" strokeWidth="1" />
              <line x1="80" y1="410" x2="190" y2="310" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
