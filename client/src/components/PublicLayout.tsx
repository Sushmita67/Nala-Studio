import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Toast from './Toast';
import ConsentBanner from './ConsentBanner';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBookCta from './MobileBookCta';
import PageTransition from './ui/PageTransition';
import { HEADER_OFFSET } from '../lib/design-tokens';
import { cn } from '../lib/cn';

interface PublicLayoutProps {
  children: React.ReactNode;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  clearToast: () => void;
  showMobileCta?: boolean;
  /** Skip page-level top offset (hero pages are full-bleed under nav) */
  flushTop?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  toast,
  clearToast,
  showMobileCta = true,
  flushTop = false,
}) => {
  const location = useLocation();

  return (
    <div className={cn('min-h-screen bg-nala-ivory', showMobileCta && 'pb-20 lg:pb-0')}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className={cn(!flushTop && HEADER_OFFSET)}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>{children}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      {showMobileCta && <MobileBookCta />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
      <ConsentBanner />
    </div>
  );
};

export default PublicLayout;
