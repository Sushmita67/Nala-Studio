import { create } from 'zustand';
import type { ServiceCategory } from '../types';

export type BookingStep =
  | 'category'
  | 'services'
  | 'staff'
  | 'datetime'
  | 'details'
  | 'review'
  | 'confirmed';

interface BookingDraft {
  category: ServiceCategory | null;
  serviceIds: string[];
  staffId: string | null;
  noPreference: boolean;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string;
  reference: string | null;
}

interface BookingFlowState {
  step: BookingStep;
  draft: BookingDraft;
  setStep: (step: BookingStep) => void;
  setCategory: (category: ServiceCategory | null) => void;
  toggleService: (id: string) => void;
  setServices: (ids: string[]) => void;
  setStaff: (staffId: string | null, noPreference?: boolean) => void;
  setDateTime: (date: string, time: string) => void;
  setDetails: (details: Partial<Pick<BookingDraft, 'customerName' | 'phone' | 'email' | 'notes'>>) => void;
  setReference: (reference: string) => void;
  reset: () => void;
}

const emptyDraft = (): BookingDraft => ({
  category: null,
  serviceIds: [],
  staffId: null,
  noPreference: true,
  date: '',
  time: '',
  customerName: '',
  phone: '',
  email: '',
  notes: '',
  reference: null,
});

export const useBookingStore = create<BookingFlowState>((set) => ({
  step: 'category',
  draft: emptyDraft(),
  setStep: (step) => set({ step }),
  setCategory: (category) =>
    set((s) => ({
      draft: { ...s.draft, category, serviceIds: [] },
    })),
  toggleService: (id) =>
    set((s) => {
      const has = s.draft.serviceIds.includes(id);
      return {
        draft: {
          ...s.draft,
          serviceIds: has
            ? s.draft.serviceIds.filter((x) => x !== id)
            : [...s.draft.serviceIds, id],
        },
      };
    }),
  setServices: (ids) => set((s) => ({ draft: { ...s.draft, serviceIds: ids } })),
  setStaff: (staffId, noPreference = !staffId) =>
    set((s) => ({
      draft: { ...s.draft, staffId, noPreference },
    })),
  setDateTime: (date, time) => set((s) => ({ draft: { ...s.draft, date, time } })),
  setDetails: (details) => set((s) => ({ draft: { ...s.draft, ...details } })),
  setReference: (reference) => set((s) => ({ draft: { ...s.draft, reference } })),
  reset: () => set({ step: 'category', draft: emptyDraft() }),
}));
