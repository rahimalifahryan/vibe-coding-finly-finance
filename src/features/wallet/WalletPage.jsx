'use client';

import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.jsx';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';
import { SendModal } from '../../design-system/components/SendModal.jsx';
import { TransferModal } from '../../design-system/components/TransferModal.jsx';
import { TopUpModal } from '../../design-system/components/TopUpModal.jsx';

export const WalletPage = ({ setActiveTab }) => {
  const { user, toggleBalancePrivacy } = useAuth();
  const { cards, addTransaction, showToast } = useDb();

  // Modals state
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

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

  // Savings Goals State
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency fund', current: 8200, target: 12000, color: '#3b82f6' },
    { id: 2, name: 'Japan 2027', current: 2400, target: 6000, color: '#f97316' },
    { id: 3, name: 'New MacBook Pro', current: 1750, target: 3500, color: '#10b981' },
    { id: 4, name: 'Down payment', current: 14200, target: 60000, color: '#8b5cf6' },
  ]);

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');

  // Upcoming Bills State
  const [bills, setBills] = useState([
    { id: 1, name: 'Rent — 88 Sullivan St.', due: 'Due Jul 28 · Autopay on', amount: 2400.00, autopay: true, icon: 'ph-house' },
    { id: 2, name: 'Con Edison', due: 'Due Jul 30 · Autopay on', amount: 142.00, autopay: true, icon: 'ph-lightning' },
    { id: 3, name: 'Verizon Fios', due: 'Due Aug 02', amount: 79.99, autopay: false, icon: 'ph-wifi-high' },
    { id: 4, name: 'Spotify Family', due: 'Due Aug 05 · Autopay on', amount: 16.99, autopay: true, icon: 'ph-music-notes' },
    { id: 5, name: 'iCloud+ 2TB', due: 'Due Aug 07 · Autopay on', amount: 9.99, autopay: true, icon: 'ph-cloud' },
  ]);

  const recipients = [
    { name: 'Sarah', avatar: 'S', bg: '#f59e0b' },
    { name: 'Miguel', avatar: 'M', bg: '#6366f1' },
    { name: 'Aiko', avatar: 'A', bg: '#10b981' },
    { name: 'Priya', avatar: 'P', bg: '#ec4899' },
    { name: 'Jonas', avatar: 'J', bg: '#3b82f6' },
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

  const handlePayBill = (bill) => {
    addTransaction({ merchant: bill.name, category: 'Bills', amount: bill.amount, isPositive: false });
    showToast(`Paid $${bill.amount.toFixed(2)} for ${bill.name}`);
  };

  const handleToggleAutopay = (billId) => {
    setBills(bills.map(b => {
      if (b.id === billId) {
        const nextState = !b.autopay;
        const mainDue = b.due.split(' · ')[0];
        const newDue = nextState ? `${mainDue} · Autopay on` : mainDue;
        showToast(`Autopay ${nextState ? 'enabled' : 'disabled'} for ${b.name}`);
        return { ...b, autopay: nextState, due: newDue };
      }
      return b;
    }));
  };

  const handleAddGoalSubmit = (e) => {
    e.preventDefault();
    const targetAmt = parseFloat(newGoalTarget);
    if (!newGoalName || isNaN(targetAmt) || targetAmt <= 0) return;
    const colors = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];
    const randomColor = colors[goals.length % colors.length];
    setGoals([...goals, { id: Date.now(), name: newGoalName, current: 0, target: targetAmt, color: randomColor }]);
    setIsAddGoalOpen(false);
    setNewGoalName('');
    setNewGoalTarget('');
    showToast(`New savings goal '${newGoalName}' created!`);
  };

  const handleAddGoalFunds = (goalId) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, current: Math.min(g.target, g.current + 250) } : g));
    showToast('Added +$250.00 to savings goal');
  };

  const handleRemoveGoalFunds = (goalId) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, current: Math.max(0, g.current - 250) } : g));
    showToast('Withdrew $250.00 from savings goal');
  };

  const formattedBalance = user && user.isBalanceHidden ? '••••••••' : '$24,568.32';

  return (
    <div className="wallet-redesign-container" style={{ paddingBottom: '40px' }}>
      {/* 2-Column Grid Layout */}
      <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px', width: '100%' }}>
        
        {/* ================= LEFT MAIN COLUMN ================= */}
        <div className="wallet-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
          
          {/* 1. Hero Total Balance Card */}
          <div className="hero-balance-card" style={{ background: '#14171f', borderRadius: '20px', padding: '24px 28px', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', letterSpacing: '0.5px' }}>Total Balance</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select style={{ background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '4px 10px', fontSize: '0.75rem', outline: 'none' }}>
                  <option>USD &bull; MAIN</option>
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
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
                ↗ +12.4%
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

          {/* 2. Four Mini KPI Sparkline Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', width: '100%' }}>
            {/* Income */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Income</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↗ 8.2%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$8,420.50</h3>
              </div>
              <div style={{ height: '24px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <path d="M0,15 Q25,5 50,12 T100,6" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Expenses */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Expenses</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↘ 3.1%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$1,602.21</h3>
              </div>
              <div style={{ height: '24px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <path d="M0,10 Q30,18 60,8 T100,14" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Savings */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Savings</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↗ 8.1%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$6,818.29</h3>
              </div>
              <div style={{ height: '24px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <path d="M0,16 Q25,8 50,14 T100,4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Investments */}
            <div className="kpi-sparkline-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }}></div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Investments</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>↗ 1.78%</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$32,780.00</h3>
              </div>
              <div style={{ height: '24px', width: '100%', marginTop: 'auto' }}>
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <path d="M0,12 Q30,16 60,6 T100,10" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Upcoming Bills Card */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px 24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Upcoming bills</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>5 unpaid &bull; $2,648.97 scheduled</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                Autopay overview
              </button>
            </div>

            {/* List of Bills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {bills.map(bill => (
                <div key={bill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                      <i className={`ph ${bill.icon}`}></i>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-main)' }}>{bill.name}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{bill.due}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>${bill.amount.toFixed(2)}</strong>
                    
                    <button 
                      onClick={() => handleToggleAutopay(bill.id)}
                      style={{ 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '0.72rem', 
                        fontWeight: 600, 
                        background: bill.autopay ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-app)', 
                        color: bill.autopay ? '#10b981' : 'var(--text-muted)', 
                        border: bill.autopay ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      title="Click to toggle Autopay"
                    >
                      <i className={`ph ${bill.autopay ? 'ph-check-circle' : 'ph-x-circle'}`}></i>
                      {bill.autopay ? 'Autopay on' : 'Autopay off'}
                    </button>

                    <button onClick={() => handlePayBill(bill)} style={{ padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '16px', background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                      Pay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. My Cards Full Section */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>My cards</h3>
              <button onClick={() => setActiveTab('cards')} style={{ padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '18px', background: 'var(--accent-blue)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                + Add card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {cards.map(card => (
                <div key={card.id} style={{ background: card.bg, borderRadius: '20px', padding: '24px 28px', color: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', letterSpacing: '1.5px', opacity: 0.7 }}>BALANCE</span>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <i className="ph ph-wifi-high" style={{ fontSize: '1.2rem', opacity: 0.8 }}></i>
                      <i className="ph ph-dots-three-vertical" style={{ fontSize: '1.2rem', opacity: 0.8, cursor: 'pointer' }}></i>
                    </div>
                  </div>

                  <div style={{ fontSize: '1.1rem', letterSpacing: '3px', fontFamily: 'monospace', marginBottom: '20px', opacity: 0.95 }}>
                    {card.number}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.75rem' }}>
                    <div>
                      <span style={{ opacity: 0.7, display: 'block', fontSize: '0.6rem' }}>CARDHOLDER</span>
                      <strong style={{ fontWeight: 600 }}>{card.holder}</strong>
                    </div>
                    <div>
                      <span style={{ opacity: 0.7, display: 'block', fontSize: '0.6rem' }}>EXPIRES</span>
                      <strong style={{ fontWeight: 600 }}>{card.expires}</strong>
                    </div>
                    <strong style={{ fontStyle: 'italic', fontWeight: 800, fontSize: '0.95rem' }}>{card.brand.toUpperCase()}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDEBAR COLUMN ================= */}
        <div className="wallet-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 1. Quick Transfer Widget */}
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

          {/* 2. Savings Goals Widget */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="ph ph-vault" style={{ color: 'var(--accent-blue)', fontSize: '1.1rem' }}></i>
                <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>Savings goals</h3>
              </div>
            </div>

            {/* List of Goals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {goals.map(goal => {
                const pct = Math.round((goal.current / goal.target) * 100);
                return (
                  <div key={goal.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--text-main)' }}>{goal.name}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>${goal.current.toLocaleString('en-US', { minimumFractionDigits: 2 })} / ${goal.target.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    
                    <div style={{ height: '6px', background: 'var(--bg-app)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: goal.color, transition: 'width 0.3s ease' }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleAddGoalFunds(goal.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', padding: 0, cursor: 'pointer', fontWeight: 600 }}>Add funds</button>
                        <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
                        <button onClick={() => handleRemoveGoalFunds(goal.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0, cursor: 'pointer' }}>Remove</button>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* New Savings Goal Button */}
            <button
              onClick={() => setIsAddGoalOpen(true)}
              style={{ width: '100%', marginTop: '16px', padding: '10px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '14px', border: '1px dashed var(--border-color)', background: 'transparent', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              + New savings goal
            </button>
          </div>

        </div>
      </div>

      {/* Footer Disclaimer Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '12px' }}>
        <span>&copy; 2026 Finly. Mock data &mdash; for demo purposes only.</span>
        <span>Designed with the calm of SF Pro and one Action Blue.</span>
      </div>

      {/* Enhanced Modals */}
      <SendModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />
      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />

      <Modal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        title="Create New Savings Goal"
        subtitle="Set up a dedicated target for your savings aspirations"
        icon="ph-piggy-bank"
        size="md"
      >
        <form onSubmit={handleAddGoalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Goal Name</label>
            <input type="text" className="form-control" placeholder="e.g. Vacation 2027, Dream Home..." value={newGoalName} onChange={e => setNewGoalName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Target Amount ($)</label>
            <input type="number" step="0.01" className="form-control" placeholder="5000" value={newGoalTarget} onChange={e => setNewGoalTarget(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '4px' }}>
            <i className="ph ph-plus-circle"></i> Create Goal
          </button>
        </form>
      </Modal>
    </div>
  );
};
