import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

const AboutSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { content } = useStudio();

  return (
    <section id="about" className={`${compact ? 'section-pad-sm' : 'section-pad'} bg-nala-ivory`}>
      <div className="container-nala grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <p className="section-label mb-3">Introducing NALA</p>
          <h2 className="section-title mb-5 text-balance">{content.aboutHeading}</h2>
          <p className="prose-nala mb-8">{content.aboutDescription}</p>
          {!compact && (
            <Link to="/about" className="btn-secondary">
              Our story
            </Link>
          )}
        </div>
        <div className="order-1 overflow-hidden rounded-[var(--radius-sm)] lg:order-2 lg:col-span-6">
          <img
            src={content.aboutImage}
            alt="Inside NALA Studio"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
