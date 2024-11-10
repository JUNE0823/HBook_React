import Header from '../ui/Header';
import { useEffect, useState } from 'react';
import api from '../api/axios';

import booklogo from '../assets/booklogo.png';
import TeamList from '../list/TeamList';

function HomePage() {
  const [lst, setLst] = useState([]);
  const [teamname, setTeamname] = useState('');

  useEffect(() => {
    getlst();
  }, []);

  const getlst = async () => {
    try {
      const response = await api.get('team');
      setLst(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlerTeamname = (e) => {
    setTeamname(e.target.value);
  };

  const createTeam = async () => {
    const team = {
      teamname: teamname,
    };

    try {
      await api.post('/team', team);
      getlst();
      setTeamname('');
    } catch (err) {}
  };

  const deleteHandler = async (event, teamname) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    try {
      await api.delete(`/team/${teamname}`);
      alert('팀이 삭제되었습니다');
      getlst();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f0ce', minHeight: '100vh' }}>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '40vh' }}
      >
        <img height={300} src={booklogo} alt="booklogo" />
      </div>
      <div
        style={{
          textAlign: 'center', // 텍스트 중앙 정렬
          marginBottom: '40px', // 하단 여백 추가
          fontFamily: 'Arial, sans-serif', // 폰트 설정
        }}
      >
        <h2
          style={{
            fontSize: '2.0rem', // 폰트 크기 설정
            fontWeight: 'bold', // 글씨 두께 설정
          }}
        >
          Hobby Book
        </h2>
      </div>
      <div
        style={{
          textAlign: 'center', // 텍스트 중앙 정렬
          marginBottom: '30px', // 하단 여백 추가
          fontFamily: 'Arial, sans-serif', // 폰트 설정
        }}
      >
        <input
          type="text"
          value={teamname}
          onChange={handlerTeamname}
          placeholder="팀 이름을 적어주세요"
        />
        <button
          type="button"
          class="btn btn-success"
          onClick={createTeam}
          disabled={teamname.trim() === ''}
        >
          팀 생성하기
        </button>
      </div>

      <TeamList data={lst} onDelete={deleteHandler} />
    </div>
  );
}

export default HomePage;
