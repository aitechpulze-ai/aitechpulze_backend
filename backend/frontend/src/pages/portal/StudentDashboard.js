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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center text-lg shadow-lg">
            <StudentIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-800 truncate max-w-[120px]">{user.full_name}</div>
            <div className="text-[10px] text-slate-400">{profile?.student_id || 'Student'}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-[10px] text-slate-400 mb-2">
            <span>Progress</span>
            <span>{daysCompleted}/{totalDays} days</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
          </div>
          <div className="text-xs font-extrabold text-violet-600 mt-2">{progressPct}% Complete</div>
        </div>

        <nav className="space-y-1 flex-grow">
          <button onClick={() => setTab('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab === 'home' ? 'bg-violet-50 text-violet-600 border border-violet-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <HomeIcon className="w-4 h-4" /> Dashboard
          </button>
          <button onClick={() => setTab('attendance')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab === 'attendance' ? 'bg-violet-50 text-violet-600 border border-violet-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <CalendarIcon className="w-4 h-4" /> Attendance
          </button>
          <button onClick={() => setTab('assignments')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab === 'assignments' ? 'bg-violet-50 text-violet-600 border border-violet-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <ClipboardIcon className="w-4 h-4" /> Assignments
          </button>
          <button onClick={() => setTab('certificate')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab === 'certificate' ? 'bg-violet-50 text-violet-600 border border-violet-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
            <CapIcon className="w-4 h-4" /> Certificate
          </button>
        </nav>
        <div className="pt-6 border-t border-slate-200">
          <p className="text-[10px] text-slate-400 mb-3">Forgot password? Contact<br/><span className="text-violet-600">info@aitechpulze.com</span></p>
          <button onClick={logout} className="text-xs text-red-500 hover:text-red-600 font-bold transition-colors">Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-grow p-8 overflow-y-auto">

        {/* Home Tab */}
        {tab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-2 text-slate-800">Welcome back, {user.full_name?.split(' ')[0]}!</h2>
            <p className="text-slate-400 text-sm mb-8">{profile?.domain} Internship · {profile?.duration}</p>

            {/* Meet Link */}
            {meetLink && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Today's Live Class</div>
                    <div className="text-slate-800 font-bold flex items-center gap-1.5">
                      Google Meet Session is Live! <VideoIcon className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <a href={meetLink} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all whitespace-nowrap">
                    Join Meet →
                  </a>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                ['Attendance', `${attendancePct}%`, 'text-emerald-600'],
                ['Days Done', daysCompleted, 'text-blue-600'],
                ['Assignments', assignments.length, 'text-violet-600'],
                ['Pending', assignments.filter(a => !a.submission).length, 'text-amber-600'],
              ].map(([label, val, color]) => (
                <div key={label} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">{label}</div>
                  <div className={`text-2xl font-extrabold ${color}`}>{val}</div>
                </div>
              ))}
            </div>

            {/* Profile Info */}
            {profile && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-4">Your Internship Details</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[['Student ID', profile.student_id], ['Domain', profile.domain], ['Duration', profile.duration], ['College', profile.college], ['Start Date', profile.start_date], ['End Date', profile.end_date || (endDate ? endDate.toISOString().split('T')[0] : '')]].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">{k}</div>
                      <div className="font-bold text-slate-700 mt-0.5">{v}</div>
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
              let icon = <ClockIcon className="w-6 h-6 mx-auto text-slate-300" />;
              let styleClass = 'bg-slate-100/40 border-slate-200 text-slate-300';
              
              if (record) {
                statusText = record.status === 'present' ? 'Present' : 'Absent';
                icon = record.status === 'present' 
                  ? <CheckIcon className="w-6 h-6 mx-auto text-emerald-500" /> 
                  : <XIcon className="w-6 h-6 mx-auto text-red-500" />;
                styleClass = record.status === 'present' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700';
              } else if (tempDate < today) {
                statusText = 'Unmarked';
                icon = <MinusIcon className="w-6 h-6 mx-auto text-slate-400" />;
                styleClass = 'bg-slate-100/70 border-slate-200 text-slate-500';
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
                <h2 className="text-2xl font-extrabold text-slate-800">My Attendance</h2>
                <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Overall</span>
                  <div className={`text-xl font-extrabold ${attendancePct >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>{attendancePct}%</div>
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
                {attendanceDays.length === 0 && <div className="col-span-4 text-center text-slate-400 py-20">No attendance days scheduled.</div>}
              </div>
            </motion.div>
          );
        })()}

        {/* Assignments Tab */}
        {tab === 'assignments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">My Assignments</h2>
            <div className="space-y-4">
              {assignments.map(a => (
                <div key={a.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-extrabold text-slate-800">{a.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{a.description}</p>
                    </div>
                    <span className="text-xs font-bold text-red-500 whitespace-nowrap ml-4">Due: {a.due_date}</span>
                  </div>
                  {a.file_url && (
                    <button
                      onClick={() => handleDownload(a.file_url, `${a.title.replace(/\s+/g, '_')}_assignment.pdf`)}
                      className="text-xs text-blue-600 hover:underline mb-3 block font-bold text-left cursor-pointer bg-transparent border-0 p-0"
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
                        className="text-xs text-slate-500 file:bg-slate-100 file:border-0 file:text-slate-700 file:text-xs file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer file:font-bold flex-grow" />
                      <button onClick={() => submitAssignment(a.id)} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-md shadow-violet-500/20">Submit ↑</button>
                    </div>
                  )}
                </div>
              ))}
              {assignments.length === 0 && <div className="text-center text-slate-400 py-20">No assignments yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Certificate Tab */}
        {tab === 'certificate' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">My Certificate</h2>
            {certificate?.issued ? (
              <div className="max-w-3xl">
                  <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-200 rounded-2xl p-6 text-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-2">
                      <CapIcon className="w-6 h-6 text-violet-600" />
                    </div>
                    <div className="text-slate-800 font-extrabold text-xl mb-1">Your Certificate is Ready!</div>
                    <div className="text-slate-500 text-sm">Certificate ID: <span className="text-violet-600 font-bold">{certificate.certificate_number}</span></div>
                    <div className="text-slate-400 text-[10px] mt-1">Issued on {certificate.issued_date ? new Date(certificate.issued_date).toLocaleDateString() : 'Pending'}</div>
                  </div>

                 <div className="bg-white border border-slate-200/80 rounded-2xl p-5 mb-6 text-sm shadow-sm">
                   {[['Student', certificate.student_name], ['Domain', certificate.domain], ['Duration', certificate.plan === 'FIFTEEN_DAYS' ? '15 Days' : '30 Days'], ['Period', `${certificate.start_date} → ${certificate.end_date}`]].map(([k, v]) => (
                     <div key={k} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                       <span className="text-slate-400">{k}</span>
                       <span className="text-slate-700 font-bold">{v}</span>
                     </div>
                   ))}
                 </div>
                  <button
                    onClick={() => handleDownload(certificate.certificate_url, `AiTechPulze_Certificate_${certificate.certificate_number}.pdf`)}
                    className="w-full text-center py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 hover:opacity-90 transition-all text-sm flex items-center justify-center gap-1.5"
                  >
                    <ArrowDownIcon className="w-4 h-4" /> Download Certificate (PDF)
                  </button>
              </div>
            ) : (
               <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                  <LockIcon className="w-8 h-8 text-slate-400" />
                </div>
                <div className="text-slate-400 font-bold text-lg mb-2">Certificate Not Issued Yet</div>
                <p className="text-slate-300 text-sm">Complete your internship and your mentor/admin will issue your certificate.</p>
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
