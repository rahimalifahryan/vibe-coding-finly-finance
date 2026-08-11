import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.js';
import { useDb } from '../../core/database/DbContext.js';
import { Modal } from '../../design-system/components/Modal.js';

export const WalletPage = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { addTransaction, showToast } = useDb();

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('500');

  const handleDeposit = (e) => {
    e.preventDefault();
    const amt = parseFloat(depositAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: 'Wallet Cash Deposit', category: 'Income', amount: amt, isPositive: true });
    setIsDepositOpen(false);
    showToast(`Added +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to Wallet`);
  };

  return (
    <div className="wallet-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>My Digital Wallet</h2>
          <p className="subtitle">Overview of linked bank accounts, digital currency balances, and cash reserves.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveTab('cards')}>
            <i className="ph ph-credit-card"></i> View Cards
          </button>
          <button className="btn btn-primary" onClick={() => setIsDepositOpen(true)}>
            <i className="ph ph-plus-circle"></i> Add Funds
          </button>
        </div>
      </div>

      {/* Main Balance Banner */}
      <div className="card-box" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', color: '#fff', padding: '32px', marginBottom: '24px', borderRadius: '16px' }}>
        <span style={{ fontSize: '0.85rem', letterSpacing: '1px', opacity: 0.9 }}>TOTAL WALLET CASH BALANCE</span>
        <h1 style={{ fontSize: '2.5rem', margin: '8px 0 16px 0', fontWeight: 800 }}>
          ${user ? (user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '24,568.32'}
        </h1>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'block' }}>Primary Currency</span>
            <strong>USD ($)</strong>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'block' }}>Linked Accounts</span>
            <strong>3 Bank Vaults</strong>
          </div>
        </div>
      </div>

      {/* Linked Accounts */}
      <section className="card-box">
        <h3>Linked Financial Vaults</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-app)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="merchant-icon" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)' }}><i className="ph ph-bank"></i></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Chase Checking Account</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>**** 4910 &bull; Direct Deposit</span>
              </div>
            </div>
            <strong style={{ fontSize: '1.05rem' }}>$18,250.00</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--bg-app)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="merchant-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}><i className="ph ph-vault"></i></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>High-Yield Savings (Marcus)</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>**** 8821 &bull; 4.85% APY</span>
              </div>
            </div>
            <strong style={{ fontSize: '1.05rem' }}>$6,318.32</strong>
          </div>
        </div>
      </section>

      {/* Deposit Modal */}
      <Modal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} title="Add Cash Funds to Wallet">
        <form onSubmit={handleDeposit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Deposit Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Deposit Now</button>
        </form>
      </Modal>
    </div>
  );
};
