import { useAppSelector } from '@store/hooks';

const MOVE_VALUES = {
  init: {
    right: { x: '100%' },
    left: { x: '-100%' },
    none: { x: 0 },
  },
  exit: {
    right: { x: '-100%' },
    left: { x: '100%' },
    none: { x: 0 },
  },
};

const usePageTransition = () => {
  const { direction } = useAppSelector((state) => state.transitionDirection);
  const { init, exit } = MOVE_VALUES;

  const pageTransition = {
    initial: init[direction],
    animate: { x: 0 },
    exit: exit[direction],
    transition: {
      duration: 0.3,
    },
  };

  return pageTransition;
};

export default usePageTransition;
