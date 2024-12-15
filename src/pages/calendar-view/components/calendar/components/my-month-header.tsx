import { HeaderProps } from 'react-big-calendar';
import styled from 'styled-components';

function MyMonthHeader({ label }: HeaderProps) {
  return (
    <S.Container $label={label} role="cell">
      {label}
    </S.Container>
  );
}

export default MyMonthHeader;

const S = {
  Container: styled.div<{ $label: string }>`
    color: ${({ $label }) =>
      $label === '토'
        ? 'var(--blue)'
        : $label === '일'
          ? 'var(--red)'
          : 'var(--gray02)'};
    font-weight: 500;
  `,
};
