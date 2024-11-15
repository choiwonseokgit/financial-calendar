import { useState } from 'react';
import BarIcon from '@assets/icons/bars-solid.svg';
import CalendarIcon from '@assets/icons/calendar-days-solid.svg';
import chartIcon from '@assets/icons/chart-pie-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import chevronRightIcon from '@assets/icons/chevron-right-solid-green.svg';
import DateSelectModal from '@components/modal/date-select-modal';
import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  changeChartDate,
  changeChartDateType,
} from '@store/slices/chart-slice';
import { select } from '@store/slices/selected-date-slice';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { View } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SpendingNotice from './components/spending-notice';

interface NavBarProps {
  date: string;
  view: View;
  onTodayChange: () => void;
  onMonthBtnClick: () => void;
  onArrowBtnClick: (direction: 'PREV' | 'NEXT', view: View) => void;
  onSideBarBtnClick: (isOpen: boolean) => void;
  onCalendarDatesInit: (newDate: string) => void;
}

function NavBar({
  date,
  view,
  onTodayChange,
  onMonthBtnClick,
  onArrowBtnClick,
  onSideBarBtnClick,
  onCalendarDatesInit,
}: NavBarProps) {
  const holidayTitle = useGetHolidayTitle(date);
  const dispatch = useAppDispatch();
  const [isDateSelectModalOpen, setIsDateSelectModalOpen] = useState(false);
  const { spendingMoney: isSpendingMoneyVisible } = useAppSelector(
    (state) => state.calendarOption,
  );
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const navigate = useNavigate();

  const formatedDate = format(
    date,
    view === 'month' ? 'yyyy년 M월' : 'M월 d일 EEEE',
    {
      locale: ko,
    },
  );

  const currDate = format(new Date(), 'yyyy/M/dd', {
    locale: ko,
  });

  const handleTodayBtnClick = () => {
    onTodayChange();
    dispatch(select(format(new Date(), 'yyyy/MM/dd')));
  };

  const handleChartImgBtnClick = () => {
    dispatch(changeTransitionDirection('left'));
    dispatch(changeChartDate(date));
    dispatch(changeChartDateType('MONTH'));
    navigate('/chart');
  };

  return (
    <S.Nav>
      {isDateSelectModalOpen && (
        <DateSelectModal
          onClose={() => setIsDateSelectModalOpen(false)}
          cb={{
            type: 'CALENDAR_VIEW',
            onCalendarDatesInit,
          }}
        />
      )}
      {isSpendingMoneyVisible ? (
        <button onClick={handleChartImgBtnClick}>
          <S.ChartImg src={chartIcon} alt="chart" />
        </button>
      ) : (
        <div />
      )}
      <S.DateBox>
        <button
          onClick={() => {
            onArrowBtnClick('PREV', view);
            //dispatch(prevDay());
          }}
        >
          <S.ChevronImg src={chevronLeftIcon} alt="이전" />
        </button>
        <S.DateBtn onClick={() => setIsDateSelectModalOpen(true)}>
          <div>{formatedDate}</div>
          {isSpendingMoneyVisible && <SpendingNotice date={date} />}
          <S.Holiday>{view === 'day' && holidayTitle}</S.Holiday>
        </S.DateBtn>
        <button
          onClick={() => {
            onArrowBtnClick('NEXT', view);
            //dispatch(nextDay());
          }}
        >
          <S.ChevronImg src={chevronRightIcon} alt="다음" />
        </button>
      </S.DateBox>
      {view === 'day' && (
        <S.MonthBtn onClick={onMonthBtnClick}>
          <S.Calendarimg src={CalendarIcon} alt="달력" />
        </S.MonthBtn>
      )}
      <S.RightBox>
        {selectedDate !== currDate && (
          <S.TodayBtn onClick={handleTodayBtnClick}>오늘</S.TodayBtn>
        )}
        <button onClick={() => onSideBarBtnClick(true)}>
          <S.BarImg src={BarIcon} alt="메뉴바" />
        </button>
      </S.RightBox>
    </S.Nav>
  );
}

export default NavBar;

const S = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 12dvh;
    /* max-height: 100px; */
    background-color: var(--green02);
    color: var(--green04);
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
  `,
  ChartImg: styled.img`
    width: 20px;
    height: 20px;
  `,
  DateBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:hover img {
      opacity: 1;
    }
    display: flex;
    justify-content: center;
    gap: 5px;
  `,
  DateBtn: styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  `,
  TodayBtn: styled.button`
    left: 60%;
    width: 30px;
    height: 30px;
    border-radius: 20%;
    border: 1px solid var(--green04);
  `,
  MonthBtn: styled.button`
    position: absolute;
    left: calc(60% + 40px);
  `,
  Calendarimg: styled.img`
    width: 20px;
  `,
  Holiday: styled.div`
    position: absolute;
    color: red;
    font-size: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 40%);
  `,
  ChevronImg: styled.img`
    width: 15px;
    height: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `,
  CenterBox: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  RightBox: styled.div`
    gap: 20px;
    display: flex;
    align-items: center;
  `,
  BarImg: styled.img`
    width: 20px;
  `,
};
