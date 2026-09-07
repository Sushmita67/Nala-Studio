import React from 'react';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

const TeamSection: React.FC = () => {
  const { staff } = useStudio();

  if (!staff.length) return null;

  return (
    <section className={cn(tokens.section.md, 'bg-nala-soft')}>
      <Container>
        <SectionHeader
          eyebrow="The team"
          title="Artists behind NALA"
          description="Experienced nail, lash and makeup artists dedicated to a calm, premium studio experience."
          align="center"
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {staff.map((member, i) => (
            <FadeIn key={member.id} delay={i * 0.08}>
              <article className="group text-center">
                <div className="image-frame mx-auto aspect-[4/5] max-w-[280px] overflow-hidden bg-nala-mist">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <h3 className={cn(tokens.type.h3, 'mt-5')}>{member.name}</h3>
                <p className={cn(tokens.type.overline, 'mt-1')}>{member.title}</p>
                <p className={cn(tokens.type.body, 'mx-auto mt-3 max-w-sm text-sm')}>
                  {member.bio}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
