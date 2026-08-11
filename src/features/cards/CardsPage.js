import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.js';
import { Modal } from '../../design-system/components/Modal.js';

export const CardsPage = () => {
  const { cards, addCard, toggleFreezeCard, updateCardLimit, removeCard, showToast } = useDb();

  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);

  // Add Card form inputs
  const [holder, setHolder] = useState('');
  const [number, setNumber] = useState('');
  const [expires, setExpires] = useState('');

  // Edit limit form inputs
  const [targetCardId, setTargetCardId] = useState(null);
  const [newLimitInput, setNewLimitInput] = useState('');

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!number || !expires) return;
    addCard({
      holder: holder || 'ALEX MORGAN',
      number: number || '4021 9902 8412 0000',
      expires: expires || '12/28'
    });
    setIsAddCardOpen(false);
    setHolder('');
    setNumber('');
    setExpires('');
  };

  const handleOpenLimitModal = (card) => {
    setTargetCardId(card.id);
    setNewLimitInput(card.monthlyLimit.toString());
    setIsLimitModalOpen(true);
  };

  const handleSaveLimit = (e) => {
    e.preventDefault();
    if (targetCardId && newLimitInput) {
      updateCardLimit(targetCardId, newLimitInput);
      setIsLimitModalOpen(false);
    }
  };

  const handleLockPin = (card) => {
    showToast(`PIN security locked for Card ${card.number.slice(-4)}.`);
  };

  return (
    <div className="cards-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Card Management</h2>
          <p className="subtitle">Manage physical and virtual credit cards, limits, freeze status, and PIN security.</p>
        </div>
        <button className="btn btn-primary" id="btn-open-add-card" onClick={() => setIsAddCardOpen(true)}>
          <i className="ph ph-plus"></i> Request New Card
        </button>
      </div>

      {/* Cards List Grid */}
      <div className="cards-grid" id="cards-list-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {cards.map(card => (
          <div key={card.id} className="card-box" id={`box-${card.id}`} style={{ opacity: card.isFrozen ? 0.75 : 1, transition: 'all 0.3s ease' }}>
            {/* Visual Credit Card */}
            <div className="credit-card" style={{ background: card.bg, padding: '20px', borderRadius: '16px', color: '#fff', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', letterSpacing: '1px', opacity: 0.8 }}>BALANCE</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>${card.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '1.2rem' }}>
                  <i className="ph ph-wifi-high"></i>
                  {card.isFrozen && <i className="ph ph-snowflake" style={{ color: '#60a5fa' }} title="Card Frozen"></i>}
                </div>
              </div>

              <div style={{ fontSize: '1.1rem', letterSpacing: '2px', fontFamily: 'monospace', marginBottom: '20px' }}>
                {card.number}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.8, display: 'block' }}>CARDHOLDER</span>
                  <strong style={{ fontSize: '0.85rem' }}>{card.holder}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.8, display: 'block' }}>EXPIRES</span>
                  <strong style={{ fontSize: '0.85rem' }}>{card.expires}</strong>
                </div>
                <div style={{ fontWeight: 800, fontStyle: 'italic', fontSize: '1rem' }}>
                  {card.brand.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Card Status & Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Monthly Limit</span>
                <strong id={`limit-${card.id}`} style={{ fontSize: '1rem' }}>${card.monthlyLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
              </div>
              <span id={`status-${card.id}`} className={`badge-status ${card.isFrozen ? 'status-frozen' : 'status-active'}`} style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, background: card.isFrozen ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: card.isFrozen ? '#ef4444' : '#10b981' }}>
                <i className={`ph ${card.isFrozen ? 'ph-snowflake' : 'ph-check-circle'}`}></i> {card.isFrozen ? 'Frozen' : 'Active'}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                className={`btn btn-secondary btn-freeze ${card.isFrozen ? 'active-frozen' : ''}`}
                onClick={() => toggleFreezeCard(card.id)}
                style={{ padding: '8px', fontSize: '0.85rem' }}
              >
                <i className={`ph ${card.isFrozen ? 'ph-sun' : 'ph-snowflake'}`}></i> <span>{card.isFrozen ? 'Unfreeze' : 'Freeze'}</span>
              </button>
              <button
                className="btn btn-secondary btn-lock-pin"
                onClick={() => handleLockPin(card)}
                style={{ padding: '8px', fontSize: '0.85rem' }}
              >
                <i className="ph ph-lock"></i> Lock PIN
              </button>
              <button
                className="btn btn-secondary btn-limits"
                onClick={() => handleOpenLimitModal(card)}
                style={{ padding: '8px', fontSize: '0.85rem' }}
              >
                <i className="ph ph-sliders"></i> Edit Limit
              </button>
              <button
                className="btn btn-secondary btn-remove-card"
                onClick={() => { if (window.confirm('Are you sure you want to remove this card?')) removeCard(card.id); }}
                style={{ padding: '8px', fontSize: '0.85rem', color: '#ef4444' }}
              >
                <i className="ph ph-trash"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Card Modal */}
      <Modal isOpen={isAddCardOpen} onClose={() => setIsAddCardOpen(false)} title="Request New Virtual / Physical Card">
        <form onSubmit={handleAddCardSubmit}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. ALEX MORGAN"
              value={holder}
              onChange={e => setHolder(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Card Number (16 digits)</label>
            <input
              type="text"
              className="form-control"
              placeholder="4021 9902 8412 0000"
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Expiration Date (MM/YY)</label>
            <input
              type="text"
              className="form-control"
              placeholder="12/28"
              value={expires}
              onChange={e => setExpires(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Issue Card</button>
        </form>
      </Modal>

      {/* Edit Card Limits Modal */}
      <Modal isOpen={isLimitModalOpen} onClose={() => setIsLimitModalOpen(false)} title="Set Monthly Spending Limit">
        <form onSubmit={handleSaveLimit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">New Monthly Limit ($)</label>
            <input
              type="number"
              className="form-control"
              value={newLimitInput}
              onChange={e => setNewLimitInput(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Limit</button>
        </form>
      </Modal>
    </div>
  );
};
