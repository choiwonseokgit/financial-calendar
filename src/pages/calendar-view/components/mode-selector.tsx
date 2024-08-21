/* eslint-disable @typescript-eslint/no-explicit-any */
import Flicking, {
  MoveEvent,
  ReadyEvent,
  ViewportSlot,
} from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';

function ModeSelector() {
  const updateTransform = (e: ReadyEvent<Flicking> | MoveEvent<Flicking>) => {
    e.currentTarget.panels.forEach((panel: any) => {
      const rotateVal = -panel.progress * 20;
      const sinRot = Math.sin(Math.abs((rotateVal * Math.PI) / 180));
      const depth = 150 * sinRot * sinRot;
      panel.element.style.transform = `translateZ(-${depth}px) rotateX(${rotateVal}deg)`;
    });
  };
  return (
    <Flicking
      horizontal={false}
      onReady={updateTransform}
      onMove={updateTransform}
    >
      <div className="date-panel">JAN</div>
      <div className="date-panel">FEB</div>
      <div className="date-panel">MAR</div>
      <div className="date-panel">APR</div>
      <div className="date-panel">MAY</div>
      <div className="date-panel">JUN</div>
      <div className="date-panel">JUL</div>
      <div className="date-panel">AUG</div>
      <div className="date-panel">SEP</div>
      <div className="date-panel">OCT</div>
      <div className="date-panel">NVM</div>
      <div className="date-panel">DEC</div>
      <ViewportSlot>
        <div className="date-panel-border"></div>
        <div className="shadow-top"></div>
        <div className="shadow-bottom"></div>
      </ViewportSlot>
    </Flicking>
  );
}

export default ModeSelector;
