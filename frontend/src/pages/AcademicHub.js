import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { ACADEMIC_PROJECTS, COMPANY } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

// Minimal Icons
const Icons = {
  trophy: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  cap: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" /></svg>,
  microscope: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  bulb: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  whatsapp: <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
};

const STATS = [
  { icon: Icons.trophy, value: '25+', title: 'IEEE Projects', desc: 'IEEE standard research papers and project implementations with documentation and presentation support.' },
  { icon: Icons.cap, value: '50+', title: 'Final Year Projects', desc: 'Complete FYP development for B.E, B.Tech, M.E, MCA — all engineering streams covered.' },
  { icon: Icons.microscope, value: '15+', title: 'Research Projects', desc: 'Novel AI/ML research with dataset curation, model building, and publication-ready output.' },
  { icon: Icons.bulb, value: '30+', title: 'Innovation Projects', desc: 'Competition-winning AI, IoT, and healthcare projects for hackathons and college fests.' },
];

const FILTERS = ['All', 'AI & Data Science', 'Healthcare', 'Web Applications', 'IoT', 'Research Projects'];

const STEPS = [
  { num: '01', title: 'Share Your Topic', desc: 'Tell us your project title, domain, and college requirements.' },
  { num: '02', title: 'We Plan & Build', desc: 'We design the architecture, build the project, and handle all technical work.' },
  { num: '03', title: 'Full Documentation', desc: 'Receive complete documentation — abstract, report, and presentation.' },
  { num: '04', title: 'Demo & Handover', desc: 'Live project demo with source code, deployment, and guidance for viva.' },
];

export default function AcademicHub() {
  const [filter, setFilter] = useState('All');

  // We filter the projects based on the active filter (simplistic matching for now)
  const filteredProjects = ACADEMIC_PROJECTS.filter(p => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase()) || 
           (filter === 'Web Applications' && p.category.includes('Web App'));
  });

  return (
    <>
      <SEO title="Academic Innovation Hub" description="IEEE and Final Year projects for students built by AiTechPulze." path="/academic-hub" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#060713] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-950 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-950 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/40 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-6 border border-emerald-900/30 shadow-sm">
              ACADEMIC INNOVATION HUB
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Student Innovation</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              From IEEE research projects to AI-powered final year projects — we help students build impressive, grade-worthy projects with complete documentation and deployment support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-8 bg-[#060713] relative z-10 -mt-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div 
                key={s.title} 
                {...fadeUp(i * 0.1)}
                className="bg-[#0d0e22]/50 rounded-[2rem] p-8 text-center flex flex-col items-center border border-white/10"
              >
                <div className="text-slate-400 mb-4 opacity-80">
                  {s.icon}
                </div>
                <div className="text-3xl font-extrabold text-teal-400 mb-2">{s.value}</div>
                <h3 className="text-sm font-bold text-white mb-3">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 bg-[#060713]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div {...fadeUp(0)}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/40 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-emerald-900/30 shadow-sm">
                PROJECT SHOWCASE
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
                Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Academic Projects</span>
              </h2>
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {FILTERS.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${filter === f ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-lg shadow-teal-500/20' : 'bg-white/5 text-slate-300 border-white/10 hover:border-teal-400'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((p, i) => (
                <motion.div 
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0d0e22]/50 rounded-[2rem] p-6 border border-white/10 flex flex-col h-full hover:border-teal-500/30 hover:shadow-[0_20px_60px_rgba(20,184,166,0.15)] transition-all duration-300"
                >
                  <div className="h-48 mb-6 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                    <img src={p.image} alt={p.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-950/40 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-4 w-fit border border-emerald-900/30">
                    {p.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 flex-grow">
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-blue-950/40 text-blue-400 text-[10px] font-bold rounded-full border border-blue-900/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-white/5 text-white text-xs font-bold rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all w-fit cursor-pointer">
                    View Demo &rarr;
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#060713] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-16">
              How We Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Students</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.1)} className="flex flex-col items-center">
                <div className="text-2xl font-extrabold text-teal-400 mb-4">{step.num}</div>
                <h3 className="text-sm font-bold text-white mb-3">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-[#060713] relative border-t border-white/5 pt-24">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Need Your Project Done Right?
            </h2>
            <p className="text-slate-400 text-sm font-medium mb-10 max-w-lg mx-auto">
              Chat with us now — tell us your domain, deadline, and we'll take it from there.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#4f46e5] text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:bg-[#4338ca] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                {Icons.whatsapp}
                WhatsApp for Project Help
              </a>
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/5 text-white text-sm font-bold rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
