import { useState } from 'react';
import chevronUpIcon from '@assets/icons/chevron-up-solid.svg';
import styled from 'styled-components';
import { PASTEL_COLORS, TPastelColors } from '../constants';

interface TitleProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: TPastelColors['color'];
  onColorChange: (color: TPastelColors['color']) => void;
}

function Title({ title, onTitleChange, color, onColorChange }: TitleProps) {
  const [isSelectViewOpen, setIsSelectViewOpen] = useState(false);

  return (
    <>
      <S.Title>
        <S.ColorSelector
          $color={color}
          onClick={() => setIsSelectViewOpen(!isSelectViewOpen)}
        />
        <S.Input
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="일정 제목"
        />
      </S.Title>
      {isSelectViewOpen && (
        <S.ColorContainer>
          <S.PaletteBox>
            <S.Palette>🎨 팔레트</S.Palette>
            <button onClick={() => setIsSelectViewOpen(false)}>
              <S.ChevronImg src={chevronUpIcon} alt="접기" />
            </button>
          </S.PaletteBox>
          <S.ColorBox>
            {PASTEL_COLORS.map((item) => (
              <S.ColorItem
                key={item.name}
                onClick={() => onColorChange(item.color)}
                $isSelected={item.color === color}
                $color={item.color}
              />
            ))}
          </S.ColorBox>
        </S.ColorContainer>
      )}
    </>
  );
}

export default Title;

const S = {
  Title: styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 10px;
    border-bottom: 1px solid var(--gray01);
    padding: 15px;
  `,
  Input: styled.input`
    width: calc(80% + 5px);
    font-size: 20px;

    &::placeholder {
      color: var(--gray02);
    }
  `,
  ColorSelector: styled.div<{ $color: TPastelColors['color'] }>`
    cursor: pointer;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    background-color: ${({ $color }) => $color};
  `,
  ColorContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid var(--gray01);
  `,
  PaletteBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 2px;
  `,
  Palette: styled.span`
    color: var(--gray02);
  `,
  ChevronImg: styled.img`
    width: 15px;
  `,
  ColorBox: styled.div`
    display: flex;
    justify-content: space-around;
  `,

  ColorItem: styled.div<{
    $color: TPastelColors['color'];
    $isSelected: boolean;
  }>`
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${({ $color }) => $color};

    ${({ $isSelected }) =>
      $isSelected &&
      `&::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
      height: 25px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 2px solid #fff;
    }
  `}
  `,
};
