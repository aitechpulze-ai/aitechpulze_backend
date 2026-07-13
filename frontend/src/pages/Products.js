import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { PRODUCTS, COMPANY } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function Products() {
  return (
    <>
      <SEO title="Products" description="Explore AITechPulze's live enterprise products." path="/products" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        {/* Subtle background gradient/mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
              Business Products
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Flagship Products</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Real enterprise software products built, deployed, and maintained by AiTechPulze. 
              Powering businesses with scalable, intelligent digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-16 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {PRODUCTS.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={p.name} 
                {...fadeUp(0.1)}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative p-6 md:p-8 bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 group transition-all duration-300 hover:shadow-[0_30px_80px_rgba(37,99,235,0.08)]">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-video lg:aspect-[4/3] shadow-inner bg-slate-900">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { 
                          e.target.style.display = 'none'; 
                          e.target.parentNode.style.background = 'linear-gradient(135deg, #1e293b, #0f172a)'; 
                        }} 
                      />
                    </div>
                    {/* Live Product Badge */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-green-500 text-white text-[10px] md:text-xs font-bold leading-tight px-3 py-2 rounded-full shadow-lg text-center shadow-green-500/30 z-10">
                      LIVE<br/>PRODUCT
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
                    {p.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {p.name}
                  </h2>
                  <h3 className="text-lg font-semibold text-blue-600 mb-6">
                    {p.tagline}
                  </h3>
                  <p className="text-slate-500 leading-relaxed mb-8">
                    {p.description}
                  </p>
                  
                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CheckIcon />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={p.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
                    >
                      Visit {p.name} &rarr;
                    </a>
                    <a 
                      href={COMPANY.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                      Enquire About This
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            {...fadeUp(0)}
            className="p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white shadow-[0_20px_60px_rgba(37,99,235,0.05)] border border-blue-100/50"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Want a Similar Product Built?
            </h2>
            <p className="text-slate-500 font-medium mb-10 max-w-xl mx-auto">
              We design and develop enterprise-grade digital products tailored to your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
              >
                Start a Product Discussion &rarr;
              </a>
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 justify-center px-6 py-3.5 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
