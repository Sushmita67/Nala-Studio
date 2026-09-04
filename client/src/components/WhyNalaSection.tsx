import React from 'react';

const benefits = [
  {
    num: '01',
    title: 'Beauty with Detail',
    text: 'Every treatment is carefully designed around you.',
  },
  {
    num: '02',
    title: 'Premium Experience',
    text: 'A comfortable, clean and modern beauty environment.',
  },
  {
    num: '03',
    title: 'Professional Craft',
    text: 'Beautiful results with attention to technique and detail.',
  },
  {
    num: '04',
    title: 'Learn with NALA',
    text: 'Professional nails and lashes courses are available.',
  },
];

const WhyNalaSection: React.FC = () => {
  return (
    <section className="bg-nala-ivory py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-12 max-w-xl">
          <p className="section-label mb-4">Why NALA</p>
          <h2 className="section-title">A studio built on care</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div key={item.num} className="border-t border-nala-border pt-6">
              <span className="text-xs font-medium tracking-[0.2em] text-nala-rose">{item.num}</span>
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
