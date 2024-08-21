import { useState } from 'react';
import { TConfirmModalContents } from '@constants/modal';

const useConfirmModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] =
    useState<keyof TConfirmModalContents>('moneyInput');

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

  const handleModalMessageChange = (message: keyof TConfirmModalContents) => {
    setModalMessage(message);
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    modalMessage,
    handleModalMessageChange,
  };
};

export default useConfirmModal;
