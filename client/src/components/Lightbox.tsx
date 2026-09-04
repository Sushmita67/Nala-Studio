import React, { useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '../types';

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onChange }) => {
  const current = images[index];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = useCallback(() => {
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  const next = useCallback(() => {
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [next, onClose, prev]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-nala-charcoal/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const delta = e.changedTouches[0].clientX - touchStart;
          if (delta > 50) prev();
          if (delta < -50) next();
          setTouchStart(null);
        }}
      >
        <img
          src={current.src}
          alt={current.caption}
          className="max-h-[75vh] w-full rounded-sm object-contain"
        />
        {current.caption && (
          <p className="mt-4 text-center text-sm text-nala-cream">{current.caption}</p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
