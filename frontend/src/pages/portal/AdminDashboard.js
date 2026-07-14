import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CapIcon, TeacherIcon, DocIcon } from '../../components/Icons';
import { API_BASE_URL } from '../../config';
import emailjs from '@emailjs/browser';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const API = `${API_BASE_URL}/api`;

function AnalyticsCharts({ analytics, students, applications }) {
  // Status breakdown for Pie chart
  const statusData = [
    { name: 'Approved', value: analytics.approved || 0, color: '#10b981' },
    { name: 'Pending', value: analytics.pending || 0, color: '#f59e0b' },
    { name: 'Rejected', value: (analytics.total || 0) - (analytics.approved || 0) - (analytics.pending || 0), color: '#ef4444' },
  ].filter(d => d.value > 0);

  // Domain breakdown from students
  const domainMap = {};
  students.forEach(s => {
    const domain = s.domain || 'Other';
    domainMap[domain] = (domainMap[domain] || 0) + 1;
  });
  const domainData = Object.entries(domainMap).map(([name, value]) => ({ name, value }));

  // Plan breakdown
  const planData = [
    { name: '15 Days', value: students.filter(s => s.plan === 'FIFTEEN_DAYS').length, color: '#8b5cf6' },
    { name: '30 Days', value: students.filter(s => s.plan === 'ONE_MONTH').length, color: '#06b6d4' },
  ];

  const DOMAIN_COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0d0e22] border border-white/15 rounded-xl px-4 py-2.5 shadow-xl text-xs">
          <p className="text-slate-400 font-bold mb-1">{label || payload[0]?.name}</p>
          <p className="text-white font-extrabold">{payload[0]?.value} <span className="text-slate-500 font-normal">interns</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Domain Breakdown Bar Chart */}
      <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5">Students by Domain</div>
        {domainData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={domainData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {domainData.map((_, idx) => (
                  <Cell key={idx} fill={DOMAIN_COLORS[idx % DOMAIN_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-slate-600 text-xs">No student data yet</div>
        )}
      </div>

      {/* Status Pie Chart */}
      <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5">Application Status</div>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} formatter={(val) => <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700 }}>{val}</span>} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-slate-600 text-xs">No application data yet</div>
        )}
      </div>

      {/* Plan Breakdown */}
      <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5">Internship Plan Split</div>
        <div className="space-y-4 mt-2">
          {planData.map(p => {
            const total = planData.reduce((a, b) => a + b.value, 0) || 1;
            const pct = Math.round((p.value / total) * 100);
            return (
              <div key={p.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold" style={{ color: p.color }}>{p.name}</span>
                  <span className="text-slate-400 font-bold">{p.value} students · {pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}60` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5">Quick Metrics</div>
        <div className="space-y-3">
          {[
            { label: 'Approval Rate', value: analytics.total ? `${Math.round((analytics.approved / analytics.total) * 100)}%` : '0%', color: 'text-emerald-400' },
            { label: 'Certificate Rate', value: analytics.approved ? `${Math.round(((analytics.certificates_issued || 0) / analytics.approved) * 100)}%` : '0%', color: 'text-violet-400' },
            { label: 'Avg Students/Mentor', value: analytics.mentors ? Math.round((analytics.approved || 0) / analytics.mentors) : 0, color: 'text-blue-400' },
          ].map(m => (
            <div key={m.label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
              <span className="text-slate-400 text-xs font-medium">{m.label}</span>
              <span className={`text-lg font-extrabold ${m.color}`}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



function StatCard({ label, value, color }) {
  return (
    <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-sm">
      <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase mb-2">{label}</div>
      <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [mentorForm, setMentorForm] = useState({ name: '', email: '', password: '', domain: '' });
  const [mentorPhoto, setMentorPhoto] = useState(null);
  const [certFile, setCertFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const token = localStorage.getItem('aitp_token');
  const user = JSON.parse(localStorage.getItem('aitp_user') || '{}');

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) { navigate('/portal/admin'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [appsRes, stuRes, mentRes, anaRes] = await Promise.all([
        fetch(`${API}/admin/applications`, { headers }),
        fetch(`${API}/admin/students`, { headers }),
        fetch(`${API}/admin/mentors`, { headers }),
        fetch(`${API}/admin/analytics`, { headers }),
      ]);
      
      if (!appsRes.ok) {
        if (appsRes.status === 401 || appsRes.status === 422) {
          localStorage.removeItem('aitp_token');
          localStorage.removeItem('aitp_user');
          navigate('/portal/admin');
          return;
        }
      }

      setApplications(await appsRes.json());
      setStudents(await stuRes.json());
      setMentors(await mentRes.json());
      setAnalytics(await anaRes.json());
    } catch (e) {
      console.error(e);
    }
  };

  const approveApp = async (id) => {
    setApprovingId(id);
    const appDetails = applications.find(a => a.id === id);
    try {
      const res = await fetch(`${API}/admin/applications/${id}/approve`, { 
        method: 'POST', 
        headers: { ...headers, 'Content-Type': 'application/json' }, 
        body: JSON.stringify({}) 
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to approve application.', 'error');
      } else {
        showToast('Application approved successfully!', 'success');
        
        // Send Credentials Email via EmailJS
        if (appDetails && data.enrollment_id) {
          try {
            await emailjs.send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_GENERIC,
              {
                subject: `🎉 Your AiTechPulze Internship is Approved!`,
                recipient_email: appDetails.email,
                message_content: `Hi ${appDetails.full_name},\n\nCongratulations! Your internship application has been approved. Here are your Student Portal login credentials:\n\nStudent ID: ${data.enrollment_id}\nUsername: ${data.username}\nPassword: ${data.password}\nDomain: ${appDetails.project_type || 'Web Development'}\nDuration: ${appDetails.estimated_budget <= 15 ? '15 Days' : '1 Month'}\n\nLogin to Your Portal: https://aitechpulze.com/portal/student\n\nIf you have any issues logging in, please reach out to us at info@aitechpulze.com.\n\nBest regards,\nThe AiTechPulze Team`
              },
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );
            console.log('[EMAIL] Internship credentials email sent successfully via EmailJS');
          } catch (emailErr) {
            console.error('[EMAIL] Failed to send credentials email via EmailJS:', emailErr);
          }
        }
      }
    } catch (e) {
      console.error(e);
      showToast('Error connecting to the server.', 'error');
    }
    await fetchAll();
    setApprovingId(null);
  };

  const rejectApp = async (id) => {
    await fetch(`${API}/admin/applications/${id}/reject`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    await fetchAll();
  };

  const addMentor = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(mentorForm).forEach(([k, v]) => fd.append(k, v));
      if (mentorPhoto) fd.append('photo', mentorPhoto);
      const res = await fetch(`${API}/admin/mentors`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Failed to add mentor.', 'error');
        setLoading(false);
        return;
      }
      showToast('Mentor added successfully!', 'success');
      setMentorForm({ name: '', email: '', password: '', domain: '' });
      setMentorPhoto(null);
      await fetchAll();
    } catch (e) {
      console.error(e);
      showToast('Failed to connect to the server.', 'error');
    }
    setLoading(false);
  };

  const issueCertificate = async (studentId) => {
    const file = certFile[studentId];
    if (!file) return showToast('Please select a certificate file first.', 'error');
    const fd = new FormData();
    fd.append('certificate', file);
    const res = await fetch(`${API}/admin/certificates/issue/${studentId}`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    const data = await res.json();
    showToast(`Certificate issued! ID: ${data.cert_id}`, 'success');
  };

  const deleteMentor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    const res = await fetch(`${API}/admin/mentors/${id}`, { method: 'DELETE', headers });
    if (res.ok) {
      showToast('Mentor deleted successfully!', 'success');
      fetchAll();
    } else {
      showToast('Failed to delete mentor.', 'error');
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student and their user account?')) return;
    const res = await fetch(`${API}/admin/students/${id}`, { method: 'DELETE', headers });
    if (res.ok) {
      showToast('Student deleted successfully!', 'success');
      fetchAll();
    } else {
      showToast('Failed to delete student.', 'error');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    const res = await fetch(`${API}/admin/applications/${id}`, { method: 'DELETE', headers });
    if (res.ok) {
      showToast('Application deleted successfully!', 'success');
      fetchAll();
    } else {
      showToast('Failed to delete application.', 'error');
    }
  };

  const exportStudentsCSV = async () => {
    try {
      const res = await fetch(`${API}/admin/students/export`, { headers });
      if (!res.ok) {
        showToast('Failed to export students data.', 'error');
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'students_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      showToast('Error connecting to the server for export.', 'error');
    }
  };

  const logout = () => { localStorage.clear(); navigate('/portal/admin'); };

  const tabs = [
    { id: 'applications', label: 'Applications', badge: analytics.pending },
    { id: 'students', label: 'Students' },
    { id: 'mentors', label: 'Mentors' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#060713] text-white flex">
      {/* Icon-Only Sidebar */}
      <div className="w-16 bg-[#0c0d21]/60 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-5 px-2 gap-5 shadow-[5px_0_35px_rgba(0,0,0,0.4)] min-h-screen">

        {/* Brand Icon */}
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0c0d21] border border-white/10 flex items-center justify-center mb-2 flex-shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          <img src="/favicon.png" alt="AiTechPulze" className="w-full h-full object-contain p-1" />
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10" />

        {/* Nav Icons */}
        <nav className="flex flex-col gap-2 flex-grow">
          {[
            { id: 'applications', label: 'Applications', badge: analytics.pending, icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )},
            { id: 'students', label: 'Students', icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )},
            { id: 'mentors', label: 'Mentors', icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            )},
            { id: 'analytics', label: 'Analytics', icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            )},
          ].map(t => {
            const isActive = tab === t.id;
            return (
              <div key={t.id} className="relative group/nav">
                <button onClick={() => setTab(t.id)}
                  title={t.label}
                  className={`relative w-11 h-11 rounded-xl transition-all flex items-center justify-center cursor-pointer ${isActive ? 'bg-blue-950/30 text-blue-400 border border-blue-900/40 shadow-[inset_0_0_12px_rgba(37,99,235,0.2)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}>
                  {isActive && (
                    <motion.span
                      layoutId="adminActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-blue-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.9)]"
                    />
                  )}
                  {t.icon}
                  {t.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{t.badge}</span>
                  )}
                </button>
                {/* Tooltip */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-white font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
                  {t.label}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom: status + logout */}
        <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/5 w-full">
          <div className="relative group/nav">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mx-auto" />
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-blue-400 font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
              ADMIN_MAIN_01 · LIVE
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
            </div>
          </div>
          <div className="relative group/nav">
            <button onClick={logout} title="Shutdown" className="w-11 h-11 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-red-400 font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
              Shutdown
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-grow p-8 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* Applications Tab */}
          {tab === 'applications' && (
            <motion.div key="apps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-extrabold mb-8 text-white">Student Applications</h2>
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{app.domain} · {app.duration} Days</div>
                        <div className="text-lg font-extrabold text-white">{app.full_name}</div>
                        <div className="text-sm text-slate-400">{app.email} · {app.phone}</div>
                        <div className="text-xs text-slate-500 mt-1">{app.college} · Year {app.year} · {app.department}</div>
                        <div className="text-xs text-slate-500">{app.start_date} → {app.end_date}</div>
                        {app.resume_url && (
                          <button onClick={() => setResumePreview(app.resume_url)} className="text-xs text-blue-400 hover:text-blue-500 mt-2 inline-flex items-center gap-1 transition-colors cursor-pointer bg-blue-950/50 px-3 py-1.5 rounded-lg border border-blue-900/30 font-bold">
                            <DocIcon className="w-3.5 h-3.5" /> View Resume
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'CONVERTED' ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30' : app.status === 'REJECTED' ? 'bg-red-950/20 text-red-400 border border-red-900/30' : 'bg-amber-950/20 text-amber-400 border border-amber-900/30'}`}>
                          {app.status === 'CONVERTED' ? 'APPROVED' : app.status}
                        </span>
                        {app.status === 'NEW' && (
                          <div className="flex gap-2">
                            <button onClick={() => approveApp(app.id)} disabled={approvingId !== null} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 shadow-md shadow-emerald-500/10 cursor-pointer">
                              {approvingId === app.id ? '⏳ Approving...' : '✓ Approve'}
                            </button>
                            <button onClick={() => rejectApp(app.id)} className="px-4 py-2 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-xs font-bold rounded-lg border border-red-900/30 transition-all cursor-pointer">✗ Reject</button>
                          </div>
                        )}
                        <button onClick={() => deleteApplication(app.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-xs font-bold rounded-lg border border-red-900/30 transition-all mt-2 flex items-center gap-1 cursor-pointer">
                          <TrashIcon className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && <div className="text-center text-slate-500 py-20">No applications yet.</div>}
              </div>
            </motion.div>
          )}

          {/* Students Tab */}
          {tab === 'students' && (
            <motion.div key="students" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-white">Active Students</h2>
                <button
                  onClick={exportStudentsCSV}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export to CSV
                </button>
              </div>
              <div className="space-y-4">
                {students.map(s => (
                  <div key={s.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                        <div className="text-lg font-extrabold text-white">{s.student?.full_name}</div>
                        <div className="text-sm text-slate-400">{s.student?.email} · {s.domain}</div>
                        <div className="text-xs text-slate-500">{s.start_date} → {s.end_date} · {s.duration}</div>
                      </div>
                      <div className="flex flex-col gap-3 items-end">
                        <div className="flex gap-2 items-end">
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Issue Certificate</label>
                            <div className="flex gap-2">
                              <input type="file" accept=".pdf" onChange={e => setCertFile(prev => ({ ...prev, [s.id]: e.target.files[0] }))}
                                className="text-xs text-slate-400 file:bg-white/5 file:border-white/10 file:text-slate-300 file:text-xs file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer" />
                              <button onClick={() => issueCertificate(s.id)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-md shadow-violet-500/10 flex items-center gap-1 cursor-pointer">Issue <CapIcon className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-1">Assign Mentor</label>
                             <select
                               value={s.mentor?.id || ''}
                               onChange={async e => {
                                 const res = await fetch(`${API}/admin/students/${s.id}/assign-mentor`, { method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ mentor_id: e.target.value }) });
                                 if (res.ok) {
                                   showToast('Mentor assigned successfully!', 'success');
                                 } else {
                                   const data = await res.json();
                                   showToast(data.error || 'Failed to assign mentor.', 'error');
                                 }
                                 await fetchAll();
                                }}
                               className="bg-[#060713] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                             >
                               <option value="" className="bg-[#060713]">Select Mentor</option>
                               {mentors.map(m => <option key={m.id} value={m.id} className="bg-[#060713]">{m.name} ({m.domain})</option>)}
                             </select>
                          </div>
                        </div>
                        <button onClick={() => deleteStudent(s.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-xs font-bold rounded-lg border border-red-900/30 transition-all flex items-center gap-1 cursor-pointer">
                          <TrashIcon className="w-3.5 h-3.5" /> Delete Student
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {students.length === 0 && <div className="text-center text-slate-500 py-20">No approved students yet.</div>}
              </div>
            </motion.div>
          )}

          {/* Mentors Tab */}
          {tab === 'mentors' && (
            <motion.div key="mentors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-extrabold mb-8 text-white">Mentors</h2>
              <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                <h3 className="font-extrabold mb-5 text-slate-300">Add New Mentor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[['name', 'Full Name'], ['email', 'Email'], ['password', 'Password'], ['domain', 'Domain']].map(([f, l]) => (
                    <div key={f}>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">{l}</label>
                      <input value={mentorForm[f]} onChange={e => setMentorForm(prev => ({ ...prev, [f]: e.target.value }))}
                        className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:bg-[#0d0e22] focus:border-blue-500 transition-all placeholder-slate-600" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Profile Photo</label>
                  <input type="file" accept="image/*" onChange={e => setMentorPhoto(e.target.files[0])}
                    className="text-xs text-slate-400 file:bg-white/5 file:border-white/10 file:text-slate-300 file:text-xs file:px-3 file:py-2 file:rounded-lg file:cursor-pointer" />
                </div>
                <button onClick={addMentor} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-md shadow-blue-500/20 cursor-pointer">
                  {loading ? 'Adding...' : 'Add Mentor'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentors.map(m => (
                  <div key={m.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-900 mx-auto mb-3 border border-white/10 flex items-center justify-center">
                      {m.photo_url ? <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" /> : <TeacherIcon className="w-8 h-8 text-slate-500" />}
                    </div>
                    <div className="font-extrabold text-white">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.email}</div>
                    <div className="text-xs text-blue-400 font-bold mt-1">{m.domain}</div>
                    <button onClick={() => deleteMentor(m.id)} className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 text-xs font-bold rounded-lg border border-red-900/30 transition-all mt-3 w-full flex items-center justify-center gap-1 cursor-pointer">
                      <TrashIcon className="w-3.5 h-3.5" /> Delete Mentor
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {tab === 'analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-extrabold mb-8 text-white">Analytics Overview</h2>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Total Applications', value: analytics.total || 0, color: 'text-white', glow: 'shadow-white/5', border: 'border-white/10' },
                  { label: 'Approved Interns', value: analytics.approved || 0, color: 'text-emerald-400', glow: 'shadow-emerald-500/10', border: 'border-emerald-900/30' },
                  { label: 'Pending Review', value: analytics.pending || 0, color: 'text-amber-400', glow: 'shadow-amber-500/10', border: 'border-amber-900/30' },
                  { label: 'Certificates Issued', value: analytics.certificates_issued || 0, color: 'text-violet-400', glow: 'shadow-violet-500/10', border: 'border-violet-900/30' },
                  { label: 'Active Mentors', value: analytics.mentors || 0, color: 'text-blue-400', glow: 'shadow-blue-500/10', border: 'border-blue-900/30' },
                ].map(s => (
                  <div key={s.label} className={`bg-[#0d0e22]/50 border ${s.border} rounded-2xl p-5 shadow-sm ${s.glow}`}>
                    <div className="text-slate-500 text-[9px] font-bold tracking-widest uppercase mb-2">{s.label}</div>
                    <div className={`text-3xl font-extrabold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <AnalyticsCharts analytics={analytics} students={students} applications={applications} />
            </motion.div>
          )}


        </AnimatePresence>
      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {resumePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setResumePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d0e22] border border-white/10 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl text-white"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#060713]">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <DocIcon className="w-4 h-4 text-slate-500" /> Resume Preview
                </h3>
                <div className="flex items-center gap-3">
                  <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-500 font-bold transition-colors">Open in new tab ↗</a>
                  <button onClick={() => setResumePreview(null)} className="text-slate-400 hover:text-slate-200 text-xl transition-colors cursor-pointer">✕</button>
                </div>
              </div>
              <div className="flex-grow">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(resumePreview)}&embedded=true`}
                  title="Resume Preview"
                  className="w-full h-full border-0"
                  style={{ background: '#060713' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0d0e22]/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl max-w-sm pointer-events-auto text-white"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
              toast.type === 'success' ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/20 text-red-400 border border-red-900/30'
            }`}>
              {toast.type === 'success' ? '✓' : '✗'}
            </div>
            <div className="flex-grow pr-2">
              <div className="text-xs font-extrabold text-white">
                {toast.type === 'success' ? 'Success' : 'Error'}
              </div>
              <div className="text-[11px] font-medium text-slate-400 mt-0.5">{toast.message}</div>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-200 text-xs transition-colors p-1 cursor-pointer">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
