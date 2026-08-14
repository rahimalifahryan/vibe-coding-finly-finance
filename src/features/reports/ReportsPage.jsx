'use client';

import React from 'react';
import { useDb } from '../../core/database/DbContext.jsx';

const monthlyStatements = [
  { period: 'Dec 2026', income: 8500.00, expenses: 4200.00, net: 5300.00 },
  { period: 'Nov 2026', income: 9200.00, expenses: 4000.00, net: 5200.00 },
  { period: 'Oct 2026', income: 8900.00, expenses: 3800.00, net: 5100.00 },
  { period: 'Sep 2026', income: 8300.00, expenses: 3600.00, net: 4700.00 },
  { period: 'Aug 2026', income: 8600.00, expenses: 3450.00, net: 5150.00 },
  { period: 'Jul 2026', income: 8420.00, expenses: 3240.00, net: 5180.00 },
  { period: 'Jun 2026', income: 8100.00, expenses: 3500.00, net: 4600.00 },
  { period: 'May 2026', income: 7800.00, expenses: 3300.00, net: 4500.00 },
  { period: 'Apr 2026', income: 7100.00, expenses: 3600.00, net: 3500.00 },
  { period: 'Mar 2026', income: 7200.00, expenses: 3400.00, net: 3800.00 },
  { period: 'Feb 2026', income: 6800.00, expenses: 2900.00, net: 3900.00 },
  { period: 'Jan 2026', income: 6200.00, expenses: 3100.00, net: 3100.00 },
];

export const ReportsPage = () => {
  const { transactions, showToast } = useDb();

  const handleExportStatement = (period) => {
    showToast(`Opening printable PDF statement for ${period}...`);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleExportAll = () => {
    let csvContent = 'Period,Income,Expenses,Net\n';
    monthlyStatements.forEach(row => {
      csvContent += `"${row.period}","$${row.income.toFixed(2)}","$${row.expenses.toFixed(2)}","$${row.net.toFixed(2)}"\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Finly_Full_Financial_Report_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded full 2026 financial report CSV');
  };

  const handleQuickExport = (type) => {
    if (type.includes('CSV')) {
      handleExportAll();
    } else {
      showToast(`Generating ${type}...`);
      setTimeout(() => {
        window.print();
      }, 300);
    }
  };

  const formatCurrency = (val) => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>Reports</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Statements, exports, and year-to-date summaries.</p>
      </div>

      {/* Row 1: YTD Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YTD income</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>$96,120.00</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YTD expenses</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>$42,090.00</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>YTD savings</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>$54,030.00</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Savings rate</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>56%</div>
        </div>
      </div>

      {/* Row 2: Quick Export Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div 
          className="card" 
          style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
          onClick={() => handleQuickExport('Full PDF Statement')}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <i className="ph ph-file-text" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}></i>
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Full statement</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Every transaction, categorised, PDF.</p>
        </div>

        <div 
          className="card" 
          style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
          onClick={() => handleQuickExport('CSV Data Export')}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <i className="ph ph-table" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}></i>
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>CSV export</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Raw data for Excel, Numbers, or Sheets.</p>
        </div>

        <div 
          className="card" 
          style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
          onClick={() => handleQuickExport('Tax Bundle Package')}
        >
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--hover-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <i className="ph ph-receipt" style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}></i>
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px', color: 'var(--text-main)' }}>Tax package</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>1099s, interest, dividends &mdash; bundled.</p>
        </div>
      </div>

      {/* Row 3: Monthly Statements Table Card */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Monthly statements</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="ph ph-file-text"></i> Automatically generated on the 1st of each month
            </p>
          </div>
          
          <button 
            className="btn-primary" 
            style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={handleExportAll}
          >
            <i className="ph ph-download-simple"></i> Export all
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-subtle)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>PERIOD</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>INCOME</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>EXPENSES</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>NET</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>STATEMENT</th>
              </tr>
            </thead>
            <tbody>
              {monthlyStatements.map((row, idx) => (
                <tr 
                  key={row.period}
                  style={{ 
                    borderBottom: idx !== monthlyStatements.length - 1 ? '1px solid var(--border-color)' : 'none',
                    transition: 'background 0.15s'
                  }}
                >
                  <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-main)' }}>{row.period}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{formatCurrency(row.income)}</td>
                  <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{formatCurrency(row.expenses)}</td>
                  <td style={{ padding: '16px', color: '#10b981', fontWeight: 600 }}>+{formatCurrency(row.net)}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button 
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--accent-blue)', 
                        fontSize: '0.85rem', 
                        fontWeight: 600, 
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => handleExportStatement(row.period)}
                    >
                      <i className="ph ph-file-pdf" style={{ fontSize: '1rem' }}></i> PDF
                    </button>
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
