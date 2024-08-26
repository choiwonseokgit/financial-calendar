import { useGetUserQuery } from '@store/query/user-query';
import GlobalStyle from '@styles/global';
import { mobileSize } from '@styles/mobile';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Root() {
  useGetUserQuery();

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
