'use client';

import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

export const InvestmentsPage = () => {
  const { investments, buyInvestment } = useDb();

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [buyAmount, setBuyAmount] = useState('100');

  const totalValue = investments.reduce((acc, i) => acc + (i.value || 0), 0);

  const handleOpenBuy = (asset) => {
    setSelectedAsset(asset);
    setIsBuyModalOpen(true);
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(buyAmount);
    if (selectedAsset && !isNaN(amt) && amt > 0) {
      buyInvestment(selectedAsset.id, amt);
      setIsBuyModalOpen(false);
    }
  };

  return (
    <div className="investments-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Investment Portfolio</h2>
          <p className="subtitle">Track equities, ETFs, crypto holdings, and execute buy/sell orders.</p>
        </div>
        <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '8px 16px', borderRadius: '12px', fontWeight: 700 }}>
          <i className="ph ph-trend-up" style={{ marginRight: '6px' }}></i> Total ROI: +18.6%
        </div>
      </div>

      {/* Portfolio Banner */}
      <div className="card-box" style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PORTFOLIO VALUE</span>
        <h1 style={{ fontSize: '2.2rem', margin: '4px 0 0 0', fontWeight: 800 }}>
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
      </div>

      {/* Holdings Table */}
      <div className="card-box">
        <h3>Asset Holdings</h3>
        <div className="table-responsive" style={{ marginTop: '16px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset Symbol</th>
                <th>Current Price</th>
                <th>Holdings</th>
                <th>Total Value</th>
                <th>Total Return</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="merchant-icon" style={{ background: 'var(--bg-app)', color: 'var(--accent-blue)' }}>
                        <i className="ph ph-trend-up"></i>
                      </div>
                      <div>
                        <strong>{item.symbol}</strong>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>${item.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td>{item.holdings} shares</td>
                  <td style={{ fontWeight: 700 }}>${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className={`kpi-trend ${item.isPositive ? 'trend-up' : 'trend-down'}`}>
                      <i className={`ph ${item.isPositive ? 'ph-trend-up' : 'ph-trend-down'}`}></i> {item.returnPct}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleOpenBuy(item)}>
                      Buy / Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Asset Modal */}
      <Modal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} title={`Buy ${selectedAsset ? selectedAsset.symbol : 'Asset'}`}>
        <form onSubmit={handleBuySubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Purchase Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={buyAmount}
              onChange={e => setBuyAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Confirm Purchase (${buyAmount || 0})
          </button>
        </form>
      </Modal>
    </div>
  );
};
