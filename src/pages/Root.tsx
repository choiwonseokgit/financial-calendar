import GlobalStyle from '@styles/global';
import { mobileSize } from '@styles/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Root() {
  return (
    <div>
      Root
      <GlobalStyle />
      <S.Main>
        <Outlet />
      </S.Main>
    </div>
  );
}

export default Root;

const S = {
  Main: styled.main`
    ${mobileSize}
  `,
};
