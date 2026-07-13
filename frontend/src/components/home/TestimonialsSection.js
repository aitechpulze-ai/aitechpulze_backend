import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CTO, TechFlow Inc.",
    content: "AiTechPulze transformed our legacy infrastructure into a cloud-native powerhouse. Their AI automation reduced our operational costs by 40%. Absolutely world-class.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Founder, Nexus AI",
    content: "The level of design and engineering excellence is unmatched. They don't just build software; they craft digital experiences that redefine industry standards.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Product, FinServe",
    content: "Working with them felt like looking into the future. Their deep understanding of machine learning and intuitive UI design helped us launch our product months ahead of schedule.",
    rating: 5
  },
  {
    name: "Michael Sterling",
    role: "CEO, Quantum Logistics",
    content: "A rare combination of technical brilliance and design aesthetic. The platform they built for us handles millions of requests seamlessly while looking incredibly premium.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  // Double the array for seamless marquee
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-blue-500/5 via-cyan-400/5 to-blue-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 mb-20 relative z-10 text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 text-sm font-bold tracking-wide uppercase mb-4 shadow-sm border border-slate-100"
          >
            Endorsements
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Visionaries</span>
          </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-8 pb-12">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track 1 (Left to Right) */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 w-max"
        >
          {marqueeItems.map((testimonial, idx) => (
            <TestimonialCard key={`t1-${idx}`} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Marquee Track 2 (Right to Left) */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 w-max -ml-[300px]"
        >
          {marqueeItems.map((testimonial, idx) => (
            <TestimonialCard key={`t2-${idx}`} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[400px] p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] hover:border-blue-100 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.svg 
              key={i} 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="w-5 h-5 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>
        <p className="text-slate-600 font-medium leading-relaxed mb-8 text-lg">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-700 font-bold text-lg border border-white shadow-inner">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{testimonial.name}</h4>
          <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
