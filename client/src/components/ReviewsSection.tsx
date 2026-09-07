import React from 'react';
import { Star } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

const ReviewsSection: React.FC = () => {
  const { content, visibleTestimonials } = useStudio();
  const featured = visibleTestimonials.filter((t) => t.featured).slice(0, 6);
  const reviews = featured.length ? featured : visibleTestimonials.slice(0, 6);

  return (
    <section id="reviews" className={cn(tokens.section.md, 'bg-nala-soft')}>
      <Container>
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <FadeIn className="max-w-2xl">
            <p className={cn(tokens.type.overline, 'mb-3')}>Reviews</p>
            <h2 className={cn(tokens.type.h2, 'text-balance')}>What clients say</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="md:text-right">
            <p className="font-display text-5xl tracking-tight text-nala-charcoal md:text-6xl">
              {content.googleRating}
            </p>
            <p className="mt-1 text-sm text-nala-muted">
              {content.googleReviewCount}+ reviews on Google
            </p>
          </FadeIn>
        </div>

        {reviews.length === 0 ? (
          <p className="py-12 text-center text-nala-muted">Reviews will appear here soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.06}>
                <blockquote className="border-t border-nala-border pt-6">
                  <div
                    className="mb-4 flex gap-1 text-nala-rose"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="font-display text-xl leading-relaxed text-nala-charcoal md:text-2xl">
                    “{review.text}”
                  </p>
                  <footer className="mt-5">
                    <cite className="not-italic text-sm font-medium text-nala-charcoal">
                      {review.name}
                    </cite>
                    <p className="mt-0.5 text-sm text-nala-muted">
                      {review.source || 'Google'} · {review.date}
                    </p>
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ReviewsSection;
