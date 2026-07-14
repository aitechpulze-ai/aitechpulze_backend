import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { COMPANY } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

// SVG Icons
const Icons = {
  ai: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  ml: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  web: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  mobile: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  saas: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  cloud: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  data: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  custom: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  transform: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  call: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  architecture: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  test: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  deploy: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
};

const services = [
  { icon: Icons.ai, tag: 'INTELLIGENT SYSTEMS', title: 'AI Development', desc: 'Production-ready AI solutions — computer vision, NLP, and autonomous agents built for real business outcomes.', price: 'From INR 3,000' },
  { icon: Icons.ml, tag: 'PREDICTIVE INTELLIGENCE', title: 'Machine Learning', desc: 'Custom ML models for prediction, classification, and anomaly detection. From data prep to model deployment.', price: 'From INR 3,000' },
  { icon: Icons.web, tag: 'MODERN REACT UI', title: 'Web Development', desc: 'Fast, responsive web applications with React. Landing pages, dashboards, portals, and complex web apps.', price: 'From INR 1,500' },
  { icon: Icons.mobile, tag: 'CROSS-PLATFORM APPS', title: 'Mobile App Development', desc: 'Native-quality mobile apps for iOS and Android with seamless backend integration.', price: 'From INR 5,000' },
  { icon: Icons.saas, tag: 'SCALABLE PRODUCTS', title: 'SaaS Development', desc: 'End-to-end SaaS product development — multi-tenant architecture, subscriptions, and cloud-ready deployment.', price: 'From INR 8,000' },
  { icon: Icons.cloud, tag: 'AWS & CLOUD INFRA', title: 'Cloud Solutions', desc: 'Deploy, scale and secure your applications. CI/CD pipelines, Docker containers, and cloud orchestration.', price: 'From INR 2,500' },
  { icon: Icons.data, tag: 'INSIGHT-DRIVEN VIEWS', title: 'Data Analytics', desc: 'Interactive dashboards and analytics platforms. Turn raw data into actionable business insights.', price: 'From INR 1,500' },
  { icon: Icons.custom, tag: 'TAILORED SOLUTIONS', title: 'Custom Software', desc: 'Bespoke software for your workflow — ERP systems, inventory management, CRM, and automation tools.', price: 'From INR 4,000' },
  { icon: Icons.transform, tag: 'BUSINESS MODERNIZATION', title: 'Digital Transformation', desc: 'Migrate legacy systems, automate processes, and integrate modern tech stacks to accelerate growth.', price: 'From INR 5,000' },
];

const processSteps = [
  { num: '01', title: 'Discovery Call', desc: 'Share requirements, timeline and budget. We analyze and plan the best approach.', icon: Icons.call },
  { num: '02', title: 'Architecture', desc: 'Design scalable system structure, select tech stack, create project blueprint.', icon: Icons.architecture },
  { num: '03', title: 'Build & Test', desc: 'Develop, integrate APIs, and rigorously test at every stage of development.', icon: Icons.test },
  { num: '04', title: 'Deploy & Support', desc: 'Go live on cloud with monitoring, documentation, and ongoing support.', icon: Icons.deploy },
];

export default function Services() {
  return (
    <>
      <SEO title="Services" description="End-to-end technology services from AiTechPulze." path="/services" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#060713] relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/40 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-900/30 shadow-sm">
              SERVICES
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Build For You</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              End-to-end technology services — from AI model development to cloud deployment. 
              Every project delivered with quality, speed, and clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-[#060713]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div 
                key={s.title} 
                {...fadeUp(i * 0.05)}
                className="bg-[#0d0e22]/50 rounded-3xl p-6 md:p-8 flex flex-col group border border-white/10 hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(6,182,212,0.15)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 mb-6 group-hover:bg-blue-950/40 group-hover:text-cyan-400 transition-colors">
                  {s.icon}
                </div>
                <div className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-2">
                  {s.tag}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-8 flex-grow">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-cyan-400">{s.price}</span>
                  <div className="w-6 h-6 rounded-full bg-white/5 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-950/40 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#060713] relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <motion.div {...fadeUp(0)} className="mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/40 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-900/30 shadow-sm">
              OUR PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Launch</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-950 via-cyan-950 to-blue-950" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, i) => (
                <motion.div key={step.num} {...fadeUp(i * 0.1)} className="relative flex flex-col items-center group">
                  <div className="w-16 h-16 rounded-full bg-[#0d0e22] border-4 border-white/10 shadow-lg flex items-center justify-center text-slate-500 mb-6 group-hover:border-cyan-500/40 group-hover:text-cyan-400 group-hover:shadow-cyan-500/10 transition-all z-10 relative">
                    {step.icon}
                  </div>
                  <div className="text-cyan-400 text-xs font-bold mb-2">{step.num}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-[#060713] relative border-t border-white/5 pt-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            {...fadeUp(0)}
            className="p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden bg-gradient-to-br from-[#0d0e22] to-[#060713] shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-white/10"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium mb-8 max-w-md mx-auto">
              Tell us what you need — we'll deliver it professionally and on time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Get Free Quote &rarr;
              </Link>
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 justify-center px-6 py-3 bg-white/5 text-white text-sm font-bold rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all cursor-pointer"
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
