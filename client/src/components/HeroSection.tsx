import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';

const HeroSection: React.FC = () => {
  const { content } = useStudio();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-nala-cream">
      <div className="absolute inset-0">
        <motion.img
          src={content.heroImage}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
          initial={reduceMotion ? false : { scale: 1.05, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nala-ivory via-nala-ivory/75 to-nala-ivory/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-nala-ivory/90 via-transparent to-nala-ivory/40" />
      </div>

      <div className="container-nala relative flex min-h-[100svh] flex-col justify-end pb-28 pt-28 sm:justify-center sm:pb-24 lg:pb-28">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="section-label mb-4">NALA Studio · Kathmandu</p>
          <h1 className="font-display text-display-xl text-balance text-nala-charcoal">
            {content.heroTitle}
          </h1>
          <p className="mt-5 max-w-measure text-base text-nala-muted sm:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/book" className="btn-primary">
              {content.heroCtaPrimary}
            </Link>
            <Link to="/services" className="btn-secondary">
              {content.heroCtaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
