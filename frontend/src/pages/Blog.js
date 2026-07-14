import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/content';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const CATEGORIES = ['All', 'AI & Data Science', 'Web Development', 'Career & Growth', 'Academic Guide'];

export default function Blog() {
  const [filter, setFilter] = useState('All');

  const filteredPosts = BLOG_POSTS.filter(p => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase());
  });

  return (
    <>
      <SEO title="Blog | AiTechPulze" description="Read our latest insights on AI, web development, and student innovation." path="/blog" />

      <section className="pt-32 pb-24 bg-[#060713] min-h-screen">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center mb-12">
            <motion.div {...fadeUp(0)}>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                Tech Blog - AI, Web Development & Student Innovation
              </h1>
              
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {CATEGORIES.map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${filter === f ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-slate-400 border-white/10 hover:border-blue-500 hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post, i) => (
                <motion.div 
                  key={post.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0d0e22]/50 rounded-[2rem] p-8 border border-white/10 flex flex-col h-full hover:border-cyan-400/30 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                      {post.category}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500">
                      {post.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight">{post.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-auto">
                    <div className="text-[10px] font-bold text-slate-500">
                      {post.readTime}
                    </div>
                    <Link to={`/blog/${post.slug || '#'}`} className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                      Read More &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </>
  );
}
