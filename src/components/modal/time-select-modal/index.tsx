import { useReducer } from 'react';

import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import styled from 'styled-components';

import HourFlicking from './components/hour-flicking';
import MinuteFlicking from './components/minute-flicking';
import Modal from '../components/modal';

interface SelectingTime {
  hour: string;
  minute: string;
}

type TTimeUnit = keyof SelectingTime;

interface Action {
  type: TTimeUnit;
  timeUnit: string;
}

const reducer = (selectingTime: SelectingTime, action: Action) => {
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

  const handleDateUnitChange = (type: TTimeUnit, timeUnit: string) => {
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
            handleDateUnitChange('hour', newHour)
          }
        />
        <MinuteFlicking
          currSelectMinute={minute}
          onMinuteChange={(newMinute: string) =>
            handleDateUnitChange('minute', newMinute)
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
