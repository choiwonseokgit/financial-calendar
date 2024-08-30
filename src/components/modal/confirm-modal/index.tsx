import {
  CONFIRM_MODAL_MESSAGES,
  TConfirmModalMessages,
} from '@constants/modal';
import styled from 'styled-components';
import Modal from '../modal';

interface ConfirmModalProps {
  onClose: () => void;
  modalMessageType: keyof TConfirmModalMessages;
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
