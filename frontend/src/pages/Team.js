import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { TEAM } from '../data/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Team() {
  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the AITechPulze team — engineers, AI researchers, designers, and developers building the future of software."
        path="/team"
      />
      <div className="min-h-screen bg-slate-50/50 pt-24 relative overflow-hidden">
        {/* Background Decorative Mesh Aurora & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 right-10 w-[600px] h-[600px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-70" />
          <div className="absolute top-80 -left-20 w-[500px] h-[500px] bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-60" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.4]"
               style={{
                 backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.04) 1px, transparent 1px)`,
                 backgroundSize: '30px 30px',
               }} 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          
          {/* Header Section */}
          <section className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              The Innovators
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mt-2 mb-6"
            >
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Team</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed"
            >
              A passionate team of software developers, AI engineers, designers, and innovators building premium digital products that empower businesses and students.
            </motion.p>
          </section>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {TEAM.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl p-6 bg-white/70 backdrop-blur-lg border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_55px_rgba(37,99,235,0.1)] hover:bg-white hover:border-blue-200/80 transition-all duration-300 text-center flex flex-col justify-between overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Avatar Container */}
                  <div className="relative inline-block mb-5">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-100 group-hover:border-blue-400/50 shadow-md transition-colors duration-300">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Active Status Indicator Badge */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm">
                      <span 
                        className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" 
                        style={{ animationDuration: '2.5s' }} 
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-slate-900 font-extrabold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-slate-400 font-semibold mb-4">
                    {member.dept} · Joined {member.joined}
                  </p>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex justify-center gap-2 mt-auto pt-4 border-t border-slate-100/80">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-100 hover:border-blue-600 transition-all flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Join CTA section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-900/10"
          >
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400 rounded-full blur-2xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-3">Want to join the team?</h2>
              <p className="max-w-xl mx-auto mb-8 text-white/80 text-sm md:text-base">
                We're always looking for talented engineers, designers, and AI enthusiasts to push the boundaries of technology.
              </p>
              <a href="/careers" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 text-sm font-bold rounded-xl transition-all shadow-md active:scale-95">
                View Open Roles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
