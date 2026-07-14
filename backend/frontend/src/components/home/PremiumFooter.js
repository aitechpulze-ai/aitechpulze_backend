import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COMPANY } from '../../data/content';

export default function PremiumFooter() {
  return (
    <footer className="bg-slate-900 pt-32 pb-12 relative overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Wave at Top */}
        <svg className="absolute top-0 left-0 w-full h-32 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
           <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              y: ["0%", "-100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Glow Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-black tracking-tight mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                A
              </div>
              AiTechPulze
            </div>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Architecting the intelligent enterprise. Building the future of automation and software.
            </p>
            <div className="flex gap-4">
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-slate-700 hover:border-transparent">
                <span className="text-xs">IG</span>
              </a>
              <a href={COMPANY.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-slate-700 hover:border-transparent">
                <span className="text-xs">LI</span>
              </a>
              <a href={COMPANY.mailto} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-slate-700 hover:border-transparent">
                <span className="text-xs">✉</span>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Platform</h4>
            <ul className="flex flex-col gap-4 text-slate-400 font-medium">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">AI Automation</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Machine Learning</Link></li>
              <li><Link to="/solutions" className="hover:text-cyan-400 transition-colors">Cloud Native</Link></li>
              <li><Link to="/solutions" className="hover:text-cyan-400 transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Company</h4>
            <ul className="flex flex-col gap-4 text-slate-400 font-medium">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Stay Updated</h4>
            <p className="text-slate-400 font-medium mb-6">
              Get the latest insights in AI and enterprise architecture.
            </p>
            <form className="relative group" onSubmit={e => e.preventDefault()}>
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative flex bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
                />
                <button type="submit" className="px-6 bg-gradient-to-r from-blue-600 to-cyan-500 font-bold hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-medium text-sm">
          <p>© {new Date().getFullYear()} AiTechPulze. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
