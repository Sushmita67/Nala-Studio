import { STORAGE_KEY } from '../config';
import type { StudioData } from '../types';
import { createSeedData } from '../data/seed';
import {
  loadStudioData as repoLoad,
  saveStudioData as repoSave,
  resetStudioData as repoReset,
} from '../services/studioRepository';

/** @deprecated Prefer services/studioRepository — kept for existing imports */
export function loadStudioData(): StudioData {
  return repoLoad();
}

export function saveStudioData(data: StudioData): void {
  repoSave(data);
}

export function resetStudioData(): StudioData {
  return repoReset();
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Admin-only helper — never call from public UI components */
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

export function nextCertificateNumber(
  prefix: string,
  counter: number,
  year = new Date().getFullYear()
): string {
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
export async function optimizeImageFile(
  file: File,
  maxWidth = 1600,
  quality = 0.82
): Promise<string> {
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

// Re-export seed factory for tooling
export { createSeedData, STORAGE_KEY };
