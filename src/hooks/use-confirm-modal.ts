import { useState } from 'react';
import { TConfirmModalMessages } from '@constants/modal';

const useConfirmModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessageType, setModalMessageType] =
    useState<keyof TConfirmModalMessages>('moneyInput');

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

  const handleModalMessageChange = (message: keyof TConfirmModalMessages) => {
    setModalMessageType(message);
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    modalMessageType,
    handleModalMessageChange,
  };
};

export default useConfirmModal;
