import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const MILESTONES = [
  { year: "2024", title: "Global Expansion", desc: "Opening new headquarters in Singapore and London." },
  { year: "2025", title: "Quantum Launch", desc: "Deploying our first quantum-ready AI algorithms." },
  { year: "2026", title: "Autonomous Agents", desc: "Achieving AGI-lite milestones in enterprise workflows." },
];

export default function CareerSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={ref} className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-bold tracking-wide uppercase mb-4"
          >
            Our Roadmap
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            The Future We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Building</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Background Line */}
          <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ scaleY, transformOrigin: "top center" }}
            className="absolute left-12 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-400 -translate-x-1/2 rounded-full z-10 shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
          />

          {/* Nodes */}
          {MILESTONES.map((milestone, idx) => (
            <div key={idx} className={`relative flex items-center justify-between mb-24 last:mb-0 ${idx % 2 === 0 ? 'flex-row-reverse md:flex-row' : 'flex-row-reverse'}`}>
              
              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12" />

              {/* Center Node */}
              <div className="absolute left-12 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-slate-200 z-20 flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" 
                />
              </div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`w-[calc(100%-6rem)] md:w-5/12 p-8 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] hover:border-blue-100 transition-all duration-300 ml-20 md:ml-0`}
              >
                <div className="text-blue-600 font-extrabold text-2xl mb-2">{milestone.year}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                <p className="text-slate-500 font-medium">{milestone.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
