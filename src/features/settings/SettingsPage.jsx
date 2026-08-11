'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';
import { useTheme } from '../../core/theme/ThemeContext.jsx';
import { useDb } from '../../core/database/DbContext.jsx';

export const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { saveSettings, showToast } = useDb();

  const [name, setName] = useState(user ? user.name : 'Alex Morgan');
  const [email, setEmail] = useState(user ? user.email : 'alex@finly.app');
  const [role, setRole] = useState(user ? user.role : 'Financial Analyst');

  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveSettings({
      theme,
      notifications: { email: emailNotifs, push: pushNotifs },
      security: { twoFactor }
    });
    showToast('Profile and security preferences saved successfully!');
  };

  return (
    <div className="settings-content">
      <div style={{ marginBottom: '24px' }}>
        <h2>Account & App Settings</h2>
        <p className="subtitle">Manage user profile details, security preferences, and interface theme.</p>
      </div>

      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Profile Details */}
        <section className="card-box">
          <h3>Personal Profile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Account Role</label>
              <input
                type="text"
                className="form-control"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Security Preferences */}
        <section className="card-box">
          <h3>Security & Authentication</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--bg-app)', borderRadius: '10px' }}>
              <div>
                <strong>Two-Factor Authentication (2FA)</strong>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Require SMS/Authenticator code on sign-in</span>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={e => setTwoFactor(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </section>

        {/* Interface & Theme */}
        <section className="card-box">
          <h3>Interface & Appearance</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '12px', background: 'var(--bg-app)', borderRadius: '10px' }}>
            <div>
              <strong>Color Theme Mode</strong>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current Mode: {theme.toUpperCase()}</span>
            </div>
            <button type="button" className="btn btn-secondary" onClick={toggleTheme}>
              <i className={`ph ${theme === 'dark' ? 'ph-sun' : 'ph-moon'}`}></i> Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </section>

        <button type="submit" className="btn btn-primary" style={{ width: '200px', alignSelf: 'flex-start' }}>
          Save All Changes
        </button>
      </form>
    </div>
  );
};
