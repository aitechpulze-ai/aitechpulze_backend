import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function FeaturedProductsSection() {
  return (
    <section className="section bg-mesh-2">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <motion.div {...fadeUp(0)} className="section-label w-fit mb-4">
            Live Products
          </motion.div>
          <motion.h2 {...fadeUp(0.05)} className="heading-md">
            Our <span className="text-gradient">Flagship Products</span>
          </motion.h2>
          <motion.p {...fadeUp(0.1)} className="mt-4 max-w-xl" style={{ color: 'var(--text-3)' }}>
            Real enterprise software products built and deployed by AITechPulze, powering businesses today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.article
              key={product.name}
              {...fadeUp(0.08 + index * 0.08)}
              className="bg-[#0d0e22]/50 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col h-full hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] transition-all duration-300 group"
            >
              <div className="relative h-56 bg-[#0B0F19] overflow-hidden flex items-center justify-center p-8 border-b border-slate-800/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain relative z-0 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.style.background = 'linear-gradient(135deg, #eff6ff, #eef2ff)';
                  }}
                />
                <div className="absolute top-4 right-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 shadow z-10">
                  LIVE PRODUCT
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-extrabold uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--primary)' }}>
                  {product.category}
                </div>
                <h3 className="text-xl font-black mb-1" style={{ color: 'var(--text-1)' }}>
                  {product.name}
                </h3>
                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  {product.tagline}
                </p>
                <p className="text-sm leading-6 mb-5 flex-1" style={{ color: 'var(--text-3)' }}>
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  {product.features.slice(0, 6).map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs leading-5" style={{ color: 'var(--text-3)' }}>
                      <span className="mt-1 w-3 h-3 rounded-full border flex items-center justify-center" style={{ borderColor: 'rgba(16,185,129,0.35)', color: '#10b981' }}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tech.map((tech) => (
                    <span key={tech} className="tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={product.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center"
                  >
                    Visit {product.name}
                  </a>
                  <Link to="/get-quote" className="btn-ghost flex-1 justify-center">
                    Get Similar Built
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
