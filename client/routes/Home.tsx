import React, {useEffect, useState } from 'react';
import { useNavigate} from 'react-router';
import { io } from "socket.io-client";

const socket = io('http://localhost:3000')

interface homeProps {
  username: string,
  setUsername: Function
}

const Home = (props:homeProps) => {
  const [queued, queuedState] = useState(false);
  useEffect(() => {
    socket.on('joinMatch', () => {
      console.log('joined match!')
    });
   return () => {
      socket.off('whateva');
    };
  }, []);

  const handleQueueClick = () => {
    queuedState(!queued);
    socket.emit('whateva')
  }

  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-md max-h-lg'>
            <h1 className='text-8xl font-bold text-center'>ByteFyte</h1>
            <h1 className='text-8xl font-bold text-center'>Welcome {props.username}</h1>
            <p className='py-6 text-3xl'>Hone your skills<br/>Prove your strength<br/>Win</p>
            {queued ? <button className='btn btn-primary btn-wide text-2xl' onClick={(e) => queuedState(false)}><span className='loading loading-spinner'></span> Queued</button> :
            <button className='btn btn-primary btn-wide text-2xl' onClick={(e) => handleQueueClick()}>Fyte!</button>}
            {/* TODO: Implement counting up, and reseting whenever queue is cancelled/ends */}
            {queued ? <div><div className='divider'></div><span className='countdown text-4xl'><span style={{'--value': '0'} as React.CSSProperties}></span></span></div> : <span></span>}
          </div>
        </div>
      </div>
      {/* This is for the glowing background */}
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
      <div className='glowing'>
        <span style={{ '--i': '1' } as React.CSSProperties}></span>

        <span style={{ '--i': '2' } as React.CSSProperties}></span>

        <span style={{ '--i': '3' } as React.CSSProperties}></span>
      </div>
    </div>
  );
};
export default Home;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

// function App() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);



//   const sendMessage = (e) => {
//     e.preventDefault();
//     socket.emit('chat message', message);
//     setMessage('');
//   };

//   return (
//     <div>
//       <ul id="messages">
//         {chat.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <form id="form" action="" onSubmit={sendMessage}>
//         <input
//           id="input"
//           autoComplete="off"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button>Send</button>
//       </form>
//     </div>
//   );
// }

// export default App;

