'use client';

import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

export const CardsPage = () => {
  const { cards, addCard, toggleFreezeCard, updateCardLimit, removeCard, showToast } = useDb();

  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  // Form inputs
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expires, setExpires] = useState('');

  // Limit modal inputs
  const [targetCardId, setTargetCardId] = useState(null);
  const [newLimitInput, setNewLimitInput] = useState('');

  // Card specific detailed metrics
  const cardDetails = {
    1: { monthlyLimit: 5000.00, spent: 3494.54, status: 'Active', holder: 'RAHIM ALI FAHRYAN', expires: '09/28' },
    2: { monthlyLimit: 7500.00, spent: 1349.63, status: 'Active', holder: 'RAHIM ALI FAHRYAN', expires: '04/27' }
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!number || !expires) return;
    addCard({
      holder: holder || 'RAHIM ALI FAHRYAN',
      number: number || '4021 9902 6412 0000',
      expires: expires || '12/28'
    });
    setIsAddCardOpen(false);
    setHolder('');
    setNumber('');
    setExpires('');
    showToast('New card requested successfully!');
  };

  const handleOpenLimitModal = (card) => {
    setTargetCardId(card.id);
    const detail = cardDetails[card.id] || { monthlyLimit: card.monthlyLimit || 5000 };
    setNewLimitInput(detail.monthlyLimit.toString());
    setIsLimitModalOpen(true);
  };

  const handleSaveLimit = (e) => {
    e.preventDefault();
    if (targetCardId && newLimitInput) {
      updateCardLimit(targetCardId, newLimitInput);
      setIsLimitModalOpen(false);
      showToast(`Updated monthly spending limit to $${parseFloat(newLimitInput).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
    }
  };

  const handleLockPin = (card) => {
    showToast(`PIN security locked for Card ${card.number.slice(-4)}.`);
  };

  const rewards = [
    { category: 'Dining', rate: '3% cashback', amount: '+$48.20', icon: 'ph-fork-knife' },
    { category: 'Travel', rate: '2% cashback', amount: '+$112.40', icon: 'ph-airplane-tilt' },
    { category: 'Everything else', rate: '1% cashback', amount: '+$74.10', icon: 'ph-shopping-bag' },
  ];

  const recentCardActivity = [
    { title: 'Sell AAPL', sub: 'Investments · Aug 6, 2026', amount: '+$500.00', isPositive: true },
    { title: 'Sell AAPL', sub: 'Investments · Aug 6, 2026', amount: '+$300.00', isPositive: true },
    { title: 'iCloud+ 2TB', sub: 'Bills · Aug 6, 2026', amount: '-$9.99', isPositive: false },
    { title: 'Spotify Family', sub: 'Bills · Aug 6, 2026', amount: '-$16.99', isPositive: false },
    { title: 'Con Edison', sub: 'Bills · Aug 6, 2026', amount: '-$142.00', isPositive: false },
    { title: 'Verizon Fios', sub: 'Bills · Aug 6, 2026', amount: '-$79.99', isPositive: false },
  ];

  const totalCardsBalance = cards.reduce((acc, c) => acc + c.balance, 0);

  return (
    <div className="cards-redesign-container" style={{ paddingBottom: '40px' }}>
      
      {/* Top Bar Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          {cards.length} active cards &bull; ${totalCardsBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} across cards
        </span>
        <button onClick={() => setIsAddCardOpen(true)} style={{ padding: '8px 20px', fontSize: '0.85rem', fontWeight: 600, borderRadius: '24px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="ph ph-plus"></i> Request new card
        </button>
      </div>

      {/* 1. Top Cards Grid (2 Column Equal Width Cards Comparison) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', marginBottom: '28px', width: '100%' }}>
        {cards.map((card, idx) => {
          const detail = cardDetails[card.id] || {
            monthlyLimit: 5000.00,
            spent: 1200.00,
            status: 'Active',
            holder: 'RAHIM ALI FAHRYAN',
            expires: idx === 0 ? '09/28' : '04/27'
          };

          return (
            <div key={card.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)', opacity: card.isFrozen ? 0.8 : 1, transition: 'all 0.3s ease' }}>
              
              {/* Credit Card Visual */}
              <div style={{ background: card.bg, borderRadius: '18px', padding: '24px 28px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.14)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '1.5px', opacity: 0.7 }}>BALANCE</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <i className="ph ph-wifi-high" style={{ fontSize: '1.2rem', opacity: 0.8 }}></i>
                </div>

                <div style={{ fontSize: '1.1rem', letterSpacing: '3px', fontFamily: 'monospace', marginBottom: '20px', opacity: 0.95 }}>
                  {card.number}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.72rem' }}>
                  <div>
                    <span style={{ opacity: 0.7, display: 'block', fontSize: '0.58rem' }}>CARDHOLDER</span>
                    <strong style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{detail.holder}</strong>
                  </div>
                  <div>
                    <span style={{ opacity: 0.7, display: 'block', fontSize: '0.58rem' }}>EXPIRES</span>
                    <strong style={{ fontWeight: 600 }}>{detail.expires}</strong>
                  </div>
                  <strong style={{ fontStyle: 'italic', fontWeight: 800, fontSize: '0.9rem' }}>{card.brand.toUpperCase()}</strong>
                </div>
              </div>

              {/* 3 Column Glassmorphic Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <button
                  onClick={() => toggleFreezeCard(card.id)}
                  style={{ padding: '8px 12px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <i className={`ph ${card.isFrozen ? 'ph-sun' : 'ph-snowflake'}`}></i> {card.isFrozen ? 'Unfreeze' : 'Freeze'}
                </button>

                <button
                  onClick={() => handleLockPin(card)}
                  style={{ padding: '8px 12px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <i className="ph ph-lock-key"></i> Lock PIN
                </button>

                <button
                  onClick={() => handleOpenLimitModal(card)}
                  style={{ padding: '8px 12px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <i className="ph ph-sliders"></i> Limits
                </button>
              </div>

              {/* Card Metrics Breakdown Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', marginBottom: '20px', padding: '0 4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Monthly limit</span>
                  <strong style={{ color: 'var(--text-main)' }}>${detail.monthlyLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Spent this month</span>
                  <strong style={{ color: 'var(--text-main)' }}>${detail.spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status</span>
                  <span style={{ color: card.isFrozen ? '#ef4444' : '#10b981', fontWeight: 600, fontSize: '0.75rem' }}>
                    {card.isFrozen ? 'Frozen' : 'Active'}
                  </span>
                </div>
              </div>

              {/* Remove Card Light Red Button */}
              <button
                onClick={() => { if (window.confirm('Are you sure you want to remove this card?')) removeCard(card.id); }}
                style={{ width: '100%', padding: '10px', fontSize: '0.78rem', fontWeight: 600, borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.04)', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <i className="ph ph-trash"></i> Remove card
              </button>
            </div>
          );
        })}
      </div>

      {/* 2. Bottom Grid (2 Equal Width Sub-Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', width: '100%' }}>
        
        {/* Left Sub-Card: Rewards this month */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <i className="ph ph-gift" style={{ color: '#3b82f6', fontSize: '1.2rem' }}></i>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Rewards this month</h3>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$234.70</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Earned across all cards - redeems for statement credit</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rewards.map(rw => (
              <div key={rw.category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: 'var(--text-main)' }}>
                    <i className={`ph ${rw.icon}`}></i>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-main)' }}>{rw.category}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{rw.rate}</span>
                  </div>
                </div>
                <strong style={{ fontSize: '0.9rem', color: '#10b981' }}>{rw.amount}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sub-Card: Recent card activity */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Recent card activity</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across all cards, most recent first</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentCardActivity.map((act, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: index < recentCardActivity.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-main)' }}>{act.title}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{act.sub}</span>
                </div>
                <strong style={{ fontSize: '0.88rem', color: act.isPositive ? '#10b981' : 'var(--text-main)' }}>
                  {act.amount}
                </strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Disclaimer Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '12px' }}>
        <span>&copy; 2026 Finly. Mock data &mdash; for demo purposes only.</span>
        <span>Designed with the calm of SF Pro and one Action Blue.</span>
      </div>

      {/* Request New Card Modal */}
      <Modal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        title="Request New Virtual / Physical Card"
        subtitle="Issue a new payment card connected to your main account"
        icon="ph-credit-card"
        size="md"
      >
        <form onSubmit={handleAddCardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Cardholder Name</label>
            <input type="text" className="form-control" placeholder="RAHIM ALI FAHRYAN" value={holder} onChange={e => setHolder(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input type="text" className="form-control" placeholder="4021 9902 6412 0000" value={number} onChange={e => setNumber(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Expiration Date</label>
            <input type="text" className="form-control" placeholder="12/28" value={expires} onChange={e => setExpires(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '4px' }}>
            <i className="ph ph-plus-circle"></i> Issue Card Now
          </button>
        </form>
      </Modal>

      {/* Edit Limit Modal */}
      <Modal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        title="Adjust Monthly Spending Limit"
        subtitle="Set maximum card authorization threshold"
        icon="ph-sliders"
        size="md"
      >
        <form onSubmit={handleSaveLimit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">New Monthly Limit ($)</label>
            <input type="number" step="100" className="form-control" value={newLimitInput} onChange={e => setNewLimitInput(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '4px' }}>
            <i className="ph ph-check"></i> Save Limit
          </button>
        </form>
      </Modal>

    </div>
  );
};
