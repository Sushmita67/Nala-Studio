import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Signature ease from example-client — soft decelerating premium curve */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING = { type: 'spring' as const, stiffness: 380, damping: 32 };
