import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import Button from './ui/Button';
import Container from './ui/Container';
import { cn, EASE } from '../lib/cn';

const HeroSection: React.FC = () => {
  const { content } = useStudio();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => {
    const list = [...(content.heroSlides || [])]
      .filter((s) => s.active && s.src)
      .sort((a, b) => a.order - b.order);
    if (list.length) return list;
    if (content.heroImage) {
      return [{ id: 'fallback', src: content.heroImage, alt: 'NALA Studio', order: 1, active: true }];
    }
    return [];
  }, [content.heroSlides, content.heroImage]);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, [reduce, slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    const next = slides[(index + 1) % slides.length];
    if (!next) return;
    const img = new Image();
    img.src = next.src;
  }, [index, slides]);

  const current = slides[index] || slides[0];

  return (
    <section className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-nala-charcoal">
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="wait">
          {current && (
            <motion.img
              key={current.id + current.src}
              src={current.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={reduce ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 1.05, ease: EASE }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-nala-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-nala-charcoal/92 via-nala-charcoal/62 to-nala-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-nala-charcoal/85 via-transparent to-nala-charcoal/40" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end pb-16 pt-28 sm:pb-20 lg:pb-24">
        <motion.div
          className="max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-nala-blush drop-shadow-sm">
            Kathmandu · Beauty studio
          </p>
          <h1 className="font-display text-4xl font-medium leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            NALA Studio
          </h1>
          <p className="mt-4 font-display text-xl leading-snug text-white sm:text-2xl md:text-[1.65rem]">
            {content.heroTitle}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
            {content.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              to="/book"
              size="lg"
              variant="inverse"
              className="rounded-full shadow-lg !text-sm !font-semibold !normal-case !tracking-[-0.01em]"
            >
              {content.heroCtaPrimary}
              <ArrowRight size={16} />
            </Button>
            <Button
              to="/services"
              size="lg"
              variant="outline"
              className="rounded-full !border-white/55 !text-sm !font-medium !normal-case !tracking-[-0.01em] !text-white hover:!border-white hover:!bg-white hover:!text-nala-charcoal"
            >
              {content.heroCtaSecondary}
            </Button>
          </div>
        </motion.div>

        {slides.length > 1 && (
          <div className="mt-10 flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={slide.alt || `Show image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-nala-blush' : 'w-3 bg-white/40 hover:bg-white/65'
                )}
              />
            ))}
          </div>
        )}
        {current && <span className="sr-only">{current.alt}</span>}
      </Container>
    </section>
  );
};

export default HeroSection;
