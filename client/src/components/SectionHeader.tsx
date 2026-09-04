import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className = '',
  id,
}) => {
  const centered = align === 'center';

  return (
    <div
      className={`mb-10 sm:mb-12 ${
        action ? 'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between' : ''
      } ${className}`}
    >
      <div className={centered && !action ? 'mx-auto max-w-content text-center' : 'max-w-content'}>
        {eyebrow && <p className="section-label mb-3">{eyebrow}</p>}
        <h2 id={id} className="section-title text-balance">
          {title}
        </h2>
        {description && (
          <p className={`prose-nala mt-4 ${centered && !action ? 'mx-auto' : ''}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
