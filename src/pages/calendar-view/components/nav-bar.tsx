import BarIcon from '@assets/icons/bars-solid.svg';
import CalendarIcon from '@assets/icons/calendar-regular.svg';
import arrowLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import arrowRightIcon from '@assets/icons/chevron-right-solid-green.svg';
import useGetHolidayTitle from '@hooks/useGetHolidayTitle';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { View } from 'react-big-calendar';
import styled from 'styled-components';

interface NavBarProps {
  date: string;
  view: View;
  onTodayBtnClick: () => void;
  onMonthBtnClick: () => void;
  onArrowBtnClick: (direction: 'PREV' | 'NEXT', view: View) => void;
  onSideBarBtnClick: (isOpen: boolean) => void;
}

function NavBar({
  date,
  view,
  onTodayBtnClick: onClickTodayBtn,
  onMonthBtnClick: onClickMonthBtn,
  onArrowBtnClick,
  onSideBarBtnClick,
}: NavBarProps) {
  const holidayTitle = useGetHolidayTitle(date);

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

  return (
    <S.Nav>
      <S.LeftBox>
        <S.DateBox>
          <button onClick={() => onArrowBtnClick('PREV', view)}>
            <S.ArrowImg src={arrowLeftIcon} alt="이전" />
          </button>
          <S.Date>
            <div>{formatedDate}</div>
            <S.Holiday>{view === 'day' && holidayTitle}</S.Holiday>
          </S.Date>
          <button onClick={() => onArrowBtnClick('NEXT', view)}>
            <S.ArrowImg src={arrowRightIcon} alt="다음" />
          </button>
        </S.DateBox>
        {formatedDate !== currDate && (
          <S.TodayBtn onClick={onClickTodayBtn}>오늘</S.TodayBtn>
        )}
        {view === 'day' && (
          <S.MonthBtn onClick={onClickMonthBtn}>
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
  ArrowImg: styled.img`
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
