'use client';

import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { useDb } from '../../core/database/DbContext.jsx';
import { useAuth } from '../../core/auth/AuthContext.jsx';

const METHODS = [
  { id: 'card', name: 'Debit Card (**** 4092)', icon: 'ph-credit-card', badge: 'Instant • $0 Fee' },
  { id: 'bank', name: 'Direct Bank Transfer (Chase)', icon: 'ph-bank', badge: '1-2 Days • $0 Fee' },
  { id: 'apple', name: 'Apple Pay Instant', icon: 'ph-apple-logo', badge: 'Instant • $0 Fee' },
  { id: 'wire', name: 'Wire Deposit', icon: 'ph-lightning', badge: 'Instant • $0 Fee' },
  { id: 'crypto', name: 'Crypto Deposit (USDC/USDT)', icon: 'ph-currency-btc', badge: 'Instant • 0.1% Rebate' }
];

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000, 2500];

export const TopUpModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState(METHODS[0].name);
  const [amount, setAmount] = useState('500');
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Please enter a valid deposit amount');
      return;
    }

    setIsSubmitting(true);

    try {
      await addTransaction({
        merchant: `Top Up — ${selectedMethod}`,
        category: 'Income',
        amount: amt,
        isPositive: true,
        status: 'Completed',
        date: 'Today'
      });

      const autoMsg = autoTopUp ? ' (Auto Top-Up Enabled)' : '';
      showToast(`Top up +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} successful via ${selectedMethod}${autoMsg}`);
      onClose();
    } catch (err) {
      showToast('Failed to complete top up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.80;
  const balanceAfter = currentBalance + parsedAmt;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Top Up Balance / Deposit"
      subtitle="Instantly deposit funds into your Finly checking or vault balance"
      icon="ph-plus-circle"
      size="md"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Deposit Payment Method Cards */}
        <div>
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px', display: 'block' }}>
            Select Payment / Funding Method
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px', scrollbarWidth: 'thin' }}>
            {METHODS.map((method) => {
              const isSelected = selectedMethod === method.name;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-app)',
                    border: `1.5px solid ${isSelected ? '#10b981' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: isSelected ? '#10b981' : 'rgba(255,255,255,0.06)',
                        color: isSelected ? '#fff' : 'var(--text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        flexShrink: 0
                      }}
                    >
                      <i className={`ph ${method.icon}`}></i>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-main)', fontWeight: 600 }}>
                        {method.name}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {method.badge}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <i className="ph ph-check-circle-fill" style={{ color: '#10b981', fontSize: '1.25rem' }}></i>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Preset Amount Chips */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Top Up Amount ($)
            </label>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Current: ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '8px'
            }}
          />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                style={{
                  background: parsedAmt === val ? '#10b981' : 'var(--bg-app)',
                  color: parsedAmt === val ? '#fff' : 'var(--text-main)',
                  border: `1px solid ${parsedAmt === val ? '#10b981' : 'var(--border-color)'}`,
                  borderRadius: '10px',
                  padding: '5px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                +${val}
              </button>
            ))}
          </div>
        </div>

        {/* Auto Top-Up Feature Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px 14px' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 600 }}>Auto Top-Up Rule</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Automatically top up when balance drops below $100</span>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '42px', height: '24px' }}>
            <input
              type="checkbox"
              checked={autoTopUp}
              onChange={(e) => setAutoTopUp(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: autoTopUp ? '#10b981' : 'var(--border-color)',
                borderRadius: '24px',
                transition: '0.2s'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  content: '""',
                  height: '18px',
                  width: '18px',
                  left: autoTopUp ? '20px' : '3px',
                  bottom: '3px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  transition: '0.2s'
                }}
              />
            </span>
          </label>
        </div>

        {/* Live Summary Box */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px 16px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Deposit Amount:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              +${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Processing Fee:</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>$0.00 (Waived)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>New Total Balance:</span>
            <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.9rem' }}>
              ${balanceAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || parsedAmt <= 0}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '0.92rem',
            fontWeight: 700,
            borderRadius: '12px',
            background: isSubmitting ? 'var(--text-muted)' : '#10b981',
            color: '#fff',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.2s ease',
            marginTop: '4px'
          }}
        >
          {isSubmitting ? (
            <>
              <i className="ph ph-spinner spin"></i> Processing Deposit...
            </>
          ) : (
            <>
              <i className="ph ph-plus-circle"></i> Confirm Top Up (+${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })})
            </>
          )}
        </button>
      </form>
    </Modal>
  );
};

