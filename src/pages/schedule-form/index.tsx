import { useReducer } from 'react';
import checkIcon from '@assets/icons/check-solid.svg';
import chevronLeftIcon from '@assets/icons/chevron-left-solid-green.svg';
import memoIcon from '@assets/icons/newspaper-solid.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Title from './components/title';
import { TPastelColors } from './constants';
import { Schedule, Action } from './types';

const reducer = (schedule: Schedule, action: Action) => {
  switch (action.type) {
    case 'TITLE':
      return { ...schedule, title: action.title };
    case 'COLOR':
      return { ...schedule, color: action.color };
    case 'MEMO':
      return { ...schedule, memo: action.memo };
    default:
      return schedule;
  }
};

function ScheduleForm() {
  const navigate = useNavigate();
  const [schedule, scheduleDispatch] = useReducer(reducer, {
    title: '',
    color: '#9DD87E',
    memo: '',
  });

  const moveBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    moveBack();
  };

  return (
    <S.Container
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.3,
        delay: 0,
      }}
    >
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
        <div>
          {/* <span>시작</span>
          <span>종료</span> */}
        </div>
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
  );
}

export default ScheduleForm;

const FormItemStyle = css`
  border-bottom: 1px solid var(--gray01);
  padding: 15px;
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
    font-size: 15px;
    border: none; /* 테두리 없애기 */
    resize: none; /* 크기 조절 기능 없애기 */
    //outline: none; /* 포커스 시 생기는 외곽선 없애기 */

    &::placeholder {
      color: var(--gray02);
      font-size: 15px;
    }
  `,
};
