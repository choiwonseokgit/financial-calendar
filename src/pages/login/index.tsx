import styled from 'styled-components';

import LogoIcon from '@assets/icons/financial-calendar-small-logo.svg';
import KakaoIcon from '@assets/icons/kakao.svg';
import { SERVER_URL } from '@constants/url';

function Login() {
  const handleLoginBtnClick = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=' +
      process.env.REACT_APP_KAKAO_LOGIN_CLIENT_ID +
      '&redirect_uri=' +
      encodeURIComponent(`${SERVER_URL}/oauth/kakao`) +
      '&response_type=code';
  };

  return (
    <S.Container>
      <S.TitleBox>
        <S.Logo src={LogoIcon} alt="logo" />
        <S.Title>financial-calendar</S.Title>
      </S.TitleBox>
      <S.Description>
        💸목표금액을 설정하고 꾸준하게 기록해 보세요!📆
      </S.Description>
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
  TitleBox: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `,
  Logo: styled.img`
    width: 50px;
  `,
  Title: styled.div`
    font-family: 'New Amsterdam';
    color: var(--green04);
    font-size: 40px;
  `,
  Description: styled.div`
    font-family: 'Pretendard-login';
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
    height: 18.45px;
  `,
  Label: styled.div`
    font-family: 'Pretendard-login';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
