import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import Logo from './Logo';
import { useStudio } from '../context/StudioContext';

const Footer: React.FC = () => {
  const { content } = useStudio();
  const year = new Date().getFullYear();

  const visit = [
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/courses', label: 'Academy' },
  ];

  const connect = [
    { to: '/contact', label: 'Contact' },
    { to: '/book', label: 'Book appointment' },
    { to: '/verify', label: 'Verify certificate' },
  ];

  return (
    <footer className="border-t border-nala-border bg-nala-cream">
      <div className="container-nala grid gap-12 py-14 sm:py-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5 lg:col-span-4">
          <Link to="/" className="inline-block" aria-label="NALA Studio home">
            <Logo size="lg" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-nala-muted">
            Premium nails, lashes, makeup and beauty education in Phulbari, Kathmandu.
          </p>
          <p className="mt-5 text-sm text-nala-muted">
            {content.addressLine1}
            <br />
            {content.addressLine2}
          </p>
          <a
            href={`tel:${content.phone}`}
            className="mt-3 inline-block text-sm font-medium text-nala-charcoal transition hover:text-nala-rose"
          >
            {content.phone}
          </a>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="NALA Studio on Instagram"
              className="text-nala-charcoal transition hover:text-nala-rose"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={content.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="NALA Studio on Facebook"
              className="text-nala-charcoal transition hover:text-nala-rose"
            >
              <Facebook className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:gap-10 lg:col-span-8 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-caption font-medium uppercase text-nala-charcoal">Visit</h2>
            <ul className="space-y-3">
              {visit.map((link) => (
                <li key={link.to}>
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
            <h2 className="mb-4 text-caption font-medium uppercase text-nala-charcoal">Connect</h2>
            <ul className="space-y-3">
              {connect.map((link) => (
                <li key={link.to}>
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

          <div className="col-span-2 sm:col-span-1">
            <h2 className="mb-4 text-caption font-medium uppercase text-nala-charcoal">Hours</h2>
            <ul className="space-y-3 text-sm text-nala-muted">
              <li>{content.hoursWeekday}</li>
              <li>{content.hoursSaturday}</li>
            </ul>
            <Link to="/book" className="btn-primary mt-8 !px-5 !py-2.5">
              Book now
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-nala-border/70">
        <div className="container-nala flex flex-col items-start justify-between gap-2 py-5 text-xs text-nala-muted sm:flex-row sm:items-center">
          <p>© {year} NALA Studio. All rights reserved.</p>
          <p>nalastudio.com.np</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
