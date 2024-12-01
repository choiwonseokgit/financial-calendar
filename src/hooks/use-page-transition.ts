import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);
  const [startTouchX, setStartTouchX] = useState(0);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [isSwipeInIos, setIsSwipeInIos] = useState(false);

  const isIphone = /iPhone/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isIphone) return;

    const handleTouchStart = (e: TouchEvent) => {
      setStartTouchX(e.touches[0].clientX); // 터치 시작 위치 기록
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endTouchX = e.changedTouches[0].clientX;

      if (startTouchX < endTouchX) {
        setIsSwipeInIos(true);
      }
    };

    const handlePopState = () => {
      if (isSwipeInIos) {
        setDisableAnimation(true); // 뒤로 가기 시 애니메이션 비활성화
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isIphone, isSwipeInIos]);

  if (disableAnimation) return {}; // 아이폰 뒤로 가기 시 기본 동작 유지

  const pageTransition = {
    initial: direction === 'right' ? { x: '100%' } : { x: '-100%' },
    animate: { x: 0 },
    exit: direction === 'right' ? { x: '-100%' } : { x: '100%' },
    transition: {
      duration: 0.3,
    },
  };

  return pageTransition;
};

export default usePageTransition;
