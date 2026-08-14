'use client';

import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';
import { Modal } from '../../design-system/components/Modal.jsx';

// Extended mock goals if DB goals are standard
const defaultGoals = [
  { id: 'goal-1', title: 'Emergency fund', current: 8200, target: 12000, date: 'SEP 2026', color: '#2563eb' },
  { id: 'goal-2', title: 'Japan 2027', current: 2400, target: 6000, date: 'FEB 2027', color: '#f97316' },
  { id: 'goal-3', title: 'New MacBook Pro', current: 1750, target: 3500, date: 'NOV 2026', color: '#10b981' },
  { id: 'goal-4', title: 'Down payment', current: 14200, target: 60000, date: '2028', color: '#8b5cf6' },
];

const mockBudgets = [
  { id: 'b1', category: 'Food', spent: 780.00, target: 800.00, color: '#2563eb' },
  { id: 'b2', category: 'Shopping', spent: 1499.00, target: 1200.00, color: '#ef4444', isOver: true, overAmount: 299.00 },
  { id: 'b3', category: 'Entertainment', spent: 405.00, target: 500.00, color: '#2563eb' },
  { id: 'b4', category: 'Travel', spent: 320.00, target: 800.00, color: '#2563eb' },
  { id: 'b5', category: 'Bills', spent: 662.00, target: 900.00, color: '#2563eb' },
];

export const BudgetsPage = () => {
  const { dbBudgets, addBudget, showToast } = useDb();

  const [budgetsList, setBudgetsList] = useState(mockBudgets);
  const [goalsList, setGoalsList] = useState(defaultGoals);

  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Form states for Budget Modal
  const [budgetName, setBudgetName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

  // Form states for Goal Modal
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDate, setGoalDate] = useState('');

  const totalSpent = budgetsList.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgetsList.reduce((acc, b) => acc + b.target, 0);
  const overallPercentage = Math.round((totalSpent / totalLimit) * 100);

  const underBudgetCount = budgetsList.filter(b => b.spent <= b.target).length;
  const overBudgetCount = budgetsList.filter(b => b.spent > b.target).length;

  const overBudgetItem = budgetsList.find(b => b.spent > b.target);

  const handleCreateBudget = (e) => {
    e.preventDefault();
    if (!budgetName || !budgetLimit) return;
    const newB = {
      id: `b-${Date.now()}`,
      category: budgetName,
      spent: 0,
      target: parseFloat(budgetLimit),
      color: '#2563eb'
    };
    setBudgetsList([...budgetsList, newB]);
    setIsAddBudgetOpen(false);
    setBudgetName('');
    setBudgetLimit('');
    showToast(`Created budget for ${budgetName}`);
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!goalTitle || !goalTarget) return;
    const newG = {
      id: `goal-${Date.now()}`,
      title: goalTitle,
      current: 0,
      target: parseFloat(goalTarget),
      date: goalDate || '2027',
      color: '#2563eb'
    };
    setGoalsList([...goalsList, newG]);
    setIsAddGoalOpen(false);
    setGoalTitle('');
    setGoalTarget('');
    setGoalDate('');
    showToast(`Added new goal: ${goalTitle}`);
  };

  const handleAddGoalFunds = (goalId) => {
    setGoalsList(goalsList.map(g => {
      if (g.id === goalId) {
        const added = 500;
        const newCurrent = Math.min(g.target, g.current + added);
        showToast(`Added $${added}.00 to ${g.title}`);
        return { ...g, current: newCurrent };
      }
      return g;
    }));
  };

  const handleRemoveGoal = (goalId) => {
    setGoalsList(goalsList.filter(g => g.id !== goalId));
    showToast(`Goal removed`);
  };

  const formatCurrency = (val) => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Budgets</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Monthly limits and long-term goals, gently enforced.</p>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>

        {/* Left Column */}
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Total This Month Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              TOTAL THIS MONTH
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '4px' }}>
              {formatCurrency(totalSpent)}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
              of {formatCurrency(totalLimit)} - {overallPercentage}% used
            </p>

            {/* Total progress bar */}
            <div style={{ height: '8px', background: 'var(--hover-bg)', borderRadius: '99px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ width: `${overallPercentage}%`, height: '100%', background: '#2563eb', borderRadius: '99px' }}></div>
            </div>

            {/* Under / Over summary blocks */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--hover-bg)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Under budget</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{underBudgetCount}</div>
              </div>
              <div style={{ background: 'var(--hover-bg)', padding: '16px', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Over budget</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{overBudgetCount}</div>
              </div>
            </div>

            {/* Alert banner if over budget */}
            {overBudgetItem && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#dc2626',
                fontSize: '0.85rem'
              }}>
                <i className="ph ph-warning" style={{ fontSize: '1.1rem', flexShrink: 0 }}></i>
                <div>
                  You're over budget in <strong>{overBudgetItem.category}</strong> by <strong>${(overBudgetItem.spent - overBudgetItem.target).toFixed(2)}</strong>. Raise the limit from the panel on the right.
                </div>
              </div>
            )}
          </div>

          {/* Spending Pace Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <i className="ph ph-trend-down" style={{ color: '#10b981', fontSize: '1.1rem' }}></i>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Spending pace</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
              You're <strong style={{ color: 'var(--text-main)' }}>running hot</strong> &mdash; 85% used with 77% of the month to go.
            </p>

            {/* Timeline Bar Visual */}
            <div style={{ background: 'var(--hover-bg)', height: '80px', borderRadius: '12px', position: 'relative', overflow: 'hidden', padding: '12px' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '35%',
                background: 'rgba(37, 99, 235, 0.15)',
                borderRight: '2px solid #2563eb'
              }}></div>

              <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                TODAY
              </div>

              <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                End of month
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Budget Progress Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2px' }}>Budget progress</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>This month</p>
              </div>
              <button
                style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setIsAddBudgetOpen(true)}
              >
                Manage
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {budgetsList.map((b) => {
                const isOver = b.spent > b.target;
                const overAmt = b.spent - b.target;
                const pct = Math.min(100, Math.round((b.spent / b.target) * 100));

                return (
                  <div key={b.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{b.category}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 600, color: isOver ? '#ef4444' : 'var(--text-main)' }}>{formatCurrency(b.spent)}</span>
                        <span style={{ margin: '0 4px' }}>/</span>
                        {formatCurrency(b.target)}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '6px', background: 'var(--hover-bg)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct}%`,
                        height: '100%',
                        background: isOver ? '#ef4444' : (b.color || '#2563eb'),
                        borderRadius: '99px'
                      }}></div>
                    </div>

                    {isOver && (
                      <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 500 }}>
                        Over by {formatCurrency(overAmt)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Savings Goals Card */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="ph ph-target" style={{ color: '#2563eb', fontSize: '1.2rem' }}></i>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Savings goals</h3>
              </div>
              <button
                style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setIsAddGoalOpen(true)}
              >
                + New goal
              </button>
            </div>

            {/* 2x2 Grid of Savings Goals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {goalsList.map((goal) => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

                return (
                  <div key={goal.id} style={{
                    background: 'var(--hover-bg)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    minHeight: '170px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{goal.title}</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                          {goal.date || 'GOAL'}
                        </div>
                      </div>

                      <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                        {formatCurrency(goal.current)}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        of {formatCurrency(goal.target)} &middot; {pct}%
                      </div>

                      {/* Progress Bar */}
                      <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '99px', overflow: 'hidden', marginBottom: '16px' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: goal.color || '#2563eb', borderRadius: '99px' }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                      <button
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                        onClick={() => handleAddGoalFunds(goal.id)}
                      >
                        Add funds
                      </button>
                      <button
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                        onClick={() => handleRemoveGoal(goal.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Add Budget Modal */}
      <Modal
        isOpen={isAddBudgetOpen}
        onClose={() => setIsAddBudgetOpen(false)}
        title="Create / Manage Budget"
        subtitle="Set monthly spending limits for expense categories"
        icon="ph-pie-chart"
        size="md"
      >
        <form onSubmit={handleCreateBudget} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Subscriptions, Groceries..."
              value={budgetName}
              onChange={e => setBudgetName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Monthly Target ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="500"
              value={budgetLimit}
              onChange={e => setBudgetLimit(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '4px' }}
          >
            <i className="ph ph-check"></i> Save Budget Rule
          </button>
        </form>
      </Modal>

      {/* Add Goal Modal */}
      <Modal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        title="Create New Savings Goal"
        subtitle="Track target savings for major purchases or milestones"
        icon="ph-target"
        size="md"
      >
        <form onSubmit={handleCreateGoal} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Goal Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. New Laptop, Emergency Fund..."
              value={goalTitle}
              onChange={e => setGoalTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Target Amount ($)</label>
            <input
              type="number"
              className="form-control"
              placeholder="2500"
              value={goalTarget}
              onChange={e => setGoalTarget(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Target Date / Year</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. DEC 2026"
              value={goalDate}
              onChange={e => setGoalDate(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '4px' }}
          >
            <i className="ph ph-plus"></i> Create Savings Goal
          </button>
        </form>
      </Modal>

    </div>
  );
};
