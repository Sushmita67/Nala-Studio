import React, { useMemo, useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { ClassSession, Enrollment, EnrollmentStatus, Student } from '../../types';
import { uid } from '../../lib/storage';

const emptyStudent = (): Student => ({
  id: uid('stu'),
  name: '',
  email: '',
  phone: '',
  notes: '',
  enrolledAt: new Date().toISOString(),
  active: true,
});

const emptyClass = (): ClassSession => ({
  id: uid('class'),
  courseId: '',
  name: '',
  instructorId: '',
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  capacity: 8,
  location: 'NALA Studio, Phulbari',
  active: true,
});

const AdminStudents: React.FC = () => {
  const {
    students,
    classes,
    enrollments,
    courses,
    staff,
    upsertStudent,
    deleteStudent,
    upsertClass,
    deleteClass,
    upsertEnrollment,
    deleteEnrollment,
  } = useStudio();

  const [tab, setTab] = useState<'students' | 'classes' | 'enrollments'>('students');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editingClass, setEditingClass] = useState<ClassSession | null>(null);
  const [enrollForm, setEnrollForm] = useState({
    studentId: '',
    classId: '',
    status: 'active' as EnrollmentStatus,
    progress: 0,
    notes: '',
  });
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const selectedHistory = useMemo(
    () =>
      enrollments.filter((e) => e.studentId === selectedStudentId).map((e) => ({
        ...e,
        className: classes.find((c) => c.id === e.classId)?.name || e.classId,
        courseName: courses.find((c) => c.id === e.courseId)?.name || e.courseId,
      })),
    [enrollments, selectedStudentId, classes, courses]
  );

  const saveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent?.name.trim()) return;
    void upsertStudent(editingStudent);
    setEditingStudent(null);
  };

  const saveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass?.name.trim() || !editingClass.courseId) return;
    void upsertClass(editingClass);
    setEditingClass(null);
  };

  const saveEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    const cls = classes.find((c) => c.id === enrollForm.classId);
    if (!enrollForm.studentId || !cls) return;
    const enrollment: Enrollment = {
      id: uid('enr'),
      studentId: enrollForm.studentId,
      classId: enrollForm.classId,
      courseId: cls.courseId,
      status: enrollForm.status,
      enrolledAt: new Date().toISOString(),
      progress: enrollForm.progress,
      notes: enrollForm.notes,
    };
    void upsertEnrollment(enrollment);
    setEnrollForm({ studentId: '', classId: '', status: 'active', progress: 0, notes: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Students & Classes</h1>
        <p className="mt-1 text-sm text-nala-muted">
          Roster, class schedules, enrollments and progress
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['students', 'classes', 'enrollments'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-sm px-4 py-2 text-xs uppercase tracking-[0.14em] ${
              tab === t
                ? 'bg-nala-charcoal text-nala-ivory'
                : 'bg-nala-mist text-nala-muted hover:text-nala-charcoal'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'students' && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            <div className="flex justify-end">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEditingStudent(emptyStudent())}
              >
                Add student
              </button>
            </div>
            <div className="overflow-x-auto rounded-md border border-nala-border bg-nala-ivory">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-nala-muted">
                        No students yet.
                      </td>
                    </tr>
                  )}
                  {students.map((s) => (
                    <tr
                      key={s.id}
                      className={`cursor-pointer border-t border-nala-border/70 hover:bg-nala-soft/50 ${
                        selectedStudentId === s.id ? 'bg-nala-soft/80' : ''
                      }`}
                      onClick={() => setSelectedStudentId(s.id)}
                    >
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-nala-muted">
                        {s.phone}
                        <br />
                        {s.email}
                      </td>
                      <td className="px-4 py-3">{s.active ? 'Active' : 'Inactive'}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingStudent(s);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-ghost text-rose-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this student?')) void deleteStudent(s.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-md border border-nala-border bg-nala-ivory p-5 lg:col-span-2">
            <h2 className="font-display text-xl">Enrollment history</h2>
            {!selectedStudentId ? (
              <p className="mt-4 text-sm text-nala-muted">Select a student to view history.</p>
            ) : selectedHistory.length === 0 ? (
              <p className="mt-4 text-sm text-nala-muted">No enrollments yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {selectedHistory.map((h) => (
                  <li key={h.id} className="border-b border-nala-border/60 pb-3 text-sm">
                    <p className="font-medium">{h.className}</p>
                    <p className="text-nala-muted">{h.courseName}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-nala-rose">
                      {h.status} · {h.progress}%
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === 'classes' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setEditingClass({
                  ...emptyClass(),
                  courseId: courses[0]?.id || '',
                  instructorId: staff[0]?.id || '',
                })
              }
            >
              Add class
            </button>
          </div>
          <div className="overflow-x-auto rounded-md border border-nala-border bg-nala-ivory">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
                <tr>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Capacity</th>
                  <th className="px-4 py-3">Instructor</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => (
                  <tr key={c.id} className="border-t border-nala-border/70">
                    <td className="px-4 py-3">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-nala-muted">
                        {courses.find((x) => x.id === c.courseId)?.name}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      {c.startDate} → {c.endDate}
                    </td>
                    <td className="px-4 py-3">
                      {enrollments.filter((e) => e.classId === c.id).length}/{c.capacity}
                    </td>
                    <td className="px-4 py-3">
                      {staff.find((s) => s.id === c.instructorId)?.name || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => setEditingClass(c)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost text-rose-700"
                        onClick={() => {
                          if (confirm('Delete this class?')) void deleteClass(c.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'enrollments' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={saveEnrollment}
            className="space-y-4 rounded-md border border-nala-border bg-nala-ivory p-5"
          >
            <h2 className="font-display text-xl">Enroll a student</h2>
            <div>
              <label className="label-nala">Student</label>
              <select
                className="input-nala"
                value={enrollForm.studentId}
                onChange={(e) => setEnrollForm((f) => ({ ...f, studentId: e.target.value }))}
                required
              >
                <option value="">Select…</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-nala">Class</label>
              <select
                className="input-nala"
                value={enrollForm.classId}
                onChange={(e) => setEnrollForm((f) => ({ ...f, classId: e.target.value }))}
                required
              >
                <option value="">Select…</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-nala">Status</label>
              <select
                className="input-nala"
                value={enrollForm.status}
                onChange={(e) =>
                  setEnrollForm((f) => ({
                    ...f,
                    status: e.target.value as EnrollmentStatus,
                  }))
                }
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="label-nala">Progress %</label>
              <input
                type="number"
                min={0}
                max={100}
                className="input-nala"
                value={enrollForm.progress}
                onChange={(e) =>
                  setEnrollForm((f) => ({ ...f, progress: Number(e.target.value) }))
                }
              />
            </div>
            <button type="submit" className="btn-primary">
              Enroll
            </button>
          </form>

          <div className="overflow-x-auto rounded-md border border-nala-border bg-nala-ivory">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e) => (
                  <tr key={e.id} className="border-t border-nala-border/70">
                    <td className="px-4 py-3">
                      {students.find((s) => s.id === e.studentId)?.name}
                    </td>
                    <td className="px-4 py-3">
                      {classes.find((c) => c.id === e.classId)?.name}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      {e.status} · {e.progress}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="btn-ghost text-rose-700"
                        onClick={() => void deleteEnrollment(e.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-nala-charcoal/40 p-4 sm:items-center">
          <form
            onSubmit={saveStudent}
            className="w-full max-w-lg space-y-4 rounded-md bg-nala-ivory p-6 shadow-soft"
          >
            <h2 className="font-display text-2xl">
              {students.some((s) => s.id === editingStudent.id) ? 'Edit' : 'Add'} student
            </h2>
            <div>
              <label className="label-nala">Name</label>
              <input
                className="input-nala"
                value={editingStudent.name}
                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label-nala">Email</label>
              <input
                type="email"
                className="input-nala"
                value={editingStudent.email}
                onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
              />
            </div>
            <div>
              <label className="label-nala">Phone</label>
              <input
                className="input-nala"
                value={editingStudent.phone}
                onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="label-nala">Notes</label>
              <textarea
                className="input-nala"
                rows={3}
                value={editingStudent.notes}
                onChange={(e) => setEditingStudent({ ...editingStudent, notes: e.target.value })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editingStudent.active}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, active: e.target.checked })
                }
              />
              Active
            </label>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setEditingStudent(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {editingClass && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-nala-charcoal/40 p-4 sm:items-center">
          <form
            onSubmit={saveClass}
            className="w-full max-w-lg space-y-4 rounded-md bg-nala-ivory p-6 shadow-soft"
          >
            <h2 className="font-display text-2xl">Class schedule</h2>
            <div>
              <label className="label-nala">Name</label>
              <input
                className="input-nala"
                value={editingClass.name}
                onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label-nala">Course</label>
              <select
                className="input-nala"
                value={editingClass.courseId}
                onChange={(e) => setEditingClass({ ...editingClass, courseId: e.target.value })}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-nala">Instructor</label>
              <select
                className="input-nala"
                value={editingClass.instructorId}
                onChange={(e) =>
                  setEditingClass({ ...editingClass, instructorId: e.target.value })
                }
              >
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-nala">Start</label>
                <input
                  type="date"
                  className="input-nala"
                  value={editingClass.startDate}
                  onChange={(e) =>
                    setEditingClass({ ...editingClass, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="label-nala">End</label>
                <input
                  type="date"
                  className="input-nala"
                  value={editingClass.endDate}
                  onChange={(e) => setEditingClass({ ...editingClass, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="label-nala">Capacity</label>
              <input
                type="number"
                min={1}
                className="input-nala"
                value={editingClass.capacity}
                onChange={(e) =>
                  setEditingClass({ ...editingClass, capacity: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setEditingClass(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
