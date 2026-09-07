import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';
import type { ServiceCategory } from '../types';

const categoryMeta: { id: ServiceCategory; label: string }[] = [
  { id: 'lashes', label: 'Eyelash Extensions' },
  { id: 'gel-nails', label: 'Gel Nails & Extensions' },
  { id: 'pedicure', label: 'Pedicure' },
  { id: 'manicure', label: 'Manicure' },
  { id: 'courses', label: 'Courses' },
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

  const grouped = useMemo(() => {
    return categoryMeta.map((cat) => ({
      ...cat,
      items: activeServices
        .filter((s) => s.category === cat.id)
        .slice(0, limitPerCategory || undefined),
    }));
  }, [activeServices, limitPerCategory]);

  return (
    <section id="services" className={cn(tokens.section.md, 'bg-nala-soft')}>
      <Container>
        <SectionHeader
          eyebrow="Services"
          title="Treatments at NALA"
          description="Lashes, gel nails, manicure, pedicure and courses — crafted with care. Contact us for pricing."
          action={
            showViewAll ? (
              <Button to="/services" variant="ghost" className="hidden sm:inline-flex">
                View all
                <ArrowRight size={16} />
              </Button>
            ) : undefined
          }
        />

        <div className="space-y-14 md:space-y-16">
          {grouped.map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.id}>
                  <FadeIn>
                    <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.16em] text-nala-brown">
                      {group.label}
                    </h3>
                  </FadeIn>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {group.items.map((service, index) => (
                      <FadeIn key={service.id} delay={Math.min(index * 0.06, 0.24)}>
                        <article className="group">
                          <Link to={`/book?service=${service.id}`} className="block outline-none">
                            <div className="image-frame aspect-[4/3] overflow-hidden bg-nala-mist">
                              <img
                                src={service.image}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                loading="lazy"
                              />
                            </div>
                            <div className="pt-5">
                              <h4
                                className={cn(
                                  tokens.type.h3,
                                  'transition-colors group-hover:text-nala-brown'
                                )}
                              >
                                {service.name}
                              </h4>
                              <p className={cn(tokens.type.body, 'mt-2 text-sm')}>
                                {service.description}
                              </p>
                              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-nala-muted">
                                <span className="uppercase tracking-[0.12em]">
                                  Enquire for pricing
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock className="h-3.5 w-3.5" aria-hidden />
                                  {formatDuration(service.duration, service.durationLabel)}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </article>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center sm:hidden">
            <Button to="/services" variant="secondary">
              View all services
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ServicesSection;
