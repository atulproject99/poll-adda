import React, { createContext, useContext, useState, useCallback } from 'react';
import ConfirmModal from '../components/common/ConfirmModal';

interface ModalOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'primary';
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextType {
  confirm: (options: ModalOptions) => void;
  alert: (options: Omit<ModalOptions, 'onCancel' | 'cancelText'>) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    title: '',
    message: '',
  });

  const confirm = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  }, []);

  const alert = useCallback((options: Omit<ModalOptions, 'onCancel' | 'cancelText'>) => {
    setModalOptions({
      ...options,
      cancelText: '', // Hide cancel button by making it empty
      onCancel: () => {},
    });
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (modalOptions.onCancel) modalOptions.onCancel();
  };

  const handleConfirm = () => {
    if (modalOptions.onConfirm) modalOptions.onConfirm();
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ confirm, alert }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={modalOptions.title}
        message={modalOptions.message}
        confirmText={modalOptions.confirmText}
        cancelText={modalOptions.cancelText}
        type={modalOptions.type}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
