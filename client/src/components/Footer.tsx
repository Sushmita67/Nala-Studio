import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';
import { useStudio } from '../context/StudioContext';

const Footer: React.FC = () => {
  const { content } = useStudio();
  const year = new Date().getFullYear();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/courses', label: 'Courses' },
    { to: '/#reviews', label: 'Reviews' },
    { to: '/contact', label: 'Contact' },
    { to: '/book', label: 'Book Appointment' },
    { to: '/verify', label: 'Verify Certificate' },
  ];

  return (
    <footer className="border-t border-nala-border bg-nala-cream">
      <div className="container-nala grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-nala-muted">
            Nails • Lashes • Makeup • Beauty Education
          </p>
          <p className="mt-4 text-sm leading-relaxed text-nala-muted">
            {content.addressLine1}
            <br />
            {content.addressLine2}
          </p>
          <a
            href={`tel:${content.phone}`}
            className="mt-3 inline-block text-sm font-medium text-nala-charcoal hover:text-nala-rose"
          >
            {content.phone}
          </a>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-nala-charcoal">
            Explore
          </h4>
          <ul className="space-y-2.5">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-nala-muted transition hover:text-nala-charcoal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-nala-charcoal">
            Opening Hours
          </h4>
          <ul className="space-y-3 text-sm text-nala-muted">
            <li>{content.hoursWeekday}</li>
            <li>{content.hoursSaturday}</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-nala-charcoal">
            Connect
          </h4>
          <div className="flex items-center gap-4">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="NALA Studio on Instagram"
              className="text-nala-charcoal transition hover:text-nala-rose"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href={content.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="NALA Studio on Facebook"
              className="text-nala-charcoal transition hover:text-nala-rose"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
          </div>
          <Link to="/admin/login" className="btn-ghost mt-8 inline-flex">
            Studio Login
          </Link>
        </div>
      </div>

      <div className="border-t border-nala-border/70">
        <div className="container-nala flex flex-col items-center justify-between gap-2 py-5 text-xs text-nala-muted sm:flex-row">
          <p>© {year} NALA Studio. All rights reserved.</p>
          <p>nalastudio.com.np</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
