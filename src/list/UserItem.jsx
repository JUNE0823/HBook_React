import styled from 'styled-components';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useEffect, useState } from 'react';

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  cursor: pointer;
  background: white;
  :hover {
    background: lightgrey;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

function UserItem(props) {
  const { bookname, teamname } = props;
  const navigate = useNavigate();
  const [userReport, setUserReport] = useState('');

  useEffect(() => {
    getUserReport();
  }, []);

  // 클릭한 사용자 id와 bookname을 사용하여 다른 페이지로 이동
  const moveHandler = () => {
    navigate(`/report/${props.data.id}`, {
      state: { bookname, teamname },
    });
  };

  const getUserReport = async () => {
    try {
      const report = await api.get(`/report/${props.data.id}`);
      setUserReport(report.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    try {
      await api.delete(`/report/${props.data.id}`);
      await api.delete(`/user/${props.data.id}`);
      alert('사용자가 삭제되었습니다.');
      getUserReport();
    } catch (err) {
      console.log();
    }
  };

  return (
    <Wrapper>
      <TitleText>
        {props.data.username} / {props.data.age} / {props.data.job}
      </TitleText>
      <h6>인상 깊었던 점 : {userReport.content}</h6>
      <h6>대화 해보고 싶은 내용 : {userReport.discuss}</h6>

      <Container>
        <Button title="작성/수정" onClick={moveHandler} />
        <Button title="삭제하기" onClick={deleteHandler} />
      </Container>
    </Wrapper>
  );
}

export default UserItem;
