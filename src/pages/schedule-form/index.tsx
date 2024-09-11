import { useReducer } from 'react';
import checkIcon from '@assets/icons/check-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import memoIcon from '@assets/icons/newspaper-solid.svg';
import ConfirmModal from '@components/modal/confirm-modal';
import useConfirmModal from '@hooks/use-confirm-modal';
import usePageTransition from '@hooks/use-page-transition';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { usePostScheduleMutation } from '@store/query/calendar-query';
import { changeTransitionDirection } from '@store/slices/transition-direction-slice';
// import getYearMonthFromISO from '@utils/get-year-month-from-iso';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DateSelect from './components/date-select';
import TimeSelect from './components/time-select';
import Title from './components/title';
import { TPastelColors } from './constants';
import { Schedule, Action } from './types';
import combineDateTimeToIso from './utils/combine-date-time-to-iso';
import validateDateOrder from './utils/validate-date-order';

const reducer = (schedule: Schedule, action: Action) => {
  switch (action.type) {
    case 'TITLE':
      return { ...schedule, title: action.title };
    case 'COLOR':
      return { ...schedule, color: action.color };
    case 'MEMO':
      return { ...schedule, memo: action.memo };
    case 'START_DATE':
      return { ...schedule, startDate: action.startDate };
    case 'END_DATE':
      return { ...schedule, endDate: action.endDate };
    case 'START_TIME':
      return { ...schedule, startTime: action.startTime };
    case 'END_TIME':
      return { ...schedule, endTime: action.endTime };
    case 'IS_ALLDAY_TOGGLE':
      return { ...schedule, isAllDay: !schedule.isAllDay };
    default:
      return schedule;
  }
};

function ScheduleForm() {
  const navigate = useNavigate();
  const selectedDate = useAppSelector((state) => state.selectedDate);
  const defaultTime = format(new Date(), 'a hh:mm', { locale: ko });
  const dispatch = useAppDispatch();
  const pageTransition = usePageTransition();
  const [schedule, scheduleDispatch] = useReducer(reducer, {
    title: '',
    color: '#9DD87E',
    memo: '',
    startDate: selectedDate,
    endDate: selectedDate,
    startTime: defaultTime,
    endTime: defaultTime,
    isAllDay: false,
  });
  const {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
    modalMessageType,
    handleModalMessageChange,
  } = useConfirmModal();
  const [postSchedule] = usePostScheduleMutation();

  const moveBack = () => {
    dispatch(changeTransitionDirection('prev'));
    navigate(-1);
  };

  const handleSubmit = async () => {
    const {
      title,
      color,
      memo,
      isAllDay,
      startDate,
      startTime,
      endDate,
      endTime,
    } = schedule;
    const start = combineDateTimeToIso(startDate, startTime, isAllDay);
    const end = combineDateTimeToIso(endDate, endTime, isAllDay);
    const isSameDate = start === end;
    const isValidateDateOrder = validateDateOrder(start, end);
    // const { year, month } = getYearMonthFromISO(startDate);

    switch (true) {
      case !title:
        handleModalMessageChange('titleEmpty');
        break;
      case isSameDate:
        handleModalMessageChange('sameDate');
        break;
      case !isValidateDateOrder:
        handleModalMessageChange('overDate');
        break;
      default: //전송
        await postSchedule({
          title,
          color,
          memo,
          isAllDay,
          startDate: start,
          endDate: end,
        });
        moveBack();
        return;
    }

    handleModalOpen();
  };

  return (
    <>
      <S.Container {...pageTransition}>
        <S.Header>
          <button onClick={moveBack}>
            <S.ChevronImg src={chevronLeftIcon} alt="뒤로" />
          </button>
          <div>스케쥴</div>
          <button onClick={handleSubmit}>
            <S.CheckImg src={checkIcon} alt="전송" />
          </button>
        </S.Header>
        <S.Form>
          <Title
            title={schedule.title}
            onTitleChange={(e) =>
              scheduleDispatch({ type: 'TITLE', title: e.target.value })
            }
            color={schedule.color}
            onColorChange={(color: TPastelColors['color']) =>
              scheduleDispatch({ type: 'COLOR', color })
            }
          />
          <S.DateSelectBox>
            <S.StartBox>
              <span>시작 날짜</span>
              <S.SelectContainer>
                <DateSelect
                  date={schedule.startDate}
                  onScheduleDateChange={(newDate: string) => {
                    scheduleDispatch({
                      type: 'START_DATE',
                      startDate: newDate,
                    });
                  }}
                />
                {!schedule.isAllDay && (
                  <TimeSelect
                    time={schedule.startTime}
                    onScheduleTimeChange={(newTime: string) => {
                      scheduleDispatch({
                        type: 'START_TIME',
                        startTime: newTime,
                      });
                    }}
                  />
                )}
              </S.SelectContainer>
            </S.StartBox>
            <S.EndBox>
              <span>종료 날짜</span>
              <S.SelectContainer>
                <DateSelect
                  date={schedule.endDate}
                  onScheduleDateChange={(newDate: string) => {
                    scheduleDispatch({ type: 'END_DATE', endDate: newDate });
                  }}
                />
                {!schedule.isAllDay && (
                  <TimeSelect
                    time={schedule.endTime}
                    onScheduleTimeChange={(newTime: string) => {
                      scheduleDispatch({ type: 'END_TIME', endTime: newTime });
                    }}
                  />
                )}
              </S.SelectContainer>
            </S.EndBox>
            <S.AllDayBtn
              $isAllDay={schedule.isAllDay}
              onClick={() => scheduleDispatch({ type: 'IS_ALLDAY_TOGGLE' })}
            >
              종일
            </S.AllDayBtn>
          </S.DateSelectBox>
          <S.MemoBox>
            <S.MemoImg src={memoIcon} alt="메모" />
            <S.TextArea
              placeholder="메모"
              onChange={(e) =>
                scheduleDispatch({ type: 'MEMO', memo: e.target.value })
              }
            ></S.TextArea>
          </S.MemoBox>
        </S.Form>
      </S.Container>
      {isModalOpen && (
        <ConfirmModal
          onClose={handleModalClose}
          modalMessageType={modalMessageType}
        />
      )}
    </>
  );
}

export default ScheduleForm;

const FormItemStyle = css`
  border-bottom: 1px solid var(--gray01);
  padding: 15px;
`;

const DateSelectStyle = css`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const S = {
  Container: styled(motion.div)`
    height: 100dvh;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--green03);
    color: var(--green05);
    padding-block: 10px;
    padding-inline: 10px;
  `,
  ChevronImg: styled.img`
    width: 15px;
  `,
  CheckImg: styled.img`
    width: 20px;
  `,
  Form: styled.div`
    display: flex;
    flex-direction: column;
  `,
  DateSelectBox: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    ${FormItemStyle};
    span {
      color: var(--green05);
    }
  `,
  SelectContainer: styled.div`
    display: flex;
    gap: 5px;
  `,
  StartBox: styled.div`
    ${DateSelectStyle}
  `,
  EndBox: styled.div`
    ${DateSelectStyle}
  `,
  AllDayBtn: styled.button<{ $isAllDay: boolean }>`
    border: 1px solid var(--green04);
    color: ${({ $isAllDay }) =>
      $isAllDay ? `var(--white)` : `var(--green05)`};
    background-color: ${({ $isAllDay }) => $isAllDay && `var(--green04)`};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
  `,
  MemoBox: styled.div`
    display: flex;
    gap: 15px;
    ${FormItemStyle}
  `,
  MemoImg: styled.img`
    width: 25px;
    height: 25px;
  `,
  TextArea: styled.textarea`
    width: 80%;
    height: 80px;
    font-size: 16px;
    border: none; /* 테두리 없애기 */
    resize: none; /* 크기 조절 기능 없애기 */
    //outline: none; /* 포커스 시 생기는 외곽선 없애기 */

    &::placeholder {
      color: var(--gray02);
      font-size: 15px;
    }
  `,
};
