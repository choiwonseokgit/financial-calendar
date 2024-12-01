import { useAppSelector } from '@store/hooks';

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);

  const isMobilePwaInstall =
    /Mobi|iPhone|Android/i.test(navigator.userAgent) &&
    window.matchMedia('(display-mode: standalone)').matches;

  if (isMobilePwaInstall) return {}; // 모바일 pwa 설치 시에는 모바일 기본 동작 적용

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
