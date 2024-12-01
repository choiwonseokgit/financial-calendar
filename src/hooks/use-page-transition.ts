import { useAppSelector } from '@store/hooks';

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);

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
