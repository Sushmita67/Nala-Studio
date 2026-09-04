import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const tone = {
  success: {
    wrap: 'border-nala-border bg-nala-ivory text-nala-charcoal',
    icon: 'text-emerald-700',
  },
  error: {
    wrap: 'border-red-200 bg-red-50 text-red-900',
    icon: 'text-red-700',
  },
  info: {
    wrap: 'border-nala-border bg-nala-soft text-nala-charcoal',
    icon: 'text-nala-brown',
  },
} as const;

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : Info;
  const styles = tone[type];

  return (
    <div
      className="fixed right-4 top-24 z-toast max-w-sm animate-fade-up"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-start gap-3 rounded-[var(--radius-sm)] border px-4 py-3 shadow-lift ${styles.wrap}`}
      >
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${styles.icon}`} aria-hidden />
        <p className="flex-1 text-sm leading-relaxed">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-sm p-1 text-nala-muted transition hover:text-nala-charcoal"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
};

export default Toast;
