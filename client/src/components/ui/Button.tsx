import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { tokens } from '../../lib/design-tokens';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-nala-charcoal text-nala-ivory hover:bg-nala-brown shadow-sm hover:shadow-md border border-transparent',
  secondary:
    'bg-transparent text-nala-charcoal border border-nala-charcoal/25 hover:border-nala-charcoal hover:bg-nala-charcoal hover:text-nala-ivory',
  outline:
    'bg-transparent text-nala-charcoal border-2 border-nala-charcoal hover:bg-nala-charcoal hover:text-nala-ivory',
  ghost: 'bg-transparent text-nala-muted hover:text-nala-charcoal',
  inverse:
    'bg-nala-ivory text-nala-charcoal hover:bg-white border border-nala-ivory/20 shadow-md',
};

const sizes: Record<Size, string> = {
  sm: 'text-[11px] px-4 py-2 rounded-full tracking-[0.1em]',
  md: 'text-[11px] px-5 py-2.5 rounded-full tracking-[0.12em]',
  lg: 'text-xs px-7 py-3 rounded-full tracking-[0.12em]',
};

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  disabled,
  ...rest
}) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium uppercase transition-all',
    tokens.transition.base,
    tokens.focus,
    'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const external = /^https?:/i.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
