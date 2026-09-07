import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import type { Service, ServiceCategory } from '../../types';
import { SERVICE_CATEGORY_OPTIONS } from '../../types';
import { EASE, cn } from '../../lib/cn';

type MegaColumn = {
  id: string;
  label: string;
  categories: ServiceCategory[];
  limit: number;
};

const COLUMNS: MegaColumn[] = [
  { id: 'lashes', label: 'Eyelash extensions', categories: ['lashes'], limit: 5 },
  { id: 'gel', label: 'Gel nails & extensions', categories: ['gel-nails'], limit: 5 },
  {
    id: 'care',
    label: 'Manicure & pedicure',
    categories: ['manicure', 'pedicure'],
    limit: 4,
  },
];

interface ServicesMegaMenuProps {
  onNavigate: () => void;
}

const ServicesMegaMenu: React.FC<ServicesMegaMenuProps> = ({ onNavigate }) => {
  const { activeServices, content, gallery } = useStudio();

  const columns = useMemo(() => {
    return COLUMNS.map((col) => {
      const items = col.categories
        .flatMap((cat) => activeServices.filter((s) => s.category === cat))
        .sort((a, b) => a.order - b.order)
        .slice(0, col.limit);
      return { ...col, items };
    }).filter((col) => col.items.length > 0);
  }, [activeServices]);

  const courseItems = useMemo(
    () =>
      activeServices
        .filter((s) => s.category === 'courses')
        .sort((a, b) => a.order - b.order),
    [activeServices]
  );

  const featuredImage =
    gallery.find((g) => g.featured)?.src ||
    content.aboutImage ||
    content.heroImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.985 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-[0_24px_80px_-20px_rgba(0,0,0,0.35)]"
    >
      <div className="grid lg:grid-cols-[1fr_260px]">
        <div className="grid gap-0 p-5 sm:grid-cols-3 sm:gap-2 sm:p-6 md:p-7">
          {columns.map((col, colIndex) => (
            <div
              key={col.id}
              className={cn(
                'min-w-0',
                colIndex > 0 &&
                  'border-t border-nala-border/70 pt-4 sm:border-l sm:border-t-0 sm:pt-0 sm:pl-4 md:pl-5'
              )}
            >
              <p className="font-ui mb-3 text-sm font-medium tracking-[-0.01em] text-nala-muted">
                {col.label}
              </p>
              <ul className="space-y-0">
                {col.items.map((service: Service, i) => (
                  <li key={service.id}>
                    <Link
                      to={`/book?service=${service.id}`}
                      onClick={onNavigate}
                      className={cn(
                        'group block py-2.5 transition-colors',
                        i > 0 && 'border-t border-nala-border/60'
                      )}
                    >
                      <span className="font-display block text-[0.95rem] leading-snug text-nala-charcoal transition-colors group-hover:text-nala-brown">
                        {service.name}
                      </span>
                      <span className="font-ui mt-0.5 block text-sm leading-snug text-nala-muted">
                        {service.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative m-3 overflow-hidden rounded-[1.35rem] bg-nala-charcoal sm:m-4 lg:my-4 lg:mr-4 lg:ml-0">
          <img
            src={featuredImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nala-charcoal/90 via-nala-charcoal/35 to-nala-charcoal/20" />
          <div className="relative flex min-h-[200px] flex-col justify-end p-5 lg:min-h-full">
            <p className="font-ui mb-2 text-sm font-medium text-white/55">Courses</p>
            <ul className="mb-4 space-y-1.5">
              {courseItems.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/book?service=${c.id}`}
                    onClick={onNavigate}
                    className="font-display text-[0.95rem] text-white transition hover:text-nala-beige"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/gallery"
              onClick={onNavigate}
              className="font-ui inline-flex w-fit items-center gap-1.5 rounded-full border border-white/45 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white hover:text-nala-charcoal"
            >
              View gallery
              <ArrowRight size={12} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-nala-border/70 px-6 py-3 sm:px-7">
        <p className="font-ui text-sm text-nala-muted">
          {SERVICE_CATEGORY_OPTIONS.length} categories · enquire for pricing
        </p>
        <Link
          to="/services"
          onClick={onNavigate}
          className="font-ui inline-flex items-center gap-1.5 text-sm font-medium text-nala-charcoal transition hover:text-nala-brown"
        >
          View all services
          <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServicesMegaMenu;
