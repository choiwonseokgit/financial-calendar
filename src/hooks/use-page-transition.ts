import { useAppSelector } from '@store/hooks';

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);

  //   console.log(direction);

  const pageTransition = {
    initial: direction === 'next' ? { x: '100%' } : { x: '-100%' },
    animate: { x: 0 },
    exit: direction === 'next' ? { x: '-100%' } : { x: '100%' },
    transition: {
      duration: 0.3,
      //   duration: 2,
      //   ease: 'easeInOut',
    },
  };

  return pageTransition;
};

export default usePageTransition;
