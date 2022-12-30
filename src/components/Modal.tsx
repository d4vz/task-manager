import React from 'react';
import Modal from 'react-modal';

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      {children}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default CustomModal;
