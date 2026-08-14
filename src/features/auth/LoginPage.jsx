'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';
import { useTheme } from '../../core/theme/ThemeContext.jsx';

export const LoginPage = ({ onNavigateRegister, onLoginSuccess }) => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [email, setEmail] = useState('dummy@gmail.com');
  const [password, setPassword] = useState('dummy@gmail.com');
  const [remember, setRemember] = useState(true);
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
    <div className="auth-outer-container" style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: isDark ? '#090a0d' : '#141518', overflowX: 'hidden' }}>
      
      {/* Left Panel - Hero View (50% Width) */}
      <div
        className="auth-left-panel"
        style={{
          width: '50%',
          flex: '0 0 50%',
          minHeight: '100vh',
          background: isDark ? '#111319' : '#16171a',
          backgroundImage: isDark 
            ? 'radial-gradient(circle at 18% 22%, rgba(37, 99, 235, 0.22) 0%, rgba(17, 19, 25, 0) 65%)'
            : 'radial-gradient(circle at 18% 22%, rgba(30, 58, 138, 0.28) 0%, rgba(22, 23, 26, 0) 65%)',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.06)',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Header Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            className="logo-icon"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '9px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontSize: '1.1rem',
              lineHeight: 1,
              padding: 0
            }}
          >
            <i className="ph ph-squares-four"></i>
          </div>
          <strong style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1 }}>
            Finly
          </strong>
        </div>

        {/* Middle Hero Content */}
        <div className="auth-hero-container" style={{ margin: 'auto 0', padding: '32px 0' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1.18,
              marginBottom: '16px',
              letterSpacing: '-0.025em'
            }}
          >
            Personal finance,<br />quietly powerful.
          </h1>

          <p
            style={{
              color: '#8e96a3',
              fontSize: '0.92rem',
              lineHeight: 1.55,
              maxWidth: '430px',
              marginBottom: '32px'
            }}
          >
            Balances, spending, cards, budgets and investments — one calm view that stays out of your way.
          </p>

          {/* Feature Highlight Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px' }}>
            <div
              className="card-box"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <i className="ph ph-trend-up" style={{ color: '#38bdf8', fontSize: '1.25rem' }}></i>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', fontSize: '0.88rem', fontWeight: 600, marginBottom: '2px' }}>
                  Live analytics
                </strong>
                <span style={{ color: '#8e96a3', fontSize: '0.78rem' }}>
                  Trends and category leaders at a glance.
                </span>
              </div>
            </div>

            <div
              className="card-box"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '14px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <i className="ph ph-shield-check" style={{ color: '#38bdf8', fontSize: '1.25rem' }}></i>
              <div>
                <strong style={{ display: 'block', color: '#f8fafc', fontSize: '0.88rem', fontWeight: 600, marginBottom: '2px' }}>
                  Private by default
                </strong>
                <span style={{ color: '#8e96a3', fontSize: '0.78rem' }}>
                  Balances hidden until you ask for them.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
          © 2026 Finly. Mock data — for demo purposes only.
        </div>
      </div>

      {/* Right Panel - Sign-In Form (50% Width Centered) */}
      <div
        className="auth-right-panel"
        style={{
          width: '50%',
          flex: '0 0 50%',
          minHeight: '100vh',
          background: isDark ? '#0c0e12' : '#f4f4f6',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '40px 32px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          position: 'relative',
          transition: 'background-color 0.3s ease'
        }}
      >
        {/* Floating Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="icon-btn"
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            position: 'absolute',
            top: '24px',
            right: '28px',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.14)' : '1px solid rgba(0, 0, 0, 0.12)',
            background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
            color: isDark ? '#fbbf24' : '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            fontSize: '1.2rem',
            lineHeight: 1,
            padding: 0,
            cursor: 'pointer',
            boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <i className={isDark ? 'ph ph-sun' : 'ph ph-moon'}></i>
        </button>

        <div className="auth-form-container" style={{ width: '100%', maxWidth: '380px' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ color: isDark ? '#f8fafc' : '#0f172a', fontSize: '1.85rem', fontWeight: 700, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Sign in
            </h2>
            <p style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.82rem', margin: 0 }}>
              Use any email and password — this is a demo.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: isDark ? '#cbd5e1' : '#334155', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <i
                  className="ph ph-envelope"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: isDark ? '#64748b' : '#94a3b8', fontSize: '1.1rem' }}
                ></i>
                <input
                  type="email"
                  placeholder="dummy@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 42px',
                    background: isDark ? '#161922' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: isDark ? '#cbd5e1' : '#334155', fontSize: '0.8rem', fontWeight: 500, marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <i
                  className="ph ph-lock-key"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: isDark ? '#64748b' : '#94a3b8', fontSize: '1.1rem' }}
                ></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '11px 42px 11px 42px',
                    background: isDark ? '#161922' : '#ffffff',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    color: isDark ? '#64748b' : '#94a3b8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center'
                  }}
                >
                  <i className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`} style={{ fontSize: '1.1rem' }}></i>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: isDark ? '#cbd5e1' : '#334155', fontSize: '0.8rem', fontWeight: 500 }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer', borderRadius: '4px' }}
                />
                Remember me
              </label>
              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); onLoginSuccess(); }}
                style={{ color: isDark ? '#60a5fa' : '#2563eb', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: isDark ? '0 4px 16px rgba(37, 99, 235, 0.4)' : '0 4px 14px rgba(37, 99, 235, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em' }}>
            <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}></div>
            <span style={{ padding: '0 12px' }}>O R</span>
            <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0' }}></div>
          </div>

          {/* OAuth Continue Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              type="button"
              onClick={() => handleOAuth('Apple')}
              style={{
                width: '100%',
                padding: '11px 16px',
                background: isDark ? '#161922' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                borderRadius: '10px',
                color: isDark ? '#f8fafc' : '#0f172a',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <i className="ph ph-apple-logo" style={{ fontSize: '1.15rem' }}></i> Continue with Apple
            </button>

            <button
              type="button"
              onClick={() => handleOAuth('Google')}
              style={{
                width: '100%',
                padding: '11px 16px',
                background: isDark ? '#161922' : '#ffffff',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e2e8f0',
                borderRadius: '10px',
                color: isDark ? '#f8fafc' : '#0f172a',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <i className="ph ph-google-logo" style={{ fontSize: '1.15rem' }}></i> Continue with Google
            </button>
          </div>

          {/* Register Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.82rem', color: isDark ? '#94a3b8' : '#64748b' }}>
            New to Finly?{' '}
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateRegister) {
                  onNavigateRegister();
                }
              }}
              style={{ color: isDark ? '#60a5fa' : '#2563eb', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
            >
              Create New Account
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};


