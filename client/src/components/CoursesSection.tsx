import React from 'react';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

const CoursesSection: React.FC = () => {
  const { activeCourses } = useStudio();

  if (!activeCourses.length) return null;

  return (
    <section id="courses" className={cn(tokens.section.md, 'bg-nala-ivory')}>
      <Container>
        <SectionHeader
          eyebrow="Beauty education"
          title="Learn the art of beauty"
          description="NALA Studio trains aspiring artists in nails and lashes — enquire to join the next cohort."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          {activeCourses.map((course, i) => (
            <FadeIn key={course.id} delay={i * 0.08}>
              <article className="group">
                <div className="image-frame aspect-[16/10] overflow-hidden bg-nala-mist">
                  <img
                    src={course.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="pt-6">
                  <h3 className={tokens.type.h2}>{course.name}</h3>
                  <p className={cn(tokens.type.body, 'mt-3 text-sm md:text-base')}>
                    {course.description}
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-8 text-sm">
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-nala-muted">
                        Duration
                      </dt>
                      <dd className="mt-1 font-medium text-nala-charcoal">{course.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-nala-muted">
                        Enrollment
                      </dt>
                      <dd className="mt-1 font-medium text-nala-charcoal">Contact for pricing</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 space-y-2.5">
                    {course.curriculum.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-nala-muted">
                        <span className="text-nala-rose" aria-hidden>
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button to="/contact" className="mt-8">
                    Enquire to enroll
                  </Button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoursesSection;
