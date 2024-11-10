import { useState } from 'react';

function AddUserForm({ onSaveUser, teamname }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 정보가 입력되었을 때만 사용자 추가
    if (name && age && job) {
      onSaveUser(name, age, job, teamname);
      setName('');
      setAge('');
      setJob('');
    } else {
      alert('모든 정보를 입력해야 합니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>이름:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
      <div>
        <label>나이:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="나이를 입력하세요"
        />
      </div>
      <div>
        <label>직업:</label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="직업을 입력하세요"
        />
      </div>
      <button type="submit">팀원 추가하기</button>
    </form>
  );
}

export default AddUserForm;
