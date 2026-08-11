import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn-close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
