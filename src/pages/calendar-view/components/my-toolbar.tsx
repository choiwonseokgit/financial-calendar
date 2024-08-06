import arrowLeft from '@assets/icons/chevron-left-solid-green.svg';
import arrowRight from '@assets/icons/chevron-right-solid-green.svg';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ToolbarProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyToolbar({ date, onNavigate, onView, view }: ToolbarProps) {
  //   console.log(date, view);
  //   const parsedDate = parse(label, 'M월 yyyy', new Date(), { locale: ko });

  const formatedDate = format(
    date,
    view === 'month' ? 'yyyy년 M월' : 'M월 d일 EEEE',
    {
      locale: ko,
    },
  );
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
          <S.Img src={arrowLeft} alt="이전" />
        </button>
        <S.Date>{formatedDate}</S.Date>
        <button onClick={handleNextBtnClick}>
          <S.Img src={arrowRight} alt="다음" />
        </button>
      </S.LeftBox>
      <S.CenterBox>
        <button onClick={() => onView('month')}>달</button>
        <button onClick={() => onView('day')}>일</button>
      </S.CenterBox>
      <S.RightBox>
        <button onClick={() => onNavigate('TODAY')}>오늘</button>
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
  Img: styled.img`
    width: 15px;
    height: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `,
  CenterBox: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  RightBox: styled.div``,
};
