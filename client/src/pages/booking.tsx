import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useForm } from '@formspree/react';
import { useStudio } from '../context/StudioContext';

interface BookingProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const steps = [
  'Choose a Service',
  'Choose Your Date',
  'Choose Preferred Time',
  'Your Details',
  'Confirm Appointment',
];

const Booking: React.FC<BookingProps> = ({ showToast }) => {
  const [searchParams] = useSearchParams();
  const { activeServices, settings, formatPrice, formatDuration, addBooking } = useStudio();
  const [state, handleSubmit] = useForm(settings.formspreeFormId || 'manppgvr');

  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(searchParams.get('service') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [artist, setArtist] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const submittedRef = useRef(false);

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const service = useMemo(
    () => activeServices.find((s) => s.id === serviceId),
    [activeServices, serviceId]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, succeeded]);

  useEffect(() => {
    if (state.succeeded && !succeeded) {
      setSucceeded(true);
      setSubmitting(false);
    }
    if (state.errors && submitting) {
      setSubmitting(false);
      showToast('There was an error submitting your booking. Please try again.', 'error');
    }
  }, [state.succeeded, state.errors, succeeded, submitting, showToast]);

  const isPastDate = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compare = new Date(d);
    compare.setHours(0, 0, 0, 0);
    return compare <= today;
  };

  const getCalendarMatrix = (month: Date) => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const matrix: Date[][] = [];
    let current = new Date(firstDay);
    current.setDate(current.getDate() - ((firstDay.getDay() + 6) % 7));
    while (current <= lastDay || current.getDay() !== 1) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      matrix.push(week);
      if (current > lastDay && current.getDay() === 1) break;
    }
    return matrix;
  };

  const toISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    return /^(?:\+?977)?9\d{9}$/.test(cleaned) || /^0?\d{9,10}$/.test(cleaned);
  };

  const goNext = () => {
    if (step === 1 && !serviceId) {
      showToast('Please select a service', 'error');
      return;
    }
    if (step === 2 && !date) {
      showToast('Please select a date', 'error');
      return;
    }
    if (step === 3 && !time) {
      showToast('Please select a time', 'error');
      return;
    }
    if (step === 4) {
      if (!name.trim()) {
        showToast('Please enter your full name', 'error');
        return;
      }
      if (!validatePhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
      }
      if (email.trim() && !email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
      }
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const onConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedRef.current || submitting || succeeded) return;
    if (!service) {
      showToast('Please select a service', 'error');
      return;
    }

    submittedRef.current = true;
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim() || 'not-provided@nalastudio.com.np',
      phone: phone.trim(),
      service: service.name,
      servicePrice: service.price ?? service.priceLabel ?? 'On request',
      serviceDuration: service.duration ?? service.durationLabel ?? 'Flexible',
      appointmentDate: date,
      appointmentTime: time,
      appointmentDateTime: `${formatDisplayDate(date)} at ${time}`,
      preferredArtist: artist.trim() || 'No preference',
      message:
        message.trim() ||
        `Booking request for ${service.name} on ${date} at ${time}. Phone: ${phone}`,
      _subject: `NALA Booking — ${service.name} — ${date} ${time}`,
    };

    try {
      await handleSubmit(payload);
      addBooking({
        serviceId: service.id,
        serviceName: service.name,
        date,
        time,
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        message: message.trim(),
        preferredArtist: artist.trim(),
        totalPrice: service.price,
        status: 'pending',
      });
    } catch {
      submittedRef.current = false;
      setSubmitting(false);
      showToast('There was an error submitting your booking. Please try again.', 'error');
    }
  };

  if (succeeded || state.succeeded) {
    return (
      <div className="container-nala py-28">
        <div className="mx-auto max-w-xl rounded-md border border-nala-border bg-nala-ivory p-8 text-center shadow-card">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-nala-cream text-nala-rose">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl text-nala-charcoal">Thank you!</h1>
          <p className="mt-4 text-nala-muted">
            Your appointment request has been received. NALA Studio will contact you shortly to
            confirm your booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-nala-soft pb-20 pt-28">
      <div className="container-nala max-w-4xl">
        <div className="mb-10 text-center">
          <p className="section-label mb-3">Booking</p>
          <h1 className="section-title">Request an appointment</h1>
          <p className="mx-auto mt-3 max-w-lg text-nala-muted">
            Tell us what you’d like and when suits you. The studio will confirm your booking by
            phone.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {steps.map((label, i) => {
            const n = i + 1;
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                    step >= n
                      ? 'bg-nala-charcoal text-nala-ivory'
                      : 'border border-nala-border text-nala-muted'
                  }`}
                >
                  {step > n ? <Check className="h-4 w-4" /> : n}
                </div>
                <span className="hidden text-[11px] uppercase tracking-[0.12em] text-nala-muted sm:inline">
                  {label}
                </span>
                {n < steps.length && <div className="mx-1 hidden h-px w-6 bg-nala-border sm:block" />}
              </div>
            );
          })}
        </div>

        <div className="rounded-md border border-nala-border bg-nala-ivory p-5 shadow-card sm:p-8">
          {step === 1 && (
            <div>
              <h2 className="mb-6 font-display text-2xl">Choose a Service</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {activeServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setServiceId(item.id);
                      setDate('');
                      setTime('');
                    }}
                    className={`overflow-hidden rounded-md border text-left transition ${
                      serviceId === item.id
                        ? 'border-nala-charcoal shadow-soft'
                        : 'border-nala-border hover:border-nala-nude'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-display text-xl">{item.name}</h3>
                      <div className="mt-2 flex items-center justify-between text-sm text-nala-muted">
                        <span>{formatPrice(item.price, item.priceLabel)}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formatDuration(item.duration, item.durationLabel)}
                        </span>
                      </div>
                      <span className="mt-3 inline-block text-[11px] uppercase tracking-[0.14em] text-nala-rose">
                        {serviceId === item.id ? 'Selected' : 'Select'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-6 font-display text-2xl">Choose Your Date</h2>
              <div className="mx-auto max-w-md">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="rounded-sm border border-nala-border p-2"
                    disabled={
                      calendarMonth.getFullYear() === new Date().getFullYear() &&
                      calendarMonth.getMonth() === new Date().getMonth()
                    }
                    onClick={() =>
                      setCalendarMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                      )
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-medium">
                    {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                  <button
                    type="button"
                    className="rounded-sm border border-nala-border p-2"
                    onClick={() =>
                      setCalendarMonth(
                        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                      )
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-nala-muted">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <div key={d}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getCalendarMatrix(calendarMonth).flat().map((day) => {
                    const inMonth = day.getMonth() === calendarMonth.getMonth();
                    const iso = toISODate(day);
                    const disabled = !inMonth || isPastDate(day);
                    const selected = date === iso;
                    return (
                      <button
                        key={iso + String(inMonth)}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setDate(iso);
                          setTime('');
                        }}
                        className={`aspect-square rounded-sm text-sm transition ${
                          selected
                            ? 'bg-nala-charcoal text-nala-ivory'
                            : disabled
                              ? 'cursor-not-allowed text-nala-border'
                              : 'hover:bg-nala-cream'
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-6 font-display text-2xl">Choose Preferred Time</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {settings.bookingTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-sm border px-4 py-3 text-sm transition ${
                      time === slot
                        ? 'border-nala-charcoal bg-nala-charcoal text-nala-ivory'
                        : 'border-nala-border hover:border-nala-nude'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="mb-6 font-display text-2xl">Your Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="label-nala" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    className="input-nala"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label-nala" htmlFor="phone">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    className="input-nala"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9703422242"
                    required
                  />
                </div>
                <div>
                  <label className="label-nala" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-nala"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-nala" htmlFor="artist">
                    Preferred Artist
                  </label>
                  <input
                    id="artist"
                    className="input-nala"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-nala" htmlFor="message">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    className="input-nala min-h-[110px] resize-y"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <form onSubmit={onConfirm}>
              <h2 className="mb-6 font-display text-2xl">Confirm Appointment</h2>
              <dl className="space-y-3 rounded-md border border-nala-border bg-nala-soft/60 p-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-nala-muted">Service</dt>
                  <dd className="font-medium text-nala-charcoal">{service?.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-nala-muted">Date</dt>
                  <dd className="font-medium text-nala-charcoal">{formatDisplayDate(date)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-nala-muted">Time</dt>
                  <dd className="font-medium text-nala-charcoal">{time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-nala-muted">Customer</dt>
                  <dd className="font-medium text-nala-charcoal">{name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-nala-muted">Phone</dt>
                  <dd className="font-medium text-nala-charcoal">{phone}</dd>
                </div>
              </dl>
              <button type="submit" className="btn-primary mt-8 w-full" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request Appointment'}
              </button>
            </form>
          )}

          {step < 5 && (
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                className="btn-ghost"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
              >
                Back
              </button>
              <button type="button" className="btn-primary" onClick={goNext}>
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
