import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MapPin, Phone } from 'lucide-react';
import { BRAND } from '../config';
import { useStudio } from '../context/StudioContext';

const ContactSection: React.FC = () => {
  const { content } = useStudio();

  return (
    <section id="contact" className="bg-nala-cream py-20 lg:py-28">
      <div className="container-nala grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-label mb-4">Visit</p>
          <h2 className="section-title mb-6">NALA Studio</h2>
          <div className="space-y-4 text-nala-muted">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-nala-rose" />
              <span>
                {content.addressLine1}
                <br />
                {content.addressLine2}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-nala-rose" />
              <a href={`tel:${content.phone}`} className="hover:text-nala-charcoal">
                {content.phone}
              </a>
            </p>
            <ul className="space-y-2 pt-2 text-sm">
              <li>{content.hoursWeekday}</li>
              <li>{content.hoursSaturday}</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${content.phone}`} className="btn-primary">
              Call ({content.phone})
            </a>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              WhatsApp
            </a>
            <Link to="/book" className="btn-secondary">
              Book
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-nala-charcoal hover:text-nala-rose"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href={content.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="text-nala-charcoal hover:text-nala-rose"
              aria-label="Facebook"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-nala-border bg-nala-ivory">
          <iframe
            title="NALA Studio location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              `${content.addressLine1}, ${content.addressLine2}`
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="h-[360px] w-full border-0 lg:h-full min-h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
