import { useState } from 'react';
import BarIcon from '@assets/icons/bars-solid.svg';
import CalendarIcon from '@assets/icons/calendar-days-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import chevronRightIcon from '@assets/icons/chevron-right-solid-green.svg';
import DateSelectModal from '@components/modal/date-select-modal';
import useGetHolidayTitle from '@hooks/use-get-holiday-title';
import { useAppDispatch } from '@store/hooks';
import { select } from '@store/selected-date-slice';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { View } from 'react-big-calendar';
import styled from 'styled-components';

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

  const formatedDate = format(
    date,
    view === 'month' ? 'yyyy년 M월' : 'M월 d일 EEEE',
    {
      locale: ko,
    },
  );

  const currDate = format(new Date(), 'M월 d일 EEEE', {
    locale: ko,
  });

  const handleTodayBtnClick = () => {
    onTodayChange();
    dispatch(select(format(new Date(), 'yyyy/MM/dd')));
  };

  //TODO: 모달로 날짜 확인 하면 onInit으로 바꿔주기~~~

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
      <S.LeftBox>
        <S.DateBox>
          <button
            onClick={() => {
              onArrowBtnClick('PREV', view);
              //dispatch(prevDay());
            }}
          >
            <S.ChevronImg src={chevronLeftIcon} alt="이전" />
          </button>
          <S.Date>
            <div onClick={() => setIsDateSelectModalOpen(true)}>
              {formatedDate}
            </div>
            <S.Holiday>{view === 'day' && holidayTitle}</S.Holiday>
          </S.Date>
          <button
            onClick={() => {
              onArrowBtnClick('NEXT', view);
              //dispatch(nextDay());
            }}
          >
            <S.ChevronImg src={chevronRightIcon} alt="다음" />
          </button>
        </S.DateBox>
        {formatedDate !== currDate && (
          <S.TodayBtn onClick={handleTodayBtnClick}>오늘</S.TodayBtn>
        )}
        {view === 'day' && (
          <S.MonthBtn onClick={onMonthBtnClick}>
            <S.Calendarimg src={CalendarIcon} alt="달력" />
          </S.MonthBtn>
        )}
      </S.LeftBox>
      <S.RightBox>
        <button onClick={() => onSideBarBtnClick(true)}>
          <S.BarImg src={BarIcon} alt="메뉴바" />
        </button>
      </S.RightBox>
      <S.Notice>이번 달은 양호 합니다!😀</S.Notice>
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
    max-height: 100px;
    /* background-color: #dbede8; */
    background-color: var(--green02);
    color: var(--green04);
    position: relative;
    /* background-color: #318c74; */
    /* color: white; */
  `,
  LeftBox: styled.div`
    flex-grow: 1;
    display: flex;
    position: relative;
    align-items: center;
    &:hover img {
      opacity: 1;
    }
    /* background-color: red; */
  `,
  DateBox: styled.div`
    display: flex;
    gap: 5px;
  `,
  Date: styled.div`
    position: relative;
    font-size: 25px;
    font-weight: bold;
    cursor: pointer;
  `,
  TodayBtn: styled.button`
    position: absolute;
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
    display: flex;
    align-items: center;
  `,
  BarImg: styled.img`
    width: 20px;
    margin-right: 15px;
  `,
  Notice: styled.span`
    position: absolute;
    left: 15px;
    bottom: 5px;
    font-size: 15px;
  `,
};
