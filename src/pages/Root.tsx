import GlobalStyle from '@styles/global';
import { mobileSize } from '@styles/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './nav-bar';

function Root() {
  return (
    <S.Container>
      <GlobalStyle />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </S.Container>
  );
}

export default Root;

const S = {
  Container: styled.div`
    inset: 0px;
    /* pointer-events: none; */
    position: fixed;
    z-index: 1000000000;
    ${mobileSize}
  `,
};
