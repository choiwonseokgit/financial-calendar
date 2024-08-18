import { useEffect } from 'react';

const useOutSideClick = (ref: React.RefObject<HTMLElement>, cb: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      cb();
    };

    document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      //   document.removeEventListener('touchstart', listener);
    };
  }, [ref, cb]);
};

export default useOutSideClick;
