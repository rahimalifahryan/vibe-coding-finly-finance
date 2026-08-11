'use client';

import React, { useEffect } from 'react';

export const ToastContainer = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div id="toast-container" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      <div className="toast" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', color: 'var(--text-main)' }}>
        <i className="ph ph-check-circle" style={{ color: '#10b981', fontSize: '1.25rem' }}></i>
        <span>{message}</span>
      </div>
    </div>
  );
};
