import { useState } from 'react';

import type { ConfirmModalMessages } from '@constants/modal';

const useConfirmModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessageType, setModalMessageType] =
    useState<keyof ConfirmModalMessages>('moneyInput');

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

  const handleModalMessageChange = (message: keyof ConfirmModalMessages) => {
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
