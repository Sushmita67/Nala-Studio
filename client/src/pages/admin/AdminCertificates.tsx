import React, { useMemo, useRef, useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useStudio } from '../../context/StudioContext';
import { nextCertificateNumber } from '../../lib/storage';
import type { Certificate } from '../../types';

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
        <Text style={pdfStyles.name}>{cert.studentName}</Text>
        <Text style={pdfStyles.body}>
          has successfully completed the {cert.course} program
          {cert.courseDuration ? ` (${cert.courseDuration})` : ''} at {studioName}.
        </Text>
        <Text style={pdfStyles.meta}>
          Completed: {cert.completionDate}
          {'\n'}
          Instructor: {cert.instructorName}
          {'\n'}
          Certificate No: {cert.certificateNumber}
        </Text>
      </View>
    </Page>
  </Document>
);

const AdminCertificates: React.FC = () => {
  const { certificates, courses, settings, saveCertificate, deleteCertificate, data } = useStudio();
  const printRef = useRef<HTMLDivElement>(null);
  const previewNumber = useMemo(
    () => nextCertificateNumber(settings.certificatePrefix, data.certificateCounter + 1),
    [settings.certificatePrefix, data.certificateCounter]
  );

  const [form, setForm] = useState({
    studentName: '',
    course: courses[0]?.name || 'Professional Nail Course',
    courseDuration: courses[0]?.duration || 'Flexible',
    completionDate: new Date().toISOString().slice(0, 10),
    instructorName: 'NALA Studio',
  });
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<Certificate | null>(null);

  const draft: Certificate = {
    id: 'preview',
    certificateNumber: saved?.certificateNumber || previewNumber,
    studentName: form.studentName || 'Student Name',
    course: form.course,
    courseDuration: form.courseDuration,
    completionDate: form.completionDate,
    instructorName: form.instructorName,
    createdAt: new Date().toISOString(),
  };

  const onSave = () => {
    if (!form.studentName.trim()) return alert('Enter student name');
    const cert = saveCertificate(form);
    setSaved(cert);
    setPreview(true);
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Certificates</h1>
        <p className="mt-1 text-sm text-nala-muted">
          Generate, preview, download and save certificates
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
            <input
              className="input-nala"
              list="course-options"
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
            />
            <datalist id="course-options">
              {courses.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
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
            <label className="label-nala">Instructor</label>
            <input
              className="input-nala"
              value={form.instructorName}
              onChange={(e) => setForm({ ...form, instructorName: e.target.value })}
            />
          </div>
          <p className="text-xs text-nala-muted">
            Next certificate number: <strong>{previewNumber}</strong>
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className="btn-secondary">
              Preview
            </button>
            <button type="button" className="btn-primary" onClick={onSave}>
              Generate & Save
            </button>
            {preview && (
              <>
                <button type="button" className="btn-secondary" onClick={onPrint}>
                  Print
                </button>
                <PDFDownloadLink
                  document={<CertificatePDF cert={draft} studioName={settings.studioName} />}
                  fileName={`${draft.certificateNumber}.pdf`}
                  className="btn-secondary"
                >
                  {({ loading }) => (loading ? 'Preparing PDF…' : 'Download PDF')}
                </PDFDownloadLink>
              </>
            )}
          </div>
        </form>

        <div
          ref={printRef}
          className="flex min-h-[360px] items-center justify-center rounded-md border border-nala-rose/40 bg-nala-ivory p-8 text-center"
        >
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
                <p>Instructor: {draft.instructorName}</p>
                <p>Certificate No: {draft.certificateNumber}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-nala-muted">Preview will appear here</p>
          )}
        </div>
      </div>

      <div className="rounded-md border border-nala-border bg-nala-ivory no-print">
        <div className="border-b border-nala-border px-5 py-4">
          <h2 className="font-display text-xl">Saved certificates</h2>
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
              {certificates.map((c) => (
                <tr key={c.id} className="border-t border-nala-border/70">
                  <td className="px-4 py-3 font-medium">{c.certificateNumber}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.course}</td>
                  <td className="px-4 py-3">{c.completionDate}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => {
                        setForm({
                          studentName: c.studentName,
                          course: c.course,
                          courseDuration: c.courseDuration,
                          completionDate: c.completionDate,
                          instructorName: c.instructorName,
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
                      onClick={() => confirm('Delete certificate?') && deleteCertificate(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
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
