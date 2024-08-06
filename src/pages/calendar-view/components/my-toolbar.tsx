import BarIcon from '@assets/icons/bars-solid.svg';
import CalendarIcon from '@assets/icons/calendar-regular.svg';
import arrowLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import arrowRightIcon from '@assets/icons/chevron-right-solid-green.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyToolbar({ date, onNavigate, onView, view }: ToolbarProps) {
  // return <></>;

  //   console.log(date, view);
  //   const parsedDate = parse(label, 'M월 yyyy', new Date(), { locale: ko });

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
  //console.log(label, parsedDate, formatedDate);

  const handlePrevBtnClick = () => {
    onNavigate('PREV');
  };

  const handleNextBtnClick = () => {
    onNavigate('NEXT');
  };

  return (
    <S.Container>
      <S.LeftBox>
        <button onClick={handlePrevBtnClick}>
          <S.ArrowImg src={arrowLeftIcon} alt="이전" />
        </button>
        <S.Date>{formatedDate}</S.Date>
        <button onClick={handleNextBtnClick}>
          <S.ArrowImg src={arrowRightIcon} alt="다음" />
        </button>
        {formatedDate !== currDate && (
          <S.TodayBtn onClick={() => onNavigate('TODAY')}>오늘</S.TodayBtn>
        )}
        {view === 'day' && (
          <button onClick={() => onView('month')}>
            <S.Calendarimg src={CalendarIcon} alt="달력" />
          </button>
        )}
      </S.LeftBox>
      <S.RightBox>
        <button>
          <S.BarImg src={BarIcon} alt="메뉴바" />
        </button>
      </S.RightBox>
    </S.Container>
  );
}

export default MyToolbar;

const S = {
  Container: styled.div`
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
      opacity: 1; /* Show the image on hover */
    }
  `,
  Date: styled.div`
    font-size: 25px;
    font-weight: bold;
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
