import React, { useEffect, useMemo, useState } from 'react';
import { Download, Eye, Trash2 } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { nextCertificateNumber } from '../../lib/storage';
import {
  certificatePdfObjectUrl,
  downloadCertificatePdf,
} from '../../lib/certificatePdf';
import type { Certificate } from '../../types';

const today = () => new Date().toISOString().slice(0, 10);

const AdminCertificates: React.FC = () => {
  const {
    certificates,
    courses,
    students,
    settings,
    saveCertificate,
    deleteCertificate,
    data,
  } = useStudio();

  const previewNumber = useMemo(
    () => nextCertificateNumber(settings.certificatePrefix, data.certificateCounter + 1),
    [settings.certificatePrefix, data.certificateCounter]
  );

  const [form, setForm] = useState({
    studentId: '',
    studentName: '',
    courseId: courses[0]?.id || '',
    course: courses[0]?.name || 'Masters Nail Course',
    startDate: today(),
    completionDate: today(),
    dateAwarded: today(),
  });
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<Certificate | null>(null);
  const [saving, setSaving] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    if (!form.courseId && courses[0]) {
      setForm((f) => ({
        ...f,
        courseId: courses[0].id,
        course: courses[0].name,
      }));
    }
  }, [courses, form.courseId]);

  const studentCerts = useMemo(() => {
    if (!form.studentId) return certificates;
    return certificates.filter(
      (c) =>
        c.studentId === form.studentId ||
        c.studentName.toLowerCase() === form.studentName.toLowerCase()
    );
  }, [certificates, form.studentId, form.studentName]);

  const draft: Certificate = {
    id: saved?.id || 'preview',
    certificateNumber: saved?.certificateNumber || previewNumber,
    studentId: form.studentId || undefined,
    studentName: form.studentName || 'Student Name',
    courseId: form.courseId || undefined,
    course: form.course || 'Course Name',
    startDate: form.startDate || 'YYYY-MM-DD',
    completionDate: form.completionDate || 'YYYY-MM-DD',
    dateAwarded: form.dateAwarded || form.completionDate || 'YYYY-MM-DD',
    createdAt: saved?.createdAt || new Date().toISOString(),
  };

  useEffect(() => {
    let revoked: string | null = null;
    if (!preview) {
      setPdfUrl(null);
      return;
    }
    setPdfBusy(true);
    void certificatePdfObjectUrl(draft)
      .then((url) => {
        revoked = url;
        setPdfUrl(url);
      })
      .catch(() => setPdfUrl(null))
      .finally(() => setPdfBusy(false));
    return () => {
      if (revoked) URL.revokeObjectURL(revoked);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rebuild when draft fields change
  }, [
    preview,
    draft.studentName,
    draft.course,
    draft.startDate,
    draft.completionDate,
    draft.dateAwarded,
    draft.certificateNumber,
  ]);

  const onSave = async () => {
    if (!form.studentName.trim()) {
      alert('Enter or select a student name');
      return;
    }
    setSaving(true);
    try {
      const cert = await saveCertificate({
        studentId: form.studentId || undefined,
        studentName: form.studentName,
        courseId: form.courseId || undefined,
        course: form.course,
        startDate: form.startDate,
        completionDate: form.completionDate,
        dateAwarded: form.dateAwarded,
      });
      setSaved(cert);
      setPreview(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Certificates</h1>
        <p className="mt-1 text-sm text-nala-muted">
          Fills <code className="text-xs">default-certificate-template-v1.pdf</code> with student
          data
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          className="space-y-3 rounded-xl border border-nala-border bg-nala-ivory p-5 no-print"
          onSubmit={(e) => {
            e.preventDefault();
            setPreview(true);
          }}
        >
          <div>
            <label className="label-nala">Student roster</label>
            <select
              className="input-nala"
              value={form.studentId}
              onChange={(e) => {
                const student = students.find((s) => s.id === e.target.value);
                setForm({
                  ...form,
                  studentId: e.target.value,
                  studentName: student?.name || form.studentName,
                });
                setSaved(null);
              }}
            >
              <option value="">Custom / type name below</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-nala">Student name</label>
            <input
              className="input-nala"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-nala">Course</label>
            <select
              className="input-nala"
              value={form.courseId}
              onChange={(e) => {
                const course = courses.find((c) => c.id === e.target.value);
                setForm({
                  ...form,
                  courseId: e.target.value,
                  course: course?.name || form.course,
                });
              }}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-nala">Start date</label>
              <input
                type="date"
                className="input-nala"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="label-nala">Completion date</label>
              <input
                type="date"
                className="input-nala"
                value={form.completionDate}
                onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label-nala">Date awarded</label>
            <input
              type="date"
              className="input-nala"
              value={form.dateAwarded}
              onChange={(e) => setForm({ ...form, dateAwarded: e.target.value })}
            />
          </div>
          <p className="text-xs text-nala-muted">
            Next certificate ID: <strong>{previewNumber}</strong>
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className="btn-secondary !text-xs">
              <Eye size={14} />
              Preview PDF
            </button>
            <button
              type="button"
              className="btn-primary !text-xs"
              onClick={onSave}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Generate & Save'}
            </button>
            {preview && (
              <button
                type="button"
                className="btn-secondary !text-xs"
                onClick={() => void downloadCertificatePdf(draft)}
              >
                <Download size={14} />
                Download PDF
              </button>
            )}
          </div>
        </form>

        <div className="overflow-hidden rounded-xl border border-nala-rose/40 bg-nala-mist/40">
          {preview ? (
            pdfBusy || !pdfUrl ? (
              <div className="flex min-h-[360px] items-center justify-center text-sm text-nala-muted">
                Preparing template PDF…
              </div>
            ) : (
              <iframe title="Certificate preview" src={pdfUrl} className="h-[420px] w-full bg-white" />
            )
          ) : (
            <div className="flex min-h-[360px] items-center justify-center p-8 text-center text-sm text-nala-muted">
              Preview loads the official certificate template with filled fields
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-nala-border bg-nala-ivory no-print">
        <div className="border-b border-nala-border px-5 py-4">
          <h2 className="font-display text-xl">
            {form.studentId ? 'Certificates for selected student' : 'Saved certificates'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-nala-soft text-xs uppercase tracking-[0.12em] text-nala-muted">
              <tr>
                <th className="px-4 py-3">Number</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Awarded</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentCerts.map((c) => (
                <tr key={c.id} className="border-t border-nala-border/70">
                  <td className="px-4 py-3 font-medium">{c.certificateNumber}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.course}</td>
                  <td className="px-4 py-3">{c.dateAwarded || c.completionDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-nala-border bg-white px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em]"
                        onClick={() => void downloadCertificatePdf(c)}
                      >
                        <Download size={12} />
                        PDF
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-nala-border bg-white px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em]"
                        onClick={() => {
                          setForm({
                            studentId: c.studentId || '',
                            studentName: c.studentName,
                            courseId: c.courseId || '',
                            course: c.course,
                            startDate: c.startDate || '',
                            completionDate: c.completionDate,
                            dateAwarded: c.dateAwarded || c.completionDate,
                          });
                          setSaved(c);
                          setPreview(true);
                        }}
                      >
                        <Eye size={12} />
                        View
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-red-800"
                        onClick={() => {
                          if (confirm('Delete certificate?')) void deleteCertificate(c.id);
                        }}
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {studentCerts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-nala-muted">
                    No certificates saved yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
