import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  height: string;
}
function LoadingSpinner({ height }: LoadingSpinnerProps) {
  return (
    <S.Wrapper $height={height}>
      <S.Container>
        <ClipLoader color={`var(--green04)`} />
      </S.Container>
    </S.Wrapper>
  );
}

export default LoadingSpinner;

const S = {
  Wrapper: styled.div<{ $height: string }>`
    height: ${({ $height }) => `${$height}`};
    position: relative;
    background-color: var(--white);
  `,
  Container: styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
};
