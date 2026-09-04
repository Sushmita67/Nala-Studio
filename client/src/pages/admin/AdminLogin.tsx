import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const { isAdmin, login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-nala-cream px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-md border border-nala-border bg-nala-ivory p-8 shadow-card"
      >
        <div className="mb-8 text-center">
          <Logo size="lg" className="mx-auto" />
          <h1 className="mt-4 font-display text-3xl">Studio Login</h1>
          <p className="mt-2 text-sm text-nala-muted">Sign in to manage NALA Studio</p>
        </div>
        <label className="label-nala" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input-nala"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          required
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary mt-6 w-full">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
