import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const TECH_STACK = [
  { name: 'React', badge: 'React' },
  { name: 'Spring Boot', badge: 'SB' },
  { name: 'Python', badge: 'Py' },
  { name: 'TensorFlow', badge: 'TF' },
  { name: 'Firebase', badge: 'FB' },
  { name: 'MySQL', badge: 'SQL' },
  { name: 'AWS', badge: 'AWS' },
  { name: 'Docker', badge: 'DK' },
  { name: 'Node.js', badge: 'Node' },
  { name: 'MongoDB', badge: 'MDB' },
];

function getTechIcon(badge) {
  switch (badge) {
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6" fill="none" stroke="#00d8ff" strokeWidth="1.2">
          <circle cx="0" cy="0" r="2.05" fill="#00d8ff"/>
          <g>
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'SB':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#6db33f">
          <path d="M12 2C6.5 6.5 4 10.5 4 14c0 4.4 3.6 8 8 8s8-3.6 8-8c0-3.5-2.5-7.5-8-12zm-2 15c-1.1 0-2-.9-2-2s2-4 4-6c0 2.2-2 6-2 8z"/>
        </svg>
      );
    case 'Py':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12.12 2c-3.13 0-2.93 1.36-2.93 1.36v1.43h3v.44h-4.2C6.2 5.23 5 6.45 5 8.24c0 1.95 1.05 3.03 2.8 3.03h.9v-1.26c0-1.4 1.2-2.6 2.6-2.6h3.4s1.3-.12 1.3-1.3V5c0-1.43-1.37-3-3.88-3zm4.08 6.7v1.26c0 1.4-1.2 2.6-2.6 2.6h-3.4s-1.3.12-1.3 1.3v1.17c0 1.43 1.37 3 3.88 3 3.13 0 2.93-1.36 2.93-1.36v-1.43h-3v-.44h4.2c1.8 0 3-1.22 3-3 0-1.96-1.05-3.03-2.8-3.03h-.91z" fill="#3776ab"/>
          <path d="M12.12 2c-3.13 0-2.93 1.36-2.93 1.36v1.43h3v.44h-4.2C6.2 5.23 5 6.45 5 8.24c0 1.95 1.05 3.03 2.8 3.03h.9v-1.26c0-1.4 1.2-2.6 2.6-2.6h3.4s1.3-.12 1.3-1.3V5c0-1.43-1.37-3-3.88-3zm4.08 6.7v1.26c0 1.4-1.2 2.6-2.6 2.6h-3.4s-1.3.12-1.3 1.3v1.17c0 1.43 1.37 3 3.88 3 3.13 0 2.93-1.36 2.93-1.36v-1.43h-3v-.44h4.2c1.8 0 3-1.22 3-3 0-1.96-1.05-3.03-2.8-3.03h-.91z" fill="#ffd343" transform="rotate(180 12 12)"/>
        </svg>
      );
    case 'TF':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF6F00">
          <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm-1 4.3v7.4l-4.5-2.5V6.7l4.5 2.5v-.2zm6.5 6.7l-4.5 2.5V8.8l4.5-2.5v6.2z"/>
        </svg>
      );
    case 'FB':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M4.5 18.5L12 2l4.8 9.5-2 1.2L12 6.8l-5.6 10.4L4.5 18.5z" fill="#FFA000"/>
          <path d="M12 22.8l7.6-4.2-1.2-12.8L12 2.2v20.6z" fill="#F57C00"/>
        </svg>
      );
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#00758F">
          <path d="M19 12v7c0 2.2-3.1 4-7 4s-7-1.8-7-4v-7c0 2.2 3.1 4 7 4s7-1.8 7-4zm0-6v5c0 2.2-3.1 4-7 4s-7-1.8-7-4V6c0 2.2 3.1 4 7 4s7-1.8 7-4zm-7-4c3.9 0 7 1.8 7 4s-3.1 4-7 4-7-1.8-7-4 3.1-4 7-4z"/>
        </svg>
      );
    case 'AWS':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#232F3E"/>
          <path d="M6 19.5c3.5 1.5 8.5 1.5 12 0" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'DK':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0db7ed">
          <path d="M2 13.5v1c0 2 1.5 3.5 3.5 3.5h13c2 0 3.5-1.5 3.5-3.5v-1H2zm4-3.5h2v2H6v-2zm3-3h2v2H9V7zm4 0h2v2h-2V7zm3 3h2v2h-2v-2zm-3 0h2v2h-2v-2zm-6 0h2v2H6v-2zm12.5.5c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5h1c.3 0 .5-.2.5-.5v-1c0-.3-.2-.5-.5-.5h-1z"/>
        </svg>
      );
    case 'Node':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#339933">
          <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 3.2l5.5 3.1v6.4L12 18.8 6.5 15.7V8.3L12 5.2z"/>
        </svg>
      );
    case 'MDB':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#47A248">
          <path d="M12 2C9.5 7 8 10.5 8 13.5c0 2.5 1.8 4.5 4 4.5s4-2 4-4.5c0-3-1.5-6.5-4-11.5zm0 13c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function TechStackSection() {
  return (
    <section className="section bg-[#060713] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#08091a] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div {...fadeUp(0)} className="section-label mx-auto w-fit mb-4">
            Technology
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="heading-md text-white">
            Powered by <span className="text-gradient">Modern Stack</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 text-base" style={{ color: 'var(--text-3)' }}>
            The tools we rely on to build fast, reliable, and production-ready products.
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.12)} className="flex flex-wrap justify-center gap-4">
          {TECH_STACK.map((tech, index) => (
            <div
              key={tech.name}
              className="w-[110px] h-[110px] rounded-[20px] border border-white/10 bg-[#0d0e22]/50 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-3 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-300"
              style={{
                transform: index % 2 === 0 ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              <div className="w-11 h-11 rounded-2xl bg-[#060713] border border-white/10 flex items-center justify-center">
                {getTechIcon(tech.badge)}
              </div>
              <div className="text-xs font-semibold text-slate-300 text-center px-2">
                {tech.name}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
