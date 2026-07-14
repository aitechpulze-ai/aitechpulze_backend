import SEO from '../components/SEO';
import { COMPANY } from '../data/content';

export default function Maintenance() {
  return (
    <>
      <SEO title="Under Maintenance" path="/maintenance" />
      <div
        className="min-h-screen flex items-center justify-center hero-gradient"
        style={{ paddingTop: '80px' }}
      >
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="text-7xl mb-6">🔧</div>
          <h1 className="text-4xl font-black text-white mb-4">
            We're <span className="gradient-text">Under Maintenance</span>
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We're making some improvements. We'll be back shortly. Thank you for your patience!
          </p>
          <div className="glass rounded-2xl p-6 mb-8">
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Need urgent help? Reach us directly:
            </p>
            <div className="flex flex-col gap-3">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                💬 WhatsApp Us
              </a>
              <a href={COMPANY.mailto} className="btn-outline justify-center">
                ✉️ {COMPANY.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
