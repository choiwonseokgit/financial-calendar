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
import {
  TSpendingMoney,
  useDeleteSpendingMoneyMutation,
  usePostSpendingMoneyMutation,
  useUpdateSpendingMoneyMutation,
} from '@store/query/calendar-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Category from './components/category';
import '@egjs/react-flicking/dist/flicking.css';
import { format, formatISO, parse, parseISO } from 'date-fns';
import { CATEGORYS, TCategory } from './constants/index';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';

function SpendingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    date: prevDate,
    category: prevCategory,
    spentMoney: prevSpentMoney,
  }: TSpendingMoney = location.state ?? {};
  const queryParams = new URLSearchParams(location.search);
  const isEditPage = queryParams.get('type') === 'edit';
  const [spentMoney, setSpentMoney] = useState(
    isEditPage ? parseIntAndMakeLocaleKR(prevSpentMoney) : '',
  );
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    isEditPage
      ? ({
          name: prevCategory.split(' ')[1],
          emoji: prevCategory.split(' ')[0],
        } as TCategory)
      : null,
  );
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const [isFlicking, setIsFlicking] = useState(!isEditPage);
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
  const [updateSpendingMoney] = useUpdateSpendingMoneyMutation();
  const [deleteSpendingMoney] = useDeleteSpendingMoneyMutation();

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

  const handleEdit = async () => {
    const newSpentMoney = spentMoney.replaceAll(',', '');
    const newCategory = `${(selectedCategory as TCategory).emoji} ${(selectedCategory as TCategory).name}`;

    if (newSpentMoney !== prevSpentMoney || newCategory !== prevCategory)
      await updateSpendingMoney({
        id,
        spentMoney: newSpentMoney,
        category: newCategory,
      });
    moveBack();
  };

  const handleDelete = () => {
    deleteSpendingMoney({ date: prevDate, id });
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
        date={
          isEditPage ? format(parseISO(prevDate), 'yyyy/MM/dd') : selectedDate
        }
        onDateClick={() => setIsDateSelectModalOpen(true)}
        onSubmit={isEditPage ? handleEdit : handleSubmit}
        isEdit={isEditPage}
        onDelete={handleDelete}
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
