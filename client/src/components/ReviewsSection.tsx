import React from 'react';
import { Star } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

const ReviewsSection: React.FC = () => {
  const { content, visibleTestimonials } = useStudio();
  const featured = visibleTestimonials.filter((t) => t.featured).slice(0, 6);
  const reviews = featured.length ? featured : visibleTestimonials.slice(0, 6);

  return (
    <section id="reviews" className="section-pad bg-nala-soft">
      <div className="container-nala">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-content">
            <p className="section-label mb-3">Reviews</p>
            <h2 className="section-title text-balance">What clients say</h2>
          </div>
          <div className="md:text-right">
            <p className="font-display text-5xl text-nala-charcoal">{content.googleRating}</p>
            <p className="mt-1 text-sm text-nala-muted">
              {content.googleReviewCount}+ reviews on Google
            </p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="py-12 text-center text-nala-muted">Reviews will appear here soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote key={review.id} className="border-t border-nala-border pt-6">
                <div className="mb-4 flex gap-1 text-nala-rose" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="font-display text-xl leading-relaxed text-nala-charcoal">
                  “{review.text}”
                </p>
                <footer className="mt-5">
                  <cite className="not-italic text-sm font-medium text-nala-charcoal">
                    {review.name}
                  </cite>
                  <p className="text-xs text-nala-muted">
                    {review.source || 'Google'} · {review.date}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
