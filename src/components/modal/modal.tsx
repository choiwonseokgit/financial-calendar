import { useRef } from 'react';
import useOutsideClickForAnimation from '@hooks/use-outside-click-for-animation';
import { mobileSize } from '@styles/mobile';
import styled, { keyframes } from 'styled-components';
import ModalHeader from './modal-header';
import ModalPortal from './modal-portal';

interface ModalProps extends React.PropsWithChildren {
  onClose: () => void;
  type: 'confirm' | 'form';
}

function Modal({ children, onClose, type }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isCloseAnimStart, handleCloseAnimStart } =
    useOutsideClickForAnimation(modalRef, onClose, 300);

  return (
    <ModalPortal>
      <S.ModalBackground $isCloseAnimStart={isCloseAnimStart}>
        <S.ModalBox ref={modalRef}>
          <ModalHeader type={type} onClose={handleCloseAnimStart} />
          {children}
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
};
