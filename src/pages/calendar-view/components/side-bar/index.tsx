import { useRef } from 'react';
import CloseIcon from '@assets/icons/xmark-solid.svg';
import { SERVER_URL } from '@constants/url';
import useOutsideClickForAnimation from '@hooks/use-outside-click-for-animation';
import { CALENDAR_CHECK_LIST } from '@pages/calendar-view/constants';
import { useAppDispatch } from '@store/hooks';
import { useGetUserQuery } from '@store/query/user-query';
import { logout } from '@store/slices/login-check-slice';
import styled, { keyframes } from 'styled-components';
import CheckList from './components/check-list';

interface SideBarProps {
  onSideBarBtnClick: (isOpen: boolean) => void;
}

function SideBar({ onSideBarBtnClick }: SideBarProps) {
  const { data: user } = useGetUserQuery();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { isCloseAnimStart, handleCloseAnimStart } =
    useOutsideClickForAnimation(ref, () => onSideBarBtnClick(false), 300);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href =
      'https://kauth.kakao.com/oauth/logout?client_id=' +
      process.env.REACT_APP_KAKAO_LOGIN_CLIENT_ID +
      '&logout_redirect_uri=' +
      encodeURIComponent(`${SERVER_URL}/oauth/kakao/logout`);
  };

  return (
    <S.Background $isCloseAnimStart={isCloseAnimStart}>
      <S.SideBarBox $isCloseAnimStart={isCloseAnimStart} ref={ref}>
        <S.Header>
          <S.UserInfo>
            <S.ProfileImg src={user?.profileImage} alt="profileImage" />
            <S.Name>{user?.nickname}</S.Name>
          </S.UserInfo>
          <button onClick={handleCloseAnimStart}>
            <S.CloseImg src={CloseIcon} alt="닫기" />
          </button>
        </S.Header>
        <S.CalendarSetting>
          <S.Title>내 캘린더</S.Title>
          {CALENDAR_CHECK_LIST.map((checkList) => (
            <CheckList key={checkList.label} {...checkList} />
          ))}
        </S.CalendarSetting>
        {/* <S.MoreInfo>더 보기</S.MoreInfo> */}
        <S.LogoutBtn onClick={handleLogout}>
          <div>로그아웃</div>
          <S.Email>{user?.nickname}</S.Email>
        </S.LogoutBtn>
      </S.SideBarBox>
    </S.Background>
  );
}

export default SideBar;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
 }
`;
const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
 }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const S = {
  Background: styled.div<{
    $isCloseAnimStart: boolean;
  }>`
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 200;
    overflow: hidden;
    animation: ${({ $isCloseAnimStart }) =>
        $isCloseAnimStart ? fadeOut : fadeIn}
      0.3s ease-in-out forwards;
  `,
  SideBarBox: styled.div<{ $isCloseAnimStart: boolean }>`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 5px;
    right: 0;
    width: 60%;
    height: 100%;
    background-color: var(--green01);
    animation: ${({ $isCloseAnimStart }) =>
        $isCloseAnimStart ? slideOut : slideIn}
      0.3s ease-in-out forwards;
  `,
  //animation-fill-mode: forwards;
  //를 설정하면 애니메이션이 종료된 후 마지막 키프레임의 스타일을 유지합니다.
  Header: styled.div`
    background-color: var(--green03);
    padding: 10px;
    color: var(--green04);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  Name: styled.span`
    color: var(--green05);
  `,
  ProfileImg: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  Email: styled.span`
    color: var(--gray02);
    font-size: 12px;
  `,
  CloseImg: styled.img`
    width: 15px;
  `,
  CalendarSetting: styled.div`
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
  `,
  Title: styled.div`
    margin-bottom: 5px;
  `,
  MoreInfo: styled.div`
    background-color: var(--white);
    padding: 10px;
  `,
  LogoutBtn: styled.button`
    background-color: var(--white);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: var(--green04);
    }
  `,
};
