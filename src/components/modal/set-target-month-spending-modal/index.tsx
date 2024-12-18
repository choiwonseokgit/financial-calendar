import { useRef, useState } from 'react';

import { format } from 'date-fns';
import styled from 'styled-components';

import MoneyInput from '@components/money-input';
import {
  useDeleteTargetMonthSpendingMutation,
  usePostTargetMonthSpendingMutation,
  useUpdateTargetMonthSpendingMutation,
} from '@store/query/calendar-query';

import Modal from '../components/modal';

import type { TSetTargetSpendingModal } from '@constants/modal';

interface SetTargetSpendingModalProps {
  onClose: () => void;
  date: string;
  type: TSetTargetSpendingModal;
  targetMonthSpending?: string;
}

function SetTargetMonthSpendingModal({
  onClose,
  date,
  type,
  targetMonthSpending,
}: SetTargetSpendingModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDeleteModal = type === 'deleteTargetSpending';
  const [targetSpending, setTargetSpending] = useState(
    type === 'editTargetSpending' ? targetMonthSpending : '',
  );
  const [postTargetspending] = usePostTargetMonthSpendingMutation();
  const [deleteTargetSpending] = useDeleteTargetMonthSpendingMutation();
  const [updateTargetSpending] = useUpdateTargetMonthSpendingMutation();

  const handleTargetSpendingChange = (targetSpending: string) => {
    setTargetSpending(targetSpending);
  };

  const handleSubmit = async () => {
    const [year, month] = [format(date, 'yyyy'), format(date, 'MM')];

    switch (type) {
      case 'setTargetSpending': {
        const formatTargetSpending = targetSpending?.replaceAll(',', '');
        await postTargetspending({
          year,
          month,
          targetMoney: formatTargetSpending!,
        });
        break;
      }
      case 'editTargetSpending': {
        const formatTargetSpending = targetSpending?.replaceAll(',', '');
        await updateTargetSpending({
          year,
          month,
          targetMoney: formatTargetSpending!,
        });
        break;
      }
      case 'deleteTargetSpending': {
        await deleteTargetSpending({ year, month });
        break;
      }
      default:
        break;
    }
  };

  const isDisabled =
    type === 'setTargetSpending'
      ? !targetSpending
      : type === 'editTargetSpending'
        ? targetMonthSpending === targetSpending || !targetSpending
        : false;

  return (
    <Modal
      onClose={onClose}
      type={type}
      submitCb={handleSubmit}
      isDisabled={isDisabled}
    >
      <S.Container>
        {isDeleteModal ? (
          <S.DeleteText>정말 삭제 하시겠습니까?</S.DeleteText>
        ) : (
          <MoneyInput
            ref={inputRef}
            money={targetSpending ?? ''}
            onMoneyChange={handleTargetSpendingChange}
            size="small"
          />
        )}
      </S.Container>
    </Modal>
  );
}

export default SetTargetMonthSpendingModal;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding-block: 30px;
  `,
  DeleteText: styled.div`
    align-self: center;
  `,
};
