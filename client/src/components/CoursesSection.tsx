import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useStudio } from '../context/StudioContext';
import SectionHeader from './SectionHeader';

const CoursesSection: React.FC = () => {
  const { activeCourses } = useStudio();
  const reduceMotion = useReducedMotion();

  if (!activeCourses.length) return null;

  return (
    <section id="courses" className="section-pad bg-nala-ivory">
      <div className="container-nala">
        <SectionHeader
          eyebrow="Beauty education"
          title="Learn the art of beauty"
          description="NALA Studio trains aspiring artists in nails and lashes — enquire to join the next cohort."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {activeCourses.map((course, i) => (
            <motion.article
              key={course.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] bg-nala-mist">
                <img
                  src={course.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="pt-6">
                <h3 className="font-display text-3xl text-nala-charcoal">{course.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-nala-muted">{course.description}</p>
                <dl className="mt-5 flex flex-wrap gap-8 text-sm">
                  <div>
                    <dt className="text-caption uppercase text-nala-muted">Duration</dt>
                    <dd className="mt-1 font-medium text-nala-charcoal">{course.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-caption uppercase text-nala-muted">Enrollment</dt>
                    <dd className="mt-1 font-medium text-nala-charcoal">Contact for pricing</dd>
                  </div>
                </dl>
                <ul className="mt-6 space-y-2">
                  {course.curriculum.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-nala-muted">
                      <span className="text-nala-rose" aria-hidden>
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-primary mt-8">
                  Enquire to enroll
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
