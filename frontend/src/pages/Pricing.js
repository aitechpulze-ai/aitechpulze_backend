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
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-[#060713] pt-20">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-blue-900 rounded-full blur-[100px]" />
        </div>
        <div className="container relative z-10 py-20 text-center mx-auto px-6">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950/40 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-blue-900/30 shadow-sm">
              Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Honest Pricing</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-slate-400 font-medium">No hidden costs. No surprises. Just great software at fair prices.</p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 bg-[#060713] border-t border-white/5">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div key={plan.name} {...fadeUp(i * 0.1)}
                className="relative flex flex-col rounded-[24px] p-8 transition-all duration-300 bg-[#0d0e22]/50 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
                whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.3)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-5">{plan.desc}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{plan.price}</span>
                    <span className="text-xs text-slate-500 mb-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold bg-blue-950/40 text-blue-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer"
                  className={plan.highlight ? 'inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all text-center' : 'inline-flex items-center justify-center px-6 py-3.5 bg-white/5 text-white text-xs font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all text-center'}>
                  {plan.name === 'Enterprise' ? 'Get a Custom Quote' : 'Get Started'}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Custom quote */}
          <motion.div {...fadeUp(0.3)} className="mt-12 bg-[#0d0e22]/50 border border-white/10 rounded-3xl p-8 text-center shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
            <h3 className="text-xl font-bold mb-3 text-white">Need a custom quote?</h3>
            <p className="mb-6 max-w-md mx-auto text-xs text-slate-400">Every project is unique. Tell us what you need and we'll give you a detailed, transparent quote within 24 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">💬 WhatsApp for Quote</a>
              <Link to="/get-quote" className="inline-flex items-center justify-center px-6 py-3 bg-white/5 text-white text-xs font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">Fill Quote Form</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
