import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { BRAND } from '../config';
import { useStudio } from '../context/StudioContext';

const navItems = [
  { to: '/', label: 'HOME', end: true },
  { to: '/about', label: 'ABOUT' },
  { to: '/services', label: 'SERVICES' },
  { to: '/gallery', label: 'GALLERY' },
  { to: '/courses', label: 'COURSES' },
  { to: '/#reviews', label: 'REVIEWS', hash: true },
  { to: '/contact', label: 'CONTACT' },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useStudio();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const handleHashNav = (hash: string) => {
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-nala-border/70 bg-nala-ivory/95 shadow-soft backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-nala flex items-center justify-between py-3 lg:py-4">
        <Link to="/" className="relative z-10 flex items-center">
          <Logo size="navbar" />
        </Link>

        <nav className="hidden items-center gap-7 xl:gap-8 lg:flex">
          {navItems.map((item) =>
            item.hash ? (
              <Link
                key={item.label}
                to="/#reviews"
                onClick={() => handleHashNav('#reviews')}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-nala-muted transition hover:text-nala-charcoal"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-[11px] font-medium uppercase tracking-[0.2em] transition ${
                    isActive ? 'text-nala-charcoal' : 'text-nala-muted hover:text-nala-charcoal'
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${content.phone}`}
            className="text-[11px] font-medium tracking-[0.12em] text-nala-muted hover:text-nala-charcoal"
          >
            {content.phone}
          </a>
          <Link to="/book" className="btn-primary !px-5 !py-2.5">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="relative z-10 rounded-sm p-2 text-nala-charcoal lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-nala-border bg-nala-ivory lg:hidden">
          <div className="container-nala flex flex-col gap-1 py-4">
            {navItems.map((item) =>
              item.hash ? (
                <Link
                  key={item.label}
                  to="/#reviews"
                  onClick={() => handleHashNav('#reviews')}
                  className="py-3 text-sm uppercase tracking-[0.18em] text-nala-charcoal"
                >
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className="py-3 text-sm uppercase tracking-[0.18em] text-nala-charcoal"
                >
                  {item.label}
                </NavLink>
              )
            )}
            <a href={`tel:${content.phone}`} className="py-3 text-sm text-nala-muted">
              {content.phone}
            </a>
            <Link to="/book" className="btn-primary mt-2 w-full">
              Book Now
            </Link>
            <p className="pt-3 text-xs text-nala-muted">{BRAND.tagline}</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
