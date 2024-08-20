import CloseIcon from '@assets/icons/xmark-solid.svg';
import { MODAL_TITLE, TModalTitle } from '@constants/modal';
import styled from 'styled-components';

interface ModalHeaderProps {
  type: keyof TModalTitle;
  onClose: () => void;
}

const ModalHeader = ({ type, onClose }: ModalHeaderProps) => {
  return (
    <S.HeaderContainer>
      <S.ModalTitle>{MODAL_TITLE[type]}</S.ModalTitle>
      <button onClick={onClose}>
        <S.Img src={CloseIcon} alt="닫기" />
      </button>
    </S.HeaderContainer>
  );
};

const S = {
  HeaderContainer: styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    background-color: var(--white);
  `,
  ModalTitle: styled.p`
    color: var(--green05);
  `,
  Img: styled.img`
    width: 15px;
  `,
};

export default ModalHeader;
