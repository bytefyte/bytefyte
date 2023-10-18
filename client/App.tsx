import React, { useEffect, useState } from 'react';
import './input.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
import { Routes, Route, useNavigate, BrowserRouter, RouteProps, redirect } from 'react-router-dom';
import Home from './routes/Home';
import BattlePage from './routes/Battlepage';

type problem = {
  id: number;
  problem_name: string;
  answer: string;
  difficulty: string;
  problem_question: string;
  editortext: string;
};

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [problems, setProblems] = useState<problem[]>([]);

  return (
    <Routes>
      <Route
        path='/'
        element={<Login username={username} setUsername={setUsername} />}
      />
      <Route
        path='/signup'
        element={<Signup username={username} setUsername={setUsername} />}
      />
      <Route
        path='/home'
        element={
          <Home
            username={username}
            setUsername={setUsername}
            roomName={roomName}
            setRoomName={setRoomName}
            setProblems={setProblems}
          />
        }
      />
      <Route
        path='/battlePage'
        element={
          <BattlePage
            username={username}
            setUsername={setUsername}
            roomName={roomName}
            setRoomName={setRoomName}
            problems={problems}
          />
        }
      />
    </Routes>
  );
};

export default App;
