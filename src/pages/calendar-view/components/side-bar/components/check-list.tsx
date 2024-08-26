import CheckIcon from '@assets/icons/check-solid.svg';
import { TCalendarCheckList } from '@pages/calendar-view/constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { toggleOption } from '@store/slices/calendar-option-slice';
import styled from 'styled-components';

interface CheckListProps {
  type: TCalendarCheckList['type'];
  label: TCalendarCheckList['label'];
}

function CheckList({ type, label }: CheckListProps) {
  const isOptionChecked = useAppSelector((state) => state.calendarOption[type]);
  const dispatch = useAppDispatch();

  const handleToggleClick = () => {
    dispatch(toggleOption(type));
  };

  return (
    <S.Container onClick={handleToggleClick}>
      <S.CheckImgBox>
        {isOptionChecked && <S.Img src={CheckIcon} alt="체크" />}
      </S.CheckImgBox>
      <div>{label}</div>
    </S.Container>
  );
}

export default CheckList;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  `,
  CheckImgBox: styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid var(--green04);
    border-radius: 50%;
  `,
  Img: styled.img`
    position: absolute;
    width: 12px;
    height: 12px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
