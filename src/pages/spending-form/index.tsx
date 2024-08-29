import { useRef, useState } from 'react';
import chevronDownIcon from '@assets/icons/chevron-down-solid.svg';
import chevronUpIcon from '@assets/icons/chevron-up-solid.svg';
import ConfirmModal from '@components/modal/confirm-modal';
import DateSelectModal from '@components/modal/date-select-modal';
import MoneyInput from '@components/money-input';
import SpendingPageContainer from '@components/spending-page-container';
import Flicking from '@egjs/react-flicking';
import useConfirmModal from '@hooks/use-confirm-modal';
import { useAppSelector } from '@store/hooks';
import { usePostSpendingMoneyMutation } from '@store/query/spending-money-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Category from './components/category';
import '@egjs/react-flicking/dist/flicking.css';
import { formatISO, parse } from 'date-fns';
import { CATEGORYS, TCategory } from './constants/index';

function SpendingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevSpending = location.state ?? {};
  console.log(prevSpending);
  const queryParams = new URLSearchParams(location.search);
  const isEditPage = queryParams.get('type') === 'edit';
  console.log(isEditPage);
  const [spentMoney, setSpentMoney] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const [isFlicking, setIsFlicking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    modalMessageType,
    handleModalMessageChange,
  } = useConfirmModal();
  const [isDateSelectModalOpen, setIsDateSelectModalOpen] = useState(false);
  const [postSpendingMoney] = usePostSpendingMoneyMutation();

  const moveBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    switch (true) {
      case !spentMoney:
        handleModalMessageChange('moneyInput');
        break;
      case !selectedCategory:
        handleModalMessageChange('category');
        break;
      default: //전송
        await postSpendingMoney({
          spentMoney: spentMoney.replaceAll(',', ''),
          category: `${(selectedCategory as TCategory).emoji} ${(selectedCategory as TCategory).name}`,
          date: formatISO(parse(selectedDate, 'yyyy/MM/dd', new Date())),
        });
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

  const handleSpentMoneyChange = (money: string) => {
    setSpentMoney(money);
  };

  return (
    <>
      <SpendingPageContainer
        type="SpendingForm"
        date={selectedDate}
        onDateClick={() => setIsDateSelectModalOpen(true)}
        onSubmit={handleSubmit}
        isEdit={isEditPage}
      >
        <MoneyInput
          ref={inputRef}
          money={spentMoney}
          onMoneyChange={handleSpentMoneyChange}
          onSubmit={handleSubmit}
          size="big"
        />
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
                    isSelected={selectedCategory?.name === category.name}
                    onCategoryClick={() => {
                      handleCategoryClick(idx);
                    }}
                    {...category}
                  />
                </div>
              ))}
            </Flicking>
          ) : (
            <S.FlexMode>
              {CATEGORYS.map((category, idx) => (
                <div key={idx}>
                  <Category
                    isSelected={selectedCategory?.name === category.name}
                    onCategoryClick={() => {
                      handleCategoryClick(idx);
                    }}
                    {...category}
                  />
                </div>
              ))}
            </S.FlexMode>
          )}
        </S.CategoryBox>
        <S.EmptyNotice>
          <div>금일 스케줄이 없어요!</div>
          <button>스케줄 생성하기</button>
        </S.EmptyNotice>
      </SpendingPageContainer>
      {isModalOpen && (
        <ConfirmModal
          onClose={handleModalClose}
          modalMessageType={modalMessageType}
        />
      )}
      {isDateSelectModalOpen && (
        <DateSelectModal onClose={() => setIsDateSelectModalOpen(false)} />
      )}
    </>
  );
}

export default SpendingForm;

const S = {
  ChevronImg: styled.img`
    width: 15px;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--gray02);
    flex-grow: 1;
  `,
};
