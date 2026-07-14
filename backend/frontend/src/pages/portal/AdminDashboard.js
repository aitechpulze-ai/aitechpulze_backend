import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CapIcon, TeacherIcon, DocIcon } from '../../components/Icons';

import { API_BASE_URL } from '../../config';

const API = `${API_BASE_URL}/api`;

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
      <div className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-2">{label}</div>
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 min-h-screen">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-lg">AT</div>
          <div>
            <div className="text-xs font-extrabold text-slate-800">AiTechPulze</div>
            <div className="text-[10px] text-slate-400">Admin Panel</div>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-sm font-bold transition-all ${tab === t.id ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
              {t.label}
              {t.badge > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{t.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-200">
          <div className="text-[10px] text-slate-400 mb-1">Logged in as</div>
          <div className="text-xs font-bold text-slate-800">{user.full_name}</div>
          <button onClick={logout} className="mt-3 text-xs text-red-500 hover:text-red-600 font-bold transition-colors">Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-grow p-8 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* Applications Tab */}
          {tab === 'applications' && (
            <motion.div key="apps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Student Applications</h2>
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{app.domain} · {app.duration} Days</div>
                        <div className="text-lg font-extrabold text-slate-800">{app.full_name}</div>
                        <div className="text-sm text-slate-500">{app.email} · {app.phone}</div>
                        <div className="text-xs text-slate-400 mt-1">{app.college} · Year {app.year} · {app.department}</div>
                        <div className="text-xs text-slate-400">{app.start_date} → {app.end_date}</div>
                        {app.resume_url && (
                          <button onClick={() => setResumePreview(app.resume_url)} className="text-xs text-blue-600 hover:text-blue-700 mt-2 inline-flex items-center gap-1 transition-colors cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 font-bold">
                            <DocIcon className="w-3.5 h-3.5" /> View Resume
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${app.status === 'CONVERTED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                          {app.status === 'CONVERTED' ? 'APPROVED' : app.status}
                        </span>
                        {app.status === 'NEW' && (
                          <div className="flex gap-2">
                            <button onClick={() => approveApp(app.id)} disabled={approvingId !== null} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50 shadow-md shadow-emerald-500/10">
                              {approvingId === app.id ? '⏳ Approving...' : '✓ Approve'}
                            </button>
                            <button onClick={() => rejectApp(app.id)} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-100 transition-all">✗ Reject</button>
                          </div>
                        )}
                        <button onClick={() => deleteApplication(app.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-100 transition-all mt-2 flex items-center gap-1">
                          <TrashIcon className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && <div className="text-center text-slate-400 py-20">No applications yet.</div>}
              </div>
            </motion.div>
          )}

          {/* Students Tab */}
          {tab === 'students' && (
            <motion.div key="students" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-slate-800">Active Students</h2>
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
                  <div key={s.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                        <div className="text-lg font-extrabold text-slate-800">{s.student?.full_name}</div>
                        <div className="text-sm text-slate-500">{s.student?.email} · {s.domain}</div>
                        <div className="text-xs text-slate-400">{s.start_date} → {s.end_date} · {s.duration}</div>
                      </div>
                      <div className="flex flex-col gap-3 items-end">
                        <div className="flex gap-2 items-end">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Issue Certificate</label>
                            <div className="flex gap-2">
                              <input type="file" accept=".pdf" onChange={e => setCertFile(prev => ({ ...prev, [s.id]: e.target.files[0] }))}
                                className="text-xs text-slate-500 file:bg-slate-100 file:border-0 file:text-slate-700 file:text-xs file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer" />
                              <button onClick={() => issueCertificate(s.id)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-md shadow-violet-500/10 flex items-center gap-1">Issue <CapIcon className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">Assign Mentor</label>
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
                               className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-xs focus:outline-none focus:border-blue-500"
                             >
                               <option value="">Select Mentor</option>
                               {mentors.map(m => <option key={m.id} value={m.id}>{m.name} ({m.domain})</option>)}
                             </select>
                          </div>
                        </div>
                        <button onClick={() => deleteStudent(s.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-100 transition-all flex items-center gap-1">
                          <TrashIcon className="w-3.5 h-3.5" /> Delete Student
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {students.length === 0 && <div className="text-center text-slate-400 py-20">No approved students yet.</div>}
              </div>
            </motion.div>
          )}

          {/* Mentors Tab */}
          {tab === 'mentors' && (
            <motion.div key="mentors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Mentors</h2>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
                <h3 className="font-extrabold mb-5 text-slate-700">Add New Mentor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[['name', 'Full Name'], ['email', 'Email'], ['password', 'Password'], ['domain', 'Domain']].map(([f, l]) => (
                    <div key={f}>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">{l}</label>
                      <input value={mentorForm[f]} onChange={e => setMentorForm(prev => ({ ...prev, [f]: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all placeholder-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Profile Photo</label>
                  <input type="file" accept="image/*" onChange={e => setMentorPhoto(e.target.files[0])}
                    className="text-xs text-slate-500 file:bg-slate-100 file:border-0 file:text-slate-700 file:text-xs file:px-3 file:py-2 file:rounded-lg file:cursor-pointer" />
                </div>
                <button onClick={addMentor} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-md shadow-blue-500/20">
                  {loading ? 'Adding...' : 'Add Mentor'}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mentors.map(m => (
                  <div key={m.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 mx-auto mb-3 border border-slate-200 flex items-center justify-center">
                      {m.photo_url ? <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" /> : <TeacherIcon className="w-8 h-8 text-slate-400" />}
                    </div>
                    <div className="font-extrabold text-slate-800">{m.name}</div>
                    <div className="text-xs text-slate-400">{m.email}</div>
                    <div className="text-xs text-blue-600 font-bold mt-1">{m.domain}</div>
                    <button onClick={() => deleteMentor(m.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-100 transition-all mt-3 w-full flex items-center justify-center gap-1">
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
              <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Analytics Overview</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard label="Total Applications" value={analytics.total || 0} color="text-slate-700" />
                <StatCard label="Approved Interns" value={analytics.approved || 0} color="text-emerald-600" />
                <StatCard label="Pending Review" value={analytics.pending || 0} color="text-amber-600" />
                <StatCard label="Certificates Issued" value={analytics.certificates_issued || 0} color="text-violet-600" />
                <StatCard label="Active Mentors" value={analytics.mentors || 0} color="text-blue-600" />
              </div>
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setResumePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                  <DocIcon className="w-4 h-4 text-slate-500" /> Resume Preview
                </h3>
                <div className="flex items-center gap-3">
                  <a href={resumePreview} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 font-bold transition-colors">Open in new tab ↗</a>
                  <button onClick={() => setResumePreview(null)} className="text-slate-400 hover:text-slate-600 text-xl transition-colors">✕</button>
                </div>
              </div>
              <div className="flex-grow">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(resumePreview)}&embedded=true`}
                  title="Resume Preview"
                  className="w-full h-full border-0"
                  style={{ background: '#f8fafc' }}
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
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-xl shadow-slate-100/50 max-w-sm pointer-events-auto"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
              toast.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {toast.type === 'success' ? '✓' : '✗'}
            </div>
            <div className="flex-grow pr-2">
              <div className="text-xs font-extrabold text-slate-800">
                {toast.type === 'success' ? 'Success' : 'Error'}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">{toast.message}</div>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 text-xs transition-colors p-1 cursor-pointer">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
