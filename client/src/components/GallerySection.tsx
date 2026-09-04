import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import { GALLERY_FILTERS, type GalleryCategory } from '../types';
import SectionHeader from './SectionHeader';
import Lightbox from './Lightbox';

interface GallerySectionProps {
  featuredOnly?: boolean;
  limit?: number;
  showFilters?: boolean;
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  featuredOnly = false,
  limit,
  showFilters = true,
  showViewAll = false,
  title = 'Work from the studio',
  subtitle = 'Recent nails, lashes, makeup and studio moments.',
}) => {
  const { gallery } = useStudio();
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    let items = featuredOnly ? gallery.filter((g) => g.featured) : gallery;
    if (filter !== 'all') items = items.filter((g) => g.category === filter);
    if (limit) items = items.slice(0, limit);
    return items;
  }, [featuredOnly, filter, gallery, limit]);

  return (
    <section id="gallery" className="section-pad bg-nala-ivory">
      <div className="container-nala">
        <SectionHeader
          eyebrow="Gallery"
          title={title}
          description={subtitle}
          action={
            showViewAll ? (
              <Link to="/gallery" className="btn-ghost hidden sm:inline-flex">
                Full gallery →
              </Link>
            ) : undefined
          }
        />

        {showFilters && (
          <div
            className="mb-8 flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            role="tablist"
            aria-label="Gallery categories"
          >
            {GALLERY_FILTERS.map((item) => {
              const selected = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(item.id as 'all' | GalleryCategory)}
                  className={`shrink-0 rounded-[var(--radius-sm)] px-4 py-2.5 text-caption font-medium uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nala-blush ${
                    selected
                      ? 'bg-nala-charcoal text-nala-ivory'
                      : 'border border-nala-border text-nala-muted hover:border-nala-charcoal hover:text-nala-charcoal'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {filtered.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: Math.min(index * 0.03, 0.24) }}
              className={`group relative overflow-hidden rounded-[var(--radius-sm)] bg-nala-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nala-blush ${
                index % 5 === 0 ? 'md:row-span-1' : ''
              }`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${item.caption || 'gallery image'}`}
            >
              <img
                src={item.src}
                alt={item.caption || 'NALA Studio gallery'}
                className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03] md:aspect-[4/5]"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-nala-muted">No images in this category yet.</p>
        )}

        {showViewAll && (
          <div className="mt-10 text-center sm:hidden">
            <Link to="/gallery" className="btn-secondary">
              View full gallery
            </Link>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default GallerySection;
