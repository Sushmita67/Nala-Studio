import React from 'react';
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';
import Container from './ui/Container';
import { tokens } from '../lib/design-tokens';
import { cn } from '../lib/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  align = 'left',
  className,
}) => {
  const centered = align === 'center';

  return (
    <header className={cn('border-b border-nala-border/70 bg-nala-soft', className)}>
      <Container className="pb-12 pt-10 md:pb-16 md:pt-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={cn(centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl')}>
          {eyebrow && <p className={cn(tokens.type.overline, 'mb-3')}>{eyebrow}</p>}
          <h1 className={cn(tokens.type.h1, 'text-balance')}>{title}</h1>
          {description && (
            <p className={cn(tokens.type.lead, 'mt-4', centered && 'mx-auto')}>{description}</p>
          )}
          {actions && (
            <div className={cn('mt-8 flex flex-wrap gap-3', centered && 'justify-center')}>
              {actions}
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default PageHeader;
