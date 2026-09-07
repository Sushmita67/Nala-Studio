import React, { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { tokens } from '../../lib/design-tokens';

type Size = keyof typeof tokens.container;

interface ContainerProps {
  children: ReactNode;
  size?: Size;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'default',
  className,
  as: Tag = 'div',
}) => {
  return <Tag className={cn(tokens.container[size], className)}>{children}</Tag>;
};

export default Container;
