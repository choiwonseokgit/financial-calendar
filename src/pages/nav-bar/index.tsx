import BarIcon from '@assets/icons/bars-solid.svg';
import CalendarIcon from '@assets/icons/calendar-regular.svg';
import arrowLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import arrowRightIcon from '@assets/icons/chevron-right-solid-green.svg';
import useGetHolidayTitle from '@hooks/useGetHolidayTitle';
import { init, today } from '@store/datesSlice';
import { useAppSelector } from '@store/hooks';
import { changeView } from '@store/viewSlice';
import { addDays, addMonths, format, formatISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

enum TArrowBtn {
  prev = -1,
  next = 1,
}

function NavBar() {
  const { dates, view } = useAppSelector((state) => ({
    dates: state.dates,
    view: state.view,
  }));
  const dispatch = useDispatch();

  const holidayTitle = useGetHolidayTitle(dates[1]);

  const formatedDate = format(
    dates[1],
    view === 'month' ? 'yyyy년 M월' : 'M월 d일 EEEE',
    {
      locale: ko,
    },
  );

  const currDate = format(new Date(), 'M월 d일 EEEE', {
    locale: ko,
  });

  const handleArrowBtnClick = (type: TArrowBtn) => {
    const changeDate = view === 'day' ? addDays : addMonths;
    const newDate = formatISO(changeDate(dates[1], type));
    dispatch(init({ date: newDate, view }));
  };

  const handleTodayBtnClick = () => {
    dispatch(today());
  };

  const handleMonthBtnClick = () => {
    dispatch(changeView('month'));
    dispatch(init({ date: dates[1], view: 'month' }));
  };

  return (
    <S.Nav>
      <S.LeftBox>
        <button onClick={() => handleArrowBtnClick(TArrowBtn.prev)}>
          <S.ArrowImg src={arrowLeftIcon} alt="이전" />
        </button>
        <S.Date>
          <div>{formatedDate}</div>
          <S.Holiday>{view === 'day' && holidayTitle}</S.Holiday>
        </S.Date>
        <button onClick={() => handleArrowBtnClick(TArrowBtn.next)}>
          <S.ArrowImg src={arrowRightIcon} alt="다음" />
        </button>
        {formatedDate !== currDate && (
          <S.TodayBtn onClick={handleTodayBtnClick}>오늘</S.TodayBtn>
        )}
        {view === 'day' && (
          <button onClick={handleMonthBtnClick}>
            <S.Calendarimg src={CalendarIcon} alt="달력" />
          </button>
        )}
      </S.LeftBox>
      <S.RightBox>
        <button>
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
    height: 15%;
    /* background-color: #dbede8; */
    background-color: var(--green02);
    color: var(--green04);
    /* background-color: #318c74; */
    /* color: white; */
  `,
  LeftBox: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover img {
      opacity: 1;
    }
  `,
  Date: styled.div`
    position: relative;
    font-size: 25px;
    font-weight: bold;
  `,
  Holiday: styled.div`
    position: absolute;
    color: red;
    font-size: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
  `,
  ArrowImg: styled.img`
    width: 15px;
    height: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `,
  Calendarimg: styled.img`
    width: 20px;
  `,
  CenterBox: styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
  `,
  TodayBtn: styled.button`
    width: 30px;
    height: 30px;
    border-radius: 20%;
    border: 1px solid var(--green04);
  `,
  RightBox: styled.div`
    display: flex;
    align-items: center;
  `,
  BarImg: styled.img`
    width: 20px;
    margin-right: 15px;
  `,
};
