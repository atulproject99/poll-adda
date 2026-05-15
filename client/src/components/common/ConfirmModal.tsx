import React from 'react';
import { AlertCircle, HelpCircle, X } from 'lucide-react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'primary';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'primary'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card scale-in">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-icon-wrapper">
          {type === 'danger' ? (
            <AlertCircle size={48} className="icon-danger" />
          ) : (
            <HelpCircle size={48} className="icon-primary" />
          )}
        </div>
        
        <div className="modal-body">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        
        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            {cancelText}
          </button>
          <button 
            className={type === 'danger' ? 'danger-button' : 'primary-button'} 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
