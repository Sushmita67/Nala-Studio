import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

const InstagramSection: React.FC = () => {
  const { content, gallery } = useStudio();
  const images = gallery.filter((g) => g.featured).slice(0, 6);
  const display = images.length ? images : gallery.slice(0, 6);

  return (
    <section className={cn(tokens.section.md, 'bg-nala-ivory')}>
      <Container>
        <FadeIn className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className={cn(tokens.type.overline, 'mb-3')}>{content.instagramHandle}</p>
          <h2 className={cn(tokens.type.h2, 'text-balance')}>Follow NALA</h2>
          <Button href={content.instagramUrl} variant="secondary" className="mt-7">
            Open Instagram
            <ArrowUpRight size={16} />
          </Button>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {display.map((item, i) => (
            <FadeIn key={item.id} delay={Math.min(i * 0.05, 0.25)}>
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group image-frame block aspect-square overflow-hidden bg-nala-mist"
                aria-label={`View ${item.caption || 'studio work'} on Instagram`}
              >
                <img
                  src={item.src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </a>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default InstagramSection;
