import React from 'react';
import { motion } from 'framer-motion';
import { ACADEMIC_PROJECTS } from '../../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const FEATURED_HIGHLIGHTS = [
  { label: 'Academic Builds', value: 'IEEE-style, practical, demo-ready' },
  { label: 'Focus Areas', value: 'AI, ML, Web, Healthcare, Agriculture' },
  { label: 'Delivery', value: 'Documentation + source + deployment' },
];

export default function ProjectsSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-slate-50 to-transparent" />
        <svg className="absolute right-0 top-1/4 opacity-5 w-[800px] h-[800px]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#2563EB" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#2563EB" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#2563EB" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-bold tracking-wide uppercase mb-4"
            >
              Academic Innovation Projects
            </motion.div>
            <motion.h2 {...fadeUp(0.05)} className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Future of Learning</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="mt-5 max-w-xl text-lg" style={{ color: 'var(--text-3)' }}>
              Real student and research projects designed to demonstrate AI, software engineering, and product thinking.
            </motion.p>
          </div>

          <motion.a
            {...fadeUp(0.12)}
            href="/get-quote"
            className="premium-btn premium-btn-secondary shrink-0"
          >
            Start an Academic Project
          </motion.a>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <motion.div {...fadeUp(0.1)} className="xl:col-span-4 space-y-4">
            {FEATURED_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="card p-6">
                <div className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                  {item.label}
                </div>
                <div className="mt-2 text-lg font-bold" style={{ color: 'var(--text-1)' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="xl:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACADEMIC_PROJECTS.map((project, index) => (
                <motion.article
                  key={project.title}
                  {...fadeUp(0.08 + index * 0.08)}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-700 backdrop-blur">
                      {project.category}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-6 mb-5" style={{ color: 'var(--text-3)' }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold"
                          style={{ color: 'var(--primary)' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                        Project Demo
                      </div>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost px-5 py-3 text-sm"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
