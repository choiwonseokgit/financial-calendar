import { useEffect } from 'react';

const useOutSideClick = (ref: React.RefObject<HTMLElement>, cb: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      cb();
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, cb]);
};

export default useOutSideClick;
