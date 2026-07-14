import SEO from '../components/SEO';
import { CAREERS, COMPANY } from '../data/content';

export default function Careers() {
  const applyLink = (title) =>
    `https://wa.me/919585776088?text=Hi%20AITechPulze%2C%20I%20want%20to%20apply%20for%20the%20${encodeURIComponent(title)}%20role.`;

  return (
    <>
      <SEO
        title="Careers"
        description="Join AITechPulze — open roles for React developers, AI/ML engineers, UI/UX designers, and full stack developers. Apply via WhatsApp."
        path="/careers"
      />
      <div style={{ paddingTop: '80px' }}>
        <section className="section-pad hero-gradient grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#60a5fa' }}>Join Us</span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-3 mb-5">
              Build Your Career at <span className="gradient-text">AITechPulze</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Work on live products, real AI projects, and enterprise software. Grow fast with a team that ships.
            </p>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16" style={{ background: '#0d1424' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {[
                { icon: '🚀', title: 'Real Projects', desc: 'Work on live enterprise products and AI solutions — not just tutorials.' },
                { icon: '🧠', title: 'Learn Fast', desc: 'Mentorship from senior engineers and AI researchers.' },
                { icon: '🤝', title: 'Collaborative', desc: 'Small, tight-knit team where your work makes a real impact.' },
                { icon: '📜', title: 'Certificate', desc: 'Internship certificate and LinkedIn recommendation on completion.' },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-6 text-center card-hover">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Job Listings */}
            <h2 className="text-2xl font-black text-white mb-8">Open Positions</h2>
            <div className="space-y-4">
              {CAREERS.map((job) => (
                <div key={job.title} className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 card-hover">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-white font-black text-lg">{job.title}</h3>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: job.type === 'Full-time' ? 'rgba(52,211,153,0.1)' : 'rgba(37,99,235,0.1)',
                          color: job.type === 'Full-time' ? '#6ee7b7' : '#93c5fd',
                          border: `1px solid ${job.type === 'Full-time' ? 'rgba(52,211,153,0.2)' : 'rgba(37,99,235,0.2)'}`,
                        }}
                      >
                        {job.type}
                      </span>
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: 'rgba(124,58,237,0.1)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.2)' }}
                      >
                        {job.dept}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{job.desc}</p>
                  </div>
                  <a
                    href={applyLink(job.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-shrink-0"
                  >
                    💬 Apply on WhatsApp
                  </a>
                </div>
              ))}
            </div>

            {/* General Apply */}
            <div className="mt-12 glass rounded-2xl p-8 text-center">
              <h3 className="text-white font-black text-xl mb-3">Don't see your role?</h3>
              <p className="mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                We're always open to talented people. Send us your portfolio and we'll be in touch.
              </p>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                💬 Send Your Portfolio
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
