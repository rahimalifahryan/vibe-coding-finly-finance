'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';
import { useTheme } from '../../core/theme/ThemeContext.jsx';
import { useDb } from '../../core/database/DbContext.jsx';

const ToggleSwitch = ({ checked, onChange }) => (
  <div 
    onClick={() => onChange(!checked)}
    style={{
      width: '44px',
      height: '24px',
      background: checked ? '#10b981' : 'var(--border-color)',
      borderRadius: '99px',
      padding: '2px',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: checked ? 'flex-end' : 'flex-start',
      flexShrink: 0
    }}
  >
    <div style={{
      width: '20px',
      height: '20px',
      background: '#ffffff',
      borderRadius: '50%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
    }}></div>
  </div>
);

export const SettingsPage = () => {
  const { user, logout, toggleBalancePrivacy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { saveSettings, showToast } = useDb();

  const [name, setName] = useState(user ? user.name : 'Rahim Ali Fahryan');
  const [email, setEmail] = useState(user ? user.email : 'fahryan.rahim9@gmail.com');

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English (US)');

  const [twoFactor, setTwoFactor] = useState(true);
  const [txAlerts, setTxAlerts] = useState(true);
  const [budgetWarnings, setBudgetWarnings] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleSave = async () => {
    await saveSettings({
      currency,
      language,
      notifications: { txAlerts, budgetWarnings, weeklyDigest },
      security: { twoFactor }
    });

    if (user && typeof window !== 'undefined') {
      const parts = name.split(' ');
      const initials = parts.length > 1 ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase() : 'RA';
      const updatedUser = { ...user, name, email, avatarInitials: initials };
      sessionStorage.setItem('finly_user', JSON.stringify(updatedUser));
      localStorage.setItem('finly_user', JSON.stringify(updatedUser));
    }
  };

  const handleChangePassword = () => {
    const newPass = prompt('Enter your new password (min 6 characters):');
    if (newPass && newPass.length >= 6) {
      showToast('Password changed successfully');
    } else if (newPass) {
      alert('Password must be at least 6 characters');
    }
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo data to default?')) {
      if (typeof window !== 'undefined') {
        indexedDB.deleteDatabase('FinlyDB');
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const initials = user && user.avatarInitials ? user.avatarInitials : (name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RA');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Preferences, security, and notifications.</p>
      </div>

      {/* 2x2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>

        {/* Card 1: Profile */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>Profile</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>How Finly addresses you.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem'
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Preferences */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>Preferences</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Regional defaults for numbers and dates.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                CURRENCY
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['USD', 'EUR', 'IDR'].map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '99px',
                      border: 'none',
                      background: currency === c ? 'var(--text-main)' : 'transparent',
                      color: currency === c ? 'var(--bg-card)' : 'var(--text-muted)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      boxShadow: currency === c ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Dark appearance</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Switch the whole app to a dark canvas.</div>
              </div>
              <ToggleSwitch checked={theme === 'dark'} onChange={() => toggleTheme()} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Hide balances by default</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mask amounts on the balance card.</div>
              </div>
              <ToggleSwitch checked={user ? user.isBalanceHidden : false} onChange={toggleBalancePrivacy} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.05em' }}>
                LANGUAGE
              </label>
              <input
                type="text"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Security */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>Security</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Keep your account calm and safe.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Two-factor authentication</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Require a 6-digit code on new sign-ins.</div>
              </div>
              <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start', marginTop: '8px' }}>
              <button 
                style={{
                  padding: '10px 18px',
                  borderRadius: '99px',
                  border: 'none',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
                onClick={handleChangePassword}
              >
                Change password
              </button>

              <button 
                style={{
                  padding: '10px 18px',
                  borderRadius: '99px',
                  border: 'none',
                  background: 'var(--hover-bg)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: Notifications */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>Notifications</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Choose what reaches you.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Transaction alerts</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Push when a card is charged.</div>
              </div>
              <ToggleSwitch checked={txAlerts} onChange={setTxAlerts} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Budget warnings</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Alert at 80% of a category budget.</div>
              </div>
              <ToggleSwitch checked={budgetWarnings} onChange={setBudgetWarnings} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>Weekly digest</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>A quiet Sunday summary of your week.</div>
              </div>
              <ToggleSwitch checked={weeklyDigest} onChange={setWeeklyDigest} />
            </div>

            <div style={{ marginTop: '8px' }}>
              <button 
                style={{
                  padding: '8px 16px',
                  borderRadius: '99px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  background: 'transparent',
                  color: '#ef4444',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
                onClick={handleResetData}
              >
                Reset demo data
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Save Changes Action Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
        <button 
          className="btn-primary" 
          style={{ width: 'auto', padding: '12px 28px', fontSize: '0.95rem' }}
          onClick={handleSave}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};
