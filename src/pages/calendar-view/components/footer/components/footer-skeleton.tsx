import styled from 'styled-components';

function FooterSkeleton() {
  return (
    <S.Container>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <S.Skeleton key={i} />
        ))}
    </S.Container>
  );
}

export default FooterSkeleton;

const S = {
  Container: styled.div`
    height: 15dvh;
    background-color: var(--green02);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    padding: 10px;
    color: var(--green04);
    font-size: 15px;
    flex-direction: column;
    gap: 5px;
  `,
  Skeleton: styled.div`
    width: 70%;
    height: 19px;
    border-radius: 5px;
    background-color: rgb(230, 230, 230);
  `,
};
