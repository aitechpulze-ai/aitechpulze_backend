import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { API_BASE_URL } from '../config';

const DOMAINS = [
  'Data Science & AI',
  'Web Development',
  'Full Stack Development',
  'IoT & Hardware',
  'Android Development',
  'UI/UX Design',
];

const DURATIONS = [
  { value: '15days', label: '15 Days Internship' },
  { value: '1month', label: '1 Month Internship' },
];

const PROGRAMS = [
  {
    title: '15 Days Intensive',
    duration: '15 Days',
    price: 'Rs 1,499',
    highlight: 'Best for Quick Skill Boost',
    color: 'from-blue-600 to-cyan-500',
    features: [
      'Daily hands-on tasks',
      'Mentor guidance',
      'Live sessions via GMeet',
      'Project completion',
      'MSME Verified Certificate',
      'LinkedIn recommendation',
    ],
  },
  {
    title: '1 Month Deep Dive',
    duration: '1 Month',
    price: 'Rs 2,499',
    highlight: 'Most Popular',
    color: 'from-violet-600 to-purple-500',
    features: [
      'Everything in 15 Days',
      'Real client project',
      '2 major assignments',
      'Code review sessions',
      'Portfolio-ready work',
      'MSME Verified Certificate + Letter of Recommendation',
    ],
  },
];

const STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Fill the application form with your details and upload your resume.' },
  { step: '02', title: 'Admin Approval', desc: 'Our team reviews and approves your application within 24 hours.' },
  { step: '03', title: 'Get Credentials', desc: 'Receive your Student ID, username and password via email.' },
  { step: '04', title: 'Start Learning', desc: 'Login to your portal, attend sessions, and complete assignments.' },
];

export default function Internships() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    phone: '',
    email: '',
    college: '',
    year: '',
    department: '',
    domain: '',
    duration: '',
    start_date: '',
    end_date: '',
  });

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setLoading(true);
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    if (resume) fd.append('resume', resume);

    try {
      const res = await fetch(`${API_BASE_URL}/api/public/apply`, { method: 'POST', body: fd });
      if (res.ok) setSubmitted(true);
      else alert('Failed to submit. Please try again.');
    } catch (err) {
      alert('Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <>
      <SEO
        title="Best Internships in Coimbatore & Tirupur | AiTechPulze"
        description="Looking for the best internships in Coimbatore and Tirupur? Join AiTechPulze's 15-day or 1-month tech internships in Web Development, Python, UI/UX, and AI/ML with live GMeet sessions, placement support, and MSME verified certification."
        path="/internships"
      />

      {/* Hero */}
      <section className="pt-32 pb-24 bg-white relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-10" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.div {...fadeUp(0)}>
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-[10px] font-bold tracking-widest uppercase mb-8 shadow-sm">
              MSME Registered Company
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-none">
              Launch Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Tech Career</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              Gain real-world experience with our industry-grade internships. Work on live projects, get mentored by experts, and earn an MSME verified certificate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#apply"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all text-sm"
              >
                Apply Now ->
              </a>
              <a
                href="#programs"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm shadow-sm"
              >
                View Programs
              </a>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[['50+', 'Students Trained'], ['2', 'Programs'], ['100%', 'Job Ready']].map(([val, label]) => (
              <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                <div className="text-2xl font-extrabold text-slate-900">{val}</div>
                <div className="text-xs text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4">PROGRAMS</div>
            <h2 className="text-4xl font-extrabold text-slate-900">Choose Your Path</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROGRAMS.map((prog, i) => (
              <motion.div key={prog.title} {...fadeUp(i * 0.1)} className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] bg-white hover:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all">
                <div className={`bg-gradient-to-br ${prog.color} p-8 text-white`}>
                  <div className="text-xs font-bold tracking-widest uppercase opacity-70 mb-2">{prog.highlight}</div>
                  <h3 className="text-2xl font-extrabold mb-1">{prog.title}</h3>
                  <div className="text-4xl font-black mt-4">{prog.price}</div>
                  <div className="text-sm opacity-70">for {prog.duration}</div>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {prog.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="w-5 h-5 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-emerald-600 text-xs">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply" className={`block text-center py-3 rounded-xl bg-gradient-to-r ${prog.color} text-white font-bold text-sm shadow-lg hover:opacity-90 transition-all`}>
                    Apply for {prog.duration} ->
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4">CERTIFICATE</div>
            <h2 className="text-4xl font-extrabold text-slate-900">MSME Verified Certificate</h2>
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto">
              Every intern receives an industry-recognised certificate, verifiable online at aitechpulze.com/verify
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_240px] gap-6 items-center">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 p-4 sm:p-6">
              <div className="rounded-[1.5rem] overflow-hidden bg-slate-100">
                <img src="/images/inter_sample.png" alt="Sample internship certificate" className="w-full h-auto object-cover" />
              </div>
            </div>
            <div className="lg:self-stretch bg-white rounded-[2rem] shadow-[0_16px_50px_rgba(0,0,0,0.06)] border border-slate-100 p-6 flex lg:flex-col justify-between gap-4">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4">
                  Sample Certificate
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">Internship certificate preview</h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  This is a sample view of the certificate interns receive after completion.
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Verifiable at aitechpulze.com/verify
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Locations SEO Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/60">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-4">LOCATIONS</div>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Top-Rated Internships in Coimbatore & Tirupur
              </h2>
              <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                AiTechPulze offers premium tech internships for engineering and arts & science students in <strong>Coimbatore</strong> and <strong>Tirupur</strong>. Our programs provide hands-on experience and real-time project implementation designed to launch your career in the IT industry.
              </p>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Whether you are a student from Coimbatore's leading engineering colleges or an aspiring developer in Tirupur, our tailored 15-day and 1-month programs fit your academic requirements and industrial training needs perfectly.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-800 text-base">Why Coimbatore & Tirupur Students Choose Us?</h3>
              <div className="space-y-3">
                {[
                  'Syllabus designed as per Coimbatore & Tirupur IT industry standards',
                  'Flexible online batches with Live GMeet sessions and mentor support',
                  'MSME Registered Certification acceptable for university industrial training credits',
                  'Letter of Recommendation & LinkedIn profile reviews for placement readiness'
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 text-xs text-slate-600">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div {...fadeUp(0)} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <motion.div key={s.step} {...fadeUp(i * 0.1)} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 mb-4">{s.step}</div>
                <h3 className="font-extrabold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[110px] opacity-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-[110px] opacity-10" />
        </div>
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold tracking-widest uppercase mb-4 shadow-sm">
              APPLY NOW
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">Start Your Journey</h2>
            <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">
              Complete the form below to apply for your internship and begin the selection process.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-100 rounded-[2rem] p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Application Submitted</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Your application is under review. After admin approval, you will receive your <strong className="text-slate-900">Student ID, Username and Password</strong> on your email.
              </p>
            </motion.div>
          ) : (
            <motion.div {...fadeUp(0.1)} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <div className="flex gap-2 mb-8">
                {['Personal Info', 'Academic Info', 'Program', 'Resume'].map((label, index) => (
                  <div key={label} className="flex-1">
                    <div className={`h-1.5 rounded-full transition-all ${step > index ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-200'}`} />
                    <div className={`text-[9px] mt-1.5 font-bold ${step === index + 1 ? 'text-slate-900' : 'text-slate-400'}`}>{label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="text-slate-900 font-bold text-lg">Personal Information</h3>
                      {[
                        ['full_name', 'Full Name *', 'text'],
                        ['dob', 'Date of Birth *', 'date'],
                        ['phone', 'Phone Number *', 'tel'],
                        ['email', 'Gmail Address *', 'email'],
                      ].map(([field, label, type]) => (
                        <div key={field}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">{label}</label>
                          <input
                            type={type}
                            value={formData[field]}
                            onChange={e => update(field, e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder-slate-300"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="text-slate-900 font-bold text-lg">Academic Information</h3>
                      {[
                        ['college', 'College / University *', 'text'],
                        ['year', 'Current Year *', 'text'],
                        ['department', 'Department *', 'text'],
                      ].map(([field, label, type]) => (
                        <div key={field}>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">{label}</label>
                          <input
                            type={type}
                            value={formData[field]}
                            onChange={e => update(field, e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder-slate-300"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="text-slate-900 font-bold text-lg">Program Selection</h3>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Domain *</label>
                        <select
                          value={formData.domain}
                          onChange={e => update('domain', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                        >
                          <option value="">Select Domain</option>
                          {DOMAINS.map(domain => <option key={domain} value={domain}>{domain}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Duration *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {DURATIONS.map(duration => (
                            <button
                              key={duration.value}
                              type="button"
                              onClick={() => update('duration', duration.value)}
                              className={`p-4 rounded-xl border text-sm font-bold transition-all ${formData.duration === duration.value ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                            >
                              {duration.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          ['start_date', 'Start Date *'],
                          ['end_date', 'End Date *'],
                        ].map(([field, label]) => (
                          <div key={field}>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">{label}</label>
                            <input
                              type="date"
                              value={formData[field]}
                              onChange={e => update(field, e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="text-slate-900 font-bold text-lg">Upload Resume</h3>
                      <div
                        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${resume ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}
                        onClick={() => document.getElementById('resume-input').click()}
                      >
                        {resume ? (
                          <div>
                            <div className="text-2xl mb-2">Document</div>
                            <div className="text-slate-900 font-bold text-sm">{resume.name}</div>
                            <div className="text-slate-500 text-xs mt-1">Click to change</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-3xl mb-3">Upload</div>
                            <div className="text-slate-900 font-bold text-sm">Upload your Resume</div>
                            <div className="text-slate-500 text-xs mt-1">PDF or Word format (Max 10MB)</div>
                          </div>
                        )}
                        <input id="resume-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setResume(e.target.files[0])} />
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                        <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">Application Summary</div>
                        {[
                          ['Name', formData.full_name],
                          ['Email', formData.email],
                          ['Domain', formData.domain],
                          ['Duration', formData.duration],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between text-xs">
                            <span className="text-slate-500">{label}</span>
                            <span className="text-slate-900 font-bold">{value || '-'}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="flex-grow py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all text-sm"
                  >
                    Continue ->
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-grow py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all text-sm disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
