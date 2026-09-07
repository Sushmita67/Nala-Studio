import React from 'react';
import SectionHeader from './SectionHeader';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

const benefits = [
  {
    num: '01',
    title: 'Beauty with detail',
    text: 'Every treatment is carefully designed around you.',
  },
  {
    num: '02',
    title: 'Premium experience',
    text: 'A comfortable, clean and modern beauty environment.',
  },
  {
    num: '03',
    title: 'Professional craft',
    text: 'Beautiful results with attention to technique and finish.',
  },
  {
    num: '04',
    title: 'Learn with NALA',
    text: 'Professional nails and lashes courses are available.',
  },
];

const WhyNalaSection: React.FC = () => {
  return (
    <section className={cn(tokens.section.md, 'bg-nala-cream')}>
      <Container>
        <SectionHeader eyebrow="Why NALA" title="A studio built on care" />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => (
            <FadeIn key={item.num} delay={i * 0.08}>
              <div className="border-t border-nala-border pt-6">
                <span className={tokens.type.overline}>{item.num}</span>
                <h3 className={cn(tokens.type.h3, 'mt-3')}>{item.title}</h3>
                <p className={cn(tokens.type.body, 'mt-3 text-sm')}>{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyNalaSection;
