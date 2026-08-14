'use client';

import React, { useState } from 'react';
import { ThemeProvider } from './core/theme/ThemeContext.jsx';
import { AuthProvider, useAuth } from './core/auth/AuthContext.jsx';
import { DbProvider } from './core/database/DbContext.jsx';
import { Layout } from './design-system/Layout.jsx';

import { DashboardPage } from './features/dashboard/DashboardPage.jsx';
import { TransactionsPage } from './features/transactions/TransactionsPage.jsx';
import { AnalyticsPage } from './features/analytics/AnalyticsPage.jsx';
import { CardsPage } from './features/cards/CardsPage.jsx';
import { WalletPage } from './features/wallet/WalletPage.jsx';
import { BudgetsPage } from './features/budgets/BudgetsPage.jsx';
import { InvestmentsPage } from './features/investments/InvestmentsPage.jsx';
import { ReportsPage } from './features/reports/ReportsPage.jsx';
import { SettingsPage } from './features/settings/SettingsPage.jsx';

import { LoginPage } from './features/auth/LoginPage.jsx';
import { RegisterPage } from './features/auth/RegisterPage.jsx';

const MainAppContent = () => {
  const { user, loading } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
        <i className="ph ph-spinner-gap" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}></i>
      </div>
    );
  }

  if (!user) {
    if (authView === 'register') {
      return <RegisterPage onNavigateLogin={() => setAuthView('login')} onRegisterSuccess={() => setActiveTab('dashboard')} />;
    }
    return <LoginPage onNavigateRegister={() => setAuthView('register')} onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'transactions':
        return <TransactionsPage searchQuery={searchQuery} />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'cards':
        return <CardsPage />;
      case 'wallet':
        return <WalletPage setActiveTab={setActiveTab} />;
      case 'budgets':
        return <BudgetsPage />;
      case 'investments':
        return <InvestmentsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <div key={activeTab} className="page-transition-wrapper">
        {renderActiveView()}
      </div>
    </Layout>
  );
};

export function App() {
  return <MainAppContent />;
}
