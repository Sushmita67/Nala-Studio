import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

/** Premium mid-page CTA strip — example-client CtaStrip quality, Nala brand */
const CtaStrip: React.FC = () => {
  return (
    <section className={cn(tokens.section.sm, 'border-y border-nala-border bg-nala-charcoal')}>
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className={cn(tokens.type.overline, 'mb-3 text-nala-blush')}>Ready when you are</p>
              <h2 className={cn(tokens.type.h2, 'text-balance text-nala-ivory')}>
                Book your next visit to NALA
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/book" variant="inverse" size="lg" className="rounded-full">
                Book appointment
                <ArrowRight size={18} />
              </Button>
              <Button
                to="/contact"
                size="lg"
                variant="outline"
                className="rounded-full !border-nala-ivory/40 !text-nala-ivory hover:!border-nala-ivory hover:!bg-nala-ivory hover:!text-nala-charcoal"
              >
                Contact studio
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};

export default CtaStrip;
