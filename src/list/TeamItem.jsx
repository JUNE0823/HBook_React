import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TeamItem(props) {
  const navigate = useNavigate();
  const moveHandler = (teamname) => {
    // 클릭한 팀의 id를 사용하여 다른 페이지로 이동
    navigate(`/team/${teamname}`);
  };

  return (
    <Card
      className="h-100 cursor-pointer w-50"
      onClick={() => moveHandler(props.data.teamname)}
    >
      <Card.Body>
        <Card.Title>{props.data.teamname} Team</Card.Title>
        <Card.Text>모임</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TeamItem;
