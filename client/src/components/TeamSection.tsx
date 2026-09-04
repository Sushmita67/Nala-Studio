import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';

const TeamSection: React.FC = () => {
  const { staff } = useStudio();
  const reduceMotion = useReducedMotion();

  if (!staff.length) return null;

  return (
    <section className="section-pad bg-nala-soft">
      <div className="container-nala">
        <SectionHeader
          eyebrow="The team"
          title="Artists behind NALA"
          description="Experienced nail, lash and makeup artists dedicated to a calm, premium studio experience."
          align="center"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member, i) => (
            <motion.article
              key={member.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center"
            >
              <div className="mx-auto aspect-[4/5] max-w-[280px] overflow-hidden rounded-[var(--radius-sm)] bg-nala-mist">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl text-nala-charcoal">{member.name}</h3>
              <p className="mt-1 text-caption uppercase text-nala-rose">{member.title}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-nala-muted">{member.bio}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
