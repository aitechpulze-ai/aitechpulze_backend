import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-400 py-16 border-t border-slate-800/50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                style={{ background: '#fff', padding: '2px' }}
              >
                <img
                  src="/images/favicon.png"
                  alt="AiTechPulze"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="text-white text-xl font-bold tracking-tight">AiTechPulze</span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-sm text-slate-400">
              Building digital products. Delivering intelligent solutions.
              Empowering student innovation across India.
            </p>
            <div className="flex gap-3">
              {/* Social Icons */}
              <a href={COMPANY.mailto} className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-300 text-xs font-bold tracking-widest uppercase mb-6">Products</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/products" className="hover:text-white transition-colors">PKROUTEX</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">iPrintZone</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Adhvaya Jewellery</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-300 text-xs font-bold tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/services" className="hover:text-white transition-colors">AI Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">SaaS Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-300 text-xs font-bold tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Academic Hub</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h4 className="text-slate-300 text-xs font-bold tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium mb-8">
              <li><a href={COMPANY.tel} className="hover:text-white transition-colors">{COMPANY.phone}</a></li>
              <li><a href={COMPANY.mailto} className="hover:text-white transition-colors">{COMPANY.email}</a></li>
              <li><a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Chat</a></li>
            </ul>
            <a 
              href={COMPANY.whatsapp}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
            >
              Start a Project
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 text-center">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} AiTechPulze. All rights reserved. Built with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
