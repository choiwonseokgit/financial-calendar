import { useRef, useState } from 'react';
import plusIcon from '@assets/icons/plus-solid.svg';
import SetTargetMonthSpendingModal from '@components/modal/set-target-month-spending-modal';
import { TSetTargetSpendingModal } from '@constants/modal';
import useOutSideClick from '@hooks/use-outside-click';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetSpendingMoneyQuery } from '@store/query/calendar-query';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import parseIntAndMakeLocaleKR from '@utils/parse-Int-and-make-locale-kr';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface FooterProps {
  date: string;
}

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '50%' },
};

function Footer({ date }: FooterProps) {
  const { data: spendingMoneyEvents } = useGetSpendingMoneyQuery({
    year: format(date, 'yyyy'),
    month: format(date, 'MM'),
  });
  const dispatch = useAppDispatch();
  const month = format(date, 'M');
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSetTargetSpendingModalOpen, setIsSetTargetSpendingModalOpen] =
    useState(false);
  const [modalType, setModalType] =
    useState<TSetTargetSpendingModal>('setTargetSpending');

  const handleNavigate = (page: 'schedule-form' | 'spending-form') => {
    dispatch(changeTransitionDirection('right'));
    navigate(`/${page}`);
  };

  const targetMonthSpending =
    spendingMoneyEvents?.targetMonthSpending?.targetMoney;
  const currSpending = spendingMoneyEvents?.total.toLocaleString('ko-KR');
  const remainSpending = (
    parseInt(spendingMoneyEvents?.targetMonthSpending?.targetMoney as string) -
    (spendingMoneyEvents?.total as number)
  ).toLocaleString('ko-KR');

  useOutSideClick(ref, () => setIsOpen(false));

  const { spendingMoney: isSpendingMoneyVisible } = useAppSelector(
    (state) => state.calendarOption,
  );

  if (!isSpendingMoneyVisible) return null;

  return (
    <>
      <S.Footer>
        <S.Container>
          <S.Notice>
            <div>
              {month}월 목표 지출:{' '}
              {targetMonthSpending ? (
                <S.MoneyTag $color={'var(--green05)'}>
                  {parseInt(targetMonthSpending as string).toLocaleString(
                    'ko-KR',
                  )}
                  원
                </S.MoneyTag>
              ) : (
                <S.SetTargetSpendBtn
                  onClick={() => {
                    setModalType('setTargetSpending');
                    setIsSetTargetSpendingModalOpen(true);
                  }}
                >
                  📝목표 지출 설정
                </S.SetTargetSpendBtn>
              )}
            </div>
            <div>
              현재 지출:{' '}
              <S.MoneyTag $color={'red'}>{currSpending}원</S.MoneyTag>
            </div>
            {targetMonthSpending && (
              <div>
                남은 여유 금액:{' '}
                <S.MoneyTag $color={'blue'}>{remainSpending}원</S.MoneyTag>
              </div>
            )}
            {targetMonthSpending && (
              <S.EditDeleteBtnBox>
                <S.SetTargetSpendBtn
                  onClick={() => {
                    setModalType('editTargetSpending');
                    setIsSetTargetSpendingModalOpen(true);
                  }}
                >
                  ✏️목표 수정
                </S.SetTargetSpendBtn>
                <S.SetTargetSpendBtn
                  onClick={() => {
                    setModalType('deleteTargetSpending');
                    setIsSetTargetSpendingModalOpen(true);
                  }}
                >
                  ❌목표 삭제
                </S.SetTargetSpendBtn>
              </S.EditDeleteBtnBox>
            )}
          </S.Notice>

          <div ref={ref} style={{ position: 'relative' }}>
            <S.PlusBtn onClick={() => handleNavigate('spending-form')}>
              <S.PlusImg src={plusIcon} alt="추가" />
            </S.PlusBtn>
            {/* 스케줄 작성 폼 보류 */}
            <S.BtnsBox
              animate={isOpen ? 'open' : 'closed'}
              variants={variants}
              $isOpen={isOpen}
            >
              <S.PlusBtn onClick={() => handleNavigate('schedule-form')}>
                스케줄
              </S.PlusBtn>
              <S.PlusBtn onClick={() => handleNavigate('spending-form')}>
                가계부
              </S.PlusBtn>
            </S.BtnsBox>
          </div>
        </S.Container>
      </S.Footer>
      {isSetTargetSpendingModalOpen && (
        <SetTargetMonthSpendingModal
          date={date}
          onClose={() => setIsSetTargetSpendingModalOpen(false)}
          type={modalType}
          targetMonthSpending={parseIntAndMakeLocaleKR(
            targetMonthSpending as string,
          )}
        />
      )}
    </>
  );
}

export default Footer;

const S = {
  Footer: styled.footer`
    background-color: white;
  `,
  Container: styled.div`
    height: 15dvh;
    background-color: var(--green02);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: var(--green04);
    font-size: 15px;
  `,
  Notice: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: var(--green04);
    position: relative;
  `,
  MoneyTag: styled.span<{ $color: string }>`
    color: ${({ $color }) => $color};
  `,
  EditDeleteBtnBox: styled.div`
    display: flex;
    gap: 5px;
    position: absolute;
    top: -3.5px;
    right: 0;
  `,
  SetTargetSpendBtn: styled.button`
    padding: 3px;
    border: 1px solid var(--green04);
    border-radius: 5px;
  `,
  PlusBtn: styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--green04);
    border-radius: 50%;
    font-weight: bold;
  `,
  PlusImg: styled.img`
    width: 20px;
    height: 20px;
  `,
  BtnsBox: styled(motion.div)<{ $isOpen: boolean }>`
    position: absolute;
    top: calc(-200% - 6px);
    right: 0;
    display: flex;
    gap: 3px;
    flex-direction: column;
    z-index: 150;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  `,
};
