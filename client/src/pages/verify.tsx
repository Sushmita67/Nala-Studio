import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldX } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import PageHeader from '../components/PageHeader';
import Container from '../components/ui/Container';
import FadeIn from '../components/ui/FadeIn';
import Button from '../components/ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';
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

      <section className={cn(tokens.section.sm, 'bg-nala-soft')}>
        <Container className="max-w-xl">
          <FadeIn>
            <form
              onSubmit={onVerify}
              className="border border-nala-border/80 bg-nala-ivory p-6 sm:p-8"
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
                <Button type="submit" className="shrink-0">
                  <Search className="h-4 w-4" aria-hidden />
                  Verify
                </Button>
              </div>
            </form>
          </FadeIn>

          {result === null && (
            <FadeIn className="mt-6">
              <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                <ShieldX className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <p>No certificate found for that number. Please check and try again.</p>
              </div>
            </FadeIn>
          )}

          {result && (
            <FadeIn className="mt-6">
              <div className="border border-nala-border/80 bg-nala-ivory p-6">
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
                  {(result.startDate || result.completionDate) && (
                    <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                      <dt className="text-nala-muted">Period</dt>
                      <dd className="font-medium">
                        {result.startDate && result.completionDate
                          ? `${result.startDate} → ${result.completionDate}`
                          : result.completionDate || result.startDate}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-nala-muted">Date awarded</dt>
                    <dd className="font-medium">
                      {result.dateAwarded || result.completionDate}
                    </dd>
                  </div>
                </dl>
              </div>
            </FadeIn>
          )}
        </Container>
      </section>
    </>
  );
};

export default VerifyPage;
