import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { COMPANY } from '../data/content';
import { API_BASE_URL } from '../config';

// Data definitions based on screenshots
const PROJECT_TYPES = [
  { id: 'ai', name: 'AI / Machine Learning', price: 4500, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { id: 'web', name: 'Website Development', price: 3000, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
  { id: 'fullstack', name: 'Full Stack Application', price: 4000, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { id: 'data', name: 'Data Analytics Dashboard', price: 3500, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  { id: 'iot', name: 'Hardware + Software (IoT)', price: 6000, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> },
  { id: 'fyp', name: 'Final Year Project', price: 2500, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v7" /></svg> },
  { id: 'startup', name: 'Startup MVP', price: 4500, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
  { id: 'fullbuild', name: 'Full Build + Deployment', price: 20000, icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
];

const FEATURES = [
  { id: 'seo', name: 'SEO Optimization', price: 200, icon: 'search' },
  { id: 'payment', name: 'Payment Gateway', price: 300, icon: 'credit-card' },
  { id: 'admin', name: 'Admin Dashboard', price: 400, icon: 'layout' },
  { id: 'mobile', name: 'Mobile Responsive', price: 200, icon: 'smartphone' },
  { id: 'api', name: 'API Integration', price: 300, icon: 'link' },
  { id: 'domain', name: 'Domain & Deployment', price: 2000, icon: 'globe' },
  { id: 'db', name: 'Database Integration', price: 300, icon: 'database' },
  { id: 'auth', name: 'User Authentication', price: 250, icon: 'lock' },
  { id: 'email', name: 'Email Notifications', price: 150, icon: 'mail' },
];

const STEPS = [
  { id: 1, name: 'Your Info' },
  { id: 2, name: 'Project Type' },
  { id: 3, name: 'Features' },
  { id: 4, name: 'Review' },
];

export default function GetQuote() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectTypeId: null,
    features: [],
    description: ''
  });

  const selectedProjectType = PROJECT_TYPES.find(p => p.id === formData.projectTypeId);
  
  const baseCost = selectedProjectType ? selectedProjectType.price : 0;
  const featuresCost = formData.features.reduce((total, featureId) => {
    const f = FEATURES.find(f => f.id === featureId);
    return total + (f ? f.price : 0);
  }, 0);
  const totalCost = baseCost + featuresCost;

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));
  
  const handleFeatureToggle = (id) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(id) 
        ? prev.features.filter(fId => fId !== id)
        : [...prev.features, id]
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg('');
    
    const pName = selectedProjectType ? selectedProjectType.name : 'Not selected';
    const fNames = formData.features.map(fid => FEATURES.find(f => f.id === fid)?.name).filter(Boolean);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_type: pName,
          features: fNames,
          estimated_cost: totalCost,
          description: formData.description
        })
      });
      
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Failed to submit quote request.');
      }
    } catch (e) {
      console.error(e);
      setErrorMsg('Failed to connect to the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Get Quote | AiTechPulze" description="Get a detailed project quote in minutes." path="/get-quote" />

      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pt-[72px]">
        {/* Left Sidebar (Dark) */}
        <div className="w-full md:w-[380px] lg:w-[420px] bg-[#1a1736] flex-shrink-0 flex flex-col p-8 md:p-12 min-h-[400px] md:min-h-[calc(100vh-72px)] relative overflow-hidden text-white">
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20" />
          </div>

          <div className="relative z-10 flex-grow">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 text-white/80 text-[10px] font-bold tracking-widest uppercase mb-6">
              AITECHPULZE
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Build<br/>
              Something<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Amazing</span>
            </h1>
            <p className="text-sm text-white/60 mb-12 max-w-[280px]">
              Tell us about your project. Get a detailed quote in minutes.
            </p>

            <div className="space-y-6">
              {STEPS.map((s, index) => {
                const isActive = step === s.id;
                const isPast = step > s.id;
                return (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isActive ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]' : isPast ? 'bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/50' : 'bg-white/5 border border-white/10 text-white/40'}`}>
                      {isPast ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : s.id}
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : isPast ? 'text-white/80' : 'text-white/40'}`}>
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-1">
                ESTIMATED COST
              </div>
              <div className="text-3xl font-extrabold text-white">
                ₹{totalCost.toLocaleString()}
              </div>
              {baseCost > 0 && (
                <div className="text-xs text-white/40 mt-1">
                  Base ₹{baseCost.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-grow bg-white p-8 md:p-16 lg:p-24 overflow-y-auto min-h-[calc(100vh-72px)]">
          <div className="max-w-2xl mx-auto">
            
            {/* Step 1: Your Info */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                  STEP 1 OF 4
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Your Details</h2>
                <p className="text-sm text-slate-500 mb-10">We'll use this to send your quote and get in touch.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#7c3aed] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#7c3aed] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-slate-200 py-3 text-slate-900 focus:outline-none focus:border-[#7c3aed] transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={handleNext}
                    disabled={!formData.name || !formData.phone || !formData.email}
                    className="w-full py-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Continue &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Type */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                  STEP 2 OF 4
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Project Type</h2>
                <p className="text-sm text-slate-500 mb-10">What kind of project do you need?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, projectTypeId: type.id})}
                      className={`text-left p-5 rounded-2xl border transition-all ${formData.projectTypeId === type.id ? 'border-[#7c3aed] bg-indigo-50/50 shadow-[0_0_0_1px_#7c3aed]' : 'border-slate-200 bg-white hover:border-indigo-300'}`}
                    >
                      <div className={`mb-4 ${formData.projectTypeId === type.id ? 'text-[#7c3aed]' : 'text-slate-400'}`}>
                        {type.icon}
                      </div>
                      <div className="font-bold text-slate-900 mb-1 text-sm">{type.name}</div>
                      <div className="text-xs font-bold text-[#7c3aed]">₹{type.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-12 flex items-center gap-4">
                  <button onClick={handleBack} className="px-6 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
                    &larr; Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.projectTypeId}
                    className="flex-grow py-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Continue &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Features */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                  STEP 3 OF 4
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Add Features</h2>
                <p className="text-sm text-slate-500 mb-8">Select optional add-ons for your project.</p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {FEATURES.map(feature => {
                    const isSelected = formData.features.includes(feature.id);
                    return (
                      <button
                        key={feature.id}
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${isSelected ? 'border-[#7c3aed] bg-[#7c3aed] text-white shadow-md shadow-indigo-500/20' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                      >
                        {feature.name} <span className={isSelected ? 'text-white/70' : 'text-slate-400'}>+₹{feature.price}</span>
                      </button>
                    )
                  })}
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-900 mb-3 flex items-center gap-2">
                    PROJECT DESCRIPTION <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium normal-case">Optional</span>
                  </label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your requirements, timeline, and expected outcomes..."
                    rows={5}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm text-slate-900 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all resize-none shadow-sm"
                  ></textarea>
                </div>

                <div className="mt-12 flex items-center gap-4">
                  <button onClick={handleBack} className="px-6 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors">
                    &larr; Back
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-grow py-4 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    Review &rarr;
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="inline-block px-3 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                  STEP 4 OF 4
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Review & Submit</h2>
                <p className="text-sm text-slate-500 mb-10">Confirm your details before sending.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="border border-slate-200 rounded-2xl p-5 bg-white">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 mb-2">CONTACT</div>
                    <div className="text-sm font-bold text-slate-900">{formData.name}</div>
                    <div className="text-xs text-slate-500">{formData.email}</div>
                    <div className="text-xs text-slate-500">{formData.phone}</div>
                  </div>
                  <div className="border border-slate-200 rounded-2xl p-5 bg-white">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 mb-2">PROJECT</div>
                    <div className="text-sm font-bold text-slate-900">{selectedProjectType?.name || 'Not selected'}</div>
                    {formData.features.length > 0 && (
                      <div className="text-xs text-slate-500 mt-1">
                        + {formData.features.length} add-ons selected
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 bg-white mb-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-indigo-600 mb-2">DESCRIPTION</div>
                  <div className="text-sm text-slate-600 whitespace-pre-wrap italic">
                    {formData.description || 'Not provided'}
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-between mb-12">
                  <div className="text-sm font-bold text-slate-700">Total Estimate</div>
                  <div className="text-2xl font-extrabold text-[#7c3aed]">₹{totalCost.toLocaleString()}</div>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold mb-6">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <button onClick={handleBack} disabled={submitting} className="px-6 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors disabled:opacity-50">
                    &larr; Back
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-grow py-4 bg-gradient-to-r from-[#7c3aed] to-indigo-500 hover:from-[#6d28d9] hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Request 🚀'}
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#1a1736] rounded-3xl p-8 max-w-md w-full relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-center border border-white/10"
            >
              <button 
                onClick={() => { setIsSubmitted(false); setStep(1); setFormData({...formData, features:[], description:''}) }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 transition-colors"
              >
                &times;
              </button>

              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#7c3aed] to-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>

              <div className="inline-block px-3 py-1 rounded bg-white/5 text-white/60 text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
                &bull; REQUEST SENT
              </div>

              <h2 className="text-2xl font-extrabold text-white mb-4">
                You're all set, <span className="text-[#a78bfa]">{formData.name.split(' ')[0]}!</span>
              </h2>
              
              <p className="text-sm text-white/60 leading-relaxed mb-8">
                Your quote request has been received. We'll reach out to <strong className="text-white">{formData.email}</strong> within <strong className="text-white">24 hours</strong>.
              </p>

              <div className="flex justify-center gap-2 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Response in 24 hrs
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {COMPANY.phone}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-5 text-left mb-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#a78bfa]">PROJECT TYPE</div>
                  <div className="text-sm font-bold text-white">{selectedProjectType?.name}</div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <div className="text-xs text-white/50">Estimated Total</div>
                  <div className="text-xl font-extrabold text-white">₹{totalCost.toLocaleString()}</div>
                </div>
              </div>

              <button 
                onClick={() => { setIsSubmitted(false); setStep(1); setFormData({...formData, features:[], description:''}) }}
                className="w-full py-3.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/10"
              >
                Submit Another Request &rarr;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
