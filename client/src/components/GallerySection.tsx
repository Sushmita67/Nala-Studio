import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { GALLERY_FILTERS, type GalleryCategory } from '../types';
import SectionHeader from './SectionHeader';
import Lightbox from './Lightbox';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

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

  const filtered = useMemo(() => {
    let items = featuredOnly ? gallery.filter((g) => g.featured) : gallery;
    if (filter !== 'all') items = items.filter((g) => g.category === filter);
    if (limit) items = items.slice(0, limit);
    return items;
  }, [featuredOnly, filter, gallery, limit]);

  return (
    <section id="gallery" className={cn(tokens.section.md, 'bg-nala-ivory')}>
      <Container>
        <SectionHeader
          eyebrow="Gallery"
          title={title}
          description={subtitle}
          action={
            showViewAll ? (
              <Button to="/gallery" variant="ghost" className="hidden sm:inline-flex">
                Full gallery
                <ArrowRight size={16} />
              </Button>
            ) : undefined
          }
        />

        {showFilters && (
          <FadeIn className="mb-8">
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
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
                    className={cn(
                      'shrink-0 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all',
                      tokens.focus,
                      selected
                        ? 'bg-nala-charcoal text-nala-ivory'
                        : 'border border-nala-border text-nala-muted hover:border-nala-charcoal hover:text-nala-charcoal'
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {filtered.map((item, index) => (
            <FadeIn key={item.id} delay={Math.min(index * 0.04, 0.28)}>
              <button
                type="button"
                className={cn(
                  'group relative block w-full overflow-hidden bg-nala-mist image-frame',
                  tokens.focus
                )}
                onClick={() => setLightboxIndex(index)}
                aria-label={`View ${item.caption || 'gallery image'}`}
              >
                <img
                  src={item.src}
                  alt={item.caption || 'NALA Studio gallery'}
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-[4/5]"
                  loading="lazy"
                />
              </button>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-nala-muted">No images in this category yet.</p>
        )}

        {showViewAll && (
          <div className="mt-10 text-center sm:hidden">
            <Button to="/gallery" variant="secondary">
              View full gallery
            </Button>
          </div>
        )}
      </Container>

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
