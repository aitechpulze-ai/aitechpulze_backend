import SEO from '../components/SEO';
import { INDUSTRIES, COMPANY } from '../data/content';

export default function Industries() {
  return (
    <>
      <SEO
        title="Industries"
        description="AITechPulze serves logistics, healthcare, e-commerce, education, finance, manufacturing, printing, and luxury industries."
        path="/industries"
      />
      <div style={{ paddingTop: '80px' }}>
        <section className="section-pad hero-gradient grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Industries We Serve</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-5">
              Built for <span className="gradient-text">Every Industry</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              We've delivered solutions across 8+ industries — from logistics to luxury retail.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: '#0d1424' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INDUSTRIES.map((ind) => (
                <div key={ind.name} className="glass rounded-2xl p-6 card-hover text-center">
                  <div className="text-4xl mb-4">{ind.icon}</div>
                  <h3 className="text-white font-bold mb-2">{ind.name}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{ind.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Discuss Your Industry
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
