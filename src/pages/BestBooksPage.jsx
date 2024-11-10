import Header from '../ui/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import BookList from '../list/BookList';

function BestBooksPage() {
  useEffect(() => {
    getbooks();
  }, []);

  const [books, setBooks] = useState([]);

  const getbooks = async () => {
    try {
      const response = await api.get('bestbook');
      console.log(response);
      setBooks(response.data);
    } catch (err) {}
  };

  return (
    <div style={{ backgroundColor: '#f4f0ce', minHeight: '100vh' }}>
      <Header />
      <h1
        style={{
          textAlign: 'center', // 텍스트 중앙 정렬
          marginTop: '25px',
          marginBottom: '25px', // 하단 여백 추가
          fontFamily: 'Arial, sans-serif', // 폰트 설정
        }}
      >
        최근 3년 내 무작위 주간 베스트셀러
      </h1>
      <BookList books={books} />
    </div>
  );
}

export default BestBooksPage;
