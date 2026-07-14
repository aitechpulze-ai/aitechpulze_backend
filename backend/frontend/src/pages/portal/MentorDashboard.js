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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center text-lg shadow-lg border border-slate-200">
            {user.photo_url ? <img src={user.photo_url} alt={user.full_name} className="w-full h-full object-cover" /> : <TeacherIcon className="w-6 h-6 text-slate-400" />}
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-800">Mentor Panel</div>
            <div className="text-[10px] text-slate-400">{user.full_name}</div>
            {user.domain && <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">{user.domain}</div>}
          </div>
        </div>
        <nav className="space-y-1 flex-grow">
          {[
            ['students', 'My Students', <UsersIcon className="w-4 h-4" />],
            ['attendance', 'Attendance', <CalendarIcon className="w-4 h-4" />],
            ['meet', 'GMeet Link', <VideoIcon className="w-4 h-4" />],
            ['assignments', 'Create Assignment', <ClipboardIcon className="w-4 h-4" />],
            ['submissions', 'Submissions', <InboxIcon className="w-4 h-4" />]
          ].map(([id, label, iconComponent]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${tab === id ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
              {iconComponent} {label}
            </button>
          ))}
        </nav>
        <div className="pt-6 border-t border-slate-200">
          <button onClick={logout} className="text-xs text-red-500 hover:text-red-600 font-bold transition-colors">Logout</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-grow p-8 overflow-y-auto">

        {/* Students Tab */}
        {tab === 'students' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">My Students ({students.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students.map(s => (
                <div key={s.id} onClick={async () => {
                  setSelectedStudent(s);
                  setSelectedStudentAttendance([]);
                  setSelectedStudentSubmissions([]);
                  setModalTab('attendance');
                  await fetchStudentAttendance(s.id);
                  await fetchStudentSubmissions(s.id);
                }} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                  <div className="text-lg font-extrabold text-slate-800">{s.student?.full_name}</div>
                  <div className="text-xs text-slate-500">{s.student?.email}</div>
                  <div className="text-xs text-slate-400 mt-1">📞 {s.student?.phone ? maskPhone(s.student.phone) : ''}</div>
                  <div className="flex gap-2 mt-3 text-[10px] font-bold">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">{s.domain}</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">{s.duration}</span>
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-lg border border-slate-100">{s.college}</span>
                  </div>
                </div>
              ))}
              {students.length === 0 && <div className="col-span-2 text-center text-slate-400 py-20">No students assigned yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Attendance Tab */}
        {tab === 'attendance' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-2 text-slate-800">Student Attendance Sheets</h2>
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
                  }} className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between shadow-sm">
                    <div>
                      <div className="text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-1">{s.student_id}</div>
                      <div className="text-lg font-extrabold text-slate-800">{s.student?.full_name}</div>
                      <div className="text-xs text-slate-500">{s.domain} · {s.duration}</div>
                    </div>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                      Manage →
                    </span>
                  </div>
                );
              })}
              {students.length === 0 && <div className="col-span-2 text-center text-slate-400 py-20">No students assigned yet.</div>}
            </div>
          </motion.div>
        )}

        {/* Meet Link Tab */}
        {tab === 'meet' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Today's Google Meet Link</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl shadow-sm">
              <p className="text-slate-500 text-sm mb-6">Paste today's GMeet link. It will immediately appear as a "Join Meet" button for all your students.</p>
              <input
                type="url"
                value={meetLink}
                onChange={e => setMeetLink(e.target.value)}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm mb-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-slate-400"
              />
              <div className="flex gap-3">
                <button onClick={updateMeetLink} className="flex-grow py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5">
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
                  }} className="px-5 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-100 transition-all text-sm whitespace-nowrap flex items-center gap-1">
                    End Meet <StopIcon className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
              <p className="text-slate-400 text-xs mt-4 text-center">All your assigned students will see this link on their dashboards instantly.</p>
            </div>
          </motion.div>
        )}

        {/* Assignments Tab */}
        {tab === 'assignments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Assignments</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
              <h3 className="font-extrabold mb-5 text-slate-700">Create New Assignment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Title</label>
                  <input value={assignmentForm.title} onChange={e => setAssignmentForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Description</label>
                  <textarea value={assignmentForm.description} onChange={e => setAssignmentForm(p => ({ ...p, description: e.target.value }))}
                    rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Due Date</label>
                  <input type="date" value={assignmentForm.due_date} onChange={e => setAssignmentForm(p => ({ ...p, due_date: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Assign To</label>
                  <select value={assignmentForm.student_id} onChange={e => setAssignmentForm(p => ({ ...p, student_id: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-all">
                    <option value="">All Students</option>
                    {students.map(s => <option key={s.id} value={s.id}>{s.student?.full_name}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Attachment (PDF/Word)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={e => setAssignmentFile(e.target.files[0])}
                  className="text-xs text-slate-500 file:bg-slate-100 file:border-0 file:text-slate-700 file:text-xs file:px-3 file:py-2 file:rounded-lg file:cursor-pointer" />
              </div>
              <button onClick={createAssignment} disabled={loading} className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-md shadow-emerald-500/20">
                {loading ? 'Creating...' : 'Create Assignment'}
              </button>
            </div>

            <div className="space-y-3">
              {assignments.map(a => (
                <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{a.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{a.description}</div>
                      <div className="text-xs text-red-500 mt-2 font-bold">Due: {a.due_date}</div>
                      <div className="text-xs text-slate-400 mt-1 font-bold">{a.student_application_id ? `Assigned to specific student` : 'All students'}</div>
                    </div>
                    {a.file_url && <a href={a.file_url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-xs hover:underline font-bold flex items-center gap-1"><DocIcon className="w-3.5 h-3.5" /> View File</a>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submissions Tab */}
        {tab === 'submissions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-extrabold mb-8 text-slate-800">Student Assignment Submissions</h2>
            
            {/* Student Selector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5 font-bold">Select Student</label>
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
                className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 transition-all font-bold"
              >
                <option value="">Choose a Student...</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.student?.full_name} ({s.domain})</option>)}
              </select>
            </div>

            {/* List of submissions for the selected student */}
            {selectedStudentSubmissionsId ? (
              <div className="space-y-4">
                {selectedStudentSubmissions.map(task => (
                  <div key={task.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-extrabold text-slate-800 text-lg">{task.title}</div>
                        <div className="text-xs text-slate-500 mt-1 max-w-2xl">{task.description}</div>
                        {task.file_url && (
                          <a href={task.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline mt-3 inline-flex items-center gap-1">
                            <DocIcon className="w-3.5 h-3.5" /> View Task PDF/Requirements
                          </a>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        task.submission 
                          ? task.submission.status === 'accepted' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {task.submission ? task.submission.status : 'PENDING'}
                      </span>
                    </div>

                    {task.submission ? (
                      <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Submission Details</div>
                        <div className="text-xs text-slate-600 space-y-1.5 mb-4">
                          {task.submission.github_link && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-500">GitHub:</span>
                              <a href={task.submission.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{task.submission.github_link}</a>
                            </div>
                          )}
                          {task.submission.demo_link && (
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-500">Demo Link:</span>
                              <a href={task.submission.demo_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{task.submission.demo_link}</a>
                            </div>
                          )}
                          {task.submission.student_notes && (
                            <div>
                              <span className="font-bold text-slate-500">Student Notes:</span> {task.submission.student_notes}
                            </div>
                          )}
                          {task.submission.mentor_feedback && (
                            <div className="bg-white p-2 rounded-lg text-slate-500 italic mt-2 border border-slate-200/60">
                              <span className="font-bold not-italic text-slate-700">Feedback:</span> "{task.submission.mentor_feedback}"
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
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-1"
                            >
                              Download <ArrowDownIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-[10px] text-amber-600 font-extrabold mt-3 bg-amber-50/50 px-2 py-1 rounded border border-amber-100/50 inline-flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" /> Awaiting Submission
                      </div>
                    )}
                  </div>
                ))}
                {selectedStudentSubmissions.length === 0 && (
                  <div className="text-center text-slate-400 py-20 bg-white border border-slate-200 rounded-2xl">No assignments assigned to this student's domain yet.</div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-20 bg-white border border-slate-200 rounded-2xl">
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedStudent(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-1.5">
                      <StudentIcon className="w-5 h-5 text-slate-500" /> Student Hub: {s.student?.full_name}
                    </h3>
                    <p className="text-xs text-slate-400">{s.student_id} · {s.domain} · {s.duration}</p>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600 text-xl transition-colors">✕</button>
                </div>
                
                <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-white">
                  {/* Left Column: Info & Analytics */}
                  <div className="w-full md:w-80 border-r border-slate-200 p-6 bg-slate-50 flex flex-col gap-6 overflow-y-auto">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-1">Intern Info</div>
                      <div className="text-lg font-black text-slate-800">{s.student?.full_name}</div>
                      <div className="text-xs text-slate-500 mt-1">📧 {s.student?.email}</div>
                      <div className="text-xs text-slate-400">📞 {s.student?.phone}</div>
                      <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <SchoolIcon className="w-3.5 h-3.5 text-slate-400" /> {s.college}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-2">Internship Analytics</div>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Completed Days</span>
                            <span className="font-bold text-slate-700">{selectedStudentAttendance.length} / {totalDays} Days</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((selectedStudentAttendance.length / totalDays) * 100))}%` }} />
                          </div>
                          <div className="text-[10px] text-emerald-600 font-extrabold mt-1">{Math.min(100, Math.round((selectedStudentAttendance.length / totalDays) * 100))}% Duration Complete</div>
                        </div>

                        {/* Attendance Rate */}
                        <div>
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Attendance Rate</span>
                            <span className="font-bold text-slate-700">{selectedStudentAttendance.length ? Math.round((selectedStudentAttendance.filter(a => a.present).length / selectedStudentAttendance.length) * 100) : 0}%</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${selectedStudentAttendance.length ? Math.round((selectedStudentAttendance.filter(a => a.present).length / selectedStudentAttendance.length) * 100) : 0}%` }} />
                          </div>
                          <div className="text-[10px] text-blue-600 font-extrabold mt-1">Based on marked days ({selectedStudentAttendance.filter(a => a.present).length} Present / {selectedStudentAttendance.filter(a => !a.present).length} Absent)</div>
                        </div>
                        
                        {/* Assignments Count */}
                        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">Assignments</div>
                            <div className="text-lg font-black text-slate-800">{assignments.filter(a => !a.student_application_id || a.student_application_id === s.id).length}</div>
                          </div>
                          <ClipboardIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Sheet Grid (Attendance & Assignments) */}
                  <div className="flex-grow p-6 overflow-y-auto bg-white flex flex-col">
                    <div className="flex border-b border-slate-200 mb-6 gap-6">
                      <button
                        onClick={() => setModalTab('attendance')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-1 ${
                          modalTab === 'attendance' ? 'border-emerald-600 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <CalendarIcon className="w-3.5 h-3.5" /> Attendance
                      </button>
                      <button
                        onClick={() => setModalTab('assignments')}
                        className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer flex items-center gap-1 ${
                          modalTab === 'assignments' ? 'border-emerald-600 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ClipboardIcon className="w-3.5 h-3.5" /> Assignments & Submissions
                      </button>
                    </div>

                    {modalTab === 'attendance' ? (
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Day-wise Attendance Sheets</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {attendanceDays.map(day => (
                            <div key={day.date} className={`border rounded-xl p-3 text-center transition-all ${
                              day.status === 'present' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                              day.status === 'absent' ? 'bg-red-50 border-red-100 text-red-700' :
                              'bg-slate-50 border-slate-200 text-slate-400'
                            }`}>
                              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Day {day.dayNumber}</div>
                              <div className="text-xs font-bold text-slate-700 mt-0.5">{day.date}</div>
                              <div className="flex justify-center gap-1.5 mt-3">
                                <button
                                  onClick={() => markAttendance(s.id, 'present', day.date)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                    day.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-emerald-100'
                                  }`}
                                >
                                  Present
                                </button>
                                <button
                                  onClick={() => markAttendance(s.id, 'absent', day.date)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                    day.status === 'absent' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-red-100'
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
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Assigned Tasks & Submission Status</div>
                        <div className="space-y-4">
                          {selectedStudentSubmissions.map(task => (
                            <div key={task.id} className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-all">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <div className="font-extrabold text-sm text-slate-800">{task.title}</div>
                                  <div className="text-xs text-slate-500 mt-1">{task.description}</div>
                                  {task.file_url && (
                                    <a href={task.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline mt-2 inline-flex items-center gap-1">
                                      <DocIcon className="w-3.5 h-3.5" /> View Task File
                                    </a>
                                  )}
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  task.submission 
                                    ? task.submission.status === 'accepted' 
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                      : 'bg-blue-50 text-blue-700 border border-blue-100'
                                    : 'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                  {task.submission ? task.submission.status : 'PENDING'}
                                </span>
                              </div>

                              {task.submission ? (
                                <div className="mt-3 pt-3 border-t border-slate-200 bg-white p-3 rounded-xl border border-slate-100">
                                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Submission Details</div>
                                  <div className="text-xs text-slate-600 space-y-1.5">
                                    {task.submission.github_link && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-slate-500">GitHub:</span>
                                        <a href={task.submission.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{task.submission.github_link}</a>
                                      </div>
                                    )}
                                    {task.submission.demo_link && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-bold text-slate-500">Demo Link:</span>
                                        <a href={task.submission.demo_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{task.submission.demo_link}</a>
                                      </div>
                                    )}
                                    {task.submission.student_notes && (
                                      <div>
                                        <span className="font-bold text-slate-500">Student Notes:</span> {task.submission.student_notes}
                                      </div>
                                    )}
                                    {task.submission.mentor_feedback && (
                                      <div className="bg-slate-50 p-2 rounded-lg text-slate-500 italic mt-1 border border-slate-100">
                                        <span className="font-bold not-italic text-slate-700">Feedback:</span> "{task.submission.mentor_feedback}"
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
                                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-all flex items-center gap-1"
                                      >
                                        Download <ArrowDownIcon className="w-3.5 h-3.5" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="text-[10px] text-amber-600 font-extrabold mt-2 bg-amber-50/50 px-2 py-1 rounded border border-amber-100/50 inline-flex items-center gap-1">
                                  <ClockIcon className="w-3.5 h-3.5" /> Awaiting Submission
                                </div>
                              )}
                            </div>
                          ))}
                          {selectedStudentSubmissions.length === 0 && (
                            <div className="text-center text-slate-400 py-20">No tasks assigned yet.</div>
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setFilePreview(null)}
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
                  <DocIcon className="w-4 h-4 text-slate-500" /> Submitted File Preview
                </h3>
                <div className="flex items-center gap-3">
                  <a href={filePreview} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 font-bold transition-colors">Open in new tab ↗</a>
                  <button onClick={() => setFilePreview(null)} className="text-slate-400 hover:text-slate-600 text-xl transition-colors cursor-pointer">✕</button>
                </div>
              </div>
              <div className="flex-grow bg-slate-50 flex items-center justify-center overflow-auto p-4">
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
