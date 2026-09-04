import React from 'react';
import { useStudio } from '../context/StudioContext';

const InstagramSection: React.FC = () => {
  const { content, gallery } = useStudio();
  const images = gallery.filter((g) => g.featured).slice(0, 6);
  const display = images.length ? images : gallery.slice(0, 6);

  return (
    <section className="bg-nala-ivory py-20 lg:py-28">
      <div className="container-nala">
        <div className="mb-10 text-center">
          <p className="section-label mb-3">{content.instagramHandle}</p>
          <h2 className="section-title mb-4">Follow NALA</h2>
          <a
            href={content.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {display.map((item) => (
            <a
              key={item.id}
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group aspect-square overflow-hidden rounded-sm"
            >
              <img
                src={item.src}
                alt={item.caption || 'NALA Instagram'}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
