import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { label: "Data Points Processed", value: 50, suffix: "B+", prefix: "" },
  { label: "Enterprise Clients", value: 200, suffix: "+", prefix: "" },
  { label: "Uptime Guaranteed", value: 99.9, suffix: "%", prefix: "" },
  { label: "ROI Average", value: 300, suffix: "%", prefix: ">" },
];

function Counter({ value, suffix, prefix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  // Custom hook logic for counting
  const [currentValue, setCurrentValue] = useState(0);
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCurrentValue(value);
          clearInterval(timer);
        } else {
          setCurrentValue(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  const displayValue = value % 1 !== 0 
    ? currentValue.toFixed(1)
    : Math.floor(currentValue);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden border-y border-slate-100">
      {/* Background Infographic/Network Graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2563EB" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 0,200 Q 200,100 400,200 T 800,200 T 1200,200 T 1600,200" 
            fill="none" 
            stroke="#2563EB" 
            strokeWidth="4" 
            className="opacity-50"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <div className="relative mb-6">
                {/* Glowing ring behind number */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-colors duration-500 scale-150" />
                <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 relative z-10">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </h3>
              </div>
              <p className="text-slate-500 font-semibold uppercase tracking-widest text-sm">
                {stat.label}
              </p>
              
              {/* Growing graph bar */}
              <div className="w-full max-w-[120px] h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
