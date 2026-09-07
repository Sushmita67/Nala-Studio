import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import Button from './ui/Button';
import Container from './ui/Container';
import { tokens } from '../lib/design-tokens';
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
    <footer className="bg-nala-charcoal text-nala-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-10 md:pt-20">
        <div className="md:col-span-5 lg:col-span-4">
          <Link to="/" className="inline-block brightness-0 invert" aria-label="NALA Studio home">
            <Logo size="lg" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-nala-beige/80">
            Premium nails, lashes, makeup and beauty education in Phulbari, Kathmandu.
          </p>
          <div className="mt-6 space-y-3 text-sm text-nala-beige/70">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-nala-rose" />
              <span>
                {content.addressLine1}
                <br />
                {content.addressLine2}
              </span>
            </p>
            <a
              href={`tel:${content.phone}`}
              className="flex items-center gap-3 transition hover:text-nala-ivory"
            >
              <Phone size={16} className="text-nala-rose" />
              {content.phone}
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-nala-beige/80 transition hover:text-nala-ivory"
            >
              <Instagram size={20} />
            </a>
            <a
              href={content.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-nala-beige/80 transition hover:text-nala-ivory"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-8 lg:grid-cols-3">
          <div>
            <h2 className={tokens.type.overline + ' mb-4 text-nala-blush'}>Visit</h2>
            <ul className="space-y-3">
              {visit.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-nala-beige/70 transition hover:text-nala-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={tokens.type.overline + ' mb-4 text-nala-blush'}>Connect</h2>
            <ul className="space-y-3">
              {connect.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-nala-beige/70 transition hover:text-nala-ivory"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className={tokens.type.overline + ' mb-4 text-nala-blush'}>Hours</h2>
            <ul className="space-y-3 text-sm text-nala-beige/70">
              <li>{content.hoursWeekday}</li>
              <li>{content.hoursSaturday}</li>
            </ul>
            <Button to="/book" variant="inverse" size="sm" className="mt-8">
              Book now
            </Button>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-2 py-5 text-sm tracking-wide text-nala-beige/50 sm:flex-row sm:items-center">
          <p>© {year} NALA Studio. All rights reserved.</p>
          <p>nalastudio.com.np</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
