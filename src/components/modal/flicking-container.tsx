import { PropsWithChildren, useRef } from 'react';
import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import styled from 'styled-components';
import useScrollEvent from './hooks/use-scroll-event';
import updateFlickingTransform from './utils/update-flicking-transform';

interface FlickingContainerProps extends PropsWithChildren {
  defaultIdx: number;
  currIdx: number;
  onDateUnitChange: (idx: number) => void;
  endIdx: number;
}

function FlickingContainer({
  children,
  defaultIdx,
  onDateUnitChange,
  endIdx,
}: FlickingContainerProps) {
  const flickingRef = useRef<Flicking>(null);

  useScrollEvent(flickingRef, endIdx);

  return (
    <S.FlickingBox>
      <Flicking
        ref={flickingRef}
        horizontal={false}
        onReady={updateFlickingTransform}
        onMove={updateFlickingTransform}
        inputType={['touch', 'mouse']}
        moveType={'snap'}
        defaultIndex={defaultIdx}
        onChanged={(e) => {
          onDateUnitChange(e.currentTarget.index);
        }}
      >
        {children}
        <ViewportSlot>
          <div className="date-panel-border"></div>
          <div className="shadow-top"></div>
          <div className="shadow-bottom"></div>
        </ViewportSlot>
      </Flicking>
    </S.FlickingBox>
  );
}

export default FlickingContainer;

const S = {
  FlickingBox: styled.div`
    font-size: 20px;
    /* background-color: green; */
    width: 58px;

    .flicking-viewport {
      /* background-color: purple; */
      box-sizing: initial;
      height: 120px;
      overflow: visible;
      perspective: 300px;

      margin-left: auto;
      margin-right: auto;
      transition: height 0.5s;
      width: 100%;
      overflow: hidden;
      position: relative;
    }

    .flicking-camera {
      align-items: center;
      transform-style: preserve-3d;
    }

    .date-panel {
      display: flex;
      align-items: center;
      backface-visibility: hidden;
      height: 40px;
      margin-bottom: 10px;
      color: var(--gray01);
      transition: color 0.2s;

      &.selected {
        color: black;
      }
    }

    .date-panel-border {
      border-bottom: 2px solid var(--green04);
      border-top: 2px solid var(--green04);
      height: 40px;
      position: absolute;
      top: 40px;
      width: 58px;
    }

    .shadow-top {
      top: 0;
    }

    .shadow-bottom,
    .shadow-top {
      height: 40px;
      left: 0;
      position: absolute;
      width: 100%;
    }

    .shadow-bottom {
      top: 80px;
    }
  `,
};
