'use client';

import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { useDb } from '../../core/database/DbContext.jsx';
import { useAuth } from '../../core/auth/AuthContext.jsx';

const PRESET_AMOUNTS = [50, 100, 250, 500, 1000];

export const TransferModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();

  const [fromAccount, setFromAccount] = useState('Main Checking (**** 2514)');
  const [toAccount, setToAccount] = useState('Emergency Savings Vault');
  const [amount, setAmount] = useState('250');
  const [schedule, setSchedule] = useState('instant');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    const temp = fromAccount;
    setFromAccount(toAccount);
    setToAccount(temp);
    setTimeout(() => setIsSwapping(false), 300);
  };

  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.80;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      showToast('Please enter a valid transfer amount');
      return;
    }
    if (fromAccount === toAccount) {
      showToast('Source and destination accounts must be different');
      return;
    }

    setIsSubmitting(true);

    try {
      const noteText = note.trim() ? ` — "${note.trim()}"` : '';
      const schedText = schedule !== 'instant' ? ` (${schedule.toUpperCase()})` : '';

      await addTransaction({
        merchant: `Transfer (${fromAccount} ➔ ${toAccount})${schedText}${noteText}`,
        category: 'Transfer',
        amount: parsedAmt,
        isPositive: false,
        status: 'Completed',
        date: 'Today'
      });

      showToast(`Transferred $${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })} from ${fromAccount} to ${toAccount}`);
      onClose();
      setNote('');
    } catch (err) {
      showToast('Transfer failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Internal Transfer / Vault Move"
      subtitle="Move funds seamlessly between your checking, savings, and investment accounts"
      icon="ph-arrows-left-right"
      size="md"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* From / To Accounts with Swap Button */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '16px', position: 'relative' }}>
          
          {/* From Account */}
          <div className="form-group" style={{ marginBottom: '10px' }}>
            <label className="form-label" style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block', letterSpacing: '0.04em' }}>
              TRANSFER FROM
            </label>
            <select
              className="form-control"
              value={fromAccount}
              onChange={(e) => setFromAccount(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              <option value="Main Checking (**** 2514)">Main Checking (**** 2514)</option>
              <option value="Visa Platinum (**** 8821)">Visa Platinum (**** 8821)</option>
              <option value="Investment Portfolio">Investment Portfolio Account</option>
              <option value="Emergency Savings Vault">Emergency Savings Vault</option>
            </select>
          </div>

          {/* Swap Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-6px 0 6px 0', position: 'relative', zIndex: 2 }}>
            <button
              type="button"
              onClick={handleSwap}
              title="Swap From and To accounts"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isSwapping ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <i className="ph ph-arrows-down-up" style={{ fontSize: '1.1rem' }}></i>
            </button>
          </div>

          {/* To Account */}
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block', letterSpacing: '0.04em' }}>
              TRANSFER TO
            </label>
            <select
              className="form-control"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              style={{ fontWeight: 600 }}
            >
              <option value="Emergency Savings Vault">Emergency Savings Vault</option>
              <option value="Japan 2027 Goal">Japan 2027 Goal Vault</option>
              <option value="Crypto Investment Account">Crypto Investment Account</option>
              <option value="Main Checking (**** 2514)">Main Checking (**** 2514)</option>
              <option value="Visa Platinum (**** 8821)">Visa Platinum (**** 8821)</option>
            </select>
          </div>
        </div>

        {/* Transfer Amount & Presets */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Transfer Amount ($)
            </label>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Source Balance: ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
                  background: parsedAmt === val ? 'var(--accent-blue)' : 'var(--bg-app)',
                  color: parsedAmt === val ? '#fff' : 'var(--text-main)',
                  border: `1px solid ${parsedAmt === val ? 'var(--accent-blue)' : 'var(--border-color)'}`,
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
            <button
              type="button"
              onClick={() => setAmount(currentBalance.toFixed(2))}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '5px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              MAX
            </button>
          </div>
        </div>

        {/* Schedule Mode Selector */}
        <div>
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
            Transfer Frequency
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              { id: 'instant', label: 'Instant ⚡' },
              { id: 'weekly', label: 'Weekly 🗓️' },
              { id: 'monthly', label: 'Monthly 📅' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSchedule(item.id)}
                style={{
                  background: schedule === item.id ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-app)',
                  border: `1.5px solid ${schedule === item.id ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                  color: schedule === item.id ? 'var(--accent-blue)' : 'var(--text-main)',
                  borderRadius: '10px',
                  padding: '9px 8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Memo Note */}
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Memo / Purpose (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Monthly savings contribution, vacation fund..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Dynamic Balance Impact Preview */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px 16px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>From Account ({fromAccount.split(' ')[0]}):</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
              -${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>To Vault ({toAccount.split(' ')[0]}):</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>
              +${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Execution:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>
              {schedule === 'instant' ? 'Immediate Settlement' : `Auto-recurring (${schedule})`}
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
            background: isSubmitting ? 'var(--text-muted)' : 'var(--accent-blue)',
            color: '#fff',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.2s ease',
            marginTop: '4px'
          }}
        >
          {isSubmitting ? (
            <>
              <i className="ph ph-spinner spin"></i> Processing Transfer...
            </>
          ) : (
            <>
              <i className="ph ph-arrows-left-right"></i> Confirm Internal Transfer (${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })})
            </>
          )}
        </button>
      </form>
    </Modal>
  );
};

