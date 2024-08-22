import {
  CONFIRM_MODAL_MESSAGES,
  TConfirmModalMessages,
} from '@constants/modal';
import styled from 'styled-components';
import Modal from '../modal';

interface ConfirmModalProps {
  onClose: () => void;
  modalMessageType: keyof TConfirmModalMessages;
}

function ConfirmModal({ onClose, modalMessageType }: ConfirmModalProps) {
  return (
    <Modal onClose={onClose} type="confirm">
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
