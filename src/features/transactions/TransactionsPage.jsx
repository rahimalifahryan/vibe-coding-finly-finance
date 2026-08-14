'use client';

import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';
import { SendModal } from '../../design-system/components/SendModal.jsx';
import { TopUpModal } from '../../design-system/components/TopUpModal.jsx';

export const TransactionsPage = ({ searchQuery }) => {
  const { transactions, addTransaction, showToast } = useDb();

  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [localSearch, setLocalSearch] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(8);

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);

  const [topUpAmount, setTopUpAmount] = useState('500');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  const query = (localSearch || searchQuery || '').toLowerCase().trim();

  // Full dataset matching screenshot
  const fullTxList = [
    { id: 1, merchant: 'Sell AAPL', category: 'Investments', date: 'Aug 6, 2026', status: 'Completed', amount: 500.00, type: 'credit', icon: 'ph-trend-up' },
    { id: 2, merchant: 'Sell AAPL', category: 'Investments', date: 'Aug 6, 2026', status: 'Completed', amount: 300.00, type: 'credit', icon: 'ph-trend-up' },
    { id: 3, merchant: 'iCloud+ 2TB', category: 'Bills', date: 'Aug 6, 2026', status: 'Completed', amount: -9.99, type: 'debit', icon: 'ph-cloud' },
    { id: 4, merchant: 'Spotify Family', category: 'Bills', date: 'Aug 6, 2026', status: 'Completed', amount: -16.99, type: 'debit', icon: 'ph-music-notes' },
    { id: 5, merchant: 'Con Edison', category: 'Bills', date: 'Aug 6, 2026', status: 'Completed', amount: -142.00, type: 'debit', icon: 'ph-lightning' },
    { id: 6, merchant: 'Verizon Fios', category: 'Bills', date: 'Aug 6, 2026', status: 'Completed', amount: -79.99, type: 'debit', icon: 'ph-wifi-high' },
    { id: 7, merchant: 'Rent &mdash; 88 Sullivan St.', category: 'Bills', date: 'Aug 6, 2026', status: 'Completed', amount: -2400.00, type: 'debit', icon: 'ph-house' },
    { id: 8, merchant: 'Savings &mdash; Singapore 2025', category: 'Savings', date: 'Aug 6, 2026', status: 'Completed', amount: -1000.00, type: 'debit', icon: 'ph-vault' },
    { id: 9, merchant: 'Salary &mdash; Acme Inc', category: 'Income', date: 'Aug 1, 2026', status: 'Completed', amount: 4200.00, type: 'credit', icon: 'ph-briefcase' },
    { id: 10, merchant: 'Whole Foods Market', category: 'Shopping', date: 'Jul 31, 2026', status: 'Completed', amount: -142.50, type: 'debit', icon: 'ph-shopping-cart' },
    { id: 11, merchant: 'Apple Store', category: 'Shopping', date: 'Jul 30, 2026', status: 'Completed', amount: -1250.00, type: 'debit', icon: 'ph-desktop' },
    { id: 12, merchant: 'Netflix Subscription', category: 'Entertainment', date: 'Jul 29, 2026', status: 'Pending', amount: -19.99, type: 'debit', icon: 'ph-film-strip' },
    { id: 13, merchant: 'Uber Ride', category: 'Transport', date: 'Jul 28, 2026', status: 'Completed', amount: -24.50, type: 'debit', icon: 'ph-car' },
    { id: 14, merchant: 'Starbucks Coffee', category: 'Food', date: 'Jul 27, 2026', status: 'Completed', amount: -6.75, type: 'debit', icon: 'ph-coffee' },
    { id: 15, merchant: 'Gym Membership', category: 'Health', date: 'Jul 25, 2026', status: 'Failed', amount: -45.00, type: 'debit', icon: 'ph-barbell' },
    { id: 16, merchant: 'Freelance Design Payout', category: 'Income', date: 'Jul 24, 2026', status: 'Completed', amount: 1220.50, type: 'credit', icon: 'ph-paint-brush' },
  ];

  const sourceData = transactions.length > 8 ? transactions : fullTxList;

  const filteredTransactions = sourceData.filter(tx => {
    const statusMatch = activeStatusFilter === 'all' || tx.status.toLowerCase() === activeStatusFilter.toLowerCase();
    const textContent = `${tx.merchant} ${tx.category} ${tx.date} ${tx.status}`.toLowerCase();
    const searchMatch = !query || textContent.includes(query);
    return statusMatch && searchMatch;
  });

  const displayedTxs = filteredTransactions.slice(0, visibleLimit);
  const remainingCount = filteredTransactions.length - visibleLimit;

  const exportCSV = () => {
    let csvContent = 'Merchant,Category,Date,Status,Amount\n';
    filteredTransactions.forEach(tx => {
      const cleanMerchant = tx.merchant.replace(/&mdash;/g, '-').replace(/<[^>]*>?/gm, '');
      const formattedAmt = `${tx.type === 'credit' ? '+' : '-'}$${Math.abs(tx.amount).toFixed(2)}`;
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

  const handleTopUp = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: 'Top Up &mdash; Deposit', category: 'Income', amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Deposited +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: sendRecipient, category: 'Transfer', amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient('');
    setSendAmount('');
    showToast(`Paid $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };

  return (
    <div className="transactions-redesign-container" style={{ paddingBottom: '40px' }}>
      
      {/* 1. Top Grid: 4 Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', marginBottom: '24px', width: '100%' }}>
        {/* Money in */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              <i className="ph ph-arrow-down-left"></i>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Money in</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$9,220.50</h2>
        </div>

        {/* Money out */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              <i className="ph ph-arrow-up-right"></i>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Money out</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>$5,251.18</h2>
        </div>

        {/* Pending */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              <i className="ph ph-clock"></i>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Pending</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>1 tx</h2>
        </div>

        {/* Failed */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
              <i className="ph ph-x-circle"></i>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Failed</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>1 tx</h2>
        </div>
      </div>

      {/* 2. Main Recent Transactions Table Card */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Table Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Recent transactions</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{filteredTransactions.length} results</span>
          </div>

          {/* Filters Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div className="search-box" style={{ width: '180px', position: 'relative' }}>
              <i className="ph ph-magnifying-glass" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
              <input
                type="text"
                placeholder="Search..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', fontSize: '0.78rem', outline: 'none', color: 'var(--text-main)' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-app)', padding: '2px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              {['all', 'completed', 'pending', 'failed'].map(st => (
                <button
                  key={st}
                  onClick={() => setActiveStatusFilter(st)}
                  style={{ padding: '4px 12px', fontSize: '0.72rem', fontWeight: 600, border: 'none', borderRadius: '14px', background: activeStatusFilter === st ? 'var(--bg-card)' : 'transparent', color: activeStatusFilter === st ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', textTransform: 'capitalize', boxShadow: activeStatusFilter === st ? 'var(--shadow-sm)' : 'none' }}
                >
                  {st === 'all' ? 'All' : st}
                </button>
              ))}
            </div>

            <select style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '14px', padding: '4px 10px', fontSize: '0.75rem', outline: 'none' }}>
              <option>Recent ▾</option>
            </select>

            <button onClick={exportCSV} style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '14px', padding: '4px 14px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="ph ph-download-simple"></i> CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.5px' }}>
                <th style={{ padding: '12px 14px' }}>MERCHANT</th>
                <th style={{ padding: '12px 14px' }}>CATEGORY</th>
                <th style={{ padding: '12px 14px' }}>DATE</th>
                <th style={{ padding: '12px 14px' }}>STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>AMOUNT</th>
                <th style={{ padding: '12px 14px', width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {displayedTxs.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-app)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem' }}>
                        <i className={`ph ${tx.icon || 'ph-receipt'}`}></i>
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: tx.merchant }}></span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{tx.category}</td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{tx.date}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 600, background: tx.status === 'Completed' ? 'rgba(16, 185, 129, 0.12)' : (tx.status === 'Pending' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(239, 68, 68, 0.12)'), color: tx.status === 'Completed' ? '#10b981' : (tx.status === 'Pending' ? '#f59e0b' : '#ef4444') }}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right', fontWeight: 700, color: (tx.type === 'credit' || tx.amount > 0) ? '#10b981' : 'var(--text-main)' }}>
                    {(tx.type === 'credit' || tx.amount > 0) ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <i className="ph ph-dots-three"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show More / Show Less Button */}
        {filteredTransactions.length > 8 && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => setVisibleLimit(visibleLimit > 8 ? 8 : filteredTransactions.length)}
              style={{ width: '100%', padding: '10px', fontSize: '0.8rem', fontWeight: 600, borderRadius: '24px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              {visibleLimit > 8 ? 'Show less' : `Show more (${remainingCount} left)`}
            </button>
          </div>
        )}
      </div>

      {/* Footer Disclaimer Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '12px' }}>
        <span>&copy; 2026 Finly. Mock data &mdash; for demo purposes only.</span>
        <span>Designed with the calm of SF Pro and one Action Blue.</span>
      </div>

      {/* Enhanced Modals */}
      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
      <SendModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />

    </div>
  );
};
