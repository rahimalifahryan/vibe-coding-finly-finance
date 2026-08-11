import React, { useState } from 'react';
import { useAuth } from '../core/auth/AuthContext.js';
import { useTheme } from '../core/theme/ThemeContext.js';
import { useDb } from '../core/database/DbContext.js';
import { ToastContainer } from './components/Toast.js';

export const Layout = ({ activeTab, setActiveTab, children, searchQuery, setSearchQuery }) => {
  const { user, logout, toggleBalancePrivacy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toastMessage, clearToast } = useDb();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const formattedBalance = user
    ? user.isBalanceHidden
      ? '••••••••'
      : `$${(user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ph-squares-four' },
    { id: 'transactions', label: 'Transactions', icon: 'ph-arrows-left-right' },
    { id: 'analytics', label: 'Analytics', icon: 'ph-chart-line-up' },
    { id: 'cards', label: 'My Cards', icon: 'ph-credit-card' },
    { id: 'wallet', label: 'Wallet', icon: 'ph-wallet' },
    { id: 'budgets', label: 'Budgets', icon: 'ph-pie-chart' },
    { id: 'investments', label: 'Investments', icon: 'ph-trend-up' },
    { id: 'reports', label: 'Reports', icon: 'ph-file-text' },
    { id: 'settings', label: 'Settings', icon: 'ph-gear' },
  ];

  return (
    <div className="app-container">
      {/* Progress Bar (Visual transition helper) */}
      <div id="page-progress-bar" className="page-progress-bar"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <i className="ph ph-trend-up"></i>
          </div>
          <span className="brand-name">Finly</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <a href={`#${item.id}`}>
                  <i className={`ph ${item.icon}`}></i>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-badge">
            <div className="avatar-badge">{user ? user.avatarInitials || 'AM' : 'AM'}</div>
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'Alex Morgan'}</span>
              <span className="user-role">{user ? user.role : 'Pro Member'}</span>
            </div>
          </div>
          <button className="btn-icon btn-logout" title="Sign out" onClick={logout}>
            <i className="ph ph-sign-out"></i>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-layout">
        <header className="top-navbar">
          <div className="header-greeting">
            <h1>Good morning, {user ? (user.name ? user.name.split(' ')[0] : 'Alex') : 'Alex'}</h1>
            <p className="subtitle">Here is your financial status overview today.</p>
          </div>

          <div className="header-actions">
            {/* Search Bar */}
            <div className="search-box">
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                id="global-search"
                placeholder="Search transactions, accounts..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />
            </div>

            {/* Total Balance Privacy Pill */}
            <div className="balance-pill">
              <div className="balance-info">
                <span className="balance-label">Total Balance</span>
                <span id="total-balance-text" className="balance-value">{formattedBalance}</span>
              </div>
              <button
                className="btn-icon"
                id="toggle-privacy-btn"
                title="Toggle Balance Privacy"
                onClick={toggleBalancePrivacy}
              >
                <i className={`ph ${user && user.isBalanceHidden ? 'ph-eye-slash' : 'ph-eye'}`}></i>
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              className="btn-icon"
              id="theme-toggle"
              title="Toggle Theme"
              onClick={toggleTheme}
            >
              <i className={`ph ${theme === 'dark' ? 'ph-sun' : 'ph-moon'}`}></i>
            </button>

            {/* Notifications Dropdown */}
            <div className="dropdown-wrapper" style={{ position: 'relative' }}>
              <button
                className="btn-icon btn-notifications"
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="ph ph-bell"></i>
                <span className="notification-dot"></span>
              </button>
              {showNotifications && (
                <div className="dropdown-menu shadow-lg" style={{ position: 'absolute', right: 0, top: '48px', width: '280px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', zIndex: 1000 }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>Notifications</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                    <div style={{ padding: '8px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                      <strong>Dividend Payout</strong>: Received $42.50 from VOO
                    </div>
                    <div style={{ padding: '8px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                      <strong>Bill Reminder</strong>: Adobe CC due in 3 days
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown-wrapper" style={{ position: 'relative' }}>
              <div
                className="avatar-badge"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {user ? user.avatarInitials || 'AM' : 'AM'}
              </div>
              {showUserDropdown && (
                <div className="dropdown-menu shadow-lg" style={{ position: 'absolute', right: 0, top: '48px', width: '180px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '8px', zIndex: 1000 }}>
                  <button
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '6px' }}
                    onClick={() => { setActiveTab('settings'); setShowUserDropdown(false); }}
                  >
                    <i className="ph ph-gear" style={{ marginRight: '8px' }}></i> Settings
                  </button>
                  <button
                    style={{ width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '6px' }}
                    onClick={logout}
                  >
                    <i className="ph ph-sign-out" style={{ marginRight: '8px' }}></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Body view */}
        <main className="dashboard-body">
          {children}
        </main>
      </div>

      {/* Global Toast Alerts */}
      <ToastContainer message={toastMessage} onClose={clearToast} />
    </div>
  );
};
