import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // 부트스트랩 그리드 컴포넌트 가져오기
import BookItem from './BookItem'; // BookItem 컴포넌트 가져오기

function BookList(props) {
  return (
    <Container>
      <Row className="g-4">
        {' '}
        {/* 카드 사이의 간격 추가 */}
        {props.books.map((book) => (
          <Col
            key={book.cover}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex justify-content-center"
          >
            <BookItem data={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BookList;
