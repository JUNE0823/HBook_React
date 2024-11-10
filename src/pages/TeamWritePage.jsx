import { useEffect, useState } from 'react';
import api from '../api/axios';
import Header from '../ui/Header';
import UserList from '../list/UserList';
import { useParams } from 'react-router-dom';
import AddUserForm from '../component/AddUserForm';

function TeamWritePage(props) {
  useEffect(() => {
    getUsers();
  }, []);
  const [users, setUsers] = useState([]);
  const [formVisible, setformVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const { teamname } = useParams();
  const [bookname, setBookname] = useState('책을 선정해주세요');
  const [discuss, setDiscuss] = useState('대화주제를 정해주세요');

  // 팀별 명단 가져오기
  const getUsers = async () => {
    try {
      // 유저가저오기
      const user = await api.get(`/user/team/${teamname}`);
      setUsers(user.data);
      console.log('유저 가져오기', user.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveUser = async (name, age, job, teamname) => {
    const data = {
      username: name,
      age: age,
      job: job,
      teamname: teamname,
    };

    try {
      const response = await api.post('/user', data);
      alert('팀원이 추가 되었습니다.');
      creatNewReport(response.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const creatNewReport = async (userid) => {
    const reportdata = {
      user_id: userid,
      teamname: teamname,
    };
    console.log('이거봐', reportdata);
    try {
      await api.post(`/report/${userid}`, reportdata);
      getUsers(); // 팀원 목록 갱신
    } catch (err) {
      console.log(err);
    }
  };

  // discuss 추첨하기
  const getDiscuss = async () => {
    const randomDiscuss = await api.get(`/report/discuss/${teamname}`);
    setDiscuss(randomDiscuss.data);
  };

  const openAddUserForm = () => {
    setformVisible(!formVisible);
  };

  const handleBookNameChange = (e) => {
    if (isEditing) {
      setBookname(e.target.value);
    }
  };

  const handleEditButtonClick = () => {
    if (isEditing) {
      setBookname(bookname);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div style={{ backgroundColor: '#f4f0ce', minHeight: '100vh' }}>
      <Header />
      <div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* TeamName은 왼쪽 정렬 */}
            <h2>TeamName : {teamname}</h2>

            {/* 나머지 요소는 오른쪽 정렬 */}
            <div className="d-flex align-items-center">
              <h2 className="me-3">selected book :</h2>
              <input
                type="text"
                className="form-control me-3"
                placeholder="책 제목을 입력하세요"
                onChange={handleBookNameChange}
                disabled={!isEditing}
                style={{ width: '300px' }}
              />
              <button
                className="btn btn-primary"
                onClick={handleEditButtonClick}
              >
                {isEditing ? '입력 하기' : '수정 하기'}
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <button
            type="button"
            className="btn btn-success"
            onClick={openAddUserForm}
          >
            팀원 등록하기
          </button>
        </div>

        {formVisible && (
          <AddUserForm onSaveUser={saveUser} teamname={teamname} />
        )}
      </div>
      <div className="container mt-3">
        <UserList user={users} bookname={bookname} teamname={teamname} />
      </div>

      <br />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          className="btn btn-primary"
          value={discuss}
          onClick={getDiscuss}
        >
          random discuss choice
        </button>
      </div>
      <br />
      <div className="container mt-3">
        <h2
          style={{
            textAlign: 'center', // 텍스트 중앙 정렬
            marginBottom: '40px', // 하단 여백 추가
            fontFamily: 'Arial, sans-serif', // 폰트 설정
            backgroundColor: 'navy',
            color: 'white',
          }}
        >
          {discuss}
        </h2>
      </div>
    </div>
  );
}

export default TeamWritePage;
