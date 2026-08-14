'use client';

import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';
import { useDb } from '../../core/database/DbContext.jsx';

// --- MOCK DATA ---

const sparklineDataIncome = Array.from({ length: 10 }, () => ({ value: Math.random() * 100 + 500 }));
const sparklineDataExpenses = Array.from({ length: 10 }, () => ({ value: Math.random() * 50 + 200 }));
const sparklineDataSavings = Array.from({ length: 10 }, () => ({ value: Math.random() * 100 + 300 }));
const sparklineDataNetWorth = Array.from({ length: 10 }, () => ({ value: Math.random() * 200 + 2000 }));

const areaChartData = [
  { name: 'Jan', income: 4000, expenses: 2400, savings: 1600 },
  { name: 'Feb', income: 4500, expenses: 2100, savings: 2400 },
  { name: 'Mar', income: 4800, expenses: 2800, savings: 2000 },
  { name: 'Apr', income: 4600, expenses: 2600, savings: 2000 },
  { name: 'May', income: 5200, expenses: 2000, savings: 3200 },
  { name: 'Jun', income: 5400, expenses: 2300, savings: 3100 },
  { name: 'Jul', income: 6000, expenses: 2100, savings: 3900 },
  { name: 'Aug', income: 5800, expenses: 2400, savings: 3400 },
  { name: 'Sep', income: 6200, expenses: 2600, savings: 3600 },
  { name: 'Oct', income: 7000, expenses: 2800, savings: 4200 },
  { name: 'Nov', income: 7200, expenses: 3100, savings: 4100 },
  { name: 'Dec', income: 7500, expenses: 3500, savings: 4000 },
];

const spendingData = [
  { name: 'Bills', value: 2790.97, color: '#14b8a6' },
  { name: 'Shopping', value: 1299.00, color: '#8b5cf6' },
  { name: 'Savings', value: 1000.00, color: '#94a3b8' },
  { name: 'Food', value: 84.32, color: '#f59e0b' },
  { name: 'Healthcare', value: 38.50, color: '#06b6d4' },
];

const highlights = [
  { id: 1, text: <>Savings rate is <strong>43%</strong> across the transactions in your ledger.</>, color: '#10b981' },
  { id: 2, text: <><strong>Rent — 88 Sullivan St.</strong> is your biggest merchant at <strong>$2,400.00</strong>.</>, color: '#3b82f6' },
  { id: 3, text: <>Investments moved <strong>+0.31%</strong> today across 4 holdings.</>, color: '#10b981' },
  { id: 4, text: <>1 payment failed — retry from <a href="#" style={{color: 'var(--accent-blue)'}}>Transactions</a>.</>, color: '#ef4444' }
];

const topMerchants = [
  { name: 'Rent — 88 Sullivan St.', category: 'Bills', amount: 2400.00, percent: 46 },
  { name: 'Apple Store', category: 'Shopping', amount: 1299.00, percent: 25 },
  { name: 'Savings — Singapore 2025', category: 'Savings', amount: 1000.00, percent: 19 },
  { name: 'Con Edison', category: 'Bills', amount: 284.00, percent: 5 },
  { name: 'Whole Foods', category: 'Food', amount: 84.32, percent: 2 },
  { name: 'Verizon Fios', category: 'Bills', amount: 79.99, percent: 2 },
];

const categoryLeaders = [
  { name: 'Bills', amount: 2790.97, percent: 53, color: '#14b8a6' },
  { name: 'Shopping', amount: 1299.00, percent: 25, color: '#8b5cf6' },
  { name: 'Savings', amount: 1000.00, percent: 19, color: '#94a3b8' },
  { name: 'Food', amount: 84.32, percent: 2, color: '#f59e0b' },
  { name: 'Healthcare', amount: 38.50, percent: 1, color: '#06b6d4' },
  { name: 'Transportation', amount: 22.40, percent: 0, color: '#3b82f6' },
  { name: 'Entertainment', amount: 15.99, percent: 0, color: '#ec4899' },
];

// --- COMPONENTS ---

const formatCurrency = (val) => {
  return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const Sparkline = ({ data, color }) => (
  <div style={{ height: '40px', width: '100%', marginTop: '16px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const KPICard = ({ title, value, trend, isUp, color, sparklineData }) => (
  <div className="card" style={{ padding: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, opacity: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }}></div>
        </div>
      </div>
      <div style={{ color: isUp ? '#10b981' : '#ef4444', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
        <i className={isUp ? 'ph ph-trend-up' : 'ph ph-trend-down'}></i> {trend}
      </div>
    </div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</div>
    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>{value}</div>
    <Sparkline data={sparklineData} color={color} />
  </div>
);

export const AnalyticsPage = () => {
  const { showToast } = useDb();
  const [timeRange, setTimeRange] = useState('Monthly');

  const ranges = ['Weekly', 'Monthly', 'Yearly'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Analytics</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Trends across income, expenses, and savings.</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <KPICard title="Income" value="$9,220.50" trend="8.2%" isUp={true} color="#3b82f6" sparklineData={sparklineDataIncome} />
        <KPICard title="Expenses" value="$5,251.18" trend="3.1%" isUp={false} color="#ef4444" sparklineData={sparklineDataExpenses} />
        <KPICard title="Savings" value="$3,969.32" trend="43%" isUp={true} color="#10b981" sparklineData={sparklineDataSavings} />
        <KPICard title="Net worth" value="$21,719.35" trend="2.4%" isUp={true} color="#8b5cf6" sparklineData={sparklineDataNetWorth} />
      </div>

      {/* Financial Analytics Area Chart */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Financial Analytics</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Income, expenses, and savings over time</p>
          </div>
          
          <div style={{ display: 'flex', gap: '4px', background: 'var(--hover-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            {ranges.map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: timeRange === r ? 'var(--bg-card)' : 'transparent',
                  color: timeRange === r ? 'var(--text-main)' : 'var(--text-muted)',
                  fontWeight: timeRange === r ? 600 : 500,
                  fontSize: '0.85rem',
                  boxShadow: timeRange === r ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--hover-bg)', padding: '4px 10px', borderRadius: '99px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#3b82f6'}}></div> Income</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--hover-bg)', padding: '4px 10px', borderRadius: '99px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#ef4444'}}></div> Expenses</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', background: 'var(--hover-bg)', padding: '4px 10px', borderRadius: '99px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#10b981'}}></div> Savings</div>
        </div>

        <div style={{ height: '350px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} tickFormatter={(val) => val === 0 ? '$0' : `$${val/1000}K`} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}
                itemStyle={{ fontSize: '0.9rem', fontWeight: 500 }}
                labelStyle={{ color: 'var(--text-muted)', marginBottom: '4px' }}
              />
              <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
              <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSavings)" />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Col Grid: Spending & Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Spending Pie Chart */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Spending</h3>
            <a href="#" style={{ fontSize: '0.85rem', fontWeight: 500 }}>View all</a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>By category, this month</p>
          
          <div style={{ position: 'relative', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>$5,251.18</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
            {spendingData.map(item => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{formatCurrency(item.value)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Highlights</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Auto-generated from your activity</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {highlights.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, marginTop: '8px', flexShrink: 0 }}></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-Col Grid: Top merchants & Category leaders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Top merchants */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Top merchants</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Sorted by spend - from your ledger</p>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {topMerchants.map((item, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '16px 0', 
                borderBottom: idx !== topMerchants.length - 1 ? '1px solid var(--border-color)' : 'none'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{item.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>{formatCurrency(item.amount)}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.percent}% of spend</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category leaders */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Category leaders</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>Where each dollar went</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {categoryLeaders.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 500 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {formatCurrency(item.amount)} <span style={{ margin: '0 4px' }}>&middot;</span> {item.percent}%
                  </div>
                </div>
                <div style={{ height: '6px', background: 'var(--hover-bg)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '99px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};
