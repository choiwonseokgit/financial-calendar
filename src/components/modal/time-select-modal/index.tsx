import { useReducer } from 'react';
import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';
import Modal from '../modal';
import HourFlicking from './components/hour-flicking';
import MinuteFlicking from './components/minute-flicking';

interface TSelectingTime {
  hour: string;
  minute: string;
}

interface Action {
  type: 'HOUR' | 'MINUTE';
  timeUnit: string;
}

const reducer = (selectingTime: TSelectingTime, action: Action) => {
  return { ...selectingTime, [action.type.toLowerCase()]: action.timeUnit };
};

interface TimeSelectModalProps {
  onClose: () => void;
  defaultTime: string;
  cb: (newTime: string) => void;
}

function TimeSelectModal({ onClose, defaultTime, cb }: TimeSelectModalProps) {
  const parsedDefaultTime = parse(defaultTime, 'a hh:mm', new Date(), {
    locale: ko,
  });
  const [hour, minute] = [
    format(parsedDefaultTime, 'HH'),
    format(parsedDefaultTime, 'mm'),
  ];

  const [selectingTime, selectingTimeDispatch] = useReducer(reducer, {
    hour,
    minute,
  });

  const handleDateUnitChange = (type: 'HOUR' | 'MINUTE', timeUnit: string) => {
    selectingTimeDispatch({ type: type, timeUnit: timeUnit });
  };

  const handleSubmit = () => {
    const parsedTime = parse(
      `${selectingTime.hour}:${selectingTime.minute}`,
      'HH:mm',
      new Date(),
    );
    const newTime = format(parsedTime, 'a hh:mm', { locale: ko });
    cb(newTime);
  };

  return (
    <Modal onClose={onClose} type="time" submitCb={handleSubmit}>
      <S.Container>
        <HourFlicking
          currSelectHour={hour}
          onHourChange={(newHour: string) =>
            handleDateUnitChange('HOUR', newHour)
          }
        />
        <MinuteFlicking
          currSelectMinute={minute}
          onMinuteChange={(newMinute: string) =>
            handleDateUnitChange('MINUTE', newMinute)
          }
        />
      </S.Container>
    </Modal>
  );
}

export default TimeSelectModal;

const S = {
  Container: styled.div`
    display: flex;
    gap: 15px;
    padding-block: 30px;
  `,
};
