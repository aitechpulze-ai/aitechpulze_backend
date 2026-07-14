import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, COMPANY } from '../data/content';
import Dock from './Dock';
import { HomeIcon, CapIcon, TeacherIcon, UsersIcon, DocIcon, ClipboardIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();
  const navigate                = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    // Ensure body scroll is re-enabled when route changes
    document.body.style.overflow = 'unset';
  }, [pathname]);

  const toggleMenu = () => {
    const nextState = !open;
    setOpen(nextState);
    if (nextState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Dock items mapping standard routes to quick access icons
  const dockItems = [
    { 
      icon: <HomeIcon className="w-5.5 h-5.5" />, 
      label: 'Home', 
      onClick: () => { navigate('/'); setOpen(false); document.body.style.overflow = 'unset'; } 
    },
    { 
      icon: <CapIcon className="w-5.5 h-5.5" />, 
      label: 'Academic Hub', 
      onClick: () => { navigate('/academic-hub'); setOpen(false); document.body.style.overflow = 'unset'; } 
    },
    { 
      icon: <TeacherIcon className="w-5.5 h-5.5" />, 
      label: 'Internships', 
      onClick: () => { navigate('/internships'); setOpen(false); document.body.style.overflow = 'unset'; } 
    },
    { 
      icon: <UsersIcon className="w-5.5 h-5.5" />, 
      label: 'Team', 
      onClick: () => { navigate('/team'); setOpen(false); document.body.style.overflow = 'unset'; } 
    },
    { 
      icon: <ClipboardIcon className="w-5.5 h-5.5" />, 
      label: 'Get Quote', 
      onClick: () => { navigate('/get-quote'); setOpen(false); document.body.style.overflow = 'unset'; } 
    }
  ];

  return (
    <>
      <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo" data-cursor>
            <div
              className="nav-logo-icon overflow-hidden"
              style={{ background: '#fff', padding: '2px', borderRadius: '9999px' }}
            >
              <img
                src="/images/favicon.png"
                alt="AiTechPulze"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <span>
              AITech
              <span style={{ background:'linear-gradient(135deg,#2563eb,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                Pulze
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="nav-links hidden md:flex">
            {NAV_LINKS.map(l => (
              <Link key={l.href} to={l.href}
                className={`nav-link ${pathname === l.href ? 'active' : ''}`}
                data-cursor>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-ghost text-sm" style={{ padding:'9px 18px' }} data-cursor>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color:'#25d366' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link to="/get-quote" className="btn-primary text-sm" style={{ padding:'9px 20px' }} data-cursor>
              Get a Quote
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2.5 rounded-xl z-[1001] relative border border-white/5 bg-white/5 backdrop-blur-md cursor-pointer"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {[0,1,2].map(i => (
              <span key={i} className="block h-0.5 rounded-full transition-all duration-300"
                style={{
                  width: i === 1 ? (open ? '14px' : '20px') : '20px',
                  background: '#ffffff',
                  transform: open
                    ? (i === 0 ? 'rotate(45deg) translate(4px,4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'scaleX(0)')
                    : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Right-Side Sliding Drawer Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[999] md:hidden"
            />

            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-screen w-[280px] bg-[#0c0d21]/95 border-l border-white/10 z-[1000] md:hidden flex flex-col justify-between pt-24 pb-8 px-6 shadow-2xl backdrop-blur-xl"
            >
              {/* Scrollable Navigation Links */}
              <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-1.5 scrollbar-thin">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">Navigation Menu</div>
                {NAV_LINKS.map(l => (
                  <Link 
                    key={l.href} 
                    to={l.href}
                    className="px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group"
                    style={{
                      color: pathname === l.href ? '#22d3ee' : '#94a3b8',
                      background: pathname === l.href ? 'rgba(34,211,238,0.08)' : 'transparent',
                      border: pathname === l.href ? '1px solid rgba(34,211,238,0.15)' : '1px solid transparent'
                    }}
                  >
                    <span>{l.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">&rarr;</span>
                  </Link>
                ))}

                {/* Mobile CTAs inside scroll container */}
                <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-white/10">
                  <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost w-full justify-center text-sm py-3.5 rounded-xl border border-white/10 hover:bg-white/5">
                    WhatsApp Support
                  </a>
                  <Link to="/get-quote" className="btn-primary w-full justify-center text-sm py-3.5 rounded-xl">
                    Get a Quote &rarr;
                  </Link>
                </div>
              </div>

              {/* Bottom Section containing our beautiful custom React Bits vertical Dock! */}
              <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-3">
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Quick Dock</div>
                <Dock 
                  items={dockItems} 
                  direction="horizontal"
                  panelHeight={52} 
                  baseItemSize={38} 
                  magnification={46} 
                  distance={100}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
