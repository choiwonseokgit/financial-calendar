import { PropsWithChildren, useState } from 'react';
import checkIcon from '@assets/icons/check-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
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

  return (
    <S.Container
      // initial={
      //   props.type === 'SpendingForm' && props.isEdit
      //     ? undefined
      //     : { x: '100%' }
      // }
      // animate={
      //   props.type === 'SpendingForm' && props.isEdit ? undefined : { x: 0 }
      // }
      // exit={
      //   props.type === 'SpendingForm' && props.isEdit
      //     ? undefined
      //     : { x: '100%' }
      // }
      // transition={{
      //   duration: 0.3,
      //   delay: 0,
      // }}
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
          onClick={isSpendingFormType ? props.onDateClick : undefined}
        >
          <S.Date>{props.date}</S.Date>
        </S.DateBtn>
        {isSpendingFormType && (
          <button onClick={props.onSubmit}>
            <S.CheckImg src={checkIcon} alt="전송" />
          </button>
        )}
      </S.Header>
      {props.children}
    </S.Container>
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
  CheckImg: styled.img`
    width: 20px;
  `,
  DateBtn: styled.button<{ $type: 'SpendingForm' | 'SpendingDetail' }>`
    ${({ $type }) =>
      $type === 'SpendingDetail' &&
      `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: default
  `}
  `,
  Date: styled.div`
    font-size: 20px;
    color: var(--gray02);
  `,
};
