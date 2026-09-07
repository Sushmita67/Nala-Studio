import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  Images,
  GraduationCap,
  MessageSquareQuote,
  Award,
  FileText,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Logo from '../../components/Logo';
import RequireAuth from '../../components/RequireAuth';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/courses', label: 'Courses', icon: GraduationCap },
  { to: '/admin/students', label: 'Students', icon: Users },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/certificates', label: 'Certificates', icon: Award },
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/media', label: 'Media Library', icon: FolderOpen },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-nala-border px-5 py-5">
        <Link to="/" className="inline-block">
          <Logo size="md" />
        </Link>
        <p className="mt-2 text-sm uppercase tracking-[0.16em] text-nala-muted">Admin</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-nala-charcoal text-nala-ivory'
                  : 'text-nala-muted hover:bg-nala-cream hover:text-nala-charcoal'
              }`
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-nala-border p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-nala-muted hover:bg-nala-cream hover:text-nala-charcoal"
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <RequireAuth>
      <div className="min-h-screen bg-nala-soft">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 shrink-0 border-r border-nala-border bg-nala-ivory lg:block">
            {sidebar}
          </aside>

          {open && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-nala-charcoal/40" onClick={() => setOpen(false)} />
              <aside className="absolute inset-y-0 left-0 w-72 bg-nala-ivory shadow-soft">
                <button
                  type="button"
                  className="absolute right-3 top-3 p-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
                {sidebar}
              </aside>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center justify-between border-b border-nala-border bg-nala-ivory px-4 py-3 lg:px-8">
              <button
                type="button"
                className="rounded-sm p-2 lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </button>
              <p className="text-sm text-nala-muted">Studio dashboard</p>
              <Link
                to="/"
                className="text-sm tracking-wide text-nala-muted transition hover:text-nala-charcoal"
              >
                View site
              </Link>
            </header>
            <main className="flex-1 p-4 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default AdminLayout;
