import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

const HeroSection: React.FC = () => {
  const { content } = useStudio();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-nala-cream">
      <div className="absolute inset-0">
        <img
          src={content.heroImage}
          alt="NALA Studio beauty treatments"
          className="h-full w-full object-cover object-center animate-reveal"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nala-ivory/95 via-nala-ivory/70 to-nala-ivory/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-nala-ivory/80 via-transparent to-nala-ivory/30" />
      </div>

      <div className="container-nala relative flex min-h-[100svh] flex-col justify-end pb-24 pt-28 sm:justify-center sm:pb-20 lg:pb-24">
        <p className="section-label mb-5 animate-fade-up">Nails · Lashes · Makeup · Kathmandu</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-nala-charcoal animate-fade-up sm:text-6xl lg:text-7xl [animation-delay:100ms]">
          {content.heroTitle}
        </h1>
        <p className="mt-5 max-w-xl text-base text-nala-muted animate-fade-up sm:text-lg [animation-delay:180ms]">
          {content.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up [animation-delay:260ms]">
          <Link to="/book" className="btn-primary">
            {content.heroCtaPrimary}
          </Link>
          <Link to="/services" className="btn-secondary">
            {content.heroCtaSecondary}
          </Link>
        </div>
        <p className="mt-8 text-sm text-nala-muted animate-fade-up [animation-delay:340ms]">
          NALA Studio — {content.addressLine1}, {content.addressLine2.replace(', Nepal', '')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
