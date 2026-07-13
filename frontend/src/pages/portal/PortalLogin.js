import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

export default function PortalLogin({ role }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const config = {
    admin: {
      title: 'Admin Control Center',
      subtitle: 'Manage students, mentors & internship programs.',
      gradient: 'from-slate-50 via-blue-50/30 to-slate-100/80',
      accent: 'from-blue-600 to-indigo-600',
      glow: 'rgba(37,99,235,0.18)',
      ring: 'focus:ring-blue-100/60 focus:border-blue-500',
      icon: '👑',
      dashboard: '/portal/admin/dashboard',
    },
    mentor: {
      title: 'Mentor Dashboard',
      subtitle: 'Guide your students, manage attendance & assignments.',
      gradient: 'from-slate-50 via-emerald-50/20 to-slate-100/80',
      accent: 'from-emerald-600 to-teal-600',
      glow: 'rgba(16,185,129,0.15)',
      ring: 'focus:ring-emerald-100/60 focus:border-emerald-500',
      icon: '👨‍🏫',
      dashboard: '/portal/mentor/dashboard',
    },
    student: {
      title: 'Student Portal',
      subtitle: 'Track your progress, assignments & certificates.',
      gradient: 'from-slate-50 via-purple-50/20 to-slate-100/80',
      accent: 'from-violet-600 to-purple-600',
      glow: 'rgba(124,58,237,0.15)',
      ring: 'focus:ring-purple-100/60 focus:border-purple-500',
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
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-70" style={{ background: c.glow }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[130px] opacity-40" style={{ background: c.glow }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.35]" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)', 
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
        <div className="bg-white/70 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)] transition-shadow duration-300">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${c.accent} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-md shadow-blue-500/10`}>
              {c.icon}
            </div>
            <div className="text-slate-400 text-[10px] font-extrabold tracking-widest uppercase mb-1">
              AiTechPulze Portal
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              {c.title}
            </h1>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
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
                className={`w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-4 transition-all placeholder-slate-400 ${c.ring}`}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-4 transition-all placeholder-slate-400 ${c.ring}`}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-red-600 text-xs font-semibold flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-gradient-to-r ${c.accent} text-white font-bold rounded-xl shadow-md hover:opacity-95 hover:shadow-lg transition-all text-sm disabled:opacity-50 mt-2 active:scale-95`}
            >
              {loading ? 'Authenticating...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-[10px] leading-relaxed font-semibold">
              {role === 'student' ? 'Forgot password? Contact admin at info@aitechpulze.com' : 'Authorized personnel only. Unauthorized access is prohibited.'}
            </p>
          </div>
        </div>

        {/* Back navigation */}
        <div className="text-center mt-6">
          <a href="/" className="text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors inline-flex items-center gap-1.5">
            <span>←</span> Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
