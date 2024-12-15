import { useEffect } from 'react';

import Flicking from '@egjs/react-flicking';

const useScrollEvent = (
  flickingRef: React.RefObject<Flicking>,
  endIdx: number,
) => {
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (flickingRef.current?.animating) return;

      const currentIndex = flickingRef.current?.index ?? 0;

      if (event.deltaY > 0) {
        // 마우스 휠을 아래로 내릴 때
        if (currentIndex < endIdx) {
          flickingRef.current?.next(100);
        }
      } else {
        // 마우스 휠을 위로 올릴 때
        if (currentIndex > 0) {
          flickingRef.current?.prev(100);
        }
      }
    };

    const flickingElement = flickingRef.current?.element as HTMLElement;
    flickingElement?.addEventListener('wheel', handleWheel);

    return () => {
      flickingElement?.removeEventListener('wheel', handleWheel);
    };
  }, [endIdx]);
};

export default useScrollEvent;
