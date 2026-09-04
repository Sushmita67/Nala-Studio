import { STORAGE_KEY } from '../config';
import type { StudioData } from '../types';
import { createSeedData } from '../data/seed';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function loadStudioData(): StudioData {
  const seed = createSeedData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Partial<StudioData>;
    if (!isObject(parsed)) return seed;

    return {
      ...seed,
      ...parsed,
      services: Array.isArray(parsed.services) ? parsed.services : seed.services,
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : seed.gallery,
      courses: Array.isArray(parsed.courses) ? parsed.courses : seed.courses,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : seed.testimonials,
      certificates: Array.isArray(parsed.certificates) ? parsed.certificates : seed.certificates,
      bookings: Array.isArray(parsed.bookings) ? parsed.bookings : seed.bookings,
      media: Array.isArray(parsed.media) ? parsed.media : seed.media,
      content: { ...seed.content, ...(parsed.content || {}) },
      settings: { ...seed.settings, ...(parsed.settings || {}) },
      certificateCounter:
        typeof parsed.certificateCounter === 'number'
          ? parsed.certificateCounter
          : seed.certificateCounter,
    };
  } catch {
    return seed;
  }
}

export function saveStudioData(data: StudioData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetStudioData(): StudioData {
  const seed = createSeedData();
  saveStudioData(seed);
  return seed;
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatPrice(price: number | null, label?: string): string {
  if (label) return label;
  if (price === null || price === undefined) return 'On request';
  return `NPR ${price.toLocaleString()}`;
}

export function formatDuration(duration: number | null, label?: string): string {
  if (label) return label;
  if (duration === null || duration === undefined) return 'Flexible';
  return `${duration} min`;
}

export function nextCertificateNumber(prefix: string, counter: number, year = new Date().getFullYear()): string {
  return `${prefix}-${year}-${String(counter).padStart(4, '0')}`;
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Compress image for localStorage-friendly storage */
export async function optimizeImageFile(file: File, maxWidth = 1600, quality = 0.82): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  if (!file.type.startsWith('image/')) return dataUrl;

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
