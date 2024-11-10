import React from 'react';
import { Card } from 'react-bootstrap'; // 부트스트랩 카드 컴포넌트 가져오기

function BookItem(props) {
  const { cover, title, author, description, bestDuration } = props.data;

  return (
    <Card className="mb-4" style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={cover}
        style={{ height: '200px', objectFit: 'contain' }} // 이미지 크기를 줄여서 카드 내에 맞추기
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <br />
        <Card.Subtitle className="mb-2 text-muted">
          저자: {author}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Footer className="text-muted">{bestDuration}</Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default BookItem;
