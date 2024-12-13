import styled from 'styled-components';

import { CONFIRM_MODAL_MESSAGES, ConfirmModalMessages } from '@constants/modal';

import Modal from '../components/modal';

interface ConfirmModalProps {
  onClose: () => void;
  modalMessageType: keyof ConfirmModalMessages;
  isSubmit?: boolean;
  onSubmit?: () => void;
}

function ConfirmModal({
  onClose,
  modalMessageType,
  isSubmit = false,
  onSubmit,
}: ConfirmModalProps) {
  return (
    <Modal
      onClose={onClose}
      type={isSubmit ? 'delete' : 'confirm'}
      submitCb={onSubmit}
    >
      <S.Contents>{CONFIRM_MODAL_MESSAGES[modalMessageType]}</S.Contents>
    </Modal>
  );
}

export default ConfirmModal;

const S = {
  Contents: styled.div`
    padding-block: 30px;
  `,
};
