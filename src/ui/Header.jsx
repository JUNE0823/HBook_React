import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // navigate 함수를 사용

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light d-flex justify-content-between align-items-center px-3">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-book me-2"></i>
          <h1 className="mb-0">HBook</h1>
        </div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <button className="btn btn-link" onClick={() => navigate('/')}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-link"
              onClick={() => navigate('/bestbooks')}
            >
              BestBooks
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
