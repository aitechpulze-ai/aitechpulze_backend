import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-[#060713] text-slate-400 py-16 border-t border-white/5">
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
              <a href={COMPANY.mailto} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/aitechpulze?igsh=MWJnMnpsaGs0eHg4dA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Products</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="https://pkroutex.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">PKROUTEX</a></li>
              <li><a href="https://iprintzone.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">iPrintZone</a></li>
              <li><a href="https://adhvayajewellery.com/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Adhvaya Jewellery</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">AI Development</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">SaaS Development</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-cyan-400 transition-colors">Products</Link></li>
              <li><Link to="/academic-hub" className="hover:text-cyan-400 transition-colors">Academic Hub</Link></li>
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link to="/team" className="hover:text-cyan-400 transition-colors">Team</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium mb-8">
              <li><a href={COMPANY.tel} className="hover:text-cyan-400 transition-colors">{COMPANY.phone}</a></li>
              <li><a href={COMPANY.mailto} className="hover:text-cyan-400 transition-colors">{COMPANY.email}</a></li>
              <li><a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">WhatsApp Chat</a></li>
            </ul>
            <a 
              href={COMPANY.whatsapp}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-sm font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
            >
              Start a Project
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} AiTechPulze. All rights reserved. Engineered with precision in India.
          </p>
          <div className="flex gap-4 text-xs text-slate-500 font-medium">
            <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
