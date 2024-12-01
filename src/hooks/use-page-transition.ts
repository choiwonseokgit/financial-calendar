import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);
  const [disableAnimation, setDisableAnimation] = useState(false);

  const isIphone = /iPhone/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isIphone) return;

    const handlePopState = () => {
      setDisableAnimation(true); // 뒤로 가기 시 애니메이션 비활성화
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isIphone]);

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
