import styled from 'styled-components';

function UserInfoSkeleton() {
  return (
    <S.UserInfo>
      <S.ProfileImgBox />
      <S.NameBox />
    </S.UserInfo>
  );
}

export default UserInfoSkeleton;

const S = {
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
  `,
  NameBox: styled.div`
    width: 42px;
    height: 20px;
    background-color: rgb(230, 230, 230);
  `,
  ProfileImgBox: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgb(230, 230, 230);
  `,
};
