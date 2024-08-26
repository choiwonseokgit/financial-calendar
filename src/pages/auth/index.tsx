import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { login } from '@store/slices/login-slice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Auth() {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.login.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
      dispatch(login(userId));
    }

    navigate(isLogin ? '/' : '/login');
  }, [navigate, isLogin]);

  return (
    <S.Container
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.3,
        delay: 0,
      }}
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
