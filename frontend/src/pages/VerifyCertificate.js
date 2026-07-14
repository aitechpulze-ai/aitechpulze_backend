import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { CheckIcon, XIcon } from '../components/Icons';
import { API_BASE_URL } from '../config';

export default function VerifyCertificate() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const verify = async (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/verify/${certId.trim().toUpperCase()}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ verified: false, message: 'Server error. Please try again.' });
    }
    setLoading(false);
    setSearched(true);
  };

  return (
    <>
      <SEO title="Verify Certificate | AiTechPulze" description="Verify the authenticity of an AiTechPulze internship certificate." path="/verify" />

      <div className="min-h-screen bg-[#060713] flex flex-col items-center justify-center px-4 py-20 text-white">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#0c0d21] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/10">
              <img src="/favicon.png" alt="AiTechPulze" className="w-full h-full object-contain p-2" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Certificate Verification</h1>
            <p className="text-slate-400 text-sm">Enter the Certificate ID to verify its authenticity</p>
          </div>

          {/* Input */}
          <form onSubmit={verify} className="bg-[#0d0e22]/50 rounded-[2rem] border border-white/10 p-8 mb-6 shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-2">Certificate ID</label>
            <input
              type="text"
              value={certId}
              onChange={e => setCertId(e.target.value.toUpperCase())}
              placeholder="e.g. CERTAITP001"
              className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3.5 text-white font-bold text-sm tracking-widest focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all mb-5 placeholder-slate-700"
            />
            <button type="submit" disabled={loading || !certId.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all disabled:opacity-50 text-sm cursor-pointer">
              {loading ? 'Verifying...' : 'Verify Certificate →'}
            </button>
          </form>

          {/* Result */}
          <AnimatePresence>
            {searched && result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {result.verified ? (
                  <div className="bg-[#0d0e22]/50 rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
                    {/* Verified Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-center">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckIcon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-[#060713] font-extrabold text-xl">Certificate Verified!</div>
                      <div className="text-[#060713]/80 text-xs mt-1">This certificate is authentic and issued by AiTechPulze</div>
                    </div>
                    {/* Details */}
                    <div className="p-6 space-y-3">
                      {[
                        ['Certificate ID', result.cert_id],
                        ['Student Name', result.student_name],
                        ['Domain / Track', result.domain],
                        ['Duration', result.duration],
                        ['Internship Period', `${result.start_date} → ${result.end_date}`],
                        ['Issued On', new Date(result.issued_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-2 border-b border-white/10 last:border-0 text-sm">
                          <span className="text-slate-400 font-medium">{k}</span>
                          <span className="text-white font-bold text-right max-w-[55%]">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-6 pb-6">
                      <div className="bg-[#060713] border border-white/10 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-400">
                        <div className="w-8 h-8 bg-[#0c0d21] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                          <img src="/favicon.png" alt="Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <div>
                          <div className="font-bold text-white">AiTechPulze</div>
                          <div>MSME Registered · aitechpulze.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0d0e22]/50 rounded-[2rem] border border-white/10 p-8 text-center shadow-[0_10px_35px_rgba(0,0,0,0.3)]">
                    <div className="w-16 h-16 bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/30">
                      <XIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="text-white font-extrabold text-lg mb-2">Not Found</div>
                    <p className="text-slate-400 text-sm">{result.message || 'No certificate found with this ID. Please check the ID and try again.'}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-slate-500 text-xs mt-6">
            Having issues? Contact us at <a href="mailto:info@aitechpulze.com" className="text-blue-400 hover:underline">info@aitechpulze.com</a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
