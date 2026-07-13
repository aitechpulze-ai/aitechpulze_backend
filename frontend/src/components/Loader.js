import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [hiding,  setHiding]  = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHiding(true),  2000);
    const t2 = setTimeout(() => setVisible(false), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="loader-wrap noise"
      style={{
        opacity:       hiding ? 0 : 1,
        transition:    'opacity .7s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      {/* Gradient blobs */}
      <div style={{
        position:'absolute', width:500, height:500, borderRadius:'50%',
        top:'10%', left:'20%',
        background:'radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)',
        filter:'blur(60px)', animation:'floatSlow 8s ease-in-out infinite',
        pointerEvents:'none',
      }} />
      <div style={{
        position:'absolute', width:400, height:400, borderRadius:'50%',
        bottom:'15%', right:'15%',
        background:'radial-gradient(circle,rgba(129,140,248,0.06) 0%,transparent 70%)',
        filter:'blur(50px)', animation:'floatSlow 10s ease-in-out infinite reverse',
        pointerEvents:'none',
      }} />

      {/* Grid */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.03, pointerEvents:'none' }}>
        <defs>
          <pattern id="lg" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2563eb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lg)"/>
      </svg>

      <div style={{ position:'relative', textAlign:'center' }}>
        {/* Logo icon with morph */}
        <div style={{
          width:60, height:60, borderRadius:18, margin:'0 auto 18px',
          background:'linear-gradient(135deg,#2563eb,#818cf8)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontWeight:900, fontSize:22,
          boxShadow:'0 8px 32px rgba(37,99,235,0.38)',
          animation:'fadeScale .5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="5" fill="white" opacity=".9"/>
            <circle cx="14" cy="5"  r="2.5" fill="white" opacity=".7"/>
            <circle cx="14" cy="23" r="2.5" fill="white" opacity=".7"/>
            <circle cx="5"  cy="14" r="2.5" fill="white" opacity=".7"/>
            <circle cx="23" cy="14" r="2.5" fill="white" opacity=".7"/>
            <line x1="14" y1="9"  x2="14" y2="7.5"  stroke="white" strokeWidth="1.5" opacity=".5"/>
            <line x1="14" y1="19" x2="14" y2="20.5" stroke="white" strokeWidth="1.5" opacity=".5"/>
            <line x1="9"  y1="14" x2="7.5" y2="14"  stroke="white" strokeWidth="1.5" opacity=".5"/>
            <line x1="19" y1="14" x2="20.5" y2="14" stroke="white" strokeWidth="1.5" opacity=".5"/>
          </svg>
        </div>

        <div className="loader-logo">
          AITech<span style={{
            background:'linear-gradient(135deg,#2563eb,#818cf8)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          }}>Pulze</span>
        </div>

        <p style={{
          fontSize:12.5, color:'#64748b', marginTop:6, marginBottom:28,
          opacity:0, animation:'fadeUp .4s ease .8s forwards',
          letterSpacing:'-0.01em',
        }}>
          Architecting Intelligent Digital Experiences
        </p>

        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
      </div>
    </div>
  );
}
