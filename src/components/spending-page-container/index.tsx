import { PropsWithChildren, useState } from 'react';
import checkIcon from '@assets/icons/check-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import trashIcon from '@assets/icons/trash-solid.svg';
import ConfirmModal from '@components/modal/confirm-modal';
import useConfirmModal from '@hooks/use-confirm-modal';
import usePageTransition from '@hooks/use-page-transition';
import { useAppDispatch } from '@store/hooks';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SpendingFormProps extends PropsWithChildren {
  type: 'SpendingForm';
  date: string;
  onDateClick: () => void;
  onSubmit: () => void;
  isEdit: boolean;
  onDelete?: () => void;
}

interface SpendingDetailProps extends PropsWithChildren {
  type: 'SpendingDetail';
  date: string;
}

type SpendingPageContainerProps = SpendingFormProps | SpendingDetailProps;

function SpendingPageContainer(props: SpendingPageContainerProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSpendingFormType = props.type === 'SpendingForm';
  const [touchX, setTouchX] = useState(0);

  const moveBack = () => {
    dispatch(changeTransitionDirection('prev'));
    navigate(-1);
  };
  const pageTransition = usePageTransition();

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.changedTouches[0].pageX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('.flicking-viewport')) return;

    const distanceX = e.changedTouches[0].pageX - touchX;
    if (distanceX > 50) moveBack();
  };

  const { isModalOpen, handleModalOpen, handleModalClose } = useConfirmModal();

  const handleSubmit = () => {
    if (props.type === 'SpendingForm' && props.onDelete) {
      props.onDelete();
      moveBack();
    }
  };

  return (
    <>
      <S.Container
        {...pageTransition}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <S.Header>
          <button onClick={moveBack}>
            <S.ChevronImg src={chevronLeftIcon} alt="뒤로" />
          </button>
          <S.DateBtn
            $type={props.type}
            $isEdit={props.type === 'SpendingForm' && props.isEdit}
            onClick={
              isSpendingFormType && !props.isEdit
                ? props.onDateClick
                : undefined
            }
          >
            <S.Date>{props.date}</S.Date>
          </S.DateBtn>
          <S.SubmitBtnBox>
            {isSpendingFormType && (
              <button onClick={props.onSubmit}>
                <S.BtnImg src={checkIcon} alt="전송" />
              </button>
            )}
            {isSpendingFormType && props.isEdit && (
              <button onClick={handleModalOpen}>
                <S.BtnImg src={trashIcon} alt="삭제" />
              </button>
            )}
          </S.SubmitBtnBox>
        </S.Header>
        {props.children}
      </S.Container>
      {isModalOpen && (
        <ConfirmModal
          onClose={handleModalClose}
          modalMessageType={'delete'}
          isSubmit={true}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default SpendingPageContainer;

const S = {
  Container: styled(motion.div)`
    height: 100dvh;
    padding: 10px;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 10px;
    top: 0;
    right: 0;
    overflow-y: hidden;

    /* Chrome, Safari, Edge, Opera */
    /* input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      } */

    /* Firefox  */
    /* input[type='number'] {
        -moz-appearance: textfield;
      } */
  `,
  Header: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ChevronImg: styled.img`
    width: 15px;
  `,
  SubmitBtnBox: styled.div`
    display: flex;
    gap: 10px;
  `,
  BtnImg: styled.img`
    width: 20px;
  `,
  DateBtn: styled.button<{
    $type: 'SpendingForm' | 'SpendingDetail';
    $isEdit: boolean;
  }>`
    ${({ $isEdit }) =>
      $isEdit &&
      `
     position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: default
  `}
    ${({ $type, $isEdit }) =>
      $type === 'SpendingDetail' || $isEdit
        ? `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: default;
          pointer-events: none;
        `
        : ''}
  `,
  Date: styled.div`
    font-size: 20px;
    color: var(--gray02);
  `,
};
