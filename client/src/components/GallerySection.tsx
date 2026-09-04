import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';
import { GALLERY_FILTERS, type GalleryCategory } from '../types';
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
  title = 'Nail designs & studio moments',
  subtitle = 'A look at recent work from the NALA Studio team.',
}) => {
  const { gallery } = useStudio();
  const [filter, setFilter] = useState<'all' | GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let items = featuredOnly ? gallery.filter((g) => g.featured) : gallery;
    if (filter !== 'all') items = items.filter((g) => g.category === filter);
    if (limit) items = items.slice(0, limit);
    return items;
  }, [featuredOnly, filter, gallery, limit]);

  return (
    <section id="gallery" className="bg-nala-ivory py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-10 max-w-2xl">
          <p className="section-label mb-4">Featured Work</p>
          <h2 className="section-title mb-4">{title}</h2>
          <p className="prose-nala">{subtitle}</p>
        </div>

        {showFilters && (
          <div className="mb-8 flex flex-wrap gap-2">
            {GALLERY_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id as 'all' | GalleryCategory)}
                className={`rounded-sm px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition ${
                  filter === item.id
                    ? 'bg-nala-charcoal text-nala-ivory'
                    : 'border border-nala-border text-nala-muted hover:border-nala-charcoal hover:text-nala-charcoal'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        <div className="columns-2 gap-3 sm:columns-2 md:columns-3 lg:gap-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm lg:mb-4 ${
                index % 5 === 0 ? 'md:mt-8' : index % 3 === 0 ? 'md:mt-4' : ''
              }`}
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={item.src}
                alt={item.caption || 'NALA Studio gallery'}
                className="w-full object-cover transition duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-nala-muted">No images in this category yet.</p>
        )}

        {showViewAll && (
          <div className="mt-10 text-center">
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
