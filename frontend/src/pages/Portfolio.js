import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { PRODUCTS, ACADEMIC_PROJECTS, COMPANY } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const ACADEMIC_FILTERS = ['All', 'AI & Data Science', 'Healthcare', 'Web Applications', 'IoT'];

// Icons
const Icons = {
  check: <svg className="w-3 h-3 text-emerald-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>,
  whatsapp: <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
};

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = ACADEMIC_PROJECTS.filter(p => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase()) || 
           (filter === 'Web Applications' && p.category.includes('Web App'));
  });

  return (
    <>
      <SEO title="Portfolio | AiTechPulze" description="Explore our flagship business products and academic research projects." path="/portfolio" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
              BUSINESS PRODUCTS
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Flagship Products</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-medium">
              Live enterprise products built and maintained by AiTechPulze.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Products Section */}
      <section className="pb-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((p, i) => (
              <motion.div 
                key={p.name} 
                {...fadeUp(i * 0.1)}
                className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all duration-300"
              >
                {/* Image Box */}
                <div className="h-56 bg-[#0B0F19] relative flex items-center justify-center p-8 border-b border-slate-800/50">
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-sm z-10">
                    LIVE PRODUCT
                  </div>
                  <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain relative z-0 transition-transform duration-500 hover:scale-105" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-blue-600 text-[9px] font-bold tracking-widest uppercase mb-2">
                    {p.category}
                  </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-blue-600 text-xs font-bold mb-4">{p.tagline}</p>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* Features (Green pills) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.features.slice(0,4).map((f) => (
                    <span key={f} className="inline-flex items-center px-2.5 py-1.5 bg-emerald-50/50 text-slate-600 text-[10px] font-medium rounded-full border border-emerald-100">
                      {Icons.check}
                      {f}
                    </span>
                  ))}
                </div>

                {/* Tech Stack (Blue pills) */}
                <div className="flex flex-wrap gap-2 mb-8 flex-grow">
                  {p.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-blue-50/50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-slate-100">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
                    Visit {p.name} &rarr;
                  </a>
                  <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center px-5 py-3 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all">
                    Enquire
                  </a>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-slate-100 relative">
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
          ACADEMIC PROJECTS
        </div>
      </div>

      {/* Academic Projects Section (Mirrors AcademicHub) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div {...fadeUp(0)}>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-4 border border-emerald-100 shadow-sm">
                ACADEMIC INNOVATION HUB
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Student & Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Projects</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-medium mb-8">
                IEEE projects, final year projects, and AI research built for students across India.
              </p>
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {ACADEMIC_FILTERS.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${filter === f ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/20' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'}`}
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
                  className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col h-full hover:shadow-[0_20px_60px_rgba(20,184,166,0.08)] transition-shadow duration-300"
                >
                  <div className="h-48 mb-6 bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                    <img src={p.image} alt={p.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-4 w-fit">
                    {p.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-grow">
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all w-fit">
                    View Demo &rarr;
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div 
            {...fadeUp(0)}
            className="p-12 md:p-16 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-white shadow-[0_20px_60px_rgba(37,99,235,0.05)] border border-indigo-100/50"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Have a Project Idea?
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium mb-8 max-w-md mx-auto">
              Whether you're a business owner or a student — we build it right.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
              >
                Get a Free Quote &rarr;
              </Link>
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                {Icons.whatsapp}
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
