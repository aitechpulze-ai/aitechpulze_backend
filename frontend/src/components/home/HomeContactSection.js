import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COMPANY } from '../../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function HomeContactSection() {
  return (
    <section className="section-sm bg-white">
      <div className="container">
        <motion.div
          {...fadeUp(0)}
          className="rounded-[32px] p-8 md:p-12 lg:p-14 relative overflow-hidden border border-blue-100 bg-[linear-gradient(135deg,#eff6ff_0%,#eef2ff_55%,#f0f9ff_100%)] shadow-[0_24px_80px_rgba(37,99,235,0.08)]"
        >
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          <div className="max-w-3xl">
            <div className="section-label w-fit mb-4">Get In Touch</div>
            <h2 className="heading-md">
              Ready to <span className="text-gradient">Build Something?</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg" style={{ color: 'var(--text-3)' }}>
              Tell us your idea. We'll turn it into a scalable digital product fast, professional, and production-ready.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-5 flex items-center gap-4 border border-emerald-200 bg-white/90"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl">
                  💬
                </div>
                <div>
                  <div className="font-bold text-slate-900">WhatsApp</div>
                  <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                    Instant reply
                  </div>
                </div>
              </a>

              <a
                href={COMPANY.mailto}
                className="card p-5 flex items-center gap-4 border border-slate-200 bg-white/90"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl">
                  ✉️
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email Us</div>
                  <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                    {COMPANY.email}
                  </div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
              <Link to="/get-quote" className="btn-primary w-full lg:w-auto justify-center px-8 py-4">
                Start Your Project
              </Link>
              <Link to="/contact" className="btn-ghost w-full lg:w-auto justify-center px-8 py-4">
                View All Contact Options
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
