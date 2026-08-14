'use client';

import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { useDb } from '../../core/database/DbContext.jsx';
import { useAuth } from '../../core/auth/AuthContext.jsx';

const RECIPIENTS = [
  { name: 'Sarah Connor', email: 'sarah@finly.app', avatar: 'S', bg: '#f59e0b' },
  { name: 'Michael Scott', email: 'michael@dunder.com', avatar: 'M', bg: '#6366f1' },
  { name: 'Ana de Armas', email: 'ana@cinema.org', avatar: 'A', bg: '#10b981' },
  { name: 'Priya Sharma', email: 'priya@health.org', avatar: 'P', bg: '#ec4899' },
  { name: 'Joshua Lee', email: 'joshua@dev.io', avatar: 'J', bg: '#3b82f6' }
];

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

export const SendModal = ({ isOpen, onClose }) => {
  const { addTransaction, showToast } = useDb();
  const { user } = useAuth();

  const [recipient, setRecipient] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [amount, setAmount] = useState('50');
  const [sourceAccount, setSourceAccount] = useState('Main Checking (**** 2514)');
  const [category, setCategory] = useState('Transfer');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRecipient = (rec) => {
    setRecipient(rec.name);
    setSelectedAvatar(rec);
  };

  const parsedAmt = parseFloat(amount) || 0;
  const currentBalance = user?.balance || 14250.80;
  const isInsufficient = parsedAmt > currentBalance;
  const balanceAfter = Math.max(0, currentBalance - parsedAmt);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parsedAmt) || parsedAmt <= 0) {
      showToast('Please enter a valid amount');
      return;
    }
    if (!recipient.trim()) {
      showToast('Please specify a recipient');
      return;
    }
    if (isInsufficient) {
      showToast('Insufficient funds for this transaction');
      return;
    }

    setIsSubmitting(true);

    try {
      const noteText = note.trim() ? ` — "${note.trim()}"` : '';
      await addTransaction({
        merchant: `Send Payment to ${recipient.trim()}${noteText}`,
        category: category,
        amount: parsedAmt,
        isPositive: false,
        status: 'Completed',
        date: 'Today'
      });

      showToast(`Successfully sent $${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${recipient.trim()}!`);
      onClose();
      setRecipient('');
      setNote('');
      setSelectedAvatar(null);
    } catch (err) {
      showToast('Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Money / Instant Payment"
      subtitle="Send instant payments to contacts or external accounts with zero transfer fee"
      icon="ph-paper-plane-tilt"
      size="md"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Quick Contact Picker */}
        <div>
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '8px', display: 'block', color: 'var(--text-main)' }}>
            Quick Contacts
          </label>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'thin' }}>
            {RECIPIENTS.map((rec) => {
              const isSelected = selectedAvatar?.email === rec.email || recipient.toLowerCase() === rec.name.toLowerCase();
              return (
                <button
                  key={rec.email}
                  type="button"
                  onClick={() => handleSelectRecipient(rec)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-app)',
                    border: `1.5px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    borderRadius: '14px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    minWidth: '76px',
                    transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: rec.bg,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      boxShadow: isSelected ? '0 0 0 2px var(--accent-blue)' : 'none'
                    }}
                  >
                    {rec.avatar}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-main)', fontWeight: isSelected ? 700 : 500, whiteSpace: 'nowrap' }}>
                    {rec.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipient Input */}
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Recipient Name / Email / Phone
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Sarah Connor, sarah@gmail.com"
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setSelectedAvatar(null);
            }}
            required
          />
        </div>

        {/* Preset Amount Chips */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Amount ($)
            </label>
            <span style={{ fontSize: '0.74rem', color: isInsufficient ? '#ef4444' : 'var(--text-muted)', fontWeight: isInsufficient ? 700 : 500 }}>
              {isInsufficient ? 'Insufficient Funds! ' : ''}Available: ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
              border: `1.5px solid ${isInsufficient ? '#ef4444' : 'var(--border-color)'}`,
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
          </div>
        </div>

        {/* Source Account & Category Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
              From Account
            </label>
            <select
              className="form-control"
              value={sourceAccount}
              onChange={(e) => setSourceAccount(e.target.value)}
            >
              <option value="Main Checking (**** 2514)">Main Checking (**** 2514)</option>
              <option value="Visa Platinum (**** 8821)">Visa Platinum (**** 8821)</option>
              <option value="Cash Wallet">Cash Wallet</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Category
            </label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Transfer">Personal Transfer</option>
              <option value="Services">Services & Supplies</option>
              <option value="Rent">Rent & Utilities</option>
              <option value="Food & Dining">Food & Split Bill</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
        </div>

        {/* Note / Memo Input */}
        <div className="form-group">
          <label className="form-label" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Note / Memo (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Dinner split 🍕, Freelance work..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Live Summary Box */}
        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px 16px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Transfer Fee:</span>
            <span style={{ color: '#10b981', fontWeight: 600 }}>$0.00 (Instant Free)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Delivery Time:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Instant Settlement ⚡</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '8px', marginTop: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Balance After:</span>
            <span style={{ color: isInsufficient ? '#ef4444' : 'var(--text-main)', fontWeight: 700 }}>
              ${balanceAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isInsufficient || parsedAmt <= 0}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '0.92rem',
            fontWeight: 700,
            borderRadius: '12px',
            background: isSubmitting || isInsufficient ? 'var(--text-muted)' : 'var(--accent-blue)',
            color: '#fff',
            border: 'none',
            cursor: (isSubmitting || isInsufficient) ? 'not-allowed' : 'pointer',
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
              <i className="ph ph-spinner spin"></i> Processing Payment...
            </>
          ) : (
            <>
              <i className="ph ph-paper-plane-tilt"></i> Send ${parsedAmt.toLocaleString('en-US', { minimumFractionDigits: 2 })} Now
            </>
          )}
        </button>
      </form>
    </Modal>
  );
};

