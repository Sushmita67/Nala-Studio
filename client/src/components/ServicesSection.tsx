import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';
import type { ServiceCategory } from '../types';

const categoryMeta: { id: ServiceCategory; label: string }[] = [
  { id: 'nails', label: 'Nails' },
  { id: 'lashes', label: 'Lashes' },
  { id: 'brows', label: 'Brows' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'courses', label: 'Academy' },
];

interface ServicesSectionProps {
  limitPerCategory?: number;
  showViewAll?: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  limitPerCategory = 3,
  showViewAll = true,
}) => {
  const { activeServices, formatDuration } = useStudio();
  const reduceMotion = useReducedMotion();

  const grouped = useMemo(() => {
    return categoryMeta.map((cat) => ({
      ...cat,
      items: activeServices
        .filter((s) => s.category === cat.id)
        .slice(0, limitPerCategory || undefined),
    }));
  }, [activeServices, limitPerCategory]);

  return (
    <section id="services" className="section-pad bg-nala-soft">
      <div className="container-nala">
        <SectionHeader
          eyebrow="Services"
          title="Treatments at NALA"
          description="Nails, lashes, brows and beauty — crafted with care. Contact us for pricing."
          action={
            showViewAll ? (
              <Link to="/services" className="btn-ghost hidden sm:inline-flex">
                View all →
              </Link>
            ) : undefined
          }
        />

        <div className="space-y-14">
          {grouped.map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.id}>
                  <h3 className="mb-6 text-caption font-medium uppercase text-nala-brown">
                    {group.label}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((service, index) => (
                      <motion.article
                        key={service.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                        className="group"
                      >
                        <Link to={`/book?service=${service.id}`} className="block outline-none">
                          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-sm)] bg-nala-mist">
                            <img
                              src={service.image}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          </div>
                          <div className="pt-4">
                            <h4 className="font-display text-2xl text-nala-charcoal transition group-hover:text-nala-brown">
                              {service.name}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-nala-muted">
                              {service.description}
                            </p>
                            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-nala-muted">
                              <span className="uppercase tracking-[0.12em]">
                                Enquire for pricing
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" aria-hidden />
                                {formatDuration(service.duration, service.durationLabel)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center sm:hidden">
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
