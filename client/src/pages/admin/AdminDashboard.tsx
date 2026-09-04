import React from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../../context/StudioContext';

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="rounded-md border border-nala-border bg-nala-ivory p-5">
    <p className="text-[11px] uppercase tracking-[0.16em] text-nala-muted">{label}</p>
    <p className="mt-2 font-display text-3xl text-nala-charcoal">{value}</p>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { bookings, services, gallery, courses, certificates } = useStudio();

  const pending = bookings.filter((b) => b.status === 'pending').length;
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
  const completed = bookings.filter((b) => b.status === 'completed').length;
  const recent = bookings.slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-nala-muted">Overview of studio activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total bookings" value={bookings.length} />
        <Stat label="Pending" value={pending} />
        <Stat label="Confirmed" value={confirmed} />
        <Stat label="Completed" value={completed} />
        <Stat label="Services" value={services.length} />
        <Stat label="Gallery images" value={gallery.length} />
        <Stat label="Courses" value={courses.length} />
        <Stat label="Certificates" value={certificates.length} />
      </div>

      <div className="rounded-md border border-nala-border bg-nala-ivory">
        <div className="flex items-center justify-between border-b border-nala-border px-5 py-4">
          <h2 className="font-display text-xl">Recent Booking Requests</h2>
          <Link to="/admin/bookings" className="text-xs uppercase tracking-[0.14em] text-nala-rose">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-nala-soft text-[11px] uppercase tracking-[0.12em] text-nala-muted">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-nala-muted">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {recent.map((b) => (
                <tr key={b.id} className="border-t border-nala-border/70">
                  <td className="px-5 py-3">{b.customerName}</td>
                  <td className="px-5 py-3">{b.serviceName}</td>
                  <td className="px-5 py-3">
                    {b.date} · {b.time}
                  </td>
                  <td className="px-5 py-3 capitalize">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
