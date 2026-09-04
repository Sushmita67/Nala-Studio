import React from 'react';
import { Star } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

const ReviewsSection: React.FC = () => {
  const { content, visibleTestimonials } = useStudio();
  const featured = visibleTestimonials.filter((t) => t.featured).slice(0, 6);
  const reviews = featured.length ? featured : visibleTestimonials.slice(0, 6);

  return (
    <section id="reviews" className="bg-nala-soft py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Reviews</p>
            <h2 className="section-title">What clients say</h2>
          </div>
          <div className="md:text-right">
            <p className="font-display text-5xl text-nala-charcoal">{content.googleRating}</p>
            <p className="mt-1 text-sm text-nala-muted">
              {content.googleReviewCount}+ Reviews on Google
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-md border border-nala-border bg-nala-ivory p-6"
            >
              <div className="mb-4 flex gap-1 text-nala-rose">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="font-display text-xl leading-relaxed text-nala-charcoal">
                “{review.text}”
              </p>
              <p className="mt-5 text-sm font-medium text-nala-charcoal">{review.name}</p>
              <p className="text-xs text-nala-muted">
                {review.source || 'Google'} · {review.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
