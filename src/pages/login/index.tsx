import KakaoIcon from '@assets/icons/kakao.svg';
import styled from 'styled-components';

function Login() {
  // const navigate = useNavigate();
  // const isLogin = useAppSelector((state) => state.login.userId);

  const handleLoginBtnClick = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=' +
      process.env.REACT_APP_KAKAO_LOGIN_CLIENT_ID +
      '&redirect_uri=' +
      // encodeURIComponent('http://localhost:4000/oauth/kakao') +
      // '&response_type=code';

      encodeURIComponent(
        'https://financial-calendar-server.onrender.com/oauth/kakao',
      ) +
      '&response_type=code';
  };

  return (
    <S.Container>
      <S.Title>💸financial-calendar📆</S.Title>
      <S.Description>목표를 설정하고 꾸준하게 기록해 보세요!</S.Description>
      <S.KakaoBtn onClick={handleLoginBtnClick}>
        <S.Img src={KakaoIcon} alt="카카오" />
        <S.Label>카카오로 시작하기</S.Label>
      </S.KakaoBtn>
    </S.Container>
  );
}

export default Login;

const S = {
  Container: styled.div`
    background-color: var(--green02);
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.div`
    font-family: 'New Amsterdam';
    color: var(--green04);
    font-size: 40px;
    margin-bottom: 10px;
  `,
  Description: styled.div`
    color: var(--green05);
    margin-bottom: 20px;
  `,
  KakaoBtn: styled.button`
    position: relative;
    display: flex;
    padding: 10px;
    width: 80%;
    border-radius: 10px;
    background-color: #fee500;
  `,
  Img: styled.img`
    width: 20px;
  `,
  Label: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
