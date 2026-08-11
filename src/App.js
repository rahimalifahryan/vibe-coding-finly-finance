import React, { useState } from 'react';
import { ThemeProvider } from './core/theme/ThemeContext.js';
import { AuthProvider, useAuth } from './core/auth/AuthContext.js';
import { DbProvider } from './core/database/DbContext.js';
import { Layout } from './design-system/Layout.js';

import { DashboardPage } from './features/dashboard/DashboardPage.js';
import { TransactionsPage } from './features/transactions/TransactionsPage.js';
import { AnalyticsPage } from './features/analytics/AnalyticsPage.js';
import { CardsPage } from './features/cards/CardsPage.js';
import { WalletPage } from './features/wallet/WalletPage.js';
import { BudgetsPage } from './features/budgets/BudgetsPage.js';
import { InvestmentsPage } from './features/investments/InvestmentsPage.js';
import { ReportsPage } from './features/reports/ReportsPage.js';
import { SettingsPage } from './features/settings/SettingsPage.js';

import { LoginPage } from './features/auth/LoginPage.js';
import { RegisterPage } from './features/auth/RegisterPage.js';

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
      {renderActiveView()}
    </Layout>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DbProvider>
          <MainAppContent />
        </DbProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
