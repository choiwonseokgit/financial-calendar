/* eslint-disable @typescript-eslint/no-explicit-any */
import Flicking, { MoveEvent, ReadyEvent } from '@egjs/react-flicking';

const updateFlickingTransform = (
  e: ReadyEvent<Flicking> | MoveEvent<Flicking>,
) => {
  e.currentTarget.panels.forEach((panel: any) => {
    const rotateVal = -panel.progress * 20;
    const sinRot = Math.sin(Math.abs((rotateVal * Math.PI) / 180));
    const depth = 100 * sinRot * sinRot;
    panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
  });
};

export default updateFlickingTransform;
