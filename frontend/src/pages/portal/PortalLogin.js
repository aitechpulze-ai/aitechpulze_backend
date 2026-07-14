import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function PortalLogin({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const config = {
    admin: {
      title: 'Admin Control Center',
      subtitle: 'Manage students, mentors & internship programs.',
      gradient: 'from-[#060713] via-[#08091a] to-[#0f112c]',
      accent: 'from-blue-600 to-indigo-600',
      glow: 'rgba(37,99,235,0.18)',
      ring: 'focus:ring-blue-500/20 focus:border-blue-500',
      icon: '👑',
      dashboard: '/portal/admin/dashboard',
    },
    mentor: {
      title: 'Mentor Dashboard',
      subtitle: 'Guide your students, manage attendance & assignments.',
      gradient: 'from-[#060713] via-[#08091a] to-[#0f112c]',
      accent: 'from-emerald-600 to-teal-600',
      glow: 'rgba(16,185,129,0.15)',
      ring: 'focus:ring-emerald-500/20 focus:border-emerald-500',
      icon: '👨‍🏫',
      dashboard: '/portal/mentor/dashboard',
    },
    student: {
      title: 'Student Portal',
      subtitle: 'Track your progress, assignments & certificates.',
      gradient: 'from-[#060713] via-[#08091a] to-[#0f112c]',
      accent: 'from-violet-600 to-purple-600',
      glow: 'rgba(124,58,237,0.15)',
      ring: 'focus:ring-purple-500/20 focus:border-purple-500',
      icon: '👨‍🎓',
      dashboard: '/portal/student/dashboard',
    },
  };

  const c = config[role];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('aitp_token', data.token);
        localStorage.setItem('aitp_user', JSON.stringify(data.user));
        navigate(c.dashboard);
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Server connection failed. Make sure backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${c.gradient} flex items-center justify-center p-6 relative overflow-hidden`}>
      {/* Background Decorative Mesh & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.25]" style={{ background: c.glow }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[130px] opacity-[0.15]" style={{ background: c.glow }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div className="bg-[#0d0e22]/60 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.5)] transition-shadow duration-300">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${c.accent} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md shadow-blue-500/10`}>
              {c.icon}
            </div>
            <div className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase mb-1">
              AiTechPulze Portal
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {c.title}
            </h1>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              {c.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className={`w-full bg-[#060713]/60 hover:bg-[#060713]/90 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-4 transition-all placeholder-slate-500 ${c.ring}`}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={`w-full bg-[#060713]/60 hover:bg-[#060713]/90 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white text-sm focus:outline-none focus:ring-4 transition-all placeholder-slate-500 ${c.ring}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-gradient-to-r ${c.accent} text-white font-bold rounded-xl shadow-md hover:opacity-95 hover:shadow-lg transition-all text-sm disabled:opacity-50 mt-2 active:scale-95 cursor-pointer`}
            >
              {loading ? 'Authenticating...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-500 text-[10px] leading-relaxed font-semibold">
              {role === 'student' ? 'Forgot password? Contact admin at info@aitechpulze.com' : 'Authorized personnel only. Unauthorized access is prohibited.'}
            </p>
          </div>
        </div>

        {/* Back navigation */}
        <div className="text-center mt-6">
          <a href="/" className="text-slate-400 text-xs font-bold hover:text-white transition-colors inline-flex items-center gap-1.5">
            <span>←</span> Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
