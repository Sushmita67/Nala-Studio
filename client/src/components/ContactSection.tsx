import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';
import { BRAND } from '../config';
import { useStudio } from '../context/StudioContext';

const ContactSection: React.FC = () => {
  const { content } = useStudio();

  return (
    <section id="contact" className="section-pad bg-nala-cream">
      <div className="container-nala grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="section-label mb-3">Visit</p>
          <h2 className="section-title mb-6">NALA Studio</h2>
          <div className="space-y-5 text-nala-muted">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-nala-rose" aria-hidden />
              <span>
                {content.addressLine1}
                <br />
                {content.addressLine2}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-nala-rose" aria-hidden />
              <a href={`tel:${content.phone}`} className="transition hover:text-nala-charcoal">
                {content.phone}
              </a>
            </p>
            <ul className="space-y-2 border-t border-nala-border/70 pt-5 text-sm">
              <li>{content.hoursWeekday}</li>
              <li>{content.hoursSaturday}</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary">
              Book appointment
            </Link>
            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="btn-secondary">
              WhatsApp
            </a>
            <a href={`tel:${content.phone}`} className="btn-ghost">
              Call
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-nala-charcoal transition hover:text-nala-rose"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" aria-hidden />
            </a>
            <a
              href={content.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-nala-charcoal transition hover:text-nala-rose"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[var(--radius-sm)] border border-nala-border bg-nala-ivory lg:col-span-7">
          <iframe
            title="NALA Studio location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              `${content.addressLine1}, ${content.addressLine2}`
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-[320px] w-full border-0 sm:h-[400px] lg:min-h-[440px] lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
