import { useReducer, useRef, useState } from 'react';
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

type SpentMoney = {
  type: 'SPENT_MONEY';
  spentMoney: string;
};

type Category = {
  type: 'CATEGORY';
  category: TCategory | null;
};

type Memo = {
  type: 'MEMO';
  memo: string;
};

type SpendingAction = SpentMoney | Category | Memo;

interface TSpending {
  spentMoney: string;
  category: TCategory | null;
  memo?: string;
}

const reducer = (spending: TSpending, action: SpendingAction) => {
  switch (action.type) {
    case 'SPENT_MONEY':
      return { ...spending, spentMoney: action.spentMoney };
    case 'CATEGORY':
      return { ...spending, category: action.category };
    case 'MEMO':
      return { ...spending, memo: action.memo };
    default:
      return spending;
  }
};

function SpendingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    date: prevDate,
    category: prevCategory,
    spentMoney: prevSpentMoney,
    memo: prevMemo,
  }: TSpendingMoney = location.state ?? {};
  const queryParams = new URLSearchParams(location.search);
  const isEditPage = queryParams.get('type') === 'edit';
  const [spending, spendingDispatch] = useReducer(reducer, {
    spentMoney: isEditPage ? parseIntAndMakeLocaleKR(prevSpentMoney) : '',
    category: isEditPage
      ? ({
          name: prevCategory.split(' ')[1],
          emoji: prevCategory.split(' ')[0],
        } as TCategory)
      : null,
    memo: isEditPage ? prevMemo : '',
  });
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
    const { spentMoney, category, memo } = spending;

    switch (true) {
      case !spentMoney:
        handleModalMessageChange('moneyInput');
        break;
      case !category:
        handleModalMessageChange('category');
        break;
      default: //전송
        await postSpendingMoney({
          spentMoney: spentMoney.replaceAll(',', ''),
          category: `${(category as TCategory).emoji} ${(category as TCategory).name}`,
          date: formatISO(parse(selectedDate, 'yyyy/MM/dd', new Date())),
          memo,
        });
        moveBack();
        return;
    }

    handleModalOpen();
  };

  const handleEdit = async () => {
    const { spentMoney, category, memo: newMemo } = spending;

    const newSpentMoney = spentMoney.replaceAll(',', '');
    const newCategory = `${(category as TCategory).emoji} ${(category as TCategory).name}`;

    if (
      newSpentMoney !== prevSpentMoney ||
      newCategory !== prevCategory ||
      newMemo !== prevMemo
    )
      await updateSpendingMoney({
        id,
        spentMoney: newSpentMoney,
        category: newCategory,
        memo: newMemo,
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
    spendingDispatch({ type: 'CATEGORY', category: CATEGORYS[idx] });
  };

  const handleSpentMoneyChange = (money: string) => {
    spendingDispatch({ type: 'SPENT_MONEY', spentMoney: money });
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
          money={spending.spentMoney}
          onMoneyChange={handleSpentMoneyChange}
          onSubmit={isEditPage ? handleEdit : handleSubmit}
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
                    isSelected={spending.category?.name === category.name}
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
                    isSelected={spending.category?.name === category.name}
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
        <S.MemoBox>
          <S.TextArea
            placeholder="메모"
            value={spending.memo}
            onChange={(e) =>
              spendingDispatch({ type: 'MEMO', memo: e.target.value })
            }
          ></S.TextArea>
        </S.MemoBox>
        {/* <S.EmptyNotice>
          <div>금일 스케줄이 없어요!</div>
          <button>스케줄 생성하기</button>
        </S.EmptyNotice> */}
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
  MemoBox: styled.div`
    display: flex;
    gap: 15px;
    border: 1px solid var(--green04);
    padding: 5px;
    border: 1px solid var(--green04);
    border-radius: 5px;
  `,
  MemoImg: styled.img`
    width: 25px;
    height: 25px;
  `,
  TextArea: styled.textarea`
    width: 100%;
    height: 80px;
    font-size: 16px;
    border: none; /* 테두리 없애기 */
    resize: none; /* 크기 조절 기능 없애기 */
    outline: none; /* 포커스 시 생기는 외곽선 없애기 */

    &::placeholder {
      color: var(--gray02);
      font-size: 15px;
    }
  `,
};
