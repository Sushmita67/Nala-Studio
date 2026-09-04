import React from 'react';
import { useStudio } from '../context/StudioContext';

const InstagramSection: React.FC = () => {
  const { content, gallery } = useStudio();
  const images = gallery.filter((g) => g.featured).slice(0, 6);
  const display = images.length ? images : gallery.slice(0, 6);

  return (
    <section className="section-pad bg-nala-ivory">
      <div className="container-nala">
        <div className="mx-auto mb-10 max-w-content text-center sm:mb-12">
          <p className="section-label mb-3">{content.instagramHandle}</p>
          <h2 className="section-title text-balance">Follow NALA</h2>
          <a
            href={content.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary mt-6"
          >
            Open Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {display.map((item) => (
            <a
              key={item.id}
              href={content.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-nala-mist"
              aria-label={`View ${item.caption || 'studio work'} on Instagram`}
            >
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
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
