import { useRef, useState } from 'react';
import plusIcon from '@assets/icons/plus-solid.svg';
import useOutSideClick from '@hooks/use-outside-click';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface FooterProps {
  date: string;
}

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '50%' },
  // closed: { opacity: 1, y: 'calc(150% + 6px)' },
};

function Footer({ date }: FooterProps) {
  const month = format(date, 'M');
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const moveSpendingForm = () => {
    navigate('/spending-form');
  };

  useOutSideClick(ref, () => setIsOpen(false));

  return (
    <S.Footer>
      <S.Container>
        <S.Notice>
          <div>{month}월 목표 지출: 300000</div>
          <div>현재 지출: -155000</div>
          <div>남은 돈: 145000</div>
        </S.Notice>
        <div ref={ref} style={{ position: 'relative' }}>
          <S.PlusBtn onClick={() => setIsOpen(!isOpen)}>
            <S.PlusImg src={plusIcon} alt="추가" />
          </S.PlusBtn>
          <S.BtnsBox
            animate={isOpen ? 'open' : 'closed'}
            variants={variants}
            $isOpen={isOpen}
            // onAnimationStart={(e) => {
            //   console.log(e);
            //   if (e === 'open') setIsOpen(true);
            // }}
            // onAnimationComplete={(e) => {
            //   console.log(e);
            //   if (e === 'closed') {
            //     setIsOpen(false);
            //   }
            // }}
            // initial={{ y: '50%', opacity: 1 }}
            // animate={isBtnsVisible ? 'initial' : 'exit'}
            // exit={{ y: '0', opacity: 0 }}
            // transition={{
            //   duration: 0.3,
            //   delay: 0,
            // }}
          >
            <S.PlusBtn onClick={moveSpendingForm}>스케줄</S.PlusBtn>
            <S.PlusBtn onClick={moveSpendingForm}>가계부</S.PlusBtn>
          </S.BtnsBox>
        </div>
      </S.Container>
    </S.Footer>
  );
}

export default Footer;

const S = {
  Footer: styled.footer`
    background-color: white;
  `,
  Container: styled.div`
    height: 15dvh;
    background-color: var(--green02);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: var(--green04);
    font-size: 15px;
  `,
  Notice: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    color: var(--green04);
  `,
  PlusBtn: styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--green04);
    border-radius: 50%;
  `,
  PlusImg: styled.img`
    width: 20px;
    height: 20px;
  `,
  BtnsBox: styled(motion.div)<{ $isOpen: boolean }>`
    position: absolute;
    /* background-color: var(--green03); */
    /* border: 1px solid var(--green04); */
    /* border-radius: 20px; */
    /* border-start-start-radius: 50%; */
    top: calc(-200% - 6px);
    right: 0;
    display: flex;
    gap: 3px;
    flex-direction: column;
    z-index: 150;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  `,
};
