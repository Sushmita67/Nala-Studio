import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Mail, Menu, Lock } from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './ui/MobileMenu';
import ServicesMegaMenu from './ui/ServicesMegaMenu';
import Container from './ui/Container';
import { cn } from '../lib/cn';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/courses', label: 'Academy' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [servicesOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openServices = () => {
    clearClose();
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 320);
  };

  const closeServicesNow = () => {
    clearClose();
    setServicesOpen(false);
  };

  const servicesActive =
    location.pathname.startsWith('/services') ||
    location.pathname.startsWith('/book');

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300',
          scrolled || servicesOpen
            ? 'border-nala-border/70 shadow-[0_8px_30px_rgba(44,36,32,0.06)]'
            : 'border-nala-border/40'
        )}
      >
        <Container className="relative flex h-14 items-center justify-between gap-4 lg:h-16">
          <Link to="/" className="relative z-10 shrink-0" aria-label="NALA Studio home">
            <Logo size="navbar" />
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            <div onMouseEnter={openServices} onMouseLeave={scheduleClose}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() =>
                  setServicesOpen((v) => {
                    clearClose();
                    return !v;
                  })
                }
                className={cn(
                  'font-ui inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[-0.01em] text-nala-charcoal/70 transition-all duration-200 hover:text-nala-charcoal',
                  (servicesOpen || servicesActive) &&
                    'border border-nala-charcoal/25 text-nala-charcoal'
                )}
              >
                Services
                <ChevronDown
                  size={12}
                  className={cn(
                    'transition-transform duration-200',
                    servicesOpen && 'rotate-180'
                  )}
                />
              </button>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onMouseEnter={closeServicesNow}
                className={({ isActive }) =>
                  cn(
                    'font-ui rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[-0.01em] transition-colors duration-200',
                    isActive
                      ? 'text-nala-charcoal'
                      : 'text-nala-charcoal/55 hover:text-nala-charcoal'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div
            className="flex items-center gap-1.5 sm:gap-2"
            onMouseEnter={closeServicesNow}
          >
            <Link
              to="/admin/login"
              className="font-ui hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-nala-muted transition hover:text-nala-charcoal lg:inline-flex"
              aria-label="Admin login"
              title="Studio admin"
            >
              <Lock size={12} strokeWidth={2} />
              Admin
            </Link>
            <Link
              to="/contact"
              className="font-ui hidden items-center gap-1.5 rounded-full border border-nala-charcoal/20 px-3 py-1.5 text-[11px] font-medium text-nala-charcoal transition hover:border-nala-charcoal/40 hover:bg-nala-mist/60 md:inline-flex"
            >
              <Mail size={12} strokeWidth={2} />
              Contact
            </Link>
            <Link
              to="/book"
              className="font-ui group hidden items-center justify-center gap-1.5 rounded-full bg-nala-charcoal px-3.5 py-1.5 text-[11px] font-semibold tracking-[-0.01em] text-white transition hover:bg-nala-brown sm:inline-flex"
            >
              Book now
              <ArrowRight
                size={12}
                strokeWidth={2.25}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2 text-nala-charcoal transition hover:bg-nala-mist lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {servicesOpen && (
            <div
              className="absolute inset-x-0 top-full z-[60] hidden lg:block"
              onMouseEnter={openServices}
              onMouseLeave={scheduleClose}
            >
              <div className="pointer-events-auto absolute inset-x-0 -top-8 h-8" aria-hidden />
              <div className="mx-auto max-w-6xl px-4 pb-6 pt-1">
                <ServicesMegaMenu onNavigate={closeServicesNow} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {servicesOpen && (
          <button
            type="button"
            aria-label="Close services menu"
            className="fixed inset-x-0 bottom-0 top-14 z-[40] hidden bg-black/10 lg:block lg:top-16"
            onClick={closeServicesNow}
          />
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;
