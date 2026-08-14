'use client';

import React, { useEffect } from 'react';

export const ToastContainer = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div id="toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}>
      <div 
        className="toast-popup" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-color)', 
          padding: '14px 22px', 
          borderRadius: '16px', 
          boxShadow: '0 15px 35px -5px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.1)', 
          color: 'var(--text-main)',
          animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          maxWidth: '380px'
        }}
      >
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <i className="ph ph-bell-simple-ringing" style={{ fontSize: '1.1rem' }}></i>
        </div>
        <span style={{ fontSize: '0.88rem', fontWeight: 500, flex: 1, lineHeight: 1.3 }}>{message}</span>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', display: 'flex', padding: '4px', fontSize: '1rem' }}
          title="Dismiss toast"
        >
          <i className="ph ph-x"></i>
        </button>
      </div>
    </div>
  );
};
