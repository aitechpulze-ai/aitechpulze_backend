import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ACADEMIC_PROJECTS, COMPANY } from '../../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const HUB_CARDS = [
  {
    icon: '🏆',
    title: 'IEEE Projects',
    description: 'Research projects with proper documentation, paper writing support, and presentation guidance.',
  },
  {
    icon: '🎓',
    title: 'Final Year Projects',
    description: 'Complete final year development with code, documentation, and deployment for engineering streams.',
  },
  {
    icon: '🔬',
    title: 'Research Support',
    description: 'AI/ML research project guidance, dataset preparation, model development, and publication-ready reports.',
  },
  {
    icon: '💡',
    title: 'Innovation Projects',
    description: 'Novel AI, IoT, and healthcare innovation projects that stand out in competitions and evaluations.',
  },
];

const TAGS = ['AI & Data Science', 'Healthcare', 'Web Applications', 'IoT', 'Research Projects'];

export default function AcademicHubSection() {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #060713 0%, #08091a 100%)' }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d0e22] text-emerald-400 text-sm font-bold tracking-wide uppercase mb-4 border border-white/10 shadow-sm">
            Academic Innovation Hub
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="heading-md text-white">
            Empowering <span className="text-gradient">Student Innovation</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 text-lg" style={{ color: 'var(--text-3)' }}>
            Supporting IEEE projects, final year projects, and AI research for students across India.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {HUB_CARDS.map((card, index) => (
            <motion.div key={card.title} {...fadeUp(0.08 + index * 0.05)} className="card p-6 text-center bg-[#0d0e22]/50 border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-[#060713] border border-white/10 flex items-center justify-center text-xl">
                {card.icon}
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-1)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-6" style={{ color: 'var(--text-3)' }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.15)} className="mt-8 flex flex-wrap justify-center gap-2">
          {TAGS.map((tag) => (
            <span key={tag} className="tag bg-blue-950/40 border border-white/10 text-slate-300">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.18)} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACADEMIC_PROJECTS.slice(0, 3).map((project, index) => (
            <article key={project.title} className="card overflow-hidden group bg-[#0d0e22]/50 border border-white/10 backdrop-blur-md">
              <div className="relative h-44 overflow-hidden bg-[#060713]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'linear-gradient(135deg,#0d0e22,#060713)';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060713]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 rounded-full bg-[#060713]/80 px-3 py-1 text-[11px] font-extrabold tracking-[0.18em] uppercase text-slate-300 border border-white/10 backdrop-blur">
                  Project {index + 1}
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--primary-light)' }}>
                  {project.category}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-1)' }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-6 mb-4" style={{ color: 'var(--text-3)' }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn-ghost w-full justify-center">
                  View Demo
                </a>
              </div>
            </article>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.22)} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/portfolio" className="btn-primary">
            Explore Academic Hub
          </Link>
          <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            WhatsApp for Project Help
          </a>
        </motion.div>
      </div>
    </section>
  );
}
