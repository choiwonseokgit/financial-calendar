import React from 'react';
import { HeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyMonthHeader({ label }: HeaderProps) {
  return <S.Container $label={label}>{label}</S.Container>;
}

export default MyMonthHeader;

const S = {
  Container: styled.div<{ $label: string }>`
    color: ${({ $label }) =>
      $label === '토' ? 'blue' : $label === '일' ? 'red' : 'var(--gray02)'};
    font-weight: 500;
  `,
};
