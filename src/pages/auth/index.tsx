import { useEffect } from 'react';
import usePageTransition from '@hooks/use-page-transition';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Auth() {
  const navigate = useNavigate();
  const pageTransition = usePageTransition();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  const isLogin = userId !== 'null';
  useEffect(() => {
    navigate(isLogin ? '/' : '/login');
  }, []);

  return (
    <S.Container
      // animate={{ x: 0 }}
      // exit={{ x: '100%' }}
      // transition={{
      //   duration: 0.3,
      //   delay: 0,
      // }}
      {...pageTransition}
    >
      💸Loading...📆
    </S.Container>
  );
}

export default Auth;

const S = {
  Container: styled(motion.div)`
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'New Amsterdam';
    color: var(--green04);
    font-size: 30px;
    background-color: var(--green02);
  `,
};
