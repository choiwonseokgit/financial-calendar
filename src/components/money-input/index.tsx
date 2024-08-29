import React, { useEffect } from 'react';
import styled from 'styled-components';

interface MoneyInputProps {
  size: 'big' | 'small';
  money: string;
  onMoneyChange: (moneyVal: string) => void;
  onSubmit?: () => void;
}

function MoneyInput(
  { money, onMoneyChange, onSubmit, size }: MoneyInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const handleInputValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const moneyVal = Number(value.replaceAll(',', ''));

    if (isNaN(moneyVal) || !moneyVal) {
      // 숫자가 아닐 경우 or 0원 일때 emptyString으로 setting
      onMoneyChange('');
    } else {
      // 숫자인 경우 toLacaleString 적용
      onMoneyChange(moneyVal.toLocaleString('ko-KR'));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) onSubmit();
  };

  useEffect(() => {
    setTimeout(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    }, 300);
  }, []);

  return (
    <S.InputBox $size={size}>
      <S.Input
        $size={size}
        type="text"
        inputMode="numeric"
        placeholder="0"
        maxLength={10}
        ref={ref}
        value={money}
        onChange={handleInputValChange}
        onKeyDown={handleKeyDown}
      />
      <S.WonText>원</S.WonText>
    </S.InputBox>
  );
}

export default React.forwardRef(MoneyInput);

const S = {
  InputBox: styled.div<{ $size: 'big' | 'small' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: ${({ $size }) => ($size === 'big' ? '50px' : '30px')};
  `,
  Input: styled.input<{ $size: 'big' | 'small' }>`
    width: 100%;
    /* max-width: 90%; */
    text-align: right;
    font-size: ${({ $size }) => ($size === 'big' ? '50px' : '30px')};
    flex-grow: 1;
    color: var(--green04);

    &::placeholder {
      color: var(--green04);
    }
  `,
  WonText: styled.span`
    color: var(--green05);
  `,
};
