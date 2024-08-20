import { useEffect, useState } from 'react';
import useOutSideClick from './use-outside-click';

const useOutsideClickForAnimation = (
  ref: React.RefObject<HTMLElement>,
  closeFn: () => void,
  delay: number,
) => {
  const [isCloseAnimStart, setIsCloseAnimStart] = useState(false);

  const handleCloseAnimStart = () => {
    setIsCloseAnimStart(true);
  };

  useOutSideClick(ref, handleCloseAnimStart);

  useEffect(() => {
    if (isCloseAnimStart) {
      const timer = setTimeout(() => {
        closeFn();

        return () => clearTimeout(timer);
      }, delay);
    }
  }, [isCloseAnimStart]);

  return { isCloseAnimStart, handleCloseAnimStart };
};

export default useOutsideClickForAnimation;
