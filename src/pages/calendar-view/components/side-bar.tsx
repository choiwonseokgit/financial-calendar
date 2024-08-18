import { MouseEvent, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface SideBarProps {
  onSideBarBtnClick: (isOpen: boolean) => void;
}

function SideBar({ onSideBarBtnClick }: SideBarProps) {
  const [isCloseAnimStart, setIsCloseAnimStart] = useState(false);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsCloseAnimStart(true);
  };

  useEffect(() => {
    if (isCloseAnimStart) {
      const timer = setTimeout(() => {
        onSideBarBtnClick(false);

        return () => clearTimeout(timer);
      }, 300);
    }
  }, [isCloseAnimStart]);

  return (
    <S.Background
      $isCloseAnimStart={isCloseAnimStart}
      onClick={handleBackgroundClick}
    >
      <S.SideBarBox $isCloseAnimStart={isCloseAnimStart}>
        <div>안녕 나는 sideBar</div>
        <button onClick={() => setIsCloseAnimStart(true)}>닫기</button>
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
    right: 0;
    width: 50%;
    height: 100%;
    background-color: green;
    animation: ${({ $isCloseAnimStart }) =>
        $isCloseAnimStart ? slideOut : slideIn}
      0.3s ease-in-out forwards;
  `,
  //animation-fill-mode: forwards;
  //를 설정하면 애니메이션이 종료된 후 마지막 키프레임의 스타일을 유지합니다.
};
