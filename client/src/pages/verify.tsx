import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldX } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
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
    <div className="bg-nala-soft pb-24 pt-28">
      <div className="container-nala max-w-xl">
        <div className="mb-8 text-center">
          <p className="section-label mb-3">Certificates</p>
          <h1 className="section-title">Verify Certificate</h1>
          <p className="mt-3 text-nala-muted">
            Enter a certificate number to confirm authenticity.
          </p>
        </div>

        <form
          onSubmit={onVerify}
          className="rounded-md border border-nala-border bg-nala-ivory p-6 shadow-card"
        >
          <label className="label-nala" htmlFor="cert">
            Certificate Number
          </label>
          <div className="flex gap-2">
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
            />
            <button type="submit" className="btn-primary shrink-0 !px-4">
              <Search className="h-4 w-4" />
              Verify
            </button>
          </div>
        </form>

        {result === null && (
          <div className="mt-6 flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <ShieldX className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Certificate not found. Please check the certificate number and try again.
            </p>
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-md border border-nala-border bg-nala-ivory p-6 shadow-card">
            <div className="mb-4 flex items-center gap-2 text-nala-rose">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-[0.14em]">
                Verified Certificate
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Certificate No.</dt>
                <dd className="font-medium">{result.certificateNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Student</dt>
                <dd className="font-medium">{result.studentName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Course</dt>
                <dd className="font-medium">{result.course}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Duration</dt>
                <dd className="font-medium">{result.courseDuration}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Completed</dt>
                <dd className="font-medium">{result.completionDate}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-nala-muted">Instructor</dt>
                <dd className="font-medium">{result.instructorName}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
