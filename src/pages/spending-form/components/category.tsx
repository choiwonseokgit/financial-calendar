import styled from 'styled-components';

interface CategoryProps {
  name: string;
  emoji: string;
  isSelected: boolean;
  onCategoryClick: () => void;
}

function Category({ name, emoji, isSelected, onCategoryClick }: CategoryProps) {
  return (
    <S.CategoryBtn
      $isSelected={isSelected}
      onClick={onCategoryClick}
    >{`${emoji} ${name}`}</S.CategoryBtn>
  );
}

export default Category;

const S = {
  CategoryBtn: styled.button<{ $isSelected: boolean }>`
    padding: 5px;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    color: ${({ $isSelected }) =>
      $isSelected ? 'var(--white)' : 'var(--green04)'};
    background-color: ${({ $isSelected }) => $isSelected && 'var(--green04)'};
    border: 1px solid var(--green04);
    cursor: pointer;
  `,
};
