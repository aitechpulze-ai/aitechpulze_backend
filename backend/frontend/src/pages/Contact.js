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

const Icons = {
  whatsapp: <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  mail: <svg className="w-5 h-5 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  phone: <svg className="w-5 h-5 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  chat: <svg className="w-5 h-5 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  lightning: <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  dollar: <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  target: <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
  device: <svg className="w-4 h-4 flex-shrink-0 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
};

export default function Contact() {
  return (
    <>
      <SEO title="Contact | AiTechPulze" description="Get in touch with AiTechPulze for enterprise products, technology services, or academic projects." path="/contact" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-blue-100 shadow-sm">
              CONTACT US
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Talk Business</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-medium mb-12">
              Whether you're a business owner, a startup founder, or a student — reach out and we'll respond fast with a clear plan and honest pricing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div {...fadeUp(0.1)} className="bg-white rounded-3xl p-8 text-left shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-[9px] font-bold tracking-widest uppercase text-emerald-600 mb-4">PREFERRED</div>
              <div className="flex items-center gap-3 mb-3 text-slate-900">
                {Icons.chat}
                <h3 className="text-lg font-bold">WhatsApp</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Instant chat with our team for immediate project discussion and quotes.
              </p>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Open WhatsApp &rarr;
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="bg-white rounded-3xl p-8 text-left shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-[9px] font-bold tracking-widest uppercase text-blue-600 mb-4">OFFICIAL</div>
              <div className="flex items-center gap-3 mb-3 text-slate-900">
                {Icons.mail}
                <h3 className="text-lg font-bold">Email</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Send your requirements and attachments for a formal quotation.
              </p>
              <a href={COMPANY.mailto} className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                {COMPANY.email}
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="bg-white rounded-3xl p-8 text-left shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <div className="text-[9px] font-bold tracking-widest uppercase text-indigo-600 mb-4">DIRECT</div>
              <div className="flex items-center gap-3 mb-3 text-slate-900">
                {Icons.phone}
                <h3 className="text-lg font-bold">Call Us</h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Speak directly for urgent timelines and immediate project planning.
              </p>
              <a href={COMPANY.tel} className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                {COMPANY.phone}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Response Promise */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeUp(0.4)} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-6 px-2">Quick Response Promise</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-700">{Icons.lightning}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Fast first response for all new project requests</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-700">{Icons.dollar}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Clear pricing estimate based on your project scope</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-700">{Icons.target}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Direct support from planning to final delivery</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-slate-700">{Icons.device}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Flexible communication via WhatsApp, call, or email</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audiences */}
      <section className="py-6 bg-white mb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div {...fadeUp(0.5)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center">
              <h3 className="text-sm font-bold text-slate-900 mb-3">For Businesses</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Discuss enterprise product requirements, custom software, dashboards, and digital transformation plans.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.6)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center">
              <h3 className="text-sm font-bold text-slate-900 mb-3">For Startups</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Plan your MVP scope, release priorities, SaaS architecture, and development roadmap.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.7)} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] text-center">
              <h3 className="text-sm font-bold text-slate-900 mb-3">For Students</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Get guidance on final year projects, IEEE papers, research support, and academic innovation.
              </p>
            </motion.div>
          </div>
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
              Ready to Submit Your Requirement?
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-medium mb-8 max-w-md mx-auto">
              Use the quote form to send complete project details — optionally include a PDF document.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/get-quote" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
              >
                Get Free Quote &rarr;
              </Link>
              <a 
                href={COMPANY.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-slate-700 text-sm font-bold rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                {Icons.whatsapp}
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
