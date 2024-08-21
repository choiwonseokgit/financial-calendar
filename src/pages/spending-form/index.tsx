import { useEffect, useRef, useState } from 'react';
import checkIcon from '@assets/icons/check-solid.svg';
import chevronDownIcon from '@assets/icons/chevron-down-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import chevronUpIcon from '@assets/icons/chevron-up-solid.svg';
import ConfirmModal from '@components/modal/confirm-modal';
import Flicking from '@egjs/react-flicking';
import useConfirmModal from '@hooks/use-confirm-modal';
import { useAppSelector } from '@store/hooks';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Category from './components/category';
import { CATEGORYS, TCategory } from './constants';
import '@egjs/react-flicking/dist/flicking.css';

function SpendingForm() {
  const navigate = useNavigate();
  const [spentMoney, setSpentMoney] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );
  const [isFlicking, setIsFlicking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const [touchX, setTouchX] = useState(0);
  const {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    modalMessage,
    handleModalMessageChange,
  } = useConfirmModal();

  const moveBack = () => {
    navigate(-1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.changedTouches[0].pageX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest('.flicking-viewport')) return;

    const distanceX = e.changedTouches[0].pageX - touchX;
    if (distanceX > 50) moveBack();
  };

  const handleSubmit = () => {
    //TODO: 콤마 써서 데이터 보낼건지 정하기
    switch (true) {
      case !spentMoney:
        handleModalMessageChange('moneyInput');
        break;
      case !selectedCategory:
        handleModalMessageChange('category');
        break;
      default:
        moveBack();
        return;
    }

    handleModalOpen();
  };

  const handleFlickingToggle = () => {
    setIsFlicking(!isFlicking);
  };

  const handleCategoryClick = (idx: number) => {
    setSelectedCategory(CATEGORYS[idx]);
  };

  const handleInputValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const money = Number(value.replaceAll(',', ''));

    if (isNaN(money) || !money) {
      // 숫자가 아닐 경우 true를 반환
      setSpentMoney('');
    } else {
      // 숫자인 경우 false를 반환
      setSpentMoney(money.toLocaleString('ko-KR'));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  return (
    <>
      <S.Container
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          duration: 0.3,
          delay: 0,
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <S.Header>
          <button onClick={moveBack}>
            <S.ChevronImg src={chevronLeftIcon} alt="뒤로" />
          </button>
          <S.Date>{selectedDate}</S.Date>
          <button onClick={handleSubmit}>
            <S.CheckImg src={checkIcon} alt="전송" />
          </button>
        </S.Header>
        <S.InputBox>
          <S.Input
            type="text"
            inputMode="numeric"
            placeholder="0"
            ref={inputRef}
            value={spentMoney}
            onChange={handleInputValChange}
            onKeyDown={handleKeyDown}
          />
          <S.WonText>원</S.WonText>
        </S.InputBox>
        <S.CategoryBox>
          <S.TitleBox onClick={handleFlickingToggle}>
            <div>카테고리</div>
            <S.ChevronImg
              src={isFlicking ? chevronDownIcon : chevronUpIcon}
              alt="펼치기/축소"
            />
          </S.TitleBox>
          {isFlicking ? (
            <Flicking bound={true} inputType={['touch', 'mouse']}>
              {CATEGORYS.map((category, idx) => (
                <div key={idx} style={{ marginRight: '5px' }}>
                  <Category
                    name={category.name}
                    emoji={category.emoji}
                    isSelected={selectedCategory?.name === category.name}
                    onCategoryClick={() => {
                      handleCategoryClick(idx);
                    }}
                  />
                </div>
              ))}
            </Flicking>
          ) : (
            <S.FlexMode>
              {CATEGORYS.map((category, idx) => (
                <div key={idx}>
                  <Category
                    key={idx}
                    name={category.name}
                    emoji={category.emoji}
                    isSelected={selectedCategory?.name === category.name}
                    onCategoryClick={() => {
                      handleCategoryClick(idx);
                    }}
                  />
                </div>
              ))}
            </S.FlexMode>
          )}
        </S.CategoryBox>
        <S.EmptyNotice>금일 스케줄이 없어요!</S.EmptyNotice>
      </S.Container>
      {isModalOpen && (
        <ConfirmModal onClose={handleModalClose} modalMessage={modalMessage} />
      )}
    </>
  );
}

export default SpendingForm;

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
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  Header: styled.div`
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
  Date: styled.div`
    font-size: 20px;
    color: var(--gray02);
  `,
  InputBox: styled.div`
    display: flex;
    align-items: center;
  `,
  Input: styled.input`
    max-width: 90%;
    /* background-color: red; */
    text-align: right;
    font-size: 50px;
    flex-grow: 1;
    color: var(--green04);

    &::placeholder {
      color: var(--green04);
    }
  `,
  WonText: styled.span`
    font-size: 50px;
    color: var(--green05);
  `,
  CategoryBox: styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    color: var(--gray02);
    gap: 10px;
    border: 1px solid var(--green04);
    border-radius: 5px;
    overflow: hidden;
  `,
  TitleBox: styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  `,
  FlexMode: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  `,
  EmptyNotice: styled.div`
    border: 1px solid var(--green04);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray02);
    flex-grow: 1;
  `,
};
