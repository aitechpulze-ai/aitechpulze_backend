import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, CapIcon, TeacherIcon, DocIcon, StudentIcon, HomeIcon, CalendarIcon, ClipboardIcon, VideoIcon, ClockIcon, CheckIcon, XIcon, MinusIcon, ArrowDownIcon, LockIcon, UsersIcon, InboxIcon, SchoolIcon, StopIcon } from '../../components/Icons';

import { API_BASE_URL } from '../../config';

const API = `${API_BASE_URL}/api`;

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [meetLink, setMeetLink] = useState('');
  const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', due_date: '', student_id: '' });
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentAttendance, setSelectedStudentAttendance] = useState([]);
  const [selectedStudentSubmissions, setSelectedStudentSubmissions] = useState([]);
  const [selectedStudentSubmissionsId, setSelectedStudentSubmissionsId] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [modalTab, setModalTab] = useState('attendance');
  const [today] = useState(new Date().toISOString().split('T')[0]);
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
    if (!token) { navigate('/portal/mentor'); return; }
    fetchStudents();
    fetchAssignments();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API}/mentor/students`, { headers });
      if (!res.ok) {
        if (res.status === 401 || res.status === 422) {
          localStorage.removeItem('aitp_token');
          localStorage.removeItem('aitp_user');
          navigate('/portal/mentor');
          return;
        }
      }
      const data = await res.json();
      setStudents(data);

      // Fetch today's attendance status for all students
      const attMap = {};
      await Promise.all(data.map(async s => {
        try {
          const aRes = await fetch(`${API}/mentor/attendance/${s.id}`, { headers });
          if (aRes.ok) {
            const records = await aRes.json();
            const todayRec = records.find(r => r.date === today);
            if (todayRec) {
              attMap[s.id] = todayRec.present ? 'present' : 'absent';
            }
          }
        } catch(e) { console.error(e) }
      }));
      setAttendance(attMap);
    } catch(e) { console.error(e) }
  };

  const fetchAssignments = async () => {
    try {
      const res = await fetch(`${API}/mentor/tasks`, { headers });
      if (res.ok) setAssignments(await res.json());
    } catch(e) { console.error(e) }
  };

  const fetchStudentAttendance = async (studentId) => {
    try {
      const res = await fetch(`${API}/mentor/attendance/${studentId}`, { headers });
      if (res.ok) setSelectedStudentAttendance(await res.json());
    } catch(e) { console.error(e) }
  };

  const fetchStudentSubmissions = async (studentId) => {
    try {
      const res = await fetch(`${API}/mentor/students/${studentId}/submissions`, { headers });
      if (res.ok) setSelectedStudentSubmissions(await res.json());
    } catch(e) { console.error(e) }
  };

  const markAttendance = async (studentId, status, targetDate = today) => {
    try {
      const res = await fetch(`${API}/mentor/attendance`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internship_id: studentId,
          date: targetDate,
          present: status === 'present'
        }),
      });
      if (res.ok) {
        if (selectedStudent && selectedStudent.id === studentId) {
          await fetchStudentAttendance(studentId);
        }
        // Update general attendance today state
        if (targetDate === today) {
          setAttendance(prev => ({ ...prev, [studentId]: status }));
        }
        showToast('Attendance marked successfully!', 'success');
      } else {
        const data = await res.json();
        showToast(data.error || 'Failed to mark attendance.', 'error');
      }
    } catch (e) {
      console.error(e);
      showToast('Failed to connect to the server.', 'error');
    }
  };

  const updateMeetLink = async () => {
    const res = await fetch(`${API}/mentor/meet-link`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: meetLink }),
    });
    if (res.ok) {
      showToast('Meet link updated for all your students!', 'success');
    } else {
      showToast('Failed to update meet link.', 'error');
    }
  };

  const createAssignment = async () => {
    setLoading(true);
    const fd = new FormData();
    Object.entries(assignmentForm).forEach(([k, v]) => fd.append(k, v));
    if (assignmentFile) fd.append('file', assignmentFile);
    const res = await fetch(`${API}/mentor/tasks`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    if (res.ok) {
      showToast('Assignment created successfully!', 'success');
      setAssignmentForm({ title: '', description: '', due_date: '', student_id: '' });
      setAssignmentFile(null);
      await fetchAssignments();
    } else {
      const data = await res.json();
      showToast(data.error || 'Failed to create assignment.', 'error');
    }
    setLoading(false);
  };

  const logout = () => { localStorage.clear(); navigate('/portal/mentor'); };

  const maskPhone = (phone) => phone ? phone.slice(0, 3) + '*'.repeat(phone.length - 5) + phone.slice(-2) : '';

  const tabs = ['students', 'attendance', 'meet', 'assignments', 'submissions'];

  return (
    <div className="min-h-screen bg-[#060713] text-white flex">
      {/* Icon-Only Sidebar */}
      <div className="w-16 bg-[#0c0d21]/60 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-5 px-2 gap-5 shadow-[5px_0_35px_rgba(0,0,0,0.4)] min-h-screen">

        {/* Brand Icon */}
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#0c0d21] border border-white/10 flex items-center justify-center mb-2 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <img src="/favicon.png" alt="AiTechPulze" className="w-full h-full object-contain p-1" />
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-white/10" />

        {/* Nav Icons */}
        <nav className="flex flex-col gap-2 flex-grow">
          {[
            ['students', 'My Students', <UsersIcon className="w-5 h-5" />],
            ['attendance', 'Attendance', <CalendarIcon className="w-5 h-5" />],
            ['meet', 'GMeet Link', <VideoIcon className="w-5 h-5" />],
            ['assignments', 'Create Assignment', <ClipboardIcon className="w-5 h-5" />],
            ['submissions', 'Submissions', <InboxIcon className="w-5 h-5" />]
          ].map(([id, label, iconComponent]) => {
            const isActive = tab === id;
            return (
              <div key={id} className="relative group/nav">
                <button onClick={() => setTab(id)}
                  title={label}
                  className={`relative w-11 h-11 rounded-xl transition-all flex items-center justify-center cursor-pointer ${isActive ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/40 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}>
                  {isActive && (
                    <motion.span
                      layoutId="mentorActiveBar"
                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.9)]"
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

        {/* Students Tab */}
        {tab === 'students' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">My Students ({students.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(s => (
                <div key={s.id} onClick={async () => {
                  setSelectedStudent(s);
                  setSelectedStudentAttendance([]);
                  setSelectedStudentSubmissions([]);
                  setModalTab('attendance');
                  await fetchStudentAttendance(s.id);
                  await fetchStudentSubmissions(s.id);
                }} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:bg-[#0d0e22]/70 transition-all cursor-pointer">
                  <div className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                  <div className="text-lg font-extrabold text-white">{s.student?.full_name}</div>
                  <div className="text-xs text-slate-400">{s.student?.email}</div>
                  <div className="text-xs text-slate-500 mt-1">📞 {s.student?.phone ? maskPhone(s.student.phone) : ''}</div>
                  <div className="flex gap-2 mt-3 text-[10px] font-bold">
                    <span className="px-2 py-1 bg-blue-950/40 text-blue-400 rounded-lg border border-blue-900/30">{s.domain}</span>
                    <span className="px-2 py-1 bg-white/5 text-slate-300 rounded-lg border border-white/10">{s.duration}</span>
                    <span className="px-2 py-1 bg-white/5 text-slate-300 rounded-lg border border-white/10">{s.college}</span>
                  </div>
                </div>
              ))}
              {students.length === 0 && <div className="col-span-2 text-center text-slate-500 py-20">No students assigned yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Attendance Tab */}
        {tab === 'attendance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-2 text-white">Student Attendance Sheets</h2>
            <p className="text-slate-400 text-sm mb-8">Select a student to view and mark their daily attendance (Day 1 to 15 / 30).</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(s => {
                return (
                  <div key={s.id} onClick={async () => {
                    setSelectedStudent(s);
                    setSelectedStudentAttendance([]);
                    setSelectedStudentSubmissions([]);
                    setModalTab('attendance');
                    await fetchStudentAttendance(s.id);
                    await fetchStudentSubmissions(s.id);
                  }} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 hover:bg-[#0d0e22]/70 transition-all cursor-pointer flex items-center justify-between shadow-sm">
                    <div>
                      <div className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                      <div className="text-lg font-extrabold text-white">{s.student?.full_name}</div>
                      <div className="text-xs text-slate-400">{s.domain} · {s.duration}</div>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-900/30 flex items-center gap-1">
                      Manage →
                    </span>
                  </div>
                );
              })}
              {students.length === 0 && <div className="col-span-2 text-center text-slate-500 py-20">No students assigned yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Meet Link Tab */}
        {tab === 'meet' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">Today's Google Meet Link</h2>
            <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-8 max-w-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <p className="text-slate-400 text-sm mb-6">Paste today's GMeet link. It will immediately appear as a "Join Meet" button for all your students.</p>
              <input
                type="url"
                value={meetLink}
                onChange={e => setMeetLink(e.target.value)}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm mb-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-600"
              />
              <div className="flex gap-3">
                <button onClick={updateMeetLink} className="flex-grow py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1.5 cursor-pointer">
                  <VideoIcon className="w-4 h-4" /> Publish Meet Link
                </button>
                {meetLink && (
                  <button onClick={async () => {
                    const res = await fetch(`${API}/mentor/meet-link`, {
                      method: 'POST',
                      headers: { ...headers, 'Content-Type': 'application/json' },
                      body: JSON.stringify({ link: '' }),
                    });
                    if (res.ok) {
                      setMeetLink('');
                      showToast('Meeting ended. Student button removed!', 'success');
                    } else {
                      showToast('Failed to end meeting.', 'error');
                    }
                  }} className="px-5 py-3.5 bg-red-950/20 hover:bg-red-950/40 text-red-400 font-bold rounded-xl border border-red-900/30 transition-all text-sm whitespace-nowrap flex items-center gap-1 cursor-pointer">
                    End Meet <StopIcon className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
              <p className="text-slate-500 text-xs mt-4 text-center">All your assigned students will see this link on their dashboards instantly.</p>
            </div>
          </motion.div>
        )}

        {/* Assignments Tab */}
        {tab === 'assignments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">Assignments</h2>
            <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <h3 className="font-extrabold mb-5 text-slate-300">Create New Assignment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Title</label>
                  <input value={assignmentForm.title} onChange={e => setAssignmentForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Description</label>
                  <textarea value={assignmentForm.description} onChange={e => setAssignmentForm(p => ({ ...p, description: e.target.value }))}
                    rows={3} className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Due Date</label>
                  <input type="date" value={assignmentForm.due_date} onChange={e => setAssignmentForm(p => ({ ...p, due_date: e.target.value }))}
                    className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Assign To</label>
                  <select value={assignmentForm.student_id} onChange={e => setAssignmentForm(p => ({ ...p, student_id: e.target.value }))}
                    className="w-full bg-[#060713] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all">
                    <option value="" className="bg-[#060713]">All Students</option>
                    {students.map(s => <option key={s.id} value={s.id} className="bg-[#060713]">{s.student?.full_name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5">Attachment (PDF/Word)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => setAssignmentFile(e.target.files[0])}
                  className="text-xs text-slate-400 file:bg-white/5 file:border-white/10 file:text-slate-300 file:text-xs file:px-3 file:py-2 file:rounded-lg file:cursor-pointer" />
              </div>
              <button onClick={createAssignment} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-md shadow-emerald-500/10 cursor-pointer">
                {loading ? 'Creating...' : 'Create Assignment'}
              </button>
            </div>

            <div className="space-y-3">
              {assignments.map(a => (
                <div key={a.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">{a.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{a.description}</div>
                      <div className="text-xs text-red-400 mt-2 font-bold">Due: {a.due_date}</div>
                      <div className="text-xs text-slate-400 mt-1 font-bold">{a.student_application_id ? `Assigned to specific student` : 'All students'}</div>
                    </div>
                    {a.file_url && <a href={a.file_url} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-xs hover:underline font-bold flex items-center gap-1"><DocIcon className="w-3.5 h-3.5" /> View File</a>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submissions Tab */}
        {tab === 'submissions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-white">Student Assignment Submissions</h2>
            
            {/* Student Selector */}
            <div className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 mb-8 shadow-sm">
              <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1.5 font-bold">Select Student</label>
              <select 
                value={selectedStudentSubmissionsId || ''} 
                onChange={async (e) => {
                  const val = e.target.value;
                  setSelectedStudentSubmissionsId(val);
                  if (val) {
                    await fetchStudentSubmissions(val);
                  } else {
                    setSelectedStudentSubmissions([]);
                  }
                }}
                className="w-full max-w-md bg-[#060713] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-all font-bold"
              >
                <option value="" className="bg-[#060713]">Choose a Student...</option>
                {students.map(s => <option key={s.id} value={s.id} className="bg-[#060713]">{s.student?.full_name} ({s.domain})</option>)}
              </select>
            </div>

            {/* List of submissions for the selected student */}
            {selectedStudentSubmissionsId ? (
              <div className="space-y-4">
                {selectedStudentSubmissions.map(task => (
                  <div key={task.id} className="bg-[#0d0e22]/50 border border-white/10 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-extrabold text-white text-lg">{task.title}</div>
                        <div className="text-xs text-slate-400 mt-1 max-w-2xl">{task.description}</div>
                        {task.file_url && (
                          <a href={task.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 font-bold hover:underline mt-3 inline-flex items-center gap-1">
                            <DocIcon className="w-3.5 h-3.5" /> View Task PDF/Requirements
                          </a>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        task.submission 
                          ? task.submission.status === 'accepted' 
                            ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30'
                            : 'bg-blue-950/20 text-blue-400 border border-blue-900/30'
                          : 'bg-amber-950/20 text-amber-400 border border-amber-900/30'
                      }`}>
                        {task.submission ? task.submission.status : 'PENDING'}
                      </span>
                    </div>

                    {task.submission ? (
                      <div className="mt-4 pt-4 border-t border-white/10 bg-[#060713] p-4 rounded-xl border border-white/10">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Submission Details</div>
                        <div className="text-xs text-slate-300 space-y-1.5 mb-4">
                          {task.submission.github_link && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-500">GitHub:</span>
                              <a href={task.submission.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{task.submission.github_link}</a>
                            </div>
                          )}
                          {task.submission.demo_link && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-500">Demo Link:</span>
                              <a href={task.submission.demo_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{task.submission.demo_link}</a>
                            </div>
                          )}
                          {task.submission.student_notes && (
                            <div>
                              <span className="font-bold text-slate-500">Student Notes:</span> {task.submission.student_notes}
                            </div>
                          )}
                          {task.submission.mentor_feedback && (
                            <div className="bg-[#0d0e22]/50 p-2 rounded-lg text-slate-400 italic mt-2 border border-white/10">
                              <span className="font-bold not-italic text-slate-300">Feedback:</span> "{task.submission.mentor_feedback}"
                            </div>
                          )}
                        </div>

                        {task.submission.submission_attachment_url && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setFilePreview(task.submission.submission_attachment_url)}
                              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-violet-500/10 flex items-center gap-1 cursor-pointer"
                            >
                              👁️ Preview Submitted File
                            </button>
                            <a
                              href={task.submission.submission_attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg border border-white/10 transition-all flex items-center gap-1"
                            >
                              Download <ArrowDownIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-[10px] text-amber-400 font-extrabold mt-3 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/30 inline-flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" /> Awaiting Submission
                      </div>
                    )}
                  </div>
                ))}
                {selectedStudentSubmissions.length === 0 && (
                  <div className="text-center text-slate-500 py-20 bg-[#0d0e22]/50 border border-white/10 rounded-2xl">No assignments assigned to this student's domain yet.</div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-20 bg-[#0d0e22]/50 border border-white/10 rounded-2xl">
                Please select a student from the dropdown to view their assignment submissions.
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Attendance Detail Sheet Modal */}
      <AnimatePresence>
        {selectedStudent && (() => {
          const s = selectedStudent;
          const startDate = s.start_date ? new Date(s.start_date) : null;
          let endDate = s.end_date ? new Date(s.end_date) : null;
          const planDays = s.plan === 'FIFTEEN_DAYS' ? 15 : 30;

          if (s && (!endDate || isNaN(endDate.getTime()) || endDate.getFullYear() < 2000)) {
            if (startDate) {
              endDate = new Date(startDate.getTime());
              endDate.setDate(endDate.getDate() + planDays);
            }
          }

          const totalDays = startDate && endDate ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) : planDays;
          const attendanceDays = [];
          if (startDate) {
            const tempDate = new Date(startDate.getTime());
            for (let i = 0; i < totalDays; i++) {
              const dateStr = tempDate.toISOString().split('T')[0];
              const record = selectedStudentAttendance.find(a => a.date === dateStr);
              attendanceDays.push({
                date: dateStr,
                dayNumber: i + 1,
                status: record ? (record.present ? 'present' : 'absent') : 'unmarked'
              });
              tempDate.setDate(tempDate.getDate() + 1);
            }
          }

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedStudent(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0d0e22] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl text-white"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#060713]">
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                      <StudentIcon className="w-5 h-5 text-slate-400" /> Student Hub: {s.student?.full_name}
                    </h3>
                    <p className="text-xs text-slate-500">{s.student_id} · {s.domain} · {s.duration}</p>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-200 text-xl transition-colors cursor-pointer">✕</button>
                </div>
                
                <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-[#0d0e22]">
                  {/* Left Column: Info & Analytics */}
                  <div className="w-full md:w-80 border-r border-white/10 p-6 bg-[#060713] flex flex-col gap-6 overflow-y-auto">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Intern Info</div>
                      <div className="text-lg font-black text-white">{s.student?.full_name}</div>
                      <div className="text-xs text-slate-400 mt-1">📧 {s.student?.email}</div>
                      <div className="text-xs text-slate-500">📞 {s.student?.phone}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <SchoolIcon className="w-3.5 h-3.5 text-slate-500" /> {s.college}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-2">Internship Analytics</div>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Completed Days</span>
                            <span className="font-bold text-white">{selectedStudentAttendance.length} / {totalDays} Days</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((selectedStudentAttendance.length / totalDays) * 100))}%` }} />
                          </div>
                          <div className="text-[10px] text-emerald-400 font-extrabold mt-1">{Math.min(100, Math.round((selectedStudentAttendance.length / totalDays) * 100))}% Duration Complete</div>
                        </div>

                        {/* Attendance Rate */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Attendance Rate</span>
                            <span className="font-bold text-white">{selectedStudentAttendance.length ? Math.round((selectedStudentAttendance.filter(a => a.present).length / selectedStudentAttendance.length) * 100) : 0}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${selectedStudentAttendance.length ? Math.round((selectedStudentAttendance.filter(a => a.present).length / selectedStudentAttendance.length) * 100) : 0}%` }} />
                          </div>
                          <div className="text-[10px] text-blue-400 font-extrabold mt-1">Based on marked days ({selectedStudentAttendance.filter(a => a.present).length} Present / {selectedStudentAttendance.filter(a => !a.present).length} Absent)</div>
                        </div>
                        
                        {/* Assignments Count */}
                        <div className="bg-[#0d0e22]/50 border border-white/10 rounded-xl p-3 shadow-sm flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-500 font-bold uppercase">Assignments</div>
                            <div className="text-lg font-black text-white">{assignments.filter(a => !a.student_application_id || a.student_application_id === s.id).length}</div>
                          </div>
                          <ClipboardIcon className="w-6 h-6 text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Grid */}
                  <div className="flex-grow p-6 overflow-y-auto bg-[#0d0e22] flex flex-col">
                    <div className="flex border-b border-white/10 mb-6 gap-6">
                      <button
                        onClick={() => setModalTab('attendance')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-1 ${
                          modalTab === 'attendance' ? 'border-emerald-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <CalendarIcon className="w-3.5 h-3.5" /> Attendance
                      </button>
                      <button
                        onClick={() => setModalTab('assignments')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-1 ${
                          modalTab === 'assignments' ? 'border-emerald-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Assignments & Submissions
                      </button>
                    </div>

                    {modalTab === 'attendance' ? (
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Day-wise Attendance Sheets</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {attendanceDays.map(day => (
                            <div key={day.date} className={`border rounded-xl p-3 text-center transition-all ${
                              day.status === 'present' ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400' :
                              day.status === 'absent' ? 'bg-red-950/20 border-red-900/30 text-red-400' :
                              'bg-[#060713] border-white/10 text-slate-500'
                            }`}>
                              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Day {day.dayNumber}</div>
                              <div className="text-xs font-bold text-white mt-0.5">{day.date}</div>
                              <div className="flex justify-center gap-1.5 mt-3">
                                <button
                                  onClick={() => markAttendance(s.id, 'present', day.date)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                    day.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-emerald-900/30'
                                  }`}
                                >
                                  Present
                                </button>
                                <button
                                  onClick={() => markAttendance(s.id, 'absent', day.date)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                    day.status === 'absent' ? 'bg-red-600 text-white' : 'bg-white/5 text-slate-300 hover:bg-red-900/30'
                                  }`}
                                >
                                  Absent
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Assigned Tasks & Submission Status</div>
                        <div className="space-y-4">
                          {selectedStudentSubmissions.map(task => (
                            <div key={task.id} className="border border-white/10 rounded-2xl p-4 bg-[#060713]/50 hover:bg-[#060713]/80 transition-all">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <div className="font-extrabold text-sm text-white">{task.title}</div>
                                  <div className="text-xs text-slate-400 mt-1">{task.description}</div>
                                  {task.file_url && (
                                    <a href={task.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 font-bold hover:underline mt-2 inline-flex items-center gap-1">
                                      <DocIcon className="w-3.5 h-3.5" /> View Task File
                                    </a>
                                  )}
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  task.submission 
                                    ? task.submission.status === 'accepted' 
                                      ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30'
                                      : 'bg-blue-950/20 text-blue-400 border border-blue-900/30'
                                    : 'bg-amber-950/20 text-amber-400 border border-amber-900/30'
                                }`}>
                                  {task.submission ? task.submission.status : 'PENDING'}
                                </span>
                              </div>

                              {task.submission ? (
                                <div className="mt-3 pt-3 border-t border-white/10 bg-[#060713] p-3 rounded-xl border border-white/10">
                                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Submission Details</div>
                                  <div className="text-xs text-slate-300 space-y-1.5">
                                    {task.submission.github_link && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-slate-500">GitHub:</span>
                                        <a href={task.submission.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{task.submission.github_link}</a>
                                      </div>
                                    )}
                                    {task.submission.demo_link && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-slate-500">Demo Link:</span>
                                        <a href={task.submission.demo_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{task.submission.demo_link}</a>
                                      </div>
                                    )}
                                    {task.submission.student_notes && (
                                      <div>
                                        <span className="font-bold text-slate-500">Student Notes:</span> {task.submission.student_notes}
                                      </div>
                                    )}
                                    {task.submission.mentor_feedback && (
                                      <div className="bg-[#0d0e22] p-2 rounded-lg text-slate-400 italic mt-1 border border-white/10">
                                        <span className="font-bold not-italic text-slate-300">Feedback:</span> "{task.submission.mentor_feedback}"
                                      </div>
                                    )}
                                  </div>

                                  {task.submission.submission_attachment_url && (
                                    <div className="mt-3 flex gap-2">
                                      <button
                                        onClick={() => setFilePreview(task.submission.submission_attachment_url)}
                                        className="px-3.5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-violet-500/10 flex items-center gap-1 cursor-pointer"
                                      >
                                        👁️ Preview Submitted File
                                      </button>
                                      <a
                                        href={task.submission.submission_attachment_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-lg border border-white/10 transition-all flex items-center gap-1"
                                      >
                                        Download <ArrowDownIcon className="w-3.5 h-3.5" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-[10px] text-amber-400 font-extrabold mt-2 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/30 inline-flex items-center gap-1">
                                  <ClockIcon className="w-3.5 h-3.5" /> Awaiting Submission
                                </div>
                              )}
                            </div>
                          ))}
                          {selectedStudentSubmissions.length === 0 && (
                            <div className="text-center text-slate-500 py-20">No tasks assigned yet.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
      {/* Submitted File Preview Modal */}
      <AnimatePresence>
        {filePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setFilePreview(null)}
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
                  <DocIcon className="w-4 h-4 text-slate-500" /> Submitted File Preview
                </h3>
                <div className="flex items-center gap-3">
                  <a href={filePreview} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-500 font-bold transition-colors">Open in new tab ↗</a>
                  <button onClick={() => setFilePreview(null)} className="text-slate-400 hover:text-slate-200 text-xl transition-colors cursor-pointer">✕</button>
                </div>
              </div>
              <div className="flex-grow bg-[#060713] flex items-center justify-center overflow-auto p-4">
                {filePreview.match(/\.(jpeg|jpg|gif|png|webp)/i) ? (
                  <img src={filePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg shadow-md" />
                ) : (
                  <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(filePreview)}&embedded=true`}
                    title="File Preview"
                    className="w-full h-full border-0"
                  />
                )}
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
