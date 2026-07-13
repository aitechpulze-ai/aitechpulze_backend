import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, COMPANY } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
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

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl"
          style={{ background: open ? 'rgba(37,99,235,0.06)' : 'transparent' }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {[0,1,2].map(i => (
            <span key={i} className="block h-0.5 rounded-full transition-all duration-300"
              style={{
                width: i === 1 ? (open ? '14px' : '20px') : '20px',
                background: '#0f172a',
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

      {/* Mobile menu */}
      <div style={{
        maxHeight: open ? '420px' : '0',
        overflow: 'hidden',
        transition: 'max-height .4s cubic-bezier(0.16,1,0.3,1)',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(30px)',
        borderTop: open ? '1px solid rgba(37,99,235,0.08)' : 'none',
      }}>
        <div className="container py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <Link key={l.href} to={l.href}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                color: pathname === l.href ? '#2563eb' : '#334155',
                background: pathname === l.href ? 'rgba(37,99,235,0.06)' : 'transparent',
              }}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3 pt-3" style={{ borderTop:'1px solid rgba(37,99,235,0.08)' }}>
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-ghost flex-1 justify-center text-sm" style={{ padding:'10px 16px' }}>
              WhatsApp
            </a>
            <Link to="/get-quote" className="btn-primary flex-1 justify-center text-sm" style={{ padding:'10px 16px' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
