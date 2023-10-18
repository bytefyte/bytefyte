import React, {useState} from 'react';
import './input.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import BattlePage from './routes/BattlePage';
const App: React.FC = () => {
  const [username, setUsername] = useState('');
  return (
    <Routes>
      <Route path='/' element={<Login username={username} setUsername={setUsername}/>} />
      <Route path='/signup' element={<Signup username={username} setUsername={setUsername}/>} />
      <Route path='/home' element={<Home username={username} setUsername={setUsername}/>} />
      <Route path='/battlePage' element={<BattlePage username={username} setUsername={setUsername}/>} />
    </Routes>
  );
};

export default App;
