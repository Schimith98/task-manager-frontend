import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface ModalContextType {
  openModal: (modal: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState< ReactNode[]>([]);
  
  const openModal = (modal: ReactNode) => {
    setModals((prevModals) => [...prevModals!, modal]);
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals!.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map((modal, index) => <React.Fragment key={`modal-${index}`}>{modal}</React.Fragment>)}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
