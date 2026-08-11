import React, { useState } from 'react';
import { useDb } from '../../core/database/DbContext.jsx';

export const AnalyticsPage = () => {
  const { showToast } = useDb();
  const [timeRange, setTimeRange] = useState('1M');

  const ranges = [
    { label: '24 Hours', value: '1D' },
    { label: '7 Days', value: '1W' },
    { label: '30 Days', value: '1M' },
    { label: '1 Year', value: '1Y' },
    { label: 'All Time', value: 'ALL' },
  ];

  const handleRangeChange = (val, label) => {
    setTimeRange(val);
    showToast(`Showing ${label} financial analytics`);
  };

  return (
    <div className="analytics-content">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2>Financial Analytics & Insights</h2>
          <p className="subtitle">Track cash flow trends, income vs. expense breakdown, and forecastings.</p>
        </div>
        <div className="analytics-tabs" style={{ display: 'flex', gap: '6px', background: 'var(--bg-card)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {ranges.map(r => (
            <button
              key={r.value}
              className={`tab-btn ${timeRange === r.value ? 'active' : ''}`}
              onClick={() => handleRangeChange(r.value, r.label)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: timeRange === r.value ? 'var(--accent-blue)' : 'transparent',
                color: timeRange === r.value ? '#fff' : 'var(--text-muted)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {r.value}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card">
          <span className="kpi-title">Gross Revenue ({timeRange})</span>
          <h3 className="kpi-value" style={{ color: '#10b981' }}>+$12,450.00</h3>
          <span className="kpi-trend trend-up"><i className="ph ph-trend-up"></i> +14.2% Growth</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Net Expense ({timeRange})</span>
          <h3 className="kpi-value" style={{ color: '#ef4444' }}>-$4,180.20</h3>
          <span className="kpi-trend trend-down"><i className="ph ph-trend-down"></i> -2.4% Controlled</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Savings Rate</span>
          <h3 className="kpi-value">66.4%</h3>
          <span className="kpi-trend trend-up"><i className="ph ph-trend-up"></i> Top 5% Tier</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Projected Growth</span>
          <h3 className="kpi-value">$48,200.00</h3>
          <span className="kpi-trend trend-up"><i className="ph ph-sparkle"></i> AI Forecast</span>
        </div>
      </div>

      {/* Financial Growth Charts Breakdown */}
      <div className="grid-2-col">
        {/* Cash Flow Visual Breakdown */}
        <section className="card-box">
          <h3>Income vs Expense Breakdown ({timeRange})</h3>
          <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 600 }}>
                <span>Income & Salary</span>
                <span style={{ color: '#10b981' }}>$12,450.00 (75%)</span>
              </div>
              <div style={{ height: '12px', background: 'var(--bg-app)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#10b981' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 600 }}>
                <span>Shopping & Retail</span>
                <span style={{ color: '#3b82f6' }}>$2,140.00 (13%)</span>
              </div>
              <div style={{ height: '12px', background: 'var(--bg-app)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '13%', height: '100%', background: '#3b82f6' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 600 }}>
                <span>Food & Dining</span>
                <span style={{ color: '#f59e0b' }}>$1,210.20 (7%)</span>
              </div>
              <div style={{ height: '12px', background: 'var(--bg-app)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '7%', height: '100%', background: '#f59e0b' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 600 }}>
                <span>Bills & Utilities</span>
                <span style={{ color: '#8b5cf6' }}>$830.00 (5%)</span>
              </div>
              <div style={{ height: '12px', background: 'var(--bg-app)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '5%', height: '100%', background: '#8b5cf6' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Trend Insights */}
        <section className="card-box">
          <h3>Spending Trend Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <i className="ph ph-sparkle" style={{ color: '#3b82f6', fontSize: '1.5rem' }}></i>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Smart Advice: High Savings Margin</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  You saved 66.4% of your total income this period. Consider allocating $1,500 into high-yield index funds (VOO).
                </p>
              </div>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <i className="ph ph-warning" style={{ color: '#f59e0b', fontSize: '1.5rem' }}></i>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Category Alert: Shopping & Retail</h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Shopping expenses increased by 12% compared to last month due to electronics purchases.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
