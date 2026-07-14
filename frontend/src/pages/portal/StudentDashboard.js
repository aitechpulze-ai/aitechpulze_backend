import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CapIcon, TeacherIcon, DocIcon, StudentIcon, HomeIcon, CalendarIcon, ClipboardIcon, VideoIcon, ClockIcon, CheckIcon, XIcon, MinusIcon, ArrowDownIcon, LockIcon } from '../../components/Icons';

import { API_BASE_URL } from '../../config';

const API = `${API_BASE_URL}/api`;

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('home');
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [meetLink, setMeetLink] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [submissionFiles, setSubmissionFiles] = useState({});
  const [toast, setToast] = useState(null);
  const [certPreview, setCertPreview] = useState(null);


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
    if (!token) { navigate('/portal/student'); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [profRes, attRes, meetRes, assRes, certRes] = await Promise.all([
        fetch(`${API}/student/profile`, { headers }),
        fetch(`${API}/student/attendance`, { headers }),
        fetch(`${API}/student/meet-link`, { headers }),
        fetch(`${API}/student/tasks`, { headers }),
        fetch(`${API}/student/certificate`, { headers }),
      ]);
      
      if (!profRes.ok) {
        if (profRes.status === 401 || profRes.status === 422) {
          localStorage.removeItem('aitp_token');
          localStorage.removeItem('aitp_user');
          navigate('/portal/student');
          return;
        }
      }

      setProfile(await profRes.json());
      setAttendance(await attRes.json());
      const meetData = await meetRes.json();
      setMeetLink(meetData.link);
      setAssignments(await assRes.json());
      setCertificate(await certRes.json());
    } catch(e) { console.error(e) }
  };

  const submitAssignment = async (assignmentId) => {
    const file = submissionFiles[assignmentId];
    if (!file) return showToast('Please select a file to upload.', 'error');
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${API}/student/tasks/${assignmentId}/submit`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (res.ok) {
        showToast('Assignment submitted successfully!', 'success');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to submit assignment.', 'error');
      }
    } catch (e) {
      showToast('Error connecting to the server.', 'error');
    }
    await fetchAll();
  };

  const logout = () => { localStorage.clear(); navigate('/portal/student'); };

  const getDownloadUrl = (url) => {
    if (!url) return '';
    if (url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error(e);
      // Fallback
      window.open(getDownloadUrl(url), '_blank');
    }
  };

  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendancePct = attendance.length ? Math.round((presentCount / attendance.length) * 100) : 0;

  // Calculate progress
  const startDate = profile && profile.start_date ? new Date(profile.start_date) : null;
  let endDate = profile && profile.end_date ? new Date(profile.end_date) : null;
  
  // Fallback if end_date is null/invalid
  if (profile && (!endDate || isNaN(endDate.getTime()) || endDate.getFullYear() < 2000)) {
    const days = profile.plan === 'FIFTEEN_DAYS' ? 15 : 30;
    if (startDate) {
      endDate = new Date(startDate.getTime());
      endDate.setDate(endDate.getDate() + days);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (startDate) startDate.setHours(0, 0, 0, 0);
  if (endDate) endDate.setHours(0, 0, 0, 0);

  const totalDays = startDate && endDate ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) : (profile?.plan === 'FIFTEEN_DAYS' ? 15 : 30);
  const daysCompleted = Math.min(attendance.length, totalDays);
  const progressPct = totalDays ? Math.round((daysCompleted / totalDays) * 100) : 0;

  const statusColor = (status) => {
    if (status === 'accepted') return 'text-emerald-700 bg-emerald-50 border-emerald-100';
    if (status === 'changes_requested') return 'text-amber-700 bg-amber-50 border-amber-100';
    return 'text-blue-700 bg-blue-50 border-blue-100';
  };

  return (
    <div className="min-h-screen bg-[#060713] text-white flex">
      {/* Icon-Only Sidebar */}
      <div className="w-16 bg-[#0c0d21]/60 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-5 px-2 gap-5 shadow-[5px_0_35px_rgba(0,0,0,0.4)] min-h-screen">

        {/* Brand Icon */}
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0c0d21] border border-white/10 flex items-center justify-center mb-2 flex-shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <img src="/favicon.png" alt="AiTechPulze" className="w-full h-full object-contain p-1" />
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10" />

        {/* Nav Icons */}
        <nav className="flex flex-col gap-2 flex-grow">
          {[
            ['home', 'Dashboard', <HomeIcon className="w-5 h-5" />],
            ['attendance', 'Attendance', <CalendarIcon className="w-5 h-5" />],
            ['assignments', 'Assignments', <ClipboardIcon className="w-5 h-5" />],
            ['certificate', 'Certificate', <CapIcon className="w-5 h-5" />],
          ].map(([id, label, iconComponent]) => {
            const isActive = tab === id;
            return (
              <div key={id} className="relative group/nav">
                <button onClick={() => setTab(id)}
                  title={label}
                  className={`relative w-11 h-11 rounded-xl transition-all flex items-center justify-center cursor-pointer ${isActive ? 'bg-violet-950/30 text-violet-400 border border-violet-900/40 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}>
                  {isActive && (
                    <motion.span
                      layoutId="studentActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-violet-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.9)]"
                    />
                  )}
                  {iconComponent}
                </button>
                {/* Tooltip */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-white font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
                  {label}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom: status + logout */}
        <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/5 w-full">
          <div className="relative group/nav">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mx-auto" />
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-emerald-400 font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
              SECURE NODE: ACTIVE
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
            </div>
          </div>
          <div className="relative group/nav">
            <button onClick={logout} title="Disconnect" className="w-11 h-11 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0c0d21] border border-white/15 rounded-lg text-[11px] text-red-400 font-bold whitespace-nowrap opacity-0 group-hover/nav:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl z-50">
              Disconnect
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0c0d21]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-grow p-8 overflow-y-auto">

        {/* Home Tab */}
        {tab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-2 text-white">Welcome back, {user.full_name?.split(' ')[0]}!</h2>
            <p className="text-slate-400 text-sm mb-8">{profile?.domain} Internship · {profile?.duration}</p>

            {/* Meet Link */}
            {meetLink && (
              <div className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Today's Live Class</div>
                    <div className="text-white font-bold flex items-center gap-1.5">
                      Google Meet Session is Live! <VideoIcon className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <a href={meetLink} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all whitespace-nowrap cursor-pointer">
                    Join Meet →
                  </a>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                ['Attendance', `${attendancePct}%`, 'text-emerald-400'],
                ['Days Done', daysCompleted, 'text-blue-400'],
                ['Assignments', assignments.length, 'text-violet-400'],
                ['Pending', assignments.filter(a => !a.submission).length, 'text-amber-400'],
              ].map(([label, val, color]) => (
                <div key={label} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</div>
                  <div className={`text-2xl font-extrabold ${color}`}>{val}</div>
                </div>
              ))}
            </div>

            {/* Profile Info */}
            {profile && (
              <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-sm">
                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Your Internship Details</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[['Student ID', profile.student_id], ['Domain', profile.domain], ['Duration', profile.duration], ['College', profile.college], ['Start Date', profile.start_date], ['End Date', profile.end_date || (endDate ? endDate.toISOString().split('T')[0] : '')]].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">{k}</div>
                      <div className="font-bold text-white mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Attendance Tab */}
        {tab === 'attendance' && (() => {
          const attendanceDays = [];
          if (startDate && endDate) {
            const tempDate = new Date(startDate.getTime());
            for (let i = 0; i < totalDays; i++) {
              const dateStr = tempDate.toISOString().split('T')[0];
              const record = attendance.find(a => a.date === dateStr);
              
              let statusText = 'Upcoming';
              let icon = <ClockIcon className="w-6 h-6 mx-auto text-slate-500" />;
              let styleClass = 'bg-[#0d0e22]/20 border-white/5 text-slate-500';
              
              if (record) {
                statusText = record.status === 'present' ? 'Present' : 'Absent';
                icon = record.status === 'present' 
                  ? <CheckIcon className="w-6 h-6 mx-auto text-emerald-400" /> 
                  : <XIcon className="w-6 h-6 mx-auto text-red-400" />;
                styleClass = record.status === 'present' ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' : 'bg-red-950/20 border-red-900/30 text-red-400';
              } else if (tempDate < today) {
                statusText = 'Unmarked';
                icon = <MinusIcon className="w-6 h-6 mx-auto text-slate-400" />;
                styleClass = 'bg-slate-900/40 border-white/5 text-slate-400';
              }
              
              attendanceDays.push({
                id: dateStr,
                dayNumber: i + 1,
                date: dateStr,
                status: statusText,
                icon,
                styleClass
              });
              tempDate.setDate(tempDate.getDate() + 1);
            }
          }

          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-white">My Attendance</h2>
                <div className="bg-[#0d0e22]/50 border border-white/10 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Overall</span>
                  <div className={`text-xl font-extrabold ${attendancePct >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{attendancePct}%</div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {attendanceDays.map(day => (
                  <div key={day.id} className={`rounded-xl border p-4 text-center transition-all ${day.styleClass}`}>
                    <div className="text-xs font-bold opacity-60 uppercase tracking-wider mb-1">Day {day.dayNumber}</div>
                    <div className="mb-1 flex justify-center">{day.icon}</div>
                    <div className="text-xs font-bold">{day.date}</div>
                    <div className="text-[10px] font-bold mt-1 uppercase tracking-widest">{day.status}</div>
                  </div>
                ))}
                {attendanceDays.length === 0 && <div className="col-span-4 text-center text-slate-500 py-20">No attendance days scheduled.</div>}
              </div>
            </motion.div>
          );
        })()}

        {/* Assignments Tab */}
        {tab === 'assignments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">My Assignments</h2>
            <div className="space-y-4">
              {assignments.map(a => (
                <div key={a.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-extrabold text-white">{a.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{a.description}</p>
                    </div>
                    <span className="text-xs font-bold text-red-400 whitespace-nowrap ml-4">Due: {a.due_date}</span>
                  </div>
                  {a.file_url && (
                    <button
                      onClick={() => handleDownload(a.file_url, `${a.title.replace(/\s+/g, '_')}_assignment.pdf`)}
                      className="text-xs text-blue-400 hover:underline mb-3 block font-bold text-left cursor-pointer bg-transparent border-0 p-0"
                    >
                      <DocIcon className="w-3.5 h-3.5" /> Download Assignment File
                    </button>
                  )}

                  {a.submission ? (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${statusColor(a.submission.status)}`}>
                      {a.submission.status === 'accepted' ? '✓ Accepted' : a.submission.status === 'changes_requested' ? '↺ Changes Requested' : <span className="flex items-center gap-1"><ClockIcon className="w-3.5 h-3.5" /> Submitted</span>}
                      {a.submission.mentor_feedback && <span className="text-slate-400 font-normal">— {a.submission.mentor_feedback}</span>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mt-3">
                      <input type="file" accept=".pdf,.doc,.docx" onChange={e => setSubmissionFiles(prev => ({ ...prev, [a.id]: e.target.files[0] }))}
                        className="text-xs text-slate-400 file:bg-white/5 file:border-white/10 file:text-slate-300 file:text-xs file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer file:font-bold flex-grow" />
                      <button onClick={() => submitAssignment(a.id)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-md shadow-violet-500/20 cursor-pointer">Submit ↑</button>
                    </div>
                  )}
                </div>
              ))}
              {assignments.length === 0 && <div className="text-center text-slate-500 py-20">No assignments yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Certificate Tab */}
        {tab === 'certificate' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">My Certificate</h2>
            {certificate?.issued ? (
              <div className="max-w-3xl">
                {/* Success Banner */}
                <div className="bg-gradient-to-br from-violet-950/40 to-purple-950/40 border border-violet-900/30 rounded-2xl p-6 text-center mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(rgba(139,92,246,0.07) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-14 h-14 rounded-full bg-violet-950/30 border border-violet-900/30 flex items-center justify-center mx-auto mb-3"
                    >
                      <CapIcon className="w-7 h-7 text-violet-400" />
                    </motion.div>
                    <div className="text-white font-extrabold text-xl mb-1">🎉 Your Certificate is Ready!</div>
                    <div className="text-slate-400 text-sm">Certificate ID: <span className="text-violet-400 font-bold font-mono">{certificate.certificate_number}</span></div>
                    <div className="text-slate-500 text-[10px] mt-1 font-mono">
                      Issued on {certificate.issued_date ? new Date(certificate.issued_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending'}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 mb-6 text-sm shadow-sm">
                  {[['Student', certificate.student_name], ['Domain', certificate.domain], ['Duration', certificate.plan === 'FIFTEEN_DAYS' ? '15 Days' : '30 Days'], ['Period', `${certificate.start_date} → ${certificate.end_date}`]].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2.5 border-b border-white/10 last:border-0">
                      <span className="text-slate-400 font-medium">{k}</span>
                      <span className="text-white font-bold">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setCertPreview(certificate.certificate_url)}
                    className="flex-1 py-3.5 bg-[#0d0e22]/50 border border-violet-900/30 hover:border-violet-500/50 text-violet-400 hover:text-violet-300 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview Certificate
                  </button>
                  <button
                    onClick={() => handleDownload(certificate.certificate_url, `AiTechPulze_Certificate_${certificate.certificate_number}.pdf`)}
                    className="flex-1 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ArrowDownIcon className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>
            ) : (
               <div className="text-center py-20 bg-[#0d0e22]/30 border border-white/5 rounded-3xl p-8">
                <div className="w-16 h-16 rounded-full bg-[#060713] flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <LockIcon className="w-8 h-8 text-slate-500" />
                </div>
                <div className="text-white font-bold text-lg mb-2">Certificate Not Issued Yet</div>
                <p className="text-slate-400 text-sm">Complete your internship and your mentor/admin will issue your certificate.</p>
              </div>
            )}
          </motion.div>
        )}


      </div>
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

      {/* Certificate PDF Preview Modal */}
      <AnimatePresence>
        {certPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setCertPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d0e22] border border-white/10 rounded-2xl w-full max-w-4xl h-[88vh] flex flex-col overflow-hidden shadow-2xl text-white"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#060713]">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <CapIcon className="w-4 h-4 text-violet-400" />
                  Certificate Preview
                </h3>
                <div className="flex items-center gap-3">
                  <a href={certPreview} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-400 hover:text-violet-300 font-bold transition-colors">Open in tab ↗</a>
                  <button onClick={() => handleDownload(certPreview, 'AiTechPulze_Certificate.pdf')} className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors">⬇ Download</button>
                  <button onClick={() => setCertPreview(null)} className="text-slate-400 hover:text-slate-200 text-xl transition-colors cursor-pointer">✕</button>
                </div>
              </div>
              <div className="flex-grow bg-[#060713]">
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(certPreview)}&embedded=true`}
                  title="Certificate Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
