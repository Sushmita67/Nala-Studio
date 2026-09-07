import React, { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { tokens } from '../../lib/design-tokens';
import Container from './Container';
import FadeIn from './FadeIn';

type Bg = 'ivory' | 'soft' | 'cream' | 'charcoal';

const bgMap: Record<Bg, string> = {
  ivory: tokens.surface.page,
  soft: tokens.surface.muted,
  cream: tokens.surface.cream,
  charcoal: tokens.surface.dark,
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: Bg;
  size?: keyof typeof tokens.section;
  container?: boolean;
  reveal?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  background = 'ivory',
  size = 'md',
  container = true,
  reveal = true,
}) => {
  const inner = container ? <Container>{children}</Container> : children;
  const content = reveal ? <FadeIn>{inner}</FadeIn> : inner;

  return (
    <section id={id} className={cn(tokens.section[size], bgMap[background], className)}>
      {content}
    </section>
  );
};

export default Section;
