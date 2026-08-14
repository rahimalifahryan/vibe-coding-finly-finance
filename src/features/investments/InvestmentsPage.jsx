'use client';

import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

// --- MOCK DATA ---
const watchlist = [
  { symbol: 'NVDA', name: 'NVIDIA', price: 812.40, trend: '+3.4%', isUp: true },
  { symbol: 'TSLA', name: 'Tesla', price: 248.90, trend: '-1.2%', isUp: false },
  { symbol: 'GOOGL', name: 'Alphabet', price: 172.60, trend: '+0.8%', isUp: true },
  { symbol: 'ETH', name: 'Ethereum', price: 3480.20, trend: '-0.6%', isUp: false },
];

const news = [
  { source: 'BLOOMBERG', time: '2H AGO', title: 'Apple beats Q3 estimates on Services growth' },
  { source: 'REUTERS', time: '4H AGO', title: 'Fed signals two more cuts likely this year' },
  { source: 'THE VERGE', time: '8H AGO', title: 'Vision Pro 2 rumored for spring launch' },
  { source: 'WSJ', time: '1D AGO', title: 'S&P 500 closes at new high, led by tech' },
];

export const InvestmentsPage = () => {
  const { investments, buyInvestment, sellInvestment, showToast } = useDb();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('buy'); // 'buy' | 'sell'
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amountInput, setAmountInput] = useState('100');
  const [watchlistItems, setWatchlistItems] = useState(watchlist);

  const totalValue = investments.reduce((acc, i) => acc + (i.value || 0), 0);

  const handleOpenBuy = (asset = investments[0]) => {
    setSelectedAsset(asset);
    setModalMode('buy');
    setIsModalOpen(true);
  };

  const handleOpenSell = (asset = investments[0]) => {
    setSelectedAsset(asset);
    setModalMode('sell');
    setIsModalOpen(true);
  };

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amountInput);
    if (!selectedAsset || isNaN(amt) || amt <= 0) return;

    if (modalMode === 'buy') {
      buyInvestment(selectedAsset.id, amt);
    } else {
      sellInvestment(selectedAsset.id, amt);
    }
    setIsModalOpen(false);
    setAmountInput('100');
  };

  const handleRemoveWatchlist = (symbol) => {
    setWatchlistItems(watchlistItems.filter(item => item.symbol !== symbol));
    showToast(`Removed ${symbol} from watchlist`);
  };

  const handleAddWatchlist = (e) => {
    e.preventDefault();
    const symbol = prompt('Enter Ticker Symbol to add to Watchlist (e.g. AMD, AMZN):');
    if (!symbol) return;
    const cleanSym = symbol.toUpperCase().trim();
    const newItem = {
      symbol: cleanSym,
      name: `${cleanSym} Asset`,
      price: Math.round((Math.random() * 200 + 50) * 100) / 100,
      trend: '+1.5%',
      isUp: true
    };
    setWatchlistItems([...watchlistItems, newItem]);
    showToast(`Added ${cleanSym} to Watchlist`);
  };

  const formatCurrency = (val) => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Investments</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your portfolio, allocations, holdings, and market pulse.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        
        {/* Left Column */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Investments Card */}
          <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Investments</h3>
              <div style={{ background: 'var(--badge-green-bg)', color: 'var(--badge-green-text)', padding: '4px 10px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 600 }}>
                +0.31% today
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Total portfolio value</p>
            
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '4px' }}>
              {formatCurrency(totalValue)}
            </h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              +$99.10 today
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: '0.95rem' }} onClick={() => handleOpenBuy(investments[0])}>Buy</button>
              <button 
                style={{ flex: 1, padding: '12px', fontSize: '0.95rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '99px', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => handleOpenSell(investments[0])}
              >
                Sell
              </button>
            </div>

            {/* Allocation Bar */}
            <div style={{ height: '8px', width: '100%', display: 'flex', borderRadius: '99px', overflow: 'hidden', marginBottom: '24px' }}>
              {investments.map(inv => (
                <div key={inv.id} style={{ width: `${inv.pctShare}%`, background: inv.color, height: '100%' }}></div>
              ))}
            </div>

            {/* Allocation Legend */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {investments.map(inv => (
                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: inv.color }}></div>
                    {inv.symbol}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>{inv.pctShare}%</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {investments.map(inv => (
                <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{inv.symbol}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{formatCurrency(inv.value)}</div>
                    <div style={{ fontSize: '0.85rem', color: inv.isPositive ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <i className={inv.isPositive ? 'ph ph-trend-up' : 'ph ph-trend-down'}></i> {inv.returnPct}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '2 1 600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* All Holdings */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>All holdings</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{investments.length} positions &middot; {formatCurrency(totalValue)} market value</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ padding: '8px 16px', fontSize: '0.85rem', width: 'auto' }}
                onClick={() => handleOpenBuy(investments[0])}
              >
                + Buy
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {investments.map((inv, idx) => (
                <div key={inv.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '16px 0',
                  borderBottom: idx !== investments.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${inv.color}15`, color: inv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                      {inv.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{inv.symbol}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.name}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{formatCurrency(inv.value)}</div>
                      <div style={{ fontSize: '0.85rem', color: inv.isPositive ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <i className={inv.isPositive ? 'ph ph-trend-up' : 'ph ph-trend-down'}></i> {inv.returnPct}
                      </div>
                    </div>
                    <button 
                      style={{ padding: '6px 12px', fontSize: '0.85rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 500, cursor: 'pointer' }}
                      onClick={() => handleOpenSell(inv)}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Allocation breakdown</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Share of total market value</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {investments.map(inv => (
                <div key={inv.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{inv.symbol}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{inv.pctShare}%</div>
                  </div>
                  <div style={{ height: '6px', width: '100%', background: 'var(--hover-bg)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${inv.pctShare}%`, background: inv.color, borderRadius: '99px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-grid: Watchlist & News */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            {/* Watchlist */}
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Watchlist</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Following &middot; live prices</p>
                </div>
                <button onClick={handleAddWatchlist} style={{ background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: 500, color: 'var(--accent-blue)', cursor: 'pointer' }}>+ Add</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {watchlistItems.map((item, idx) => (
                  <div key={item.symbol} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: idx !== watchlistItems.length - 1 ? '1px solid var(--border-color)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.symbol}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.name}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>${item.price.toFixed(2)}</div>
                        <div style={{ fontSize: '0.8rem', color: item.isUp ? '#10b981' : '#ef4444' }}>{item.trend}</div>
                      </div>
                      <button 
                        style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '99px', color: 'var(--text-main)', cursor: 'pointer' }}
                        onClick={() => handleOpenBuy({ id: 'inv-1', symbol: item.symbol, name: item.name, currentPrice: item.price })}
                      >
                        Buy
                      </button>
                      <button 
                        style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', display: 'flex' }}
                        onClick={() => handleRemoveWatchlist(item.symbol)}
                        title="Remove from watchlist"
                      >
                        <i className="ph ph-x"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market News */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="ph ph-newspaper" style={{ color: 'var(--accent-blue)' }}></i> Market news
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {news.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      <span style={{ fontWeight: 600 }}>{item.source}</span>
                      <span>&middot;</span>
                      <span>{item.time}</span>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-main)', lineHeight: 1.4 }}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Trade Asset Modal (Buy / Sell) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${modalMode === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset ? selectedAsset.symbol : 'Asset'}`}
        subtitle={`Execute instant ${modalMode === 'buy' ? 'buying' : 'selling'} transaction at market price`}
        icon={modalMode === 'buy' ? 'ph-trend-up' : 'ph-trend-down'}
        size="md"
      >
        <form onSubmit={handleTradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">{modalMode === 'buy' ? 'Purchase' : 'Sell'} Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={amountInput}
              onChange={e => setAmountInput(e.target.value)}
              required
              style={{ fontSize: '1.2rem', fontWeight: 700 }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 700,
              background: modalMode === 'buy' ? 'var(--accent-blue)' : '#ef4444',
              borderColor: modalMode === 'buy' ? 'var(--accent-blue)' : '#ef4444',
              boxShadow: modalMode === 'buy' ? '0 4px 16px rgba(37, 99, 235, 0.3)' : '0 4px 16px rgba(239, 68, 68, 0.3)',
              marginTop: '4px'
            }}
          >
            <i className={`ph ${modalMode === 'buy' ? 'ph-shopping-cart-simple' : 'ph-currency-dollar'}`}></i> Confirm {modalMode === 'buy' ? 'Purchase' : 'Sale'} (${amountInput || 0})
          </button>
        </form>
      </Modal>
    </div>
  );
};
