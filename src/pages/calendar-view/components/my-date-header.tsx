import { DateHeaderProps } from 'react-big-calendar';

function MyDateHeader({ label, onDrillDown }: DateHeaderProps) {
  return (
    <div>
      <button className="rbc-button-link" role="cell" onClick={onDrillDown}>
        {label.replace(/^0/, '')}
      </button>
    </div>
  );
}

export default MyDateHeader;
