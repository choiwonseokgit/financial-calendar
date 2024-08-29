import { useRef } from 'react';
import { TModal } from '@constants/modal';
import useOutsideClickForAnimation from '@hooks/use-outside-click-for-animation';
import { mobileSize } from '@styles/mobile';
import styled, { keyframes } from 'styled-components';
import ModalHeader from './modal-header';
import ModalPortal from './modal-portal';

interface ModalProps extends React.PropsWithChildren {
  onClose: () => void;
  type: TModal;
  submitCb?: () => void;
  isDisabled?: boolean;
}

function Modal({ children, onClose, type, submitCb, isDisabled }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isSubmitModal = type !== 'confirm';
  const { isCloseAnimStart, handleCloseAnimStart } =
    useOutsideClickForAnimation(modalRef, onClose, 300);

  const handleSubmitBtnClick = () => {
    if (submitCb) submitCb();
    handleCloseAnimStart();
  };

  return (
    <ModalPortal>
      <S.ModalBackground $isCloseAnimStart={isCloseAnimStart}>
        <S.ModalBox ref={modalRef}>
          <ModalHeader type={type} onClose={handleCloseAnimStart} />
          {children}
          {isSubmitModal && (
            <S.SubmitBtn
              disabled={isDisabled}
              $isDisabled={isDisabled}
              onClick={handleSubmitBtnClick}
            >
              확인
            </S.SubmitBtn>
          )}
        </S.ModalBox>
      </S.ModalBackground>
    </ModalPortal>
  );
}

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const S = {
  ModalBackground: styled.div<{ $isCloseAnimStart: boolean }>`
    inset: 0px;
    position: fixed;
    ${mobileSize}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    height: calc(100% + 10px);
    background: rgba(0, 0, 0, 0.6);
    animation: ${({ $isCloseAnimStart }) =>
        $isCloseAnimStart ? fadeOut : fadeIn}
      0.3s ease-in-out forwards;
    z-index: 500; //TODO zIndex묶기
  `,

  ModalBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;

    margin: 24px;
    padding: 10px;
    border-radius: 10px;
    /* background: ${(props) => props.theme.modalBg}; */
    /* box-shadow: 0px 4px 16px 0px ${(props) => props.theme.modalShadow}; */
  `,

  SubmitBtn: styled.button<{ $isDisabled?: boolean }>`
    /* align-self: flex-end; */
    border-radius: 10px;
    padding: 10px 30px;
    color: var(--white);
    background-color: ${({ $isDisabled }) =>
      $isDisabled ? 'var(--gray02)' : 'var(--green04)'};
    cursor: ${({ $isDisabled }) => $isDisabled && 'not-allowed'};
  `,
};
