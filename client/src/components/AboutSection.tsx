import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

const AboutSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { content } = useStudio();

  return (
    <section id="about" className={`${compact ? 'py-16' : 'py-20 lg:py-28'} bg-nala-ivory`}>
      <div className="container-nala grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="section-label mb-4">Introducing NALA</p>
          <h2 className="section-title mb-6">{content.aboutHeading}</h2>
          <p className="prose-nala mb-8">{content.aboutDescription}</p>
          {!compact && (
            <Link to="/about" className="btn-secondary">
              Meet NALA
            </Link>
          )}
        </div>
        <div className="order-1 overflow-hidden rounded-sm lg:order-2">
          <img
            src={content.aboutImage}
            alt="Inside NALA Studio"
            className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
