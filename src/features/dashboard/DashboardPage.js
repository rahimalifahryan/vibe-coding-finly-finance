import React, { useState } from 'react';
import { useAuth } from '../../core/auth/AuthContext.js';
import { useDb } from '../../core/database/DbContext.js';
import { Modal } from '../../design-system/components/Modal.js';

export const DashboardPage = ({ setActiveTab }) => {
  const { user } = useAuth();
  const {
    transactions,
    bills,
    goals,
    cards,
    addTransaction,
    payBill,
    updateGoalFunds,
    addGoal,
    showToast
  } = useDb();

  // Modals state
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Form Inputs
  const [topUpAmount, setTopUpAmount] = useState('500');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendCategory, setSendCategory] = useState('Transfer');

  // Quick Transfer State
  const [quickRecipient, setQuickRecipient] = useState('Sarah');
  const [quickAmount, setQuickAmount] = useState('');
  const [quickNote, setQuickNote] = useState('');

  // Add Goal Inputs
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');

  const recipients = [
    { name: 'Sarah', avatar: 'S' },
    { name: 'Michael', avatar: 'M' },
    { name: 'Emma', avatar: 'E' },
    { name: 'David', avatar: 'D' },
  ];

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(topUpAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: 'Top Up &mdash; Account Deposit', category: 'Income', amount: amt, isPositive: true });
    setIsTopUpOpen(false);
    showToast(`Successfully topped up +$${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}!`);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(sendAmount);
    if (isNaN(amt) || amt <= 0 || !sendRecipient) return;
    addTransaction({ merchant: sendRecipient, category: sendCategory, amount: amt, isPositive: false });
    setIsSendOpen(false);
    setSendRecipient('');
    setSendAmount('');
    showToast(`Sent $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${sendRecipient}`);
  };

  const handleQuickTransfer = (e) => {
    e.preventDefault();
    const amt = parseFloat(quickAmount);
    if (isNaN(amt) || amt <= 0) return;
    addTransaction({ merchant: `Transfer to ${quickRecipient}`, category: 'Transfer', amount: amt, isPositive: false });
    setQuickAmount('');
    setQuickNote('');
    showToast(`Transferred $${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })} to ${quickRecipient}`);
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;
    addGoal(goalTitle, goalTarget);
    setIsAddGoalOpen(false);
    setGoalTitle('');
    setGoalTarget('');
  };

  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="dashboard-content">
      {/* Hero / Action Bar */}
      <section className="hero-banner">
        <div className="hero-welcome">
          <h2>Welcome back, {user ? user.name : 'Alex'}!</h2>
          <p>Your financial metrics look solid this week. You have 3 pending tasks.</p>
        </div>
        <div className="hero-actions">
          <button className="btn btn-primary" id="btn-topup" onClick={() => setIsTopUpOpen(true)}>
            <i className="ph ph-plus-circle"></i> Top Up
          </button>
          <button className="btn btn-secondary" id="btn-send" onClick={() => setIsSendOpen(true)}>
            <i className="ph ph-paper-plane-tilt"></i> Send Money
          </button>
          <button className="btn btn-secondary" id="btn-addcard" onClick={() => setActiveTab('cards')}>
            <i className="ph ph-credit-card"></i> Manage Cards
          </button>
        </div>
      </section>

      {/* KPI Cards Grid */}
      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon icon-blue">
            <i className="ph ph-wallet"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Total Portfolio</span>
            <h3 className="kpi-value">${user ? (user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '24,568.32'}</h3>
            <span className="kpi-trend trend-up"><i className="ph ph-trend-up"></i> +12.4% this month</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon icon-green">
            <i className="ph ph-arrow-down-left"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Monthly Income</span>
            <h3 className="kpi-value">$6,100.00</h3>
            <span className="kpi-trend trend-up"><i className="ph ph-trend-up"></i> +8.2% vs last month</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon icon-amber">
            <i className="ph ph-arrow-up-right"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Monthly Expenses</span>
            <h3 className="kpi-value">$2,640.79</h3>
            <span className="kpi-trend trend-down"><i className="ph ph-trend-down"></i> -3.1% vs target</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon icon-purple">
            <i className="ph ph-chart-pie"></i>
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Investments</span>
            <h3 className="kpi-value">$25,696.86</h3>
            <span className="kpi-trend trend-up"><i className="ph ph-trend-up"></i> +18.6% ROI</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Transactions & Quick Transfer */}
      <div className="grid-2-col">
        {/* Recent Activity */}
        <section className="card-box">
          <div className="box-header">
            <h3>Recent Activity</h3>
            <button className="btn-link" onClick={() => setActiveTab('transactions')}>View All &rarr;</button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Merchant / Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTxs.map(tx => (
                  <tr key={tx.id}>
                    <td>
                      <div className="tx-merchant">
                        <div className="merchant-icon"><i className={`ph ${tx.icon}`}></i></div>
                        <span dangerouslySetInnerHTML={{ __html: tx.merchant }}></span>
                      </div>
                    </td>
                    <td>{tx.date}</td>
                    <td>
                      <span className={`status-badge ${tx.status === 'Completed' ? 'status-completed' : (tx.status === 'Pending' ? 'status-pending' : 'status-failed')}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className={`tx-amount ${tx.type === 'credit' ? 'positive' : ''}`}>
                      {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Transfer Widget */}
        <section className="card-box">
          <div className="box-header">
            <h3>Quick Transfer</h3>
            <i className="ph ph-lightning" style={{ color: 'var(--accent-blue)' }}></i>
          </div>
          <form onSubmit={handleQuickTransfer} className="quick-transfer-form">
            <label className="form-label">Select Recipient</label>
            <div className="avatar-picker" style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              {recipients.map(r => (
                <div
                  key={r.name}
                  className={`avatar-item ${quickRecipient === r.name ? 'active' : ''}`}
                  onClick={() => setQuickRecipient(r.name)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: quickRecipient === r.name ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                    background: quickRecipient === r.name ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-app)',
                    fontWeight: 600
                  }}
                >
                  <span className="avatar-name">{r.name}</span>
                </div>
              ))}
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label className="form-label">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="0.00"
                value={quickAmount}
                onChange={e => setQuickAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Note (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Dinner expense, rent..."
                value={quickNote}
                onChange={e => setQuickNote(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Send Instant</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => showToast(`Saved draft transfer of $${quickAmount || '0'} for ${quickRecipient}`)}
              >
                Save Draft
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Grid: Upcoming Bills & Savings Goals */}
      <div className="grid-2-col" style={{ marginTop: '24px' }}>
        {/* Upcoming Bills */}
        <section className="card-box">
          <div className="box-header">
            <h3>Upcoming Bills</h3>
            <button className="btn-link" onClick={() => setActiveTab('budgets')}>Manage &rarr;</button>
          </div>
          <div className="bills-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bills.map(b => (
              <div key={b.id} className="bill-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-app)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="merchant-icon"><i className={`ph ${b.icon}`}></i></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{b.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.dueDate}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span className="bill-price" style={{ fontWeight: 700 }}>{b.price}</span>
                  <button
                    className="btn btn-sm btn-pay"
                    disabled={b.status === 'Paid'}
                    style={{
                      background: b.status === 'Paid' ? '#10b981' : 'var(--accent-blue)',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      cursor: b.status === 'Paid' ? 'default' : 'pointer'
                    }}
                    onClick={() => payBill(b.id)}
                  >
                    {b.status === 'Paid' ? 'Paid' : 'Pay'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Savings Goals */}
        <section className="card-box">
          <div className="box-header">
            <h3>Savings Goals</h3>
            <button className="btn-link" onClick={() => setIsAddGoalOpen(true)}>+ Add Goal</button>
          </div>
          <div className="goals-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {goals.map(g => {
              const pct = Math.min(100, Math.round((g.current / g.target) * 100));
              return (
                <div key={g.id} style={{ padding: '12px 16px', background: 'var(--bg-app)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600 }}>{g.title}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      ${g.current.toLocaleString()} / ${g.target.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-sm btn-goal-act add-funds-btn"
                      onClick={() => updateGoalFunds(g.id, 100)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px', background: 'var(--accent-blue)', color: '#fff', border: 'none' }}
                    >
                      + $100
                    </button>
                    <button
                      className="btn btn-sm btn-goal-act"
                      onClick={() => updateGoalFunds(g.id, -100)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px', background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
                    >
                      - $100
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Top Up Modal */}
      <Modal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} title="Top Up Account Balance">
        <form onSubmit={handleTopUpSubmit}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Amount ($)</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={topUpAmount}
              onChange={e => setTopUpAmount(e.target.value)}
              required
            />
          </div>
          <div className="chips-row" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {['100', '250', '500', '1000'].map(val => (
              <button
                key={val}
                type="button"
                className={`amount-chip ${topUpAmount === val ? 'active' : ''}`}
                onClick={() => setTopUpAmount(val)}
                style={{ padding: '6px 14px', borderRadius: '16px', border: '1px solid var(--border-color)', background: topUpAmount === val ? 'var(--accent-blue)' : 'var(--bg-app)', color: topUpAmount === val ? '#fff' : 'var(--text-main)', cursor: 'pointer' }}
              >
                +${val}
              </button>
            ))}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Deposit</button>
        </form>
      </Modal>

      {/* Send Money Modal */}
      <Modal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} title="Send Money / Payment">
        <form onSubmit={handleSendSubmit}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Recipient Name / Account</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Amazon, Sarah, ConEd"
              value={sendRecipient}
              onChange={e => setSendRecipient(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Category</label>
            <select className="form-control" value={sendCategory} onChange={e => setSendCategory(e.target.value)}>
              <option value="Transfer">Transfer</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food & Dining</option>
              <option value="Bills">Bills & Utilities</option>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Funds</button>
        </form>
      </Modal>

      {/* Add Goal Modal */}
      <Modal isOpen={isAddGoalOpen} onClose={() => setIsAddGoalOpen(false)} title="Create New Savings Goal">
        <form onSubmit={handleCreateGoal}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Goal Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. House Downpayment"
              value={goalTitle}
              onChange={e => setGoalTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Target Amount ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="5000"
              value={goalTarget}
              onChange={e => setGoalTarget(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Goal</button>
        </form>
      </Modal>
    </div>
  );
};
