import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import type { ServiceCategory } from '../types';

const categoryMeta: { id: ServiceCategory; label: string }[] = [
  { id: 'nails', label: 'NAILS' },
  { id: 'lashes', label: 'LASHES' },
  { id: 'beauty', label: 'BEAUTY' },
  { id: 'courses', label: 'COURSES' },
];

interface ServicesSectionProps {
  limitPerCategory?: number;
  showViewAll?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  limitPerCategory = 3,
  showViewAll = true,
}) => {
  const { activeServices, formatPrice, formatDuration } = useStudio();

  const grouped = useMemo(() => {
    return categoryMeta.map((cat) => ({
      ...cat,
      items: activeServices
        .filter((s) => s.category === cat.id)
        .slice(0, limitPerCategory || undefined),
    }));
  }, [activeServices, limitPerCategory]);

  return (
    <section id="services" className="bg-nala-soft py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-12 max-w-2xl">
          <p className="section-label mb-4">Our Services</p>
          <h2 className="section-title mb-4">Treatments at NALA</h2>
          <p className="prose-nala">
            Nails, lashes, makeup and professional beauty education — priced clearly, delivered with
            care.
          </p>
        </div>

        <div className="space-y-12">
          {grouped.map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.id}>
                  <h3 className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.24em] text-nala-brown">
                    {group.label}
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((service) => (
                      <article
                        key={service.id}
                        className="group overflow-hidden rounded-md border border-nala-border/70 bg-nala-ivory transition duration-300 hover:shadow-soft"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5">
                          <h4 className="font-display text-2xl text-nala-charcoal">{service.name}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-nala-muted">
                            {service.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                            <span className="font-medium text-nala-charcoal">
                              {formatPrice(service.price, service.priceLabel)}
                            </span>
                            <span className="inline-flex items-center gap-1 text-nala-muted">
                              <Clock className="h-3.5 w-3.5" />
                              {formatDuration(service.duration, service.durationLabel)}
                            </span>
                          </div>
                          <Link
                            to={`/book?service=${service.id}`}
                            className="btn-ghost mt-4 !justify-start"
                          >
                            Book Now →
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center">
            <Link to="/services" className="btn-secondary">
              View all services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
