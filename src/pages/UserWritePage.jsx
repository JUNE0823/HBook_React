import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../ui/Header';
import Button from '../ui/Button';
import api from '../api/axios';

function UserWritePage() {
  useEffect(() => {
    getReport();
  }, []);

  const { id } = useParams(); // URL 파라미터에서 userid 추출
  const location = useLocation();
  const bookname = location.state?.bookname;
  const teamname = location.state?.teamname;
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [discuss, setDiscuss] = useState('');
  const [edit, setEdit] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDiscussChange = (e) => {
    setDiscuss(e.target.value);
  };

  const getReport = async () => {
    try {
      const response = await api.get(`/report/${id}`);
      // 데이터가 null이면 저장 모드, null이 아니면 수정 모드
      const content = response.data.content;
      const discuss = response.data.discuss;

      // 데이터가 null이거나 빈 문자열이면 저장 모드로 설정
      if (
        (!content || content.length === 0) &&
        (!discuss || discuss.length === 0)
      ) {
        setEdit(false); // 저장 모드
      } else {
        setContent(response.data.content);
        setDiscuss(response.data.discuss);
        setEdit(true); // 수정 모드
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveReport = async () => {
    const data = {
      bookname: bookname,
      content: content,
      discuss: discuss,
      user_id: id,
      teamname: teamname,
    };
    console.log(data);

    try {
      if (edit) {
        // 수정 모드일 때는 PATCH 요청
        await api.patch(`/report/${id}`, data);
        alert('글이 수정되었습니다.');
      } else {
        // 저장 모드일 때는 POST 요청
        await api.patch(`/report/${id}`, data);
        alert('글이 저장되었습니다.');
      }
      navigate(`/team/${teamname}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f0ce', minHeight: '100vh' }}>
      <Header />
      <div
        className="container mt-3"
        style={{ backgroundColor: '#f4f0ce', minHeight: '100vh' }}
      >
        <br />
        <div className="mb-3">
          <label
            htmlFor="impression"
            className="form-label"
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            인상 깊었던 점
          </label>
          <textarea
            className="form-control"
            id="impression"
            value={content}
            onChange={handleContentChange}
            rows="7" // 텍스트 박스 높이를 설정
            placeholder={edit ? '' : '내용을 작성해 주세요'}
          />
        </div>

        <br />
        <div className="mb-3">
          <label
            htmlFor="discussion"
            className="form-label"
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            대화해 보고 싶은 내용
          </label>
          <textarea
            className="form-control"
            id="discussion"
            value={discuss}
            onChange={handleDiscussChange}
            rows="7" // 텍스트 박스 높이를 설정
            placeholder={edit ? '' : '내용을 작성해 주세요'}
          />
        </div>

        <Button
          title={edit ? '수정하기' : '저장하기'}
          onClick={saveReport}
          className="btn btn-primary"
        />
      </div>
    </div>
  );
}

export default UserWritePage;
