import { TouchEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SpendingForm() {
  const navigate = useNavigate();
  const [touchX, setTouchX] = useState(0);

  const moveBack = () => {
    navigate(-1);
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchX(e.changedTouches[0].pageX);
  };

  const onTouchEnd = (e: TouchEvent) => {
    const distanceX = e.changedTouches[0].pageX - touchX;
    if (distanceX > 50) moveBack();
  };

  return (
    <S.Container
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        type: 'spring',
        duration: 0.5,
        delay: 0,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button onClick={moveBack}>뒤로</button>
      <form action="submit">
        <input type="text" />
      </form>
    </S.Container>
  );
}

export default SpendingForm;

const S = {
  Container: styled(motion.div)`
    height: 100dvh;
    background-color: white;
  `,
};
