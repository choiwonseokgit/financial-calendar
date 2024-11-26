import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function NotFound() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Text>404 not found</S.Text>
      <S.Button onClick={() => navigate(-1)}>뒤로 가기</S.Button>
    </S.Container>
  );
}

export default NotFound;

const S = {
  Container: styled.div`
    background-color: var(--white);
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  `,
  Text: styled.div`
    font-weight: 700;
    color: var(--green04);
    font-size: 30px;
  `,
  Button: styled.button`
    width: 100px;
    height: 30px;
    border: 1px solid var(--green04);
    border-radius: 20px;
  `,
};
