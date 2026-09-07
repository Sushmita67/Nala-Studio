import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useForm as useFormspree } from '@formspree/react';
import { useStudio } from '../context/StudioContext';
import { useBookingStore } from '../stores/useBookingStore';
import { bookingService } from '../services';
import type { ServiceCategory } from '../types';

interface BookingProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const categories: { id: ServiceCategory; label: string }[] = [
  { id: 'lashes', label: 'Eyelash Extensions' },
  { id: 'gel-nails', label: 'Gel Nails & Extensions' },
  { id: 'pedicure', label: 'Pedicure' },
  { id: 'manicure', label: 'Manicure' },
  { id: 'courses', label: 'Courses' },
];

const detailsSchema = z.object({
  customerName: z.string().min(2, 'Please enter your name'),
  phone: z
    .string()
    .min(9, 'Enter a valid phone number')
    .refine((v) => {
      const cleaned = v.replace(/[\s-]/g, '');
      return /^(?:\+?977)?9\d{9}$/.test(cleaned) || /^0?\d{9,10}$/.test(cleaned);
    }, 'Enter a valid Nepal phone number'),
  email: z.string().email('Enter a valid email'),
  notes: z.string().optional(),
});

type DetailsForm = z.infer<typeof detailsSchema>;

const stepOrder = [
  'category',
  'services',
  'datetime',
  'details',
  'review',
  'confirmed',
] as const;

const stepLabels = [
  'Category',
  'Services',
  'Date & Time',
  'Details',
  'Review',
  'Done',
];

const Booking: React.FC<BookingProps> = ({ showToast }) => {
  const [searchParams] = useSearchParams();
  const { activeServices, settings, formatDuration, addBooking } = useStudio();
  const [formspreeState, handleFormspree] = useFormspree(settings.formspreeFormId || 'manppgvr');
  const [submitting, setSubmitting] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const {
    step,
    draft,
    setStep,
    setCategory,
    toggleService,
    setServices,
    setStaff,
    setDateTime,
    setDetails,
    setReference,
    reset,
  } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      customerName: draft.customerName,
      phone: draft.phone,
      email: draft.email,
      notes: draft.notes,
    },
  });

  // Prefill from ?service=
  useEffect(() => {
    const sid = searchParams.get('service');
    if (!sid) return;
    const svc = activeServices.find((s) => s.id === sid);
    if (!svc) return;
    setCategory(svc.category);
    setServices([svc.id]);
    setStaff(null, true);
    setStep('datetime');
  }, [searchParams, activeServices, setCategory, setServices, setStaff, setStep]);

  // Skip legacy artist step if store still has it
  useEffect(() => {
    if (step === 'staff') {
      setStaff(null, true);
      setStep('datetime');
    }
  }, [step, setStaff, setStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const selectedServices = useMemo(
    () => activeServices.filter((s) => draft.serviceIds.includes(s.id)),
    [activeServices, draft.serviceIds]
  );

  const categoryServices = useMemo(() => {
    if (!draft.category) return activeServices;
    return activeServices.filter((s) => s.category === draft.category);
  }, [activeServices, draft.category]);

  const availableSlots = useMemo(() => {
    if (!draft.date) return [];
    return bookingService.getAvailableSlots(
      draft.date,
      null,
      settings.bookingTimeSlots
    );
  }, [draft.date, settings.bookingTimeSlots]);

  const stepIndex = stepOrder.indexOf(step);

  const goNext = () => {
    const next = stepOrder[Math.min(stepIndex + 1, stepOrder.length - 1)];
    setStep(next);
  };

  const goBack = () => {
    if (step === 'confirmed') return;
    const prev = stepOrder[Math.max(stepIndex - 1, 0)];
    setStep(prev);
  };

  const formatDisplayDate = (iso: string) => {
    if (!iso) return '';
    return new Date(`${iso}T12:00:00`).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cells: { date: string; day: number; disabled: boolean }[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ date: '', day: 0, disabled: true });
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const y = dateObj.getFullYear();
      const m = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(d).padStart(2, '0');
      const iso = `${y}-${m}-${day}`;
      cells.push({ date: iso, day: d, disabled: dateObj < today });
    }
    return cells;
  }, [calendarMonth]);

  const onDetailsSubmit = (values: DetailsForm) => {
    setDetails({
      customerName: values.customerName,
      phone: values.phone,
      email: values.email,
      notes: values.notes || '',
    });
    setStep('review');
  };

  const confirmBooking = async () => {
    if (!selectedServices.length || !draft.date || !draft.time) return;
    setSubmitting(true);
    try {
      const serviceName = selectedServices.map((s) => s.name).join(' + ');
      const preferredArtist = 'No preference';

      const booking = await addBooking({
        serviceIds: draft.serviceIds,
        serviceId: draft.serviceIds[0],
        serviceName,
        date: draft.date,
        time: draft.time,
        customerName: draft.customerName,
        phone: draft.phone,
        email: draft.email,
        message: draft.notes,
        preferredArtist,
        staffId: null,
        totalPrice: null,
        status: 'pending',
      });

      setReference(booking.reference);

      const formData = new FormData();
      formData.append('name', draft.customerName);
      formData.append('email', draft.email);
      formData.append('phone', draft.phone);
      formData.append('service', serviceName);
      formData.append('date', draft.date);
      formData.append('time', draft.time);
      formData.append('artist', preferredArtist);
      formData.append('reference', booking.reference);
      formData.append(
        'message',
        `Booking ${booking.reference}: ${serviceName} on ${draft.date} at ${draft.time}. Notes: ${draft.notes}`
      );
      formData.append('_subject', `NALA Booking — ${booking.reference}`);
      await handleFormspree(formData);

      setStep('confirmed');
      showToast('Booking request submitted.', 'success');
    } catch {
      showToast('Could not complete booking. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    reset();
    resetForm();
  };

  return (
    <div className="container-nala py-10 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="section-label mb-3">Book</p>
        <h1 className="section-title mb-2">Book an appointment</h1>
        <p className="prose-nala mb-8">
          Choose your services, preferred artist and a time that works. Contact us for pricing.
        </p>

        {/* Progress */}
        <div className="mb-10">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-nala-muted">
                Step {Math.min(stepIndex + 1, stepLabels.length)} of {stepLabels.length}
              </p>
              <p className="mt-1 font-display text-xl text-nala-charcoal sm:text-2xl">
                {stepLabels[Math.min(stepIndex, stepLabels.length - 1)]}
              </p>
            </div>
            <p className="hidden text-sm text-nala-muted sm:block">
              {Math.round(((stepIndex + (step === 'confirmed' ? 1 : 0)) / stepLabels.length) * 100)}%
            </p>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-nala-mist"
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={stepLabels.length}
            aria-label="Booking progress"
          >
            <motion.div
              className="h-full rounded-full bg-nala-rose"
              initial={false}
              animate={{
                width: `${((stepIndex + (step === 'confirmed' ? 1 : 0.35)) / stepLabels.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <ol className="mt-4 hidden items-center gap-1 sm:flex" aria-hidden>
            {stepLabels.map((label, i) => (
              <li key={label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                <span
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    i <= stepIndex ? 'bg-nala-charcoal' : 'bg-nala-border'
                  }`}
                />
                <span
                  className={`truncate text-xs uppercase tracking-[0.1em] ${
                    i === stepIndex
                      ? 'font-medium text-nala-charcoal'
                      : i < stepIndex
                        ? 'text-nala-brown'
                        : 'text-nala-muted/70'
                  }`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-md border border-nala-border bg-nala-ivory p-5 sm:p-8"
          >
            {step === 'category' && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl">What are you looking for?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        setStep('services');
                      }}
                      className="rounded-md border border-nala-border px-5 py-6 text-left transition hover:border-nala-blush hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nala-blush"
                    >
                      <span className="font-display text-xl">{cat.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setCategory(null);
                    setStep('services');
                  }}
                >
                  Browse all services →
                </button>
              </div>
            )}

            {step === 'services' && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl">Select service(s)</h2>
                <p className="text-sm text-nala-muted">You can select more than one.</p>
                <div className="space-y-3">
                  {categoryServices.map((item) => {
                    const selected = draft.serviceIds.includes(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleService(item.id)}
                        className={`flex w-full items-start gap-4 rounded-md border p-4 text-left transition ${
                          selected
                            ? 'border-nala-charcoal bg-nala-soft'
                            : 'border-nala-border hover:border-nala-blush'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-16 w-16 rounded-sm object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-nala-charcoal">{item.name}</p>
                          <p className="mt-1 text-sm text-nala-muted">{item.description}</p>
                          <p className="mt-2 inline-flex items-center gap-1 text-xs text-nala-muted">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDuration(item.duration, item.durationLabel)}
                          </p>
                        </div>
                        <span
                          className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-nala-charcoal bg-nala-charcoal text-nala-ivory'
                              : 'border-nala-border'
                          }`}
                        >
                          {selected && <Check className="h-3 w-3" />}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="flex justify-between gap-3 pt-2">
                  <button type="button" className="btn-ghost" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={!draft.serviceIds.length}
                    onClick={() => {
                      setStaff(null, true);
                      setStep('datetime');
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 'datetime' && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl">Pick a date & time</h2>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-sm p-2 hover:bg-nala-mist"
                    aria-label="Previous month"
                    onClick={() =>
                      setCalendarMonth(
                        (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <p className="font-medium">
                    {calendarMonth.toLocaleDateString(undefined, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <button
                    type="button"
                    className="rounded-sm p-2 hover:bg-nala-mist"
                    aria-label="Next month"
                    onClick={() =>
                      setCalendarMonth(
                        (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
                      )
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wider text-nala-muted">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <div key={d} className="py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((cell, i) =>
                    cell.day === 0 ? (
                      <div key={`e-${i}`} />
                    ) : (
                      <button
                        key={cell.date}
                        type="button"
                        disabled={cell.disabled}
                        onClick={() => setDateTime(cell.date, '')}
                        className={`aspect-square rounded-sm text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nala-blush ${
                          cell.disabled
                            ? 'cursor-not-allowed text-nala-border'
                            : draft.date === cell.date
                              ? 'bg-nala-charcoal text-nala-ivory'
                              : 'hover:bg-nala-mist'
                        }`}
                      >
                        {cell.day}
                      </button>
                    )
                  )}
                </div>

                {draft.date && (
                  <div>
                    <p className="mb-3 text-sm text-nala-muted">
                      Available times for {formatDisplayDate(draft.date)}
                    </p>
                    {availableSlots.length === 0 ? (
                      <p className="rounded-md bg-nala-mist px-4 py-6 text-center text-sm text-nala-muted">
                        Fully booked this day — please choose another date.
                      </p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {availableSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setDateTime(draft.date, t)}
                            className={`rounded-sm border px-3 py-3 text-sm transition ${
                              draft.time === t
                                ? 'border-nala-charcoal bg-nala-charcoal text-nala-ivory'
                                : 'border-nala-border hover:border-nala-blush'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between gap-3 pt-2">
                  <button type="button" className="btn-ghost" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={!draft.date || !draft.time}
                    onClick={goNext}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 'details' && (
              <form className="space-y-5" onSubmit={handleSubmit(onDetailsSubmit)}>
                <h2 className="font-display text-2xl">Your details</h2>
                <div>
                  <label className="label-nala" htmlFor="customerName">
                    Full name
                  </label>
                  <input
                    id="customerName"
                    className="input-nala"
                    autoComplete="name"
                    {...register('customerName')}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
                  )}
                </div>
                <div>
                  <label className="label-nala" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="input-nala"
                    autoComplete="tel"
                    inputMode="tel"
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="label-nala" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-nala"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="label-nala" htmlFor="notes">
                    Notes (optional)
                  </label>
                  <textarea id="notes" rows={3} className="input-nala" {...register('notes')} />
                </div>
                <div className="flex justify-between gap-3 pt-2">
                  <button type="button" className="btn-ghost" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Review
                  </button>
                </div>
              </form>
            )}

            {step === 'review' && (
              <div className="space-y-5">
                <h2 className="font-display text-2xl">Review & confirm</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                    <dt className="text-nala-muted">Services</dt>
                    <dd className="text-right font-medium">
                      {selectedServices.map((s) => s.name).join(' + ')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                    <dt className="text-nala-muted">When</dt>
                    <dd className="font-medium">
                      {formatDisplayDate(draft.date)} · {draft.time}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                    <dt className="text-nala-muted">Name</dt>
                    <dd className="font-medium">{draft.customerName}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-nala-border/60 py-2">
                    <dt className="text-nala-muted">Contact</dt>
                    <dd className="text-right font-medium">
                      {draft.phone}
                      <br />
                      {draft.email}
                    </dd>
                  </div>
                </dl>
                <p className="text-xs text-nala-muted">
                  No prices are shown online — we&apos;ll confirm details with you after your
                  request.
                </p>
                {formspreeState.errors && (
                  <p className="text-sm text-amber-700">
                    Your booking is saved locally; email notify may have failed.
                  </p>
                )}
                <div className="flex justify-between gap-3 pt-2">
                  <button type="button" className="btn-ghost" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={submitting}
                    onClick={confirmBooking}
                  >
                    {submitting ? 'Submitting…' : 'Confirm booking'}
                  </button>
                </div>
              </div>
            )}

            {step === 'confirmed' && (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check className="h-7 w-7" />
                </div>
                <h2 className="font-display text-3xl">You&apos;re booked</h2>
                <p className="text-nala-muted">
                  We&apos;ve received your request and will confirm shortly by phone or message.
                </p>
                <p className="rounded-md bg-nala-soft px-4 py-3 font-medium tracking-wide">
                  Reference: {draft.reference}
                </p>
                <button type="button" className="btn-primary" onClick={startOver}>
                  Book another
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking;
