import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: "How does AiTechPulze integrate with existing enterprise systems?",
    answer: "We employ an API-first approach, ensuring seamless integration with your legacy systems, ERPs, and CRMs without disrupting your current operations. Our custom middleware orchestrates data flow securely."
  },
  {
    question: "What is the typical timeline for an AI implementation?",
    answer: "Our rapid deployment methodology typically sees initial models in production within 8-12 weeks. Comprehensive enterprise-wide transformations are structured in quarterly milestones to ensure continuous value delivery."
  },
  {
    question: "How do you ensure data security and privacy?",
    answer: "Security is foundational. We use military-grade encryption, role-based access controls, and comply with SOC2, GDPR, and HIPAA. Your data is isolated and never used to train our foundational models."
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer: "Absolutely. We offer 24/7 SLA-backed managed services, continuous model training, and performance monitoring to ensure your AI systems adapt and improve over time."
  }
];

function Accordion({ faq, isOpen, toggleOpen }) {
  return (
    <div className="border-b border-slate-200 last:border-0 py-4">
      <button 
        onClick={toggleOpen}
        className="w-full flex items-center justify-between text-left py-4 group"
      >
        <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors pr-8">
          {faq.question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
          <motion.svg 
            animate={{ rotate: isOpen ? 45 : 0 }} 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </motion.svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 font-medium leading-relaxed pb-6 pr-12 text-lg">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-700 text-sm font-bold tracking-wide uppercase mb-4 shadow-sm border border-slate-100"
          >
            Knowledge Base
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Inquiries</span>
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100"
        >
          {FAQS.map((faq, idx) => (
            <Accordion 
              key={idx} 
              faq={faq} 
              isOpen={openIndex === idx} 
              toggleOpen={() => setOpenIndex(openIndex === idx ? -1 : idx)} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
