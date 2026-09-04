import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../context/StudioContext';

const CoursesSection: React.FC = () => {
  const { activeCourses } = useStudio();

  if (!activeCourses.length) return null;

  return (
    <section id="courses" className="bg-nala-cream py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-12 max-w-2xl">
          <p className="section-label mb-4">Beauty Education</p>
          <h2 className="section-title mb-4">Learn the art of beauty</h2>
          <p className="prose-nala">
            NALA Studio runs professional nails and lashes courses for anyone building a career in
            beauty.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {activeCourses.map((course) => (
            <article
              key={course.id}
              className="overflow-hidden rounded-md border border-nala-border bg-nala-ivory"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-3xl text-nala-charcoal">{course.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-nala-muted">{course.description}</p>
                <div className="mt-5 flex flex-wrap gap-6 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-nala-muted">
                      Duration
                    </p>
                    <p className="mt-1 font-medium text-nala-charcoal">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-nala-muted">Fee</p>
                    <p className="mt-1 font-medium text-nala-charcoal">{course.price}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-nala-muted">
                    What you learn
                  </p>
                  <ul className="space-y-2">
                    {course.curriculum.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-nala-muted">
                        <span className="text-nala-rose">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact" className="btn-primary mt-8">
                  Enroll Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
