import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BestBooksPage from './pages/BestBooksPage';
import TeamWritePage from './pages/TeamWritePage';
import UserWritePage from './pages/UserWritePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/bestbooks" element={<BestBooksPage />}></Route>
        <Route path="/team/:teamname" element={<TeamWritePage />}></Route>
        <Route path="/report/:id" element={<UserWritePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
