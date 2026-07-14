import SEO from '../components/SEO';
import { SOLUTIONS, COMPANY } from '../data/content';

export default function Solutions() {
  return (
    <>
      <SEO
        title="Solutions"
        description="AITechPulze solutions — GenAI platform, business automation, data analytics, enterprise security, and digital transformation."
        path="/solutions"
      />
      <div style={{ paddingTop: '80px' }}>
        <section className="section-pad hero-gradient grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#60a5fa' }}>AI Solutions</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-5">
              Intelligent <span className="gradient-text">Solutions</span> for Modern Business
            </h1>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              From GenAI platforms to business automation — we build solutions that transform how you operate.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: '#0d1424' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUTIONS.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-7 card-hover">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h3 className="text-white font-black text-xl mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Discuss Your Solution
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
