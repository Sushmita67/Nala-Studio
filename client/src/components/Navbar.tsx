import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useStudio } from '../context/StudioContext';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/courses', label: 'Academy' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useStudio();
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      openRef.current?.focus();
    };
  }, [open]);

  const solid = scrolled || open || location.pathname !== '/';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-header transition-[background,box-shadow,border-color] duration-250 ${
        solid
          ? 'border-b border-nala-border/70 bg-nala-ivory/95 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-nala flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link to="/" className="relative z-10 flex shrink-0 items-center" aria-label="NALA Studio home">
          <Logo size="navbar" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${content.phone}`}
            className="text-sm tracking-wide text-nala-muted transition hover:text-nala-charcoal"
          >
            {content.phone}
          </a>
          <Link to="/book" className="btn-primary !px-5 !py-2.5">
            Book
          </Link>
        </div>

        <button
          ref={openRef}
          type="button"
          className="relative z-10 -mr-2 rounded-sm p-2 text-nala-charcoal lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-overlay bg-nala-ivory lg:hidden"
          >
            <div className="container-nala flex h-[var(--header-h)] items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} aria-label="NALA Studio home">
                <Logo size="navbar" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                className="-mr-2 rounded-sm p-2"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>

            <nav className="container-nala flex flex-col gap-1 pb-10 pt-6" aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block border-b border-nala-border/50 py-4 font-display text-3xl ${
                        isActive ? 'text-nala-charcoal' : 'text-nala-muted'
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-10 space-y-4">
                <Link to="/book" className="btn-primary w-full" onClick={() => setOpen(false)}>
                  Book an appointment
                </Link>
                <a
                  href={`tel:${content.phone}`}
                  className="btn-secondary w-full"
                  onClick={() => setOpen(false)}
                >
                  Call {content.phone}
                </a>
                <p className="pt-2 text-center text-sm text-nala-muted">
                  Nails · Lashes · Makeup · Kathmandu
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
