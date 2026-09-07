import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStudio } from '../../context/StudioContext';

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="rounded-md border border-nala-border bg-nala-ivory p-5">
    <p className="text-xs uppercase tracking-[0.16em] text-nala-muted">{label}</p>
    <p className="mt-2 font-display text-3xl text-nala-charcoal">{value}</p>
  </div>
);

function startOfDay(d = new Date()) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

const AdminDashboard: React.FC = () => {
  const { bookings, services, gallery, courses, certificates, students, enrollments, classes } =
    useStudio();

  const todayIso = startOfDay().toISOString().slice(0, 10);
  const weekEnd = addDays(startOfDay(), 7).toISOString().slice(0, 10);

  const todays = useMemo(
    () =>
      bookings.filter(
        (b) => b.date === todayIso && b.status !== 'cancelled'
      ),
    [bookings, todayIso]
  );

  const weekBookings = useMemo(
    () =>
      bookings.filter(
        (b) => b.date >= todayIso && b.date < weekEnd && b.status !== 'cancelled'
      ),
    [bookings, todayIso, weekEnd]
  );

  const pending = bookings.filter((b) => b.status === 'pending').length;
  const activeStudents = students.filter((s) => s.active).length;
  const activeEnrollments = enrollments.filter((e) => e.status === 'active').length;
  const upcomingClasses = classes.filter((c) => c.active && c.endDate >= todayIso).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-nala-muted">Overview of studio activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today's appointments" value={todays.length} />
        <Stat label="This week" value={weekBookings.length} />
        <Stat label="Pending requests" value={pending} />
        <Stat label="Active students" value={activeStudents} />
        <Stat label="Active enrollments" value={activeEnrollments} />
        <Stat label="Upcoming classes" value={upcomingClasses} />
        <Stat label="Services" value={services.length} />
        <Stat label="Certificates" value={certificates.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border border-nala-border bg-nala-ivory">
          <div className="flex items-center justify-between border-b border-nala-border px-5 py-4">
            <h2 className="font-display text-xl">Today</h2>
            <Link to="/admin/bookings" className="text-xs uppercase tracking-[0.14em] text-nala-rose">
              Manage
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-nala-soft text-xs uppercase tracking-[0.12em] text-nala-muted">
                <tr>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {todays.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-nala-muted">
                      No appointments today.
                    </td>
                  </tr>
                )}
                {todays
                  .slice()
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((b) => (
                    <tr key={b.id} className="border-t border-nala-border/70">
                      <td className="px-5 py-3">{b.time}</td>
                      <td className="px-5 py-3">{b.customerName}</td>
                      <td className="px-5 py-3">{b.serviceName}</td>
                      <td className="px-5 py-3 capitalize">{b.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-md border border-nala-border bg-nala-ivory">
          <div className="flex items-center justify-between border-b border-nala-border px-5 py-4">
            <h2 className="font-display text-xl">Upcoming week</h2>
            <Link to="/admin/bookings" className="text-xs uppercase tracking-[0.14em] text-nala-rose">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-nala-soft text-xs uppercase tracking-[0.12em] text-nala-muted">
                <tr>
                  <th className="px-5 py-3">When</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Service</th>
                </tr>
              </thead>
              <tbody>
                {weekBookings.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-nala-muted">
                      Nothing scheduled this week.
                    </td>
                  </tr>
                )}
                {weekBookings
                  .slice()
                  .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                  .slice(0, 8)
                  .map((b) => (
                    <tr key={b.id} className="border-t border-nala-border/70">
                      <td className="px-5 py-3">
                        {b.date} · {b.time}
                      </td>
                      <td className="px-5 py-3">{b.customerName}</td>
                      <td className="px-5 py-3">{b.serviceName}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-nala-muted">
        <span>{gallery.length} gallery images</span>
        <span>·</span>
        <span>{courses.length} courses</span>
        <span>·</span>
        <Link to="/admin/students" className="text-nala-rose hover:underline">
          Manage students →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
