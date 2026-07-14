import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { PRICING_PLANS, COMPANY } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Pricing() {
  return (
    <>
      <SEO title="Pricing" description="Transparent pricing for web development, AI solutions, and software projects. Starting at ₹9,999." path="/pricing" />

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pg6" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2563eb" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#pg6)"/>
          </svg>
        </div>
        <div className="container relative z-10 py-20 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="section-label mx-auto w-fit mb-4">Transparent Pricing</div>
            <h1 className="heading-xl mb-5">Simple, <span className="text-gradient">Honest Pricing</span></h1>
            <p className="max-w-xl mx-auto text-lg" style={{ color: 'var(--text-3)' }}>No hidden costs. No surprises. Just great software at fair prices.</p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="section bg-mesh-2">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={plan.name} {...fadeUp(i * 0.1)}
                className="relative flex flex-col rounded-[24px] p-8 transition-all duration-300"
                style={{
                  background: plan.highlight ? 'linear-gradient(135deg, rgba(37,99,235,0.06), rgba(79,70,229,0.06))' : 'rgba(255,255,255,0.75)',
                  border: plan.highlight ? '1.5px solid rgba(37,99,235,0.3)' : '1px solid var(--border)',
                  boxShadow: plan.highlight ? '0 20px 60px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.08)' : 'var(--shadow)',
                  backdropFilter: 'blur(30px)',
                }}
                whileHover={{ y: -6, boxShadow: plan.highlight ? '0 40px 100px rgba(37,99,235,0.2)' : '0 40px 100px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)', letterSpacing: '-0.03em' }}>{plan.name}</h3>
                  <p className="text-sm mb-5" style={{ color: 'var(--text-3)' }}>{plan.desc}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-gradient">{plan.price}</span>
                    <span className="text-sm mb-1" style={{ color: 'var(--text-4)' }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-2)' }}>
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--primary)' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer"
                  className={plan.highlight ? 'btn-primary justify-center' : 'btn-ghost justify-center'}>
                  {plan.name === 'Enterprise' ? 'Get a Custom Quote' : 'Get Started'}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Custom quote */}
          <motion.div {...fadeUp(0.3)} className="mt-10 card p-8 text-center">
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>Need a custom quote?</h3>
            <p className="mb-6 max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>Every project is unique. Tell us what you need and we'll give you a detailed, transparent quote within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">💬 WhatsApp for Quote</a>
              <Link to="/get-quote" className="btn-ghost">Fill Quote Form</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
