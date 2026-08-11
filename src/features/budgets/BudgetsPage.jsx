import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

export const BudgetsPage = () => {
  const { budgets, addBudget } = useDb();

  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [target, setTarget] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (!category || !target) return;
    addBudget(category, target, color);
    setIsAddBudgetOpen(false);
    setCategory('');
    setTarget('');
  };

  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalBudget = budgets.reduce((acc, b) => acc + b.target, 0);

  return (
    <div className="budgets-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Monthly Budgets & Allocations</h2>
          <p className="subtitle">Set spending limits per category and track your monthly budget health.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAddBudgetOpen(true)}>
          <i className="ph ph-plus"></i> Create Budget Category
        </button>
      </div>

      {/* Overview Banner */}
      <div className="card-box" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 600 }}>
          <span>Overall Monthly Spending</span>
          <span>${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()} Spent</span>
        </div>
        <div style={{ height: '12px', background: 'var(--bg-app)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, Math.round((totalSpent / (totalBudget || 1)) * 100))}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #f59e0b)' }}></div>
        </div>
      </div>

      {/* Budget Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {budgets.map(b => {
          const pct = Math.min(100, Math.round((b.spent / b.target) * 100));
          const isOver = b.spent >= b.target;
          return (
            <div key={b.id} className="card-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{b.category}</h4>
                <span className={`status-badge ${isOver ? 'status-failed' : 'status-completed'}`} style={{ fontSize: '0.75rem' }}>
                  {isOver ? 'Limit Exceeded' : 'On Track'}
                </span>
              </div>

              <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: isOver ? '#ef4444' : 'var(--text-main)' }}>
                ${b.spent.toLocaleString()} <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>/ ${b.target.toLocaleString()}</span>
              </div>

              <div style={{ height: '8px', background: 'var(--bg-app)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: isOver ? '#ef4444' : (b.color || '#3b82f6'), transition: 'width 0.3s ease' }}></div>
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {pct}% of monthly budget allocated
              </span>
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      <Modal isOpen={isAddBudgetOpen} onClose={() => setIsAddBudgetOpen(false)} title="Create New Category Budget">
        <form onSubmit={handleCreateBudget}>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Health & Fitness"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Monthly Target ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="500"
              value={target}
              onChange={e => setTarget(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Theme Color</label>
            <input
              type="color"
              className="form-control"
              value={color}
              onChange={e => setColor(e.target.value)}
              style={{ height: '40px', padding: '2px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Budget</button>
        </form>
      </Modal>
    </div>
  );
};
