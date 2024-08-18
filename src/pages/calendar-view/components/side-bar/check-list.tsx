import { useState } from 'react';
import CheckIcon from '@assets/icons/check-solid.svg';
import { TCalendarCheckList } from '@pages/calendar-view/constants';
import styled from 'styled-components';

interface CheckListProps {
  label: TCalendarCheckList['label'];
}

function CheckList({ label }: CheckListProps) {
  const [isChecked, setIsChecked] = useState(true);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <S.Container>
      <S.CheckImgBox onClick={handleClick}>
        {isChecked && <S.Img src={CheckIcon} alt="체크" />}
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
  `,
  CheckImgBox: styled.div`
    cursor: pointer;
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid var(--green04);
    border-radius: 50%;
  `,
  Img: styled.img`
    position: absolute;
    width: 15px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
