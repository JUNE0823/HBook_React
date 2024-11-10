// import TeamItem from './TeamItem';
// import { Row, Col, Card } from 'react-bootstrap';

// function TeamList(props) {
//   return (
//     <div>
//       {props.data.map((team) => {
//         return <TeamItem key={team.id} data={team} />;
//       })}
//     </div>
//   );
// }

// export default TeamList;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import api from '../api/axios';

const TeamList = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const moveHandler = (teamname) => {
    navigate(`/team/${teamname}`);
  };

  // const deleteHandler = async (event, teamname) => {
  //   event.stopPropagation(); // 이벤트 버블링 방지
  //   try {
  //     await api.delete(`/team/${teamname}`);
  //     alert('팀이 삭제되었습니다');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="container">
      <Row xs={1} md={2} lg={3} className="g-4">
        {data.map((team) => (
          <Col key={team.id}>
            <Card
              className="h-100 d-flex flex-column"
              onClick={() => moveHandler(team.teamname)}
            >
              <Card.Body>
                <Card.Title>{team.teamname} Team</Card.Title>
                <button onClick={(event) => onDelete(event, team.teamname)}>
                  팀 삭제하기
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamList;
