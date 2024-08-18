import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@assets/icons/xmark-solid.svg';
import useOutSideClick from '@hooks/use-outside-click';
import { CALENDAR_CHECK_LIST } from '@pages/calendar-view/constants';
import styled, { keyframes } from 'styled-components';
import CheckList from './check-list';

interface SideBarProps {
  onSideBarBtnClick: (isOpen: boolean) => void;
}

function SideBar({ onSideBarBtnClick }: SideBarProps) {
  const [isCloseAnimStart, setIsCloseAnimStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) setIsCloseAnimStart(true);
  // };

  useOutSideClick(ref, () => setIsCloseAnimStart(true));

  useEffect(() => {
    if (isCloseAnimStart) {
      const timer = setTimeout(() => {
        onSideBarBtnClick(false);

        return () => clearTimeout(timer);
      }, 300);
    }
  }, [isCloseAnimStart]);

  return (
    <S.Background $isCloseAnimStart={isCloseAnimStart}>
      <S.SideBarBox $isCloseAnimStart={isCloseAnimStart} ref={ref}>
        <S.Header>
          <S.UserInfo>
            <S.Name>원석초이</S.Name>
            <S.Email>cws0325@naver.com</S.Email>
          </S.UserInfo>
          <button onClick={() => setIsCloseAnimStart(true)}>
            <S.CloseImg src={CloseIcon} alt="닫기" />
          </button>
        </S.Header>
        <S.CalendarSetting>
          <S.Title>내 캘린더</S.Title>
          {CALENDAR_CHECK_LIST.map((checkList) => (
            <CheckList key={checkList.label} label={checkList.label} />
          ))}
        </S.CalendarSetting>
        <S.MoreInfo>더 보기</S.MoreInfo>
        <S.Logout>
          <div>로그아웃</div>
          <S.Email>cws0325@naver.com</S.Email>
        </S.Logout>
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
    flex-direction: column;
  `,
  Name: styled.span``,
  Email: styled.span`
    color: var(--gray);
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
  Logout: styled.div`
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
