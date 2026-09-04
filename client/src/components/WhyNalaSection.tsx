import React from 'react';
import SectionHeader from './SectionHeader';

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
    <section className="section-pad bg-nala-cream">
      <div className="container-nala">
        <SectionHeader eyebrow="Why NALA" title="A studio built on care" />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div key={item.num} className="border-t border-nala-border pt-6">
              <span className="text-caption font-medium uppercase text-nala-rose">{item.num}</span>
              <h3 className="mt-3 font-display text-2xl text-nala-charcoal">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-nala-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNalaSection;
