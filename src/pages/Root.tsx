import GlobalStyle from '@styles/global';
import { mobileSize } from '@styles/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Root() {
  return (
    <div>
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
    inset: 0px;
    /* pointer-events: none; */
    position: fixed;
    z-index: 1000000000;
    ${mobileSize}
  `,
};
