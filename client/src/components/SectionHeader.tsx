import React, { type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { tokens } from '../lib/design-tokens';
import FadeIn from './ui/FadeIn';

interface SectionHeaderProps {
  eyebrow?: string;
  overline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
  light?: boolean;
  id?: string;
}

/** Shared section header — supports both `eyebrow` and `overline` for compatibility */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  overline,
  title,
  description,
  align = 'left',
  action,
  className,
  light,
  id,
}) => {
  const label = overline || eyebrow;
  const centered = align === 'center';

  return (
    <FadeIn
      className={cn(
        'mb-10 md:mb-14',
        action && 'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className={cn(centered && !action && 'mx-auto max-w-2xl text-center')}>
        {label && (
          <p className={cn(tokens.type.overline, 'mb-3', light && 'text-nala-blush')}>{label}</p>
        )}
        <h2
          id={id}
          className={cn(
            tokens.type.h2,
            'text-balance',
            light ? 'text-nala-ivory' : 'text-nala-charcoal'
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              tokens.type.lead,
              'mt-4 max-w-xl',
              centered && !action && 'mx-auto',
              light && 'text-nala-beige'
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </FadeIn>
  );
};

export default SectionHeader;
