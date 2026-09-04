import React, { useEffect, useMemo, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useStudio } from '../../context/StudioContext';
import { nextCertificateNumber } from '../../lib/storage';
import type { Certificate } from '../../types';

/**
 * Placeholder PDF template with clearly marked merge fields:
 * {{student_name}} {{course_name}} {{completion_date}} {{certificate_id}} {{signature}}
 */
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FBF7F2',
    fontFamily: 'Times-Roman',
  },
  border: {
    borderWidth: 1,
    borderColor: '#C4877A',
    padding: 36,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studio: {
    fontSize: 14,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#8B6F5C',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    color: '#2C2420',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#7A6A5E',
    marginBottom: 28,
  },
  name: {
    fontSize: 26,
    color: '#2C2420',
    marginBottom: 18,
  },
  body: {
    fontSize: 12,
    color: '#7A6A5E',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  meta: {
    marginTop: 28,
    fontSize: 11,
    color: '#8B6F5C',
    textAlign: 'center',
  },
  mergeHint: {
    marginTop: 18,
    fontSize: 8,
    color: '#C4877A',
    textAlign: 'center',
  },
});

const CertificatePDF: React.FC<{ cert: Certificate; studioName: string }> = ({
  cert,
  studioName,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={pdfStyles.page}>
      <View style={pdfStyles.border}>
        <Text style={pdfStyles.studio}>{studioName}</Text>
        <Text style={pdfStyles.title}>Certificate of Completion</Text>
        <Text style={pdfStyles.subtitle}>This certifies that</Text>
        {/* {{student_name}} */}
        <Text style={pdfStyles.name}>{cert.studentName}</Text>
        <Text style={pdfStyles.body}>
          {/* {{course_name}} */}
          has successfully completed the {cert.course} program
          {cert.courseDuration ? ` (${cert.courseDuration})` : ''} at {studioName}.
        </Text>
        <Text style={pdfStyles.meta}>
          {/* {{completion_date}} */}
          Completed: {cert.completionDate}
          {'\n'}
          {/* {{signature}} */}
          Instructor / Signature: {cert.instructorName}
          {cert.signatureLabel ? ` · ${cert.signatureLabel}` : ''}
          {'\n'}
          {/* {{certificate_id}} */}
          Certificate No: {cert.certificateNumber}
        </Text>
        <Text style={pdfStyles.mergeHint}>
          Merge fields: {'{{student_name}}'} · {'{{course_name}}'} · {'{{completion_date}}'} ·{' '}
          {'{{certificate_id}}'} · {'{{signature}}'}
        </Text>
      </View>
    </Page>
  </Document>
);

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
    course: courses[0]?.name || 'Professional Nail Course',
    courseDuration: courses[0]?.duration || 'Flexible',
    completionDate: new Date().toISOString().slice(0, 10),
    instructorName: 'NALA Studio',
    signatureLabel: 'NALA Studio',
  });
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<Certificate | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!form.courseId && courses[0]) {
      setForm((f) => ({
        ...f,
        courseId: courses[0].id,
        course: courses[0].name,
        courseDuration: courses[0].duration,
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
    studentName: form.studentName || '{{student_name}}',
    courseId: form.courseId || undefined,
    course: form.course || '{{course_name}}',
    courseDuration: form.courseDuration,
    completionDate: form.completionDate || '{{completion_date}}',
    instructorName: form.instructorName,
    signatureLabel: form.signatureLabel || '{{signature}}',
    createdAt: saved?.createdAt || new Date().toISOString(),
  };

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
        courseDuration: form.courseDuration,
        completionDate: form.completionDate,
        instructorName: form.instructorName,
        signatureLabel: form.signatureLabel,
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
          Generate completion certificates (PDF template with merge fields)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          className="space-y-3 rounded-md border border-nala-border bg-nala-ivory p-5 no-print"
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
            <label className="label-nala">{'{{student_name}}'}</label>
            <input
              className="input-nala"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-nala">{'{{course_name}}'}</label>
            <select
              className="input-nala"
              value={form.courseId}
              onChange={(e) => {
                const course = courses.find((c) => c.id === e.target.value);
                setForm({
                  ...form,
                  courseId: e.target.value,
                  course: course?.name || form.course,
                  courseDuration: course?.duration || form.courseDuration,
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
              <label className="label-nala">Duration</label>
              <input
                className="input-nala"
                value={form.courseDuration}
                onChange={(e) => setForm({ ...form, courseDuration: e.target.value })}
              />
            </div>
            <div>
              <label className="label-nala">{'{{completion_date}}'}</label>
              <input
                type="date"
                className="input-nala"
                value={form.completionDate}
                onChange={(e) => setForm({ ...form, completionDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label-nala">{'{{signature}}'} / instructor</label>
            <input
              className="input-nala"
              value={form.instructorName}
              onChange={(e) => setForm({ ...form, instructorName: e.target.value })}
            />
          </div>
          <div>
            <label className="label-nala">Signature label</label>
            <input
              className="input-nala"
              value={form.signatureLabel}
              onChange={(e) => setForm({ ...form, signatureLabel: e.target.value })}
            />
          </div>
          <p className="text-xs text-nala-muted">
            Next {'{{certificate_id}}'}: <strong>{previewNumber}</strong>
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className="btn-secondary">
              Preview
            </button>
            <button type="button" className="btn-primary" onClick={onSave} disabled={saving}>
              {saving ? 'Saving…' : 'Generate & Save'}
            </button>
            {preview && (
              <PDFDownloadLink
                document={<CertificatePDF cert={draft} studioName={settings.studioName} />}
                fileName={`${draft.certificateNumber}.pdf`}
                className="btn-secondary"
              >
                {({ loading }) => (loading ? 'Preparing PDF…' : 'Download PDF')}
              </PDFDownloadLink>
            )}
          </div>
        </form>

        <div className="flex min-h-[360px] items-center justify-center rounded-md border border-nala-rose/40 bg-nala-ivory p-8 text-center">
          {preview ? (
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-[0.28em] text-nala-brown">
                {settings.studioName}
              </p>
              <h2 className="mt-4 font-display text-3xl text-nala-charcoal">
                Certificate of Completion
              </h2>
              <p className="mt-4 text-sm text-nala-muted">This certifies that</p>
              <p className="mt-2 font-display text-3xl text-nala-charcoal">{draft.studentName}</p>
              <p className="mt-4 text-sm leading-relaxed text-nala-muted">
                has successfully completed the <strong>{draft.course}</strong> program
                {draft.courseDuration ? ` (${draft.courseDuration})` : ''}.
              </p>
              <div className="mt-6 space-y-1 text-xs text-nala-brown">
                <p>Completed: {draft.completionDate}</p>
                <p>
                  Signature: {draft.instructorName}
                  {draft.signatureLabel ? ` · ${draft.signatureLabel}` : ''}
                </p>
                <p>Certificate No: {draft.certificateNumber}</p>
              </div>
              <p className="mt-6 text-[10px] text-nala-rose">
                Template merge fields: {'{{student_name}}'} {'{{course_name}}'}{' '}
                {'{{completion_date}}'} {'{{certificate_id}}'} {'{{signature}}'}
              </p>
            </div>
          ) : (
            <p className="text-sm text-nala-muted">Preview will appear here</p>
          )}
        </div>
      </div>

      <div className="rounded-md border border-nala-border bg-nala-ivory no-print">
        <div className="border-b border-nala-border px-5 py-4">
          <h2 className="font-display text-xl">
            {form.studentId ? 'Certificates for selected student' : 'Saved certificates'}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
              <tr>
                <th className="px-4 py-3">Number</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {studentCerts.map((c) => (
                <tr key={c.id} className="border-t border-nala-border/70">
                  <td className="px-4 py-3 font-medium">{c.certificateNumber}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.course}</td>
                  <td className="px-4 py-3">{c.completionDate}</td>
                  <td className="px-4 py-3 text-right">
                    <PDFDownloadLink
                      document={<CertificatePDF cert={c} studioName={settings.studioName} />}
                      fileName={`${c.certificateNumber}.pdf`}
                      className="btn-ghost"
                    >
                      {({ loading }) => (loading ? '…' : 'Re-download')}
                    </PDFDownloadLink>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setForm({
                          studentId: c.studentId || '',
                          studentName: c.studentName,
                          courseId: c.courseId || '',
                          course: c.course,
                          courseDuration: c.courseDuration,
                          completionDate: c.completionDate,
                          instructorName: c.instructorName,
                          signatureLabel: c.signatureLabel || 'NALA Studio',
                        });
                        setSaved(c);
                        setPreview(true);
                      }}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn-ghost text-red-700"
                      onClick={() => {
                        if (confirm('Delete certificate?')) void deleteCertificate(c.id);
                      }}
                    >
                      Delete
                    </button>
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
