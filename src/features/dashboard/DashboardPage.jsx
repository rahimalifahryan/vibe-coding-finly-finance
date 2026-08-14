'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';
import { SendModal } from '../../design-system/components/SendModal.jsx';
import { TransferModal } from '../../design-system/components/TransferModal.jsx';
import { TopUpModal } from '../../design-system/components/TopUpModal.jsx';

export const DashboardPage = ({ setActiveTab }) => {
  const { user, toggleBalancePrivacy } = useAuth();
  const {
    transactions,
    cards,
    budgets,
    investments,
    addTransaction,
    addCard,
    showToast
  } = useDb();

  // Modals state
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  // Form Inputs
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [topUpMethod, setTopUpMethod] = useState('Debit Card (**** 4092)');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendCategory, setSendCategory] = useState('Transfer');

  // Transfer Form Inputs
  const [transferFrom, setTransferFrom] = useState('Main Account (**** 2514)');
  const [transferTo, setTransferTo] = useState('Savings Vault');
  const [transferAmount, setTransferAmount] = useState('250');

  // Quick Transfer State
  const [quickRecipient, setQuickRecipient] = useState('Sarah');
  const [quickAmount, setQuickAmount] = useState('');
  const [quickNote, setQuickNote] = useState('Dinner split');

  // Transactions Filter
  const [statusFilter, setStatusFilter] = useState('all');
  const [txSearch, setTxSearch] = useState('');

  // Analytics Period
  const [analyticsPeriod, setAnalyticsPeriod] = useState('Monthly');
  const [investTab, setInvestTab] = useState('buy');

  const recipients = [
    { name: 'Sarah', avatar: 'S', bg: '#f59e0b' },
    { name: 'Michael', avatar: 'M', bg: '#6366f1' },
    { name: 'Ana', avatar: 'A', bg: '#10b981' },
    { name: 'Priya', avatar: 'P', bg: '#ec4899' },
    { name: 'Joshua', avatar: 'J', bg: '#3b82f6' },
  ];

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Top Up &mdash; ${topUpMethod}`, category: 'Income', amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Top up +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} successful via ${topUpMethod}`);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: `Send Payment to ${sendRecipient}`, category: sendCategory, amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient('');
    setSendAmount('');
    showToast(`Sent $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer (${transferFrom} ➔ ${transferTo})`, category: 'Transfer', amount: amt, isPositive: false });
    setIsTransferOpen(false);
    showToast(`Transferred $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} from ${transferFrom} to ${transferTo}`);
  };

  const handleQuickTransfer = (e) => {
    e.preventDefault();
    const amt = parseFloat(quickAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer to ${quickRecipient}`, category: 'Transfer', amount: amt, isPositive: false });
    setQuickAmount('');
    setQuickNote('');
    showToast(`Transferred $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${quickRecipient}`);
  };

  const exportCSV = () => {
    let csvContent = 'Merchant,Category,Date,Status,Amount\n';
    filteredTxs.forEach(tx => {
      const cleanMerchant = tx.merchant.replace(/&mdash;/g, '-').replace(/<[^>]*>?/gm, '');
      const formattedAmt = `${tx.type === 'credit' ? '+' : '-'}$${tx.amount.toFixed(2)}`;
      csvContent += `"${cleanMerchant}","${tx.category}","${tx.date}","${tx.status}","${formattedAmt}"\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Finly_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV transaction report');
  };

  const filteredTxs = transactions.filter(tx => {
    const matchStatus = statusFilter === 'all' || tx.status.toLowerCase() === statusFilter.toLowerCase();
    const q = txSearch.toLowerCase().trim();
    const matchQuery = !q || `${tx.merchant} ${tx.category} ${tx.date}`.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const formattedBalance = user && user.isBalanceHidden ? '••••••••' : '$24,568.32';

  return (
    <div className="dashboard-redesign-container" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', paddingBottom: '40px' }}>
      {/* Grid Layout: Main Left Column + Right Sidebar Column */}
      <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        
        {/* ================= LEFT MAIN COLUMN ================= */}
        <div className="dashboard-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
          
          {/* 1. Hero Balance Card */}
          <div className="hero-balance-card" style={{ background: '#14171f', borderRadius: '20px', padding: '24px 28px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', letterSpacing: '0.5px' }}>Total Balance</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', outline: 'none' }}>
                  <option>USD &bull; WAM</option>
                </select>
                <select style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', outline: 'none' }}>
                  <option>&bull;&bull;&bull;&bull; 2514</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
                {formattedBalance}
              </h2>
              <button onClick={toggleBalancePrivacy} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}>
                <i className={`ph ${user && user.isBalanceHidden ? 'ph-eye-slash' : 'ph-eye'}`}></i>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '24px' }}>
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
                ↗ -12.4%
              </span>
              <span>vs. last month</span>
            </div>

            {/* Glassmorphic Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              <button onClick={() => setIsSendOpen(true)} className="action-pill-btn">
                <i className="ph ph-paper-plane-tilt"></i> Send
              </button>
              <button onClick={() => setIsTransferOpen(true)} className="action-pill-btn">
                <i className="ph ph-arrows-left-right"></i> Transfer
              </button>
              <button onClick={() => setIsTopUpOpen(true)} className="action-pill-btn">
                <i className="ph ph-plus"></i> Top up
              </button>
              <button onClick={() => setActiveTab('cards')} className="action-pill-btn">
                <i className="ph ph-credit-card"></i> Add card
              </button>
            </div>
          </div>

          {/* 2. Four Mini Sparkline KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', width: '100%' }}>
            {/* Income */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                    <i className="ph ph-wallet"></i>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Income</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>↗ +6.2%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$8,420.50</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+$490.00 this week</span>
              </div>
              <div style={{ height: '28px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 25" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,20 Q25,5 50,14 T100,6 L100,25 L0,25 Z" fill="url(#incomeGrad)" />
                  <path d="M0,20 Q25,5 50,14 T100,6" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Expenses */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                    <i className="ph ph-arrow-up-right"></i>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Expenses</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>↗ +3.1%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$1,602.21</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>-$52.10 vs last week</span>
              </div>
              <div style={{ height: '28px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 25" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <defs>
                    <linearGradient id="expensesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,10 Q30,22 60,8 T100,16 L100,25 L0,25 Z" fill="url(#expensesGrad)" />
                  <path d="M0,10 Q30,22 60,8 T100,16" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Savings */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                    <i className="ph ph-vault"></i>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Savings</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>↗ +8.1%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$6,818.29</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+$310.00 saved</span>
              </div>
              <div style={{ height: '28px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 25" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <defs>
                    <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,20 Q25,8 50,15 T100,4 L100,25 L0,25 Z" fill="url(#savingsGrad)" />
                  <path d="M0,20 Q25,8 50,15 T100,4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Investments */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                    <i className="ph ph-chart-line-up"></i>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Investments</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>↗ +0.33%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$32,780.00</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+$108.70 today</span>
              </div>
              <div style={{ height: '28px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 25" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <defs>
                    <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,15 Q30,20 60,8 T100,12 L100,25 L0,25 Z" fill="url(#investGrad)" />
                  <path d="M0,15 Q30,20 60,8 T100,12" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Financial Analytics Multi-Area Chart */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px 24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Financial Analytics</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Income, expenses, and savings over time</p>
              </div>

              {/* Period Selector Pills */}
              <div style={{ display: 'flex', background: 'var(--bg-app)', padding: '3px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                {['Weekly', 'Monthly', 'Yearly'].map(period => (
                  <button
                    key={period}
                    onClick={() => setAnalyticsPeriod(period)}
                    style={{ padding: '5px 14px', fontSize: '0.72rem', fontWeight: 600, border: 'none', borderRadius: '16px', background: analyticsPeriod === period ? 'var(--bg-card)' : 'transparent', color: analyticsPeriod === period ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', boxShadow: analyticsPeriod === period ? 'var(--shadow-sm)' : 'none' }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Summary 3 Individual Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '20px' }}>
              {/* Peak Income Card */}
              <div style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>PEAK INCOME</span>
                </div>
                <strong style={{ fontSize: '1.05rem', color: '#3b82f6', fontWeight: 800 }}>
                  $8,420.50 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>(Jul)</span>
                </strong>
              </div>

              {/* Avg Expenses Card */}
              <div style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>AVG EXPENSES</span>
                </div>
                <strong style={{ fontSize: '1.05rem', color: '#ef4444', fontWeight: 800 }}>
                  $1,602.21 <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>(Monthly)</span>
                </strong>
              </div>

              {/* Net Savings Card */}
              <div style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>NET SAVINGS</span>
                </div>
                <strong style={{ fontSize: '1.05rem', color: '#10b981', fontWeight: 800 }}>
                  +$6,818.29 <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>(+12.4%)</span>
                </strong>
              </div>
            </div>

            {/* Chart Legend Pills */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '14px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Income</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Expenses</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Savings</span>
              </div>
            </div>

            {/* SVG Multi-Area Line Chart with Y-Axis & Tooltip Callout */}
            <div style={{ width: '100%', height: '220px', position: 'relative', display: 'flex', gap: '12px' }}>
              {/* Y-Axis Labels */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', paddingBottom: '20px', fontWeight: 500, textAlign: 'right', minWidth: '38px' }}>
                <span>$10.0k</span>
                <span>$7.5k</span>
                <span>$5.0k</span>
                <span>$2.5k</span>
                <span>$0.0k</span>
              </div>

              {/* Main SVG Area */}
              <div style={{ flex: 1, position: 'relative', height: '100%' }}>
                <svg viewBox="0 0 700 200" preserveAspectRatio="none" style={{ width: '100%', height: '170px', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="chartIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="chartSavingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="chartExpensesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1="0" y1="10" x2="700" y2="10" stroke="var(--border-color)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="0" y1="50" x2="700" y2="50" stroke="var(--border-color)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="0" y1="90" x2="700" y2="90" stroke="var(--border-color)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="0" y1="130" x2="700" y2="130" stroke="var(--border-color)" strokeDasharray="4 4" opacity="0.6" />
                  <line x1="0" y1="170" x2="700" y2="170" stroke="var(--border-color)" opacity="0.8" />

                  {/* Active Month Vertical Highlight Line (Jul) */}
                  <line x1="385" y1="10" x2="385" y2="170" stroke="#3b82f6" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.8" />

                  {/* Area 1: Income (Blue) */}
                  <path d="M0,110 C80,70 160,85 240,65 C320,45 385,25 450,35 C520,45 610,30 700,38 L700,170 L0,170 Z" fill="url(#chartIncomeGrad)" />
                  <path d="M0,110 C80,70 160,85 240,65 C320,45 385,25 450,35 C520,45 610,30 700,38" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                  {/* Area 2: Savings (Green) */}
                  <path d="M0,135 C80,110 160,120 240,105 C320,90 385,75 450,85 C520,80 610,70 700,75 L700,170 L0,170 Z" fill="url(#chartSavingsGrad)" />
                  <path d="M0,135 C80,110 160,120 240,105 C320,90 385,75 450,85 C520,80 610,70 700,75" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Area 3: Expenses (Red) */}
                  <path d="M0,155 C80,140 160,145 240,138 C320,130 385,120 450,128 C520,122 610,115 700,118 L700,170 L0,170 Z" fill="url(#chartExpensesGrad)" />
                  <path d="M0,155 C80,140 160,145 240,138 C320,130 385,120 450,128 C520,122 610,115 700,118" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />

                  {/* Active Glowing Dot at Jul Peak */}
                  <circle cx="385" cy="25" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))' }} />
                </svg>

                {/* Floating Active Tooltip Badge above Jul */}
                <div style={{ position: 'absolute', top: '-12px', left: '55%', transform: 'translateX(-50%)', background: '#14171f', color: '#fff', padding: '6px 12px', borderRadius: '10px', fontSize: '0.72rem', boxShadow: '0 4px 14px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)', pointerEvents: 'none', zIndex: 10 }}>
                  <div style={{ fontWeight: 700, color: '#60a5fa', marginBottom: '2px' }}>Jul 2026 Peak</div>
                  <div>Income: <strong>$8,420.50</strong></div>
                  <div>Savings: <strong>$6,818.29</strong></div>
                </div>

                {/* Month Labels Axis */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 500 }}>
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Spending Doughnut Chart & Budget Progress Sub-Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Spending Breakdown Card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>Spending</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By category, this month</span>
                </div>
                <button onClick={() => setActiveTab('analytics')} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  View all
                </button>
              </div>

              {/* Center Doughnut Chart */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '16px 0', position: 'relative' }}>
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="180 160" strokeDashoffset="0" />
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="70 270" strokeDashoffset="-180" />
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray="50 290" strokeDashoffset="-250" />
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray="30 310" strokeDashoffset="-300" />
                </svg>
                <div style={{ position: 'absolute', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Total</span>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800 }}>$1,602.21</strong>
                </div>
              </div>

              {/* Category Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }}></span> Shopping
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>$1,250.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Bills
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>$142.00</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Food
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>$84.32</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Healthcare
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>$38.50</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Transportation
                  </span>
                  <strong style={{ color: 'var(--text-main)' }}>$22.40</strong>
                </div>
              </div>
            </div>

            {/* Budget Progress Card */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>Budget progress</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>This month</span>
                </div>
                <button onClick={() => setActiveTab('budgets')} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                  Manage
                </button>
              </div>

              {/* Progress Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Food */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Food</span>
                    <span style={{ color: 'var(--text-muted)' }}>$780.00 / $800.00</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '97.5%', height: '100%', background: '#3b82f6' }}></div>
                  </div>
                </div>

                {/* Shopping (Over Budget Alert) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Shopping</span>
                    <span style={{ color: 'var(--text-muted)' }}>$1,400.00 / $1,200.00</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden', marginBottom: '4px' }}>
                    <div style={{ width: '100%', height: '100%', background: '#ef4444' }}></div>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#ef4444', fontWeight: 600 }}>Over by $200.00</span>
                </div>

                {/* Entertainment */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Entertainment</span>
                    <span style={{ color: 'var(--text-muted)' }}>$435.00 / $500.00</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '87%', height: '100%', background: '#3b82f6' }}></div>
                  </div>
                </div>

                {/* Travel */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Travel</span>
                    <span style={{ color: 'var(--text-muted)' }}>$320.00 / $800.00</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '40%', height: '100%', background: '#3b82f6' }}></div>
                  </div>
                </div>

                {/* Bills */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Bills</span>
                    <span style={{ color: 'var(--text-muted)' }}>$952.00 / $900.00</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', background: '#3b82f6' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Recent Transactions Full Section */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Recent transactions</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{filteredTxs.length} results</span>
              </div>

              {/* Filters & Export Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div className="search-box" style={{ width: '200px', position: 'relative' }}>
                  <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={txSearch}
                    onChange={e => setTxSearch(e.target.value)}
                    style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', fontSize: '0.78rem', outline: 'none', color: 'var(--text-main)' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-app)', padding: '2px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  {['all', 'completed', 'pending', 'failed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      style={{ padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, border: 'none', borderRadius: '14px', background: statusFilter === st ? 'var(--bg-card)' : 'transparent', color: statusFilter === st ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', textTransform: 'capitalize' }}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <select style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '14px', padding: '4px 10px', fontSize: '0.75rem', outline: 'none' }}>
                  <option>Recent ▾</option>
                </select>

                <button onClick={exportCSV} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '14px', padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="ph ph-download-simple"></i> CSV
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive-wrapper" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 12px' }}>MERCHANT</th>
                    <th style={{ padding: '10px 12px' }}>CATEGORY</th>
                    <th style={{ padding: '10px 12px' }}>DATE</th>
                    <th style={{ padding: '10px 12px' }}>STATUS</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>AMOUNT</th>
                    <th style={{ padding: '10px 12px', width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTxs.map(tx => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, color: 'var(--text-main)' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                            <i className={`ph ${tx.icon}`}></i>
                          </div>
                          <span dangerouslySetInnerHTML={{ __html: tx.merchant }}></span>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{tx.category}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{tx.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, background: tx.status === 'Completed' ? 'rgba(16, 185, 129, 0.12)' : (tx.status === 'Pending' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)'), color: tx.status === 'Completed' ? '#10b981' : (tx.status === 'Pending' ? '#f59e0b' : '#ef4444') }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: tx.type === 'credit' ? '#10b981' : 'var(--text-main)' }}>
                        {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <i className="ph ph-dots-three"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN ================= */}
        <div className="dashboard-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 1. My Cards Widget */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>My cards</h3>
              <button onClick={() => setActiveTab('cards')} style={{ padding: '5px 12px', fontSize: '0.72rem', fontWeight: 600, borderRadius: '16px', background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                + Add card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cards.map(card => (
                <div key={card.id} style={{ background: card.bg, borderRadius: '16px', padding: '16px 20px', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.62rem', letterSpacing: '1px', opacity: 0.7 }}>BALANCE</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <i className="ph ph-wifi-high" style={{ fontSize: '1.1rem', opacity: 0.8 }}></i>
                  </div>
                  <div style={{ fontSize: '0.95rem', letterSpacing: '2px', fontFamily: 'monospace', marginBottom: '14px', opacity: 0.9 }}>
                    {card.number}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem' }}>
                    <div>
                      <span style={{ opacity: 0.7, display: 'block', fontSize: '0.58rem' }}>CARDHOLDER</span>
                      <strong style={{ fontWeight: 600 }}>{card.holder}</strong>
                    </div>
                    <div>
                      <span style={{ opacity: 0.7, display: 'block', fontSize: '0.58rem' }}>EXPIRES</span>
                      <strong style={{ fontWeight: 600 }}>{card.expires}</strong>
                    </div>
                    <strong style={{ fontStyle: 'italic', fontWeight: 800 }}>{card.brand.toUpperCase()}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quick Transfer Widget */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>Quick transfer</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                See all
              </button>
            </div>

            {/* Recipient Avatars */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {recipients.map(r => (
                <div
                  key={r.name}
                  onClick={() => setQuickRecipient(r.name)}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', background: r.bg, color: '#fff', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: quickRecipient === r.name ? '2px solid var(--text-main)' : 'none', opacity: quickRecipient === r.name ? 1 : 0.8 }}
                  title={r.name}
                >
                  {r.avatar}
                </div>
              ))}
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px dashed var(--border-color)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '1rem' }}>
                +
              </div>
            </div>

            <form onSubmit={handleQuickTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>NOTE (OPTIONAL)</label>
                <input
                  type="text"
                  placeholder="Dinner split"
                  value={quickNote}
                  onChange={e => setQuickNote(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', fontSize: '0.8rem', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>AMOUNT</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="$ 0.00"
                  value={quickAmount}
                  onChange={e => setQuickAmount(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', fontSize: '0.8rem', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => showToast(`Saved draft transfer for ${quickRecipient}`)}
                  style={{ padding: '8px', fontSize: '0.78rem', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Save as draft
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px', fontSize: '0.78rem', borderRadius: '16px', border: 'none', background: 'var(--accent-blue)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Send money
                </button>
              </div>
            </form>
          </div>

          {/* 3. Investments Widget */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>Investments</h3>
              <span style={{ fontSize: '0.72rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                +0.33% today
              </span>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Total portfolio value</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-main)' }}>$32,780.00</h3>
              <span style={{ fontSize: '0.72rem', color: '#10b981' }}>+$108.70 today</span>
            </div>

            {/* Buy / Sell Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => setInvestTab('buy')}
                style={{ padding: '6px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '8px', border: 'none', background: investTab === 'buy' ? 'var(--accent-blue)' : 'var(--bg-app)', color: investTab === 'buy' ? '#fff' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                Buy
              </button>
              <button
                onClick={() => setInvestTab('sell')}
                style={{ padding: '6px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '8px', border: '1px solid var(--border-color)', background: investTab === 'sell' ? 'var(--bg-card)' : 'transparent', color: investTab === 'sell' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer' }}
              >
                Sell
              </button>
            </div>

            {/* Multi-color Asset Allocation Bar */}
            <div style={{ height: '8px', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '10px' }}>
              <div style={{ width: '38%', background: '#f97316' }}></div>
              <div style={{ width: '26%', background: '#a855f7' }}></div>
              <div style={{ width: '20%', background: '#06b6d4' }}></div>
              <div style={{ width: '16%', background: '#3b82f6' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <span><span style={{ color: '#f97316' }}>●</span> AAPL 38%</span>
              <span><span style={{ color: '#a855f7' }}>●</span> MSFT 26%</span>
              <span><span style={{ color: '#06b6d4' }}>●</span> BTC 20%</span>
              <span><span style={{ color: '#3b82f6' }}>●</span> VOO 16%</span>
            </div>

            {/* Assets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
              {investments.map(inv => (
                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>{inv.symbol}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{inv.name}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ display: 'block', color: 'var(--text-main)' }}>${inv.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                    <span style={{ fontSize: '0.7rem', color: inv.isPositive ? '#10b981' : '#ef4444', fontWeight: 600 }}>{inv.returnPct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Modals */}
      <SendModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />
      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
    </div>
  );
};
