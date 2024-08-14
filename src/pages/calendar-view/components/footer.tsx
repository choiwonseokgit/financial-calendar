import { format } from 'date-fns';
import styled from 'styled-components';

interface FooterProps {
  date: string;
}

function Footer({ date }: FooterProps) {
  const month = format(date, 'M');

  return (
    <S.Footer>
      <div>{month}월 목표 지출: 300000</div>
      <div>현재 지출: -155000</div>
      <div>남은 돈: 145000</div>
    </S.Footer>
  );
}

export default Footer;

const S = {
  Footer: styled.footer`
    background-color: var(--green02);
    height: 15dvh;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    color: var(--green04);
    gap: 5px;
    font-size: 15px;
  `,
};
