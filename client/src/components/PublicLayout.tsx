import React from 'react';
import Toast from './Toast';
import ConsentBanner from './ConsentBanner';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBookCta from './MobileBookCta';

interface PublicLayoutProps {
  children: React.ReactNode;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  clearToast: () => void;
  showMobileCta?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  toast,
  clearToast,
  showMobileCta = true,
}) => {
  return (
    <div className={`min-h-screen bg-nala-ivory ${showMobileCta ? 'pb-20 lg:pb-0' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      {showMobileCta && <MobileBookCta />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
      <ConsentBanner />
    </div>
  );
};

export default PublicLayout;
