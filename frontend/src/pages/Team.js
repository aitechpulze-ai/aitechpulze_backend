import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { TEAM } from '../data/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 15 }
  }
};

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('All');

  const roles = ['All', ...new Set(TEAM.map(m => m.dept || 'Engineering'))];

  const filtered = activeFilter === 'All'
    ? TEAM
    : TEAM.filter(m => (m.dept || 'Engineering') === activeFilter);

  return (
    <>
      <SEO
        title="Our Team | AiTechPulze"
        description="Meet the AiTechPulze team — engineers, AI researchers, designers, and developers building the future of software."
        path="/team"
      />
      <div className="min-h-screen bg-[#060713] pt-24 relative overflow-hidden text-white">

        {/* Background aura layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-60 right-0 w-[700px] h-[700px] bg-blue-900/15 rounded-full filter blur-[130px]" />
          <div className="absolute top-96 -left-40 w-[600px] h-[600px] bg-cyan-900/15 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full filter blur-[100px]" />
          {/* Cyber dot grid */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.06) 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
          {/* Horizontal scan line */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-32">

          {/* ── Header ── */}
          <section className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-800/40 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
              CREW · SYSTEM ACTIVE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight mb-6"
            >
              Meet The{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Innovators
                <motion.span
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-light"
            >
              A precision-engineered squad of AI engineers, product designers, and full-stack architects — building the next generation of digital infrastructure.
            </motion.p>

            {/* Stat Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              {[
                { label: 'OPERATORS', value: `${TEAM.length}` },
                { label: 'DOMAINS', value: '6+' },
                { label: 'PRODUCTS SHIPPED', value: '10+' },
              ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/10 min-w-[120px]">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ── Filter Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveFilter(role)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === role
                    ? 'bg-cyan-950/30 text-cyan-400 border border-cyan-800/50 shadow-[0_0_14px_rgba(6,182,212,0.2)]'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-900/40 hover:text-cyan-400'
                }`}
              >
                {activeFilter === role && (
                  <motion.span
                    layoutId="filterActive"
                    className="absolute inset-0 rounded-xl bg-cyan-950/20"
                  />
                )}
                <span className="relative">{role}</span>
              </button>
            ))}
          </motion.div>

          {/* ── Cards Grid ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((member, idx) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-[#0c0d21]/70 backdrop-blur border border-white/8 hover:border-cyan-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(6,182,212,0.12)] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/8 to-transparent rounded-tr-2xl pointer-events-none" />

                {/* Top glow on hover */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Index badge */}
                <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-600 font-bold tracking-[0.2em]">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      {/* Cyber ring around avatar */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2 rounded-2xl border border-dashed border-cyan-500/20"
                      />
                      <div className="w-28 h-28 rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-300 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {/* Live status dot */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0c0d21] shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                        <span
                          className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping"
                          style={{ animationDuration: '2.5s' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-white font-black text-base group-hover:text-cyan-400 transition-colors leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-cyan-400 mb-1">
                      {member.role}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-[9px] text-slate-400 font-mono">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      {member.dept || 'Engineering'} · {member.joined}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-white/5 text-slate-400 border border-white/8 group-hover:bg-cyan-950/30 group-hover:text-cyan-400 group-hover:border-cyan-900/40 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-4 border-t border-white/8">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-wide uppercase overflow-hidden bg-blue-950/30 border border-blue-900/40 text-blue-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 cursor-pointer"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        CONNECT
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Join CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 relative rounded-3xl overflow-hidden border border-white/10"
          >
            {/* BG layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0d21] via-blue-950/30 to-[#060713]" />
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.07) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="relative z-10 p-10 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                />
                RECRUITMENT PORTAL OPEN
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                Want to join the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  mission?
                </span>
              </h2>
              <p className="max-w-xl mx-auto mb-10 text-slate-400 text-sm md:text-base leading-relaxed">
                We're always looking for exceptional engineers, designers, and AI enthusiasts to push the boundaries of what's possible.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/careers"
                  className="group/cta relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 shadow-[0_0_30px_rgba(6,182,212,0.4)] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-white flex items-center gap-2">
                    View Open Roles
                    <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
