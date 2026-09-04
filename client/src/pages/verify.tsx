import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldX } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import PageHeader from '../components/PageHeader';
import type { Certificate } from '../types';

const VerifyPage: React.FC = () => {
  const { getCertificateByNumber } = useStudio();
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<Certificate | null | undefined>(undefined);

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const found = getCertificateByNumber(number);
    setResult(found || null);
  };

  return (
    <>
      <PageHeader
        eyebrow="Certificates"
        title="Verify a certificate"
        description="Enter a certificate number to confirm authenticity."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Verify' },
        ]}
        align="center"
      />

      <div className="bg-nala-soft pb-24 pt-10">
        <div className="container-nala max-w-xl">
          <form
            onSubmit={onVerify}
            className="rounded-[var(--radius-md)] border border-nala-border bg-nala-ivory p-6 sm:p-8"
          >
            <label className="label-nala" htmlFor="cert">
              Certificate number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="cert"
                className="input-nala"
                placeholder="NALA-2026-0001"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setResult(undefined);
                }}
                required
                autoComplete="off"
              />
              <button type="submit" className="btn-primary shrink-0">
                <Search className="h-4 w-4" aria-hidden />
                Verify
              </button>
            </div>
          </form>

          {result === null && (
            <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] border border-red-200 bg-red-50 p-4 text-sm text-red-900">
              <ShieldX className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <p>No certificate found for that number. Please check and try again.</p>
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-[var(--radius-md)] border border-nala-border bg-nala-ivory p-6">
              <div className="mb-4 flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="h-5 w-5" aria-hidden />
                <p className="text-sm font-medium">Certificate verified</p>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                  <dt className="text-nala-muted">Number</dt>
                  <dd className="font-medium">{result.certificateNumber}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                  <dt className="text-nala-muted">Student</dt>
                  <dd className="font-medium">{result.studentName}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                  <dt className="text-nala-muted">Course</dt>
                  <dd className="font-medium">{result.course}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <dt className="text-nala-muted">Completed</dt>
                  <dd className="font-medium">{result.completionDate}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
