import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

export const TransactionsPage = ({ searchQuery }) => {
  const { transactions, addTransaction, showToast } = useDb();

  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [localSearch, setLocalSearch] = useState('');

  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);

  const [topUpAmount, setTopUpAmount] = useState('250');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendCategory, setSendCategory] = useState('Shopping');

  const query = (localSearch || searchQuery || '').toLowerCase().trim();

  const filteredTransactions = transactions.filter(tx => {
    const statusMatch = activeStatusFilter === 'all' || tx.status.toLowerCase() === activeStatusFilter.toLowerCase();
    const textContent = `${tx.merchant} ${tx.category} ${tx.date} ${tx.status}`.toLowerCase();
    const searchMatch = !query || textContent.includes(query);
    return statusMatch && searchMatch;
  });

  const exportCSV = () => {
    let csvContent = 'Merchant,Category,Date,Status,Amount\n';
    filteredTransactions.forEach(tx => {
      const cleanMerchant = tx.merchant.replace(/&mdash;/g, '-').replace(/<[^>]*>?/gm, '');
      const formattedAmt = `${tx.type === 'credit' ? '+' : '-'}$${tx.amount.toFixed(2)}`;
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
    addTransaction({ merchant: 'Top Up &mdash; Account Deposit', category: 'Income', amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Deposited +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: sendRecipient, category: sendCategory, amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient('');
    setSendAmount('');
    showToast(`Paid $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };

  return (
    <div className="transactions-content">
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Transactions History</h2>
          <p className="subtitle">View, search, filter, and export all financial activity.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={exportCSV} id="export-csv-btn">
            <i className="ph ph-download-simple"></i> Export CSV
          </button>
          <button className="btn btn-secondary" onClick={() => setIsSendOpen(true)}>
            <i className="ph ph-paper-plane-tilt"></i> New Transfer
          </button>
          <button className="btn btn-primary" onClick={() => setIsTopUpOpen(true)}>
            <i className="ph ph-plus-circle"></i> Deposit Funds
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card-box" style={{ marginBottom: '24px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Status Pills */}
          <div className="status-pills" id="status-filter-pills" style={{ display: 'flex', gap: '8px' }}>
            {['all', 'completed', 'pending', 'failed'].map(status => (
              <button
                key={status}
                className={`pill-btn ${activeStatusFilter === status ? 'active' : ''}`}
                onClick={() => setActiveStatusFilter(status)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: activeStatusFilter === status ? 'none' : '1px solid var(--border-color)',
                  background: activeStatusFilter === status ? 'var(--accent-blue)' : 'var(--bg-app)',
                  color: activeStatusFilter === status ? '#fff' : 'var(--text-main)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Local Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="search-box" style={{ width: '260px' }}>
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Filter transactions..."
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
              />
            </div>
            <span id="tx-count" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {filteredTransactions.length} result{filteredTransactions.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card-box">
        <div className="table-responsive">
          <table className="data-table" id="transactions-table">
            <thead>
              <tr>
                <th>Merchant</th>
                <th>Category</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                    No transactions found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} data-status={tx.status}>
                    <td>
                      <div className="tx-merchant">
                        <div className="merchant-icon"><i className={`ph ${tx.icon}`}></i></div>
                        <span dangerouslySetInnerHTML={{ __html: tx.merchant }}></span>
                      </div>
                    </td>
                    <td>{tx.category}</td>
                    <td>{tx.date}</td>
                    <td>
                      <span className={`status-badge ${tx.status === 'Completed' ? 'status-completed' : (tx.status === 'Pending' ? 'status-pending' : 'status-failed')}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`tx-amount ${tx.type === 'credit' ? 'positive' : ''}`}>
                      {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td>
                      <i className="ph ph-dots-three" style={{ cursor: 'pointer', fontSize: '1.2rem' }}></i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Modal */}
      <Modal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} title="Deposit Funds to Account">
        <form onSubmit={handleTopUp}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Deposit Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={topUpAmount}
              onChange={e => setTopUpAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Deposit</button>
        </form>
      </Modal>

      {/* New Transfer Modal */}
      <Modal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} title="New Transaction / Transfer">
        <form onSubmit={handleSend}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Merchant / Recipient</label>
            <input
              type="text"
              className="form-control"
              placeholder="Merchant or Recipient name"
              value={sendRecipient}
              onChange={e => setSendRecipient(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Category</label>
            <select className="form-control" value={sendCategory} onChange={e => setSendCategory(e.target.value)}>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food & Dining</option>
              <option value="Bills">Bills & Utilities</option>
              <option value="Transfer">Transfer</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              placeholder="0.00"
              value={sendAmount}
              onChange={e => setSendAmount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Process Payment</button>
        </form>
      </Modal>
    </div>
  );
};
