import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Homepage from './pages/homepage';
import AboutPage from './pages/about';
import ServicesPage from './pages/services';
import GalleryPage from './pages/gallery';
import CoursesPage from './pages/courses';
import ContactPage from './pages/contact';
import Booking from './pages/booking';
import VerifyPage from './pages/verify';

import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminServices from './pages/admin/AdminServices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminCourses from './pages/admin/AdminCourses';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminContent from './pages/admin/AdminContent';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';
import AdminStudents from './pages/admin/AdminStudents';

import PublicLayout from './components/PublicLayout';
import Seo from './components/Seo';
import { StudioProvider } from './context/StudioContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

const AdminCertificates = lazy(() => import('./pages/admin/AdminCertificates'));

function AdminFallback() {
  return <p className="text-sm text-nala-muted">Loading…</p>;
}

function App() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const location = useLocation();

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (location.hash === '#reviews' && location.pathname === '/') {
      requestAnimationFrame(() => {
        document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location]);

  return (
    <StudioProvider>
      <AdminAuthProvider>
        <Seo />
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)} flushTop>
                <Homepage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <GalleryPage />
              </PublicLayout>
            }
          />
          <Route
            path="/courses"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <CoursesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <ContactPage />
              </PublicLayout>
            }
          />
          <Route
            path="/book"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)} showMobileCta={false}>
                <Booking showToast={showToast} />
              </PublicLayout>
            }
          />
          <Route path="/booking" element={<Navigate to="/book" replace />} />
          <Route
            path="/verify"
            element={
              <PublicLayout toast={toast} clearToast={() => setToast(null)}>
                <VerifyPage />
              </PublicLayout>
            }
          />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route
              path="certificates"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminCertificates />
                </Suspense>
              }
            />
            <Route path="content" element={<AdminContent />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/blog" element={<Navigate to="/" replace />} />
          <Route path="/blog/:id" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
          <Route path="/theme-demo" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminAuthProvider>
    </StudioProvider>
  );
}

export default App;
