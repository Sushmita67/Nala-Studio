import React from 'react';
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';

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
  className = '',
}) => {
  const centered = align === 'center';

  return (
    <header
      className={`border-b border-nala-border/60 bg-gradient-to-b from-nala-cream/80 to-nala-ivory ${className}`}
    >
      <div className="container-nala page-shell pb-10 sm:pb-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={centered ? 'mx-auto max-w-content text-center' : 'max-w-content'}>
          {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
          <h1 className="font-display text-display-lg text-balance text-nala-charcoal">{title}</h1>
          {description && (
            <p className={`prose-nala mt-4 ${centered ? 'mx-auto' : ''}`}>{description}</p>
          )}
          {actions && (
            <div
              className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
