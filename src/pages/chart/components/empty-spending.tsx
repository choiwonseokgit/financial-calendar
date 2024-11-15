import styled from 'styled-components';

function EmptySpending() {
  return (
    <S.Container>
      <S.Text>지출 내역이 없습니다!</S.Text>
    </S.Container>
  );
}

export default EmptySpending;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  Text: styled.span`
    color: var(--gray02);
  `,
};
