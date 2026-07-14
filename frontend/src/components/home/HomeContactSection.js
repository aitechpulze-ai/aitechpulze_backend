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
    <section className="section-sm bg-[#060713]">
      <div className="container">
        <motion.div
          {...fadeUp(0)}
          className="rounded-[32px] p-8 md:p-12 lg:p-14 relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#0d0e22_0%,#08091a_55%,#060713_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          <div className="max-w-3xl">
            <div className="section-label w-fit mb-4">Get In Touch</div>
            <h2 className="heading-md text-white">
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
                className="card p-5 flex items-center gap-4 border border-emerald-900/30 bg-[#0d0e22]/50 backdrop-blur-md"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 flex items-center justify-center text-xl">
                  💬
                </div>
                <div>
                  <div className="font-bold text-white">WhatsApp</div>
                  <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                    Instant reply
                  </div>
                </div>
              </a>

              <a
                href={COMPANY.mailto}
                className="card p-5 flex items-center gap-4 border border-white/10 bg-[#0d0e22]/50 backdrop-blur-md"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#060713] border border-white/10 flex items-center justify-center text-xl">
                  ✉️
                </div>
                <div>
                  <div className="font-bold text-white">Email Us</div>
                  <div className="text-sm" style={{ color: 'var(--text-4)' }}>
                    {COMPANY.email}
                  </div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
              <Link to="/get-quote" className="btn-primary w-full lg:w-auto justify-center px-8 py-4 cursor-pointer">
                Start Your Project
              </Link>
              <Link to="/contact" className="btn-ghost w-full lg:w-auto justify-center px-8 py-4 cursor-pointer">
                View All Contact Options
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
