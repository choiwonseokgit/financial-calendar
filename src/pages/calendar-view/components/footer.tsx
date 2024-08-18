import plusIcon from '@assets/icons/plus-solid.svg';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface FooterProps {
  date: string;
}

function Footer({ date }: FooterProps) {
  const month = format(date, 'M');
  const navigate = useNavigate();

  const moveSpendingForm = () => {
    navigate('/spending-form');
  };

  return (
    <S.Footer>
      <S.Container>
        <S.Notice>
          <div>{month}월 목표 지출: 300000</div>
          <div>현재 지출: -155000</div>
          <div>남은 돈: 145000</div>
        </S.Notice>
        <S.PlusBtn onClick={moveSpendingForm}>
          <S.PlusImg src={plusIcon} alt="추가" />
        </S.PlusBtn>
      </S.Container>
    </S.Footer>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: var(--green04);
  `,
  PlusBtn: styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--green04);
    border-radius: 50%;
  `,
  PlusImg: styled.img`
    width: 20px;
    height: 20px;
  `,
};
