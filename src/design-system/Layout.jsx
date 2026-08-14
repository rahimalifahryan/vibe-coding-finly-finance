'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../core/auth/AuthContext.jsx';
import { useTheme } from '../core/theme/ThemeContext.jsx';
import { useDb } from '../core/database/DbContext.jsx';
import { ToastContainer } from './components/Toast.jsx';

export const Layout = ({ activeTab, setActiveTab, children, searchQuery, setSearchQuery }) => {
  const { user, logout, toggleBalancePrivacy } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { 
    toastMessage, 
    clearToast, 
    notifications = [], 
    markAllNotificationsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useDb();

  const unreadCount = notifications.filter(n => n.unread).length;

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Scroll Reveal Observer Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in-view');
          }
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

      const targets = document.querySelectorAll('.card, .card-box, .hero-card, .hero-balance-card, .kpi-sparkline-card');
      targets.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [activeTab, children]);

  const formattedBalance = user
    ? user.isBalanceHidden
      ? '••••••••'
      : `$${(user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ph-squares-four' },
    { id: 'wallet', label: 'Wallet', icon: 'ph-wallet' },
    { id: 'cards', label: 'Cards', icon: 'ph-credit-card' },
    { id: 'transactions', label: 'Transactions', icon: 'ph-arrows-left-right' },
    { id: 'analytics', label: 'Analytics', icon: 'ph-chart-line' },
    { id: 'investments', label: 'Investments', icon: 'ph-trend-up' },
    { id: 'budgets', label: 'Budgets', icon: 'ph-piggy-bank' },
    { id: 'reports', label: 'Reports', icon: 'ph-file-text' },
    { id: 'settings', label: 'Settings', icon: 'ph-gear' },
  ];

  return (
    <div className="app-container">
      {/* Mobile Sidebar Backdrop Overlay */}
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? 'active' : ''}`}
        onClick={() => setMobileSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            {/* Sidebar Brand Header */}
            <div className="sidebar-brand" style={{ cursor: 'pointer', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}>
                <div className="brand-icon" style={{ background: '#14171f', color: '#ffffff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <i className="ph ph-sparkle"></i>
                </div>
                <span className="brand-name" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>Finly</span>
              </div>
              {mobileSidebarOpen && (
                <button onClick={() => setMobileSidebarOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <i className="ph ph-x"></i>
                </button>
              )}
            </div>

            {/* Sidebar Nav Items */}
            <nav className="sidebar-nav">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <li
                      key={item.id}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => e.preventDefault()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '10px 16px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                          background: isActive ? 'var(--bg-app)' : 'transparent',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <i className={`ph ${item.icon}`} style={{ fontSize: '1.25rem', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}></i>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Upgrade Pro Card Box */}
          <div className="upgrade-card-box" style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '16px', marginTop: 'auto' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
              Upgrade to <strong>Finly Pro</strong> for unlimited insights.
            </p>
            <button className="btn btn-primary btn-upgrade-pro" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', borderRadius: '24px', background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }} onClick={() => alert('Finly Pro Activated!')}>
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-layout">
        <header className="top-navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile Menu Hamburger Button */}
            <button
              className="icon-btn mobile-hamburger-btn"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{ display: 'none', background: 'none', border: '1px solid var(--border-color)', borderRadius: '10px', fontSize: '1.25rem', color: 'var(--text-main)', cursor: 'pointer', padding: '6px 10px' }}
              title="Open Navigation"
            >
              <i className="ph ph-list"></i>
            </button>

            <div className="header-greeting">
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                {activeTab === 'wallet' ? 'Wallet' : 
                 activeTab === 'cards' ? 'Cards' : 
                 activeTab === 'transactions' ? 'Transactions' : 
                 activeTab === 'analytics' ? 'Analytics' : 
                 activeTab === 'investments' ? 'Investments' : 
                 activeTab === 'budgets' ? 'Budgets' : 
                 activeTab === 'reports' ? 'Reports' : 
                 activeTab === 'settings' ? 'Settings' : 
                 `Good morning, ${user ? (user.name ? user.name.split(' ')[0] : 'Alex') : 'Alex'}`}
              </h1>
              <p className="subtitle" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                {activeTab === 'wallet' ? 'Balances, bills, cards, and transfers — in one calm view.' : 
                 activeTab === 'cards' ? 'Your physical and virtual cards.' : 
                 activeTab === 'transactions' ? 'A quiet ledger of everything moving.' : 
                 activeTab === 'analytics' ? 'Financial insights and growth analytics.' : 
                 activeTab === 'investments' ? 'Stock portfolio and asset performance.' : 
                 activeTab === 'budgets' ? 'Monthly category spending limits.' : 
                 activeTab === 'reports' ? 'Financial statements and tax exports.' : 
                 activeTab === 'settings' ? 'Account preferences and security.' : 
                 "Here's your snapshot."}
              </p>
            </div>
          </div>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Bar with Cmd K badge */}
            <div className="search-box-wrapper" style={{ position: 'relative', width: '280px' }}>
              <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
              <input
                type="text"
                id="global-search"
                placeholder="Search transactions, cards..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '8px 48px 8px 36px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', fontSize: '0.82rem', outline: 'none', color: 'var(--text-main)' }}
              />
              <span className="search-cmd-badge" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '2px 6px', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                ⌘K
              </span>
            </div>

            {/* Theme Switcher Pill */}
            <button
              className="btn-icon"
              id="theme-toggle"
              title="Toggle Theme"
              onClick={toggleTheme}
              style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <i className={`ph ${theme === 'dark' ? 'ph-sun' : 'ph-moon'}`}></i>
            </button>

            {/* Notifications Dropdown */}
            <div className="dropdown-wrapper" style={{ position: 'relative' }}>
              <button
                className="btn-icon btn-notifications"
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
              >
                <i className="ph ph-bell"></i>
                {unreadCount > 0 && (
                  <span className="notification-dot" style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
                )}
              </button>
              {showNotifications && (
                <div className="dropdown-menu shadow-lg" style={{ position: 'absolute', right: 0, top: '48px', width: '330px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '16px', zIndex: 1000, boxShadow: '0 12px 35px rgba(0,0,0,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>Notifications</h4>
                      {unreadCount > 0 && (
                        <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button onClick={markAllNotificationsRead} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        Mark read
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      No notifications yet
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                      {notifications.map((n) => (
                        <div key={n.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 12px', background: n.unread ? 'var(--hover-bg)' : 'var(--bg-app)', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${n.color || '#2563eb'}18`, color: n.color || '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                            <i className={`ph ${n.icon || 'ph-bell'}`}></i>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>{n.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>{n.desc}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '4px' }}>{n.time}</div>
                          </div>
                          <button onClick={() => removeNotification(n.id)} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', fontSize: '0.85rem', padding: '2px' }} title="Dismiss">
                            <i className="ph ph-x"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {notifications.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                      <button onClick={clearAllNotifications} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown-wrapper" style={{ position: 'relative' }}>
              <div
                className="avatar-badge"
                style={{ cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-blue)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
