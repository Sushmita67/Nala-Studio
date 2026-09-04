import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Logo from './Logo';

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
    <div className="fixed bottom-16 left-0 right-0 z-50 border-t border-nala-border bg-nala-ivory/95 shadow-soft backdrop-blur-md lg:bottom-0">
      <div className="container-nala flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <Logo size="sm" />
          <div>
            <h3 className="text-sm font-medium text-nala-charcoal">Privacy & Cookie Consent</h3>
            <p className="mt-1 text-xs leading-relaxed text-nala-muted">
              We use cookies to improve your experience on the NALA Studio website.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleDecline} className="btn-ghost">
            Decline
          </button>
          <button type="button" onClick={handleAccept} className="btn-primary !py-2">
            Accept
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="p-2 text-nala-muted"
            aria-label="Close consent banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
