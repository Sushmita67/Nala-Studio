import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Logo from '../../components/Logo';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { DEFAULT_ADMIN_EMAIL } from '../../config';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof schema>;

const AdminLogin: React.FC = () => {
  const { isAdmin, login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const from = (location.state as { from?: string } | null)?.from || '/admin';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: DEFAULT_ADMIN_EMAIL, password: '' },
  });

  if (isAdmin) return <Navigate to={from} replace />;

  const onSubmit = async (values: FormValues) => {
    setError('');
    try {
      const ok = await login(values.email, values.password);
      if (ok) {
        navigate(from, { replace: true });
        return;
      }
      setError('Invalid email or password. Try owner@nalastudio.com.np / nala2026');
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-nala-cream via-nala-ivory to-nala-mist px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-md border border-nala-border bg-nala-ivory/95 p-8 shadow-card backdrop-blur"
      >
        <div className="mb-8 text-center">
          <Logo size="lg" className="mx-auto" />
          <h1 className="mt-4 font-display text-3xl">Studio Login</h1>
          <p className="mt-2 text-sm text-nala-muted">Owner access to NALA Studio</p>
        </div>

        <label className="label-nala" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          className="input-nala"
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

        <label className="label-nala mt-4" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="input-nala"
          {...register('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button type="submit" className="btn-primary mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>

        <button
          type="button"
          className="btn-ghost mt-4 w-full"
          onClick={() => setForgotOpen((v) => !v)}
        >
          Forgot password?
        </button>

        {forgotOpen && (
          <div className="mt-4 rounded-md border border-nala-border bg-nala-soft p-4 text-sm text-nala-muted">
            <p className="font-medium text-nala-charcoal">Default owner login</p>
            <p className="mt-2">
              Email: <span className="text-nala-charcoal">{DEFAULT_ADMIN_EMAIL}</span>
              <br />
              Password: <span className="text-nala-charcoal">nala2026</span>
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-nala-muted">
          <Link to="/" className="underline-offset-2 hover:underline">
            ← Back to site
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
