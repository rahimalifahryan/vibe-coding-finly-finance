import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';

export const ReportsPage = () => {
  const { transactions, showToast } = useDb();
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  const handleGenerateReport = () => {
    showToast(`Generated comprehensive financial audit for ${selectedMonth}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="reports-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Financial Reports & Audits</h2>
          <p className="subtitle">Generate custom period statements, tax summaries, and PDF/CSV audit reports.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <i className="ph ph-printer"></i> Print Statement
          </button>
          <button className="btn btn-primary" onClick={handleGenerateReport}>
            <i className="ph ph-file-text"></i> Generate Audit Report
          </button>
        </div>
      </div>

      {/* Period Selection */}
      <div className="card-box" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <label className="form-label" style={{ margin: 0 }}>Statement Period:</label>
          <select className="form-control" style={{ width: '220px' }} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="October 2026">October 2026</option>
            <option value="September 2026">September 2026</option>
            <option value="August 2026">August 2026</option>
            <option value="Q3 2026 Summary">Q3 2026 Summary</option>
          </select>
        </div>
      </div>

      {/* Statement Preview Card */}
      <div className="card-box" style={{ padding: '32px' }}>
        <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>Finly Financial Statement</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Period: {selectedMonth}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-blue)' }}>Finly Inc.</span>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Digital Audit</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Opening Balance</span>
            <h4 style={{ margin: '4px 0 0 0' }}>$19,718.32</h4>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Credits (Income)</span>
            <h4 style={{ margin: '4px 0 0 0', color: '#10b981' }}>+$6,100.00</h4>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Debits (Expenses)</span>
            <h4 style={{ margin: '4px 0 0 0', color: '#ef4444' }}>-$1,250.00</h4>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Statement Balance</span>
            <h4 style={{ margin: '4px 0 0 0' }}>$24,568.32</h4>
          </div>
        </div>

        <h4 style={{ marginBottom: '12px' }}>Itemized Transactions ({transactions.length})</h4>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 8).map(tx => (
                <tr key={tx.id}>
                  <td>{tx.date}</td>
                  <td dangerouslySetInnerHTML={{ __html: tx.merchant }}></td>
                  <td>{tx.category}</td>
                  <td className={tx.type === 'credit' ? 'positive' : ''}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
