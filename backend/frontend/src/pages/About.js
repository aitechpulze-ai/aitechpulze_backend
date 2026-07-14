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

export default function About() {
  return (
    <>
      <SEO title="About AiTechPulze | Mission & Vision" description="Learn about AiTechPulze — building digital products and empowering student innovation." path="/about" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
              ABOUT AITECHPULZE
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Building Digital Products.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Delivering Intelligent Solutions.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-medium mb-8">
              AiTechPulze is a technology company that builds enterprise software products, delivers AI-powered development services, and empowers student innovation across India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
              >
                See Our Products &rarr;
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props Row 1 */}
      <section className="py-6 bg-slate-50/50 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white rounded-3xl p-8 text-center flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-slate-700 mb-4 opacity-80">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Business Products</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
                We build and maintain real enterprise products — PKROUTEX for logistics and iPrintZone for printing — deployed and used by businesses today.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="bg-white rounded-3xl p-8 text-center flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-slate-700 mb-4 opacity-80">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Technology Services</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
                Custom AI, web, mobile, SaaS, and cloud development services for startups, businesses, and enterprises across India and beyond.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="bg-white rounded-3xl p-8 text-center flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-slate-700 mb-4 opacity-80">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Academic Innovation Hub</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
                We empower students through IEEE projects, final year project development, AI research support, and innovation project guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props Row 2 */}
      <section className="py-6 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fadeUp(0.4)} className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-slate-700 mb-4 opacity-80">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[320px]">
                To transform ideas into scalable digital products — delivering enterprise-grade software, AI-powered solutions, and academic project support that creates real value for businesses and students across India.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="bg-emerald-50 rounded-3xl p-8 shadow-sm border border-emerald-100">
              <div className="text-emerald-700 mb-4 opacity-80">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-[320px]">
                To become India's most trusted technology studio — recognized for flagship products like PKROUTEX and iPrintZone, and for consistently empowering the next generation of innovators through academic excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="text-2xl font-extrabold text-blue-600 mb-1">50+</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-500">PROJECTS DELIVERED</div>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="text-2xl font-extrabold text-blue-600 mb-1">3</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-500">LIVE BUSINESS PRODUCTS</div>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="text-2xl font-extrabold text-blue-600 mb-1">24h</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-500">RESPONSE WINDOW</div>
            </motion.div>
            <motion.div {...fadeUp(0.4)} className="bg-white rounded-3xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="text-2xl font-extrabold text-blue-600 mb-1">100%</div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-slate-500">CLIENT SATISFACTION</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">
              OUR JOURNEY
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Got Here</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-[9px] font-bold tracking-widest uppercase text-blue-600 mb-3">START</div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Founded with a Purpose</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                AiTechPulze started as a student-friendly development studio, helping final year students build quality projects.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-[9px] font-bold tracking-widest uppercase text-blue-600 mb-3">GROWTH</div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">First Business Products</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Expanded into building enterprise products — PKROUTEX and iPrintZone — solving real business challenges.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-[9px] font-bold tracking-widest uppercase text-blue-600 mb-3">TODAY</div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">3 Thriving Divisions</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Now operating 3 divisions: Business Products, Technology Services, and the Academic Innovation Hub.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.4)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-[9px] font-bold tracking-widest uppercase text-blue-600 mb-3">FUTURE</div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Scaling Innovation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Expanding our product suite, growing our services across India, and deepening academic partnerships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">
              TECHNOLOGY EXPERTISE
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tech Stack</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-3">
            {['React JS', 'Spring Boot', 'Python', 'TensorFlow', 'Firebase', 'MySQL', 'AWS', 'Docker', 'Node.js', 'Flask', 'OpenCV', 'Scikit-learn'].map((tech) => (
              <div key={tech} className="px-5 py-2.5 bg-blue-50/30 text-blue-600 text-xs font-bold rounded-full border border-blue-100 shadow-sm">
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div {...fadeUp(0)} className="mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-100 shadow-sm">
              WHO WE SERVE
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Every Ambition</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-slate-700 mb-4 opacity-80 flex justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Businesses</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enterprise products, custom software, dashboards, and digital transformation for growing businesses.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.2)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-slate-700 mb-4 opacity-80 flex justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Startups</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                MVPs, SaaS products, and scalable web platforms to launch and grow your startup faster.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.3)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="text-slate-700 mb-4 opacity-80 flex justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" /></svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Students</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Final year projects, IEEE papers, research support, and innovation projects with full documentation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-slate-50/50 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div 
            {...fadeUp(0)}
            className="p-12 md:p-16 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-white shadow-[0_20px_60px_rgba(37,99,235,0.05)] border border-indigo-100/50"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Have a Project Idea?
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium mb-8 max-w-md mx-auto">
              Let's discuss how we can help build something great together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
              >
                Submit Requirement &rarr;
              </Link>
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
