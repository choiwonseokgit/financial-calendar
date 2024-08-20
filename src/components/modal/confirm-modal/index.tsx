import {
  CONFIRM_MODAL_MESSAGES,
  TConfirmModalContents,
} from '@constants/modal';
import styled from 'styled-components';
import Modal from '../modal';

interface ConfirmModalProps {
  onClose: () => void;
  modalMessage: keyof TConfirmModalContents;
}

function ConfirmModal({ onClose, modalMessage }: ConfirmModalProps) {
  return (
    <Modal onClose={onClose} type="confirm">
      <S.Contents>{CONFIRM_MODAL_MESSAGES[modalMessage]}</S.Contents>
      {/* <button>닫기</button> */}
    </Modal>
  );
}

export default ConfirmModal;

const S = {
  Contents: styled.div`
    padding-block: 30px;
  `,
};
