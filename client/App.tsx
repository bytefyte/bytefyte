import React from 'react';
import './input.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import BattlePage from './routes/Battlepage';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />}></Route>
      <Route path='/battle' element={<BattlePage />}></Route>
    </Routes>
  );
};

export default App;
