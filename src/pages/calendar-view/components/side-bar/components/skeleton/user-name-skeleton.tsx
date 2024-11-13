import styled from 'styled-components';

function UserNameSkeleton() {
  return <S.NameBox />;
}

export default UserNameSkeleton;

const S = {
  NameBox: styled.div`
    width: 32px;
    height: 15px;
    background-color: rgb(230, 230, 230);
  `,
};
