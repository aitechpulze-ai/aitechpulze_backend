import SEO from '../components/SEO';
import { TECHNOLOGIES, COMPANY } from '../data/content';

export default function Technologies() {
  return (
    <>
      <SEO
        title="Technologies"
        description="AITechPulze tech stack — React, Node.js, Python, TensorFlow, AWS, Docker, PostgreSQL, and more."
        path="/technologies"
      />
      <div style={{ paddingTop: '80px' }}>
        <section className="section-pad hero-gradient grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Tech Stack</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-5">
              Technologies We <span className="gradient-text">Master</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Modern, battle-tested technologies across frontend, backend, AI, cloud, and mobile.
            </p>
          </div>
        </section>

        <section className="section-pad" style={{ background: '#0d1424' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECHNOLOGIES.map((t) => (
                <div key={t.category} className="glass rounded-2xl p-7 card-hover">
                  <h3 className="text-white font-black text-xl mb-5">{t.category}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {t.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                        style={{ background: 'rgba(37,99,235,0.08)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.15)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#2563eb' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Discuss Your Tech Stack
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
