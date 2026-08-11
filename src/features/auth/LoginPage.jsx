'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';

export const LoginPage = ({ onNavigateRegister, onLoginSuccess }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email || 'alex@finly.app', remember);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess();
      }, 400);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleOAuth = (provider) => {
    login(`${provider.toLowerCase()}user@finly.app`, true);
    onLoginSuccess();
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-app)' }}>
      <div className="auth-card card-box" style={{ width: '100%', maxWidth: '440px', padding: '36px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="brand-icon" style={{ display: 'inline-flex', width: '48px', height: '48px', fontSize: '1.5rem', background: 'var(--accent-blue)', color: '#fff', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <i className="ph ph-trend-up"></i>
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Sign in to Finly</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your credentials to access your financial dashboard.</p>
        </div>

        {/* OAuth Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <button type="button" className="btn btn-secondary btn-oauth" onClick={() => handleOAuth('Google')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <i className="ph ph-google-logo"></i> Google
          </button>
          <button type="button" className="btn btn-secondary btn-oauth" onClick={() => handleOAuth('Apple')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <i className="ph ph-apple-logo"></i> Apple
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span>OR EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <form id="signin-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Email address</label>
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

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              <a href="#forgot" style={{ fontSize: '0.8rem', color: 'var(--accent-blue)' }}>Forgot?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                id="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <i className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="remember-me" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              Remember me on this device
            </label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <a href="#register" onClick={(e) => { e.preventDefault(); onNavigateRegister(); }} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};
