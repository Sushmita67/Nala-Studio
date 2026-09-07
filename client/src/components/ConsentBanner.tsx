import React, { useEffect, useState } from 'react';

const ConsentBanner: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('nala-consent');
    if (!hasConsented) setShowConsent(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nala-consent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('nala-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-20 z-overlay border-t border-nala-border bg-nala-ivory/95 shadow-soft backdrop-blur-md safe-pb lg:bottom-0"
    >
      <div className="container-nala flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="text-sm font-medium text-nala-charcoal">Privacy & cookies</h2>
          <p className="mt-1 text-sm leading-relaxed text-nala-muted">
            We use cookies to improve your experience on the NALA Studio website.
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
          <button type="button" onClick={handleDecline} className="btn-ghost">
            Decline
          </button>
          <button type="button" onClick={handleAccept} className="btn-primary !py-2.5">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
