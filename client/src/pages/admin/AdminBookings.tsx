import React, { useMemo, useState } from 'react';
import { useStudio } from '../../context/StudioContext';
import type { BookingStatus } from '../../types';

const statuses: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusClass: Record<BookingStatus, string> = {
  pending: 'bg-amber-50 text-amber-800',
  confirmed: 'bg-emerald-50 text-emerald-800',
  completed: 'bg-sky-50 text-sky-800',
  cancelled: 'bg-rose-50 text-rose-800',
};

const AdminBookings: React.FC = () => {
  const { bookings, updateBooking, deleteBooking } = useStudio();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | BookingStatus>('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'date'>('newest');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...bookings];
    if (status !== 'all') list = list.filter((b) => b.status === status);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (b) =>
          b.customerName.toLowerCase().includes(needle) ||
          b.phone.includes(needle) ||
          b.serviceName.toLowerCase().includes(needle) ||
          b.email.toLowerCase().includes(needle)
      );
    }
    list.sort((a, b) => {
      if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sort === 'date') return a.date.localeCompare(b.date) || a.time.localeCompare(b.time);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return list;
  }, [bookings, q, sort, status]);

  const active = bookings.find((b) => b.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Bookings</h1>
        <p className="mt-1 text-sm text-nala-muted">Manage appointment requests</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className="input-nala"
          placeholder="Search name, phone, service…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="input-nala sm:w-40"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'all' | BookingStatus)}
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="input-nala sm:w-40"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="date">Appointment date</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="overflow-x-auto rounded-md border border-nala-border bg-nala-ivory lg:col-span-3">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-nala-soft text-sm uppercase tracking-[0.12em] text-nala-muted">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className={`cursor-pointer border-t border-nala-border/70 hover:bg-nala-soft/50 ${
                    selected === b.id ? 'bg-nala-soft/80' : ''
                  }`}
                  onClick={() => setSelected(b.id)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.customerName}</div>
                    <div className="text-sm text-nala-muted">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3">{b.serviceName}</td>
                  <td className="px-4 py-3">
                    {b.date}
                    <br />
                    {b.time}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-sm capitalize ${statusClass[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-nala-muted">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-md border border-nala-border bg-nala-ivory p-5 lg:col-span-2">
          {!active ? (
            <p className="text-sm text-nala-muted">Select a booking to view details.</p>
          ) : (
            <div className="space-y-4 text-sm">
              <h2 className="font-display text-2xl">{active.customerName}</h2>
              <p>{active.serviceName}</p>
              <p className="text-nala-muted">
                {active.date} at {active.time}
              </p>
              <p>
                <span className="text-nala-muted">Reference:</span> {active.reference || '—'}
              </p>
              <p>
                <span className="text-nala-muted">Phone:</span> {active.phone}
              </p>
              <p>
                <span className="text-nala-muted">Email:</span> {active.email || '—'}
              </p>
              <p>
                <span className="text-nala-muted">Artist:</span> {active.preferredArtist || '—'}
              </p>
              <p>
                <span className="text-nala-muted">Message:</span> {active.message || '—'}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-nala">Reschedule date</label>
                  <input
                    type="date"
                    className="input-nala"
                    value={active.date}
                    onChange={(e) => void updateBooking(active.id, { date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label-nala">Time</label>
                  <input
                    type="time"
                    className="input-nala"
                    value={active.time}
                    onChange={(e) => void updateBooking(active.id, { time: e.target.value })}
                  />
                </div>
              </div>

              <label className="label-nala">Status</label>
              <select
                className="input-nala"
                value={active.status}
                onChange={(e) =>
                  void updateBooking(active.id, { status: e.target.value as BookingStatus })
                }
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  className="btn-secondary !py-2"
                  onClick={() => updateBooking(active.id, { status: 'confirmed' })}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn-secondary !py-2"
                  onClick={() => updateBooking(active.id, { status: 'completed' })}
                >
                  Complete
                </button>
                <button
                  type="button"
                  className="btn-secondary !py-2"
                  onClick={() => updateBooking(active.id, { status: 'cancelled' })}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-ghost text-red-700"
                  onClick={() => {
                    if (confirm('Delete this booking?')) {
                      deleteBooking(active.id);
                      setSelected(null);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
