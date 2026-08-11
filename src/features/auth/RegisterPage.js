import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.js';

export const RegisterPage = ({ onNavigateLogin, onRegisterSuccess }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name || 'Alex Morgan', email || 'alex@finly.app');
      setTimeout(() => {
        setIsSubmitting(false);
        onRegisterSuccess();
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-app)' }}>
      <div className="auth-card card-box" style={{ width: '100%', maxWidth: '440px', padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="brand-icon" style={{ display: 'inline-flex', width: '48px', height: '48px', fontSize: '1.5rem', background: 'var(--accent-blue)', color: '#fff', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <i className="ph ph-trend-up"></i>
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Create your Finly account</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Start tracking your wealth with intelligence.</p>
        </div>

        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Alex Morgan"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Work Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="alex@finly.app"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <a href="#login" onClick={(e) => { e.preventDefault(); onNavigateLogin(); }} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
