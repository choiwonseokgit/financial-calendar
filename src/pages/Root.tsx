import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import GlobalStyle from '@styles/global';
import { mobileSize } from '@styles/mobile';

function Root() {
  return (
    <S.Container>
      <GlobalStyle />
      <Outlet />
    </S.Container>
  );
}

export default Root;

const S = {
  Container: styled.div`
    inset: 0px;
    /* pointer-events: none; */
    position: fixed;
    z-index: 100;
    ${mobileSize}
    overflow: hidden;
  `,
};
