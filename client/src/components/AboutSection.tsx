import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import Button from './ui/Button';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import { tokens } from '../lib/design-tokens';
import { cn, EASE } from '../lib/cn';

const AboutSection: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { content } = useStudio();
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className={cn(compact ? tokens.section.sm : tokens.section.md, 'bg-nala-ivory')}
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="order-2 lg:order-1 lg:col-span-6" direction="left">
            <p className={cn(tokens.type.overline, 'mb-3')}>Introducing NALA</p>
            <h2 className={cn(tokens.type.h2, 'mb-5 text-balance')}>{content.aboutHeading}</h2>
            <p className={cn(tokens.type.lead, 'mb-8')}>{content.aboutDescription}</p>
            {!compact && (
              <Button to="/about" variant="secondary">
                Our story
                <ArrowRight size={16} />
              </Button>
            )}
          </FadeIn>

          <FadeIn className="order-1 lg:order-2 lg:col-span-6" direction="right" delay={0.08}>
            <div className="image-frame overflow-hidden bg-nala-mist">
              <motion.img
                src={content.aboutImage}
                alt="Inside NALA Studio"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                loading="lazy"
                initial={reduce ? false : { scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
