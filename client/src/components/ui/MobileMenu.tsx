import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Instagram, ArrowRight, ChevronRight, Mail, Lock } from 'lucide-react';
import Logo from '../Logo';
import { cn, SPRING } from '../../lib/cn';
import { useStudio } from '../../context/StudioContext';

const routes = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Academy', href: '/courses' },
  { label: 'Contact', href: '/contact' },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const location = useLocation();
  const { content, activeServices } = useStudio();
  const featured = activeServices.filter((s) => s.popular).slice(0, 5);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-nala-charcoal/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-nala-border/60 px-5">
              <Logo size="md" />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-nala-charcoal transition hover:bg-nala-mist"
                aria-label="Close navigation"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-3">
              <ul className="space-y-0.5">
                {routes.map((route, i) => {
                  const active = location.pathname === route.href;
                  return (
                    <motion.li
                      key={route.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.28 }}
                    >
                      <Link
                        to={route.href}
                        onClick={onClose}
                        className={cn(
                          'font-ui flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium tracking-[-0.02em] transition-colors',
                          active
                            ? 'bg-nala-mist text-nala-charcoal'
                            : 'text-nala-charcoal/75 hover:bg-nala-mist/70 hover:text-nala-charcoal'
                        )}
                      >
                        {route.label}
                        <ChevronRight size={14} className="opacity-40" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {featured.length > 0 && (
                <div className="mt-6 rounded-2xl border border-nala-border/70 bg-nala-soft/80 p-4">
                  <p className="font-ui mb-2 text-[10px] font-medium text-nala-muted">
                    Popular treatments
                  </p>
                  <ul className="space-y-0.5">
                    {featured.map((s) => (
                      <li key={s.id}>
                        <Link
                          to={`/book?service=${s.id}`}
                          onClick={onClose}
                          className="font-ui block rounded-lg px-2 py-1.5 text-[12px] text-nala-charcoal/80 transition hover:bg-white hover:text-nala-charcoal"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto space-y-2.5 pt-8">
                <Link
                  to="/book"
                  onClick={onClose}
                  className="font-ui group flex w-full items-center justify-center gap-1.5 rounded-full bg-nala-charcoal px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-nala-brown"
                >
                  Book now
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="font-ui flex w-full items-center justify-center gap-1.5 rounded-full border border-nala-charcoal/20 px-5 py-2.5 text-[12px] font-medium text-nala-charcoal transition hover:bg-nala-mist"
                >
                  <Mail size={13} />
                  Contact
                </Link>
                <Link
                  to="/admin/login"
                  onClick={onClose}
                  className="font-ui flex w-full items-center justify-center gap-1.5 py-2 text-[11px] font-medium text-nala-muted transition hover:text-nala-charcoal"
                >
                  <Lock size={12} />
                  Admin login
                </Link>

                <div className="space-y-2.5 border-t border-nala-border/70 pt-5 text-[12px] text-nala-muted">
                  <a
                    href={`tel:${content.phone}`}
                    className="font-ui flex items-center gap-2.5 transition hover:text-nala-charcoal"
                  >
                    <Phone size={14} />
                    {content.phone}
                  </a>
                  <a
                    href={content.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-ui flex items-center gap-2.5 transition hover:text-nala-charcoal"
                  >
                    <Instagram size={14} />
                    {content.instagramHandle}
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
