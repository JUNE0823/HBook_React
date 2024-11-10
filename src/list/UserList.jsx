import UserItem from './UserItem';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

function UserList(props) {
  if (!props.user.length) {
    return <div>팀원이 없습니다.</div>;
  }

  return (
    <Wrapper>
      {props.user.map((user) => {
        return (
          <UserItem
            key={user.id}
            data={user}
            bookname={props.bookname}
            teamname={props.teamname}
          />
        );
      })}
    </Wrapper>
  );
}

export default UserList;
