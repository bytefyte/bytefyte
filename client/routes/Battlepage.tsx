import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PreviewPopup from '../componets/PreviewPopup';
import socket from './socket';

/*
TODO LIST
 - Stop Code from excecuting in our DOM
 - Add Cookies? JWTs? Express Session!
 - Check for auth when trying to directly route to /home
*/

type ChatMessage = {
  text: string;
  sender: string;
  time: string;
  youSent: boolean;
};

interface battlePageProps {
  username: string;
  setUsername: Function;
  roomName: string;
  setRoomName: Function;
  problems: problem[];
}

type problem = {
  id: number;
  problem_name: string;
  answer: string;
  difficulty: string;
  problem_question: string;
  editortext: string;
};

const BattlePage = (props: battlePageProps) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: ChatMessage = {
        text: newMessage,
        sender: props.username,
        time: new Date().toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        youSent: true,
      };

      setMessages([...messages, message]);
      setNewMessage('');
      const messageInput = document.getElementById(
        'messageSend',
      ) as HTMLInputElement;
      if (messageInput) {
        messageInput.value = '';
      }
      const roomName = props.roomName;
      socket.emit('sendMessage', {
        roomName,
        message: { ...message, youSent: false },
        username: props.username,
      }); // Here, you ensure you're sending `youSent` as false
    }
  };
  const handleEnterPress =(e: any) =>{
    if(e.key === 'Enter'){handleSendMessage()}
  }
  useEffect(() => {
    const roomName = props.roomName;
    console.log('room name in battlepage:', roomName);

    socket.emit('joinRoom', roomName);
    socket.on('score', username => {
      if (username !== props.username) {
        console.log('updating');
        //we end game if score is 2 its a bo3 series
        console.log('we try to update score');
        //i got 0 clue what the fuck is going on here updating state was not working so no we got this
        // i didnt evven know u could do this
        setOppScore(prevOppScore => {
          const newOppScore = prevOppScore + 1;

          if (newOppScore === 2) {
            // Handle the case where the opponent wins the game
            console.log('Opponent won the game');
            alert('Opponent gapped u gg')
            // Add Game Over Popup and Gray Background Out, give button(s) for Home
            navigate('/home');
          } else {
            // Handle the case where the opponent scores a point
            console.log('Opponent scored a point');
            setCurrentProblem(currentProblem + 1);
          }

          return newOppScore;
        });
      }
    });
    socket.on('receiveMessage', message => {
      console.log('got message:', message);

      // Don't add the message if it's echoed back from the server for the sender
      if (message.sender !== props.username) {
        setMessages(prevMessages => [
          ...prevMessages,
          { ...message, youSent: false },
        ]);
      }
    });

    socket.on('opponentLeft', () => {
      alert('Opponent left');
      navigate('/home'); // navigate back to home
    });

    return () => {
      socket.off('score')
      socket.off('receiveMessage');
      socket.off('opponentLeft');
    };
  }, []);

  return (
    <div className='relative h-screen'>
      <div className='w-1/2 flex flex-col justify-center items-center h-full pb-10'>
        <h3 className='text-4xl font-bold my-10'>{props.problems[currentProblem]?.problem_name || null}</h3>
        <p className='text-lg ml-7 mr-3 mb-10'>{props.problems[currentProblem]?.problem_question || null}</p>
        <div className='divider'></div>
        <div className='flex flex-col justify-center items-center mb-10'>
          <h2 className='text-2xl'>Your Score - Opponent Score</h2>
          <h2 className='text-2xl'>{userScore} - {oppScore}</h2>
        </div>
        <div
          className='justify-self-stretch rounded-lg p-4 border overflow-y-auto w-5/6 mt-auto'
          id='chatWindow'>
          <div id='messageContainer overflow-y'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${message.youSent ? 'chat-start' : 'chat-end'} mb-3`}>
                <div className='chat-image avatar'>
                  <div className='w-10 rounded-full'>
                    <img src='https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg' />
                  </div>
                </div>
                <div className='chat-header'>
                  {message.sender}&nbsp;&nbsp;
                  <time className='text-xs opacity-50'>{message.time}</time>
                </div>
                <div className='chat-bubble'>{message.text}</div>
              </div>
            ))}
          </div>
          <div className='flex'>
            <input
              type='text'
              placeholder='send message'
              className='input input-bordered w-full'
              id='messageSend'
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => handleEnterPress(e)}
            />
            <button className='btn' onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className='absolute top-2 right-1 w-1/2 h-screen bg-base-100'>
        <div className='p-2'>
          <PreviewPopup
            problems={props.problems}
            currentProblem={currentProblem}
            setCurrentProblem={setCurrentProblem}
            setUserScore={setUserScore}
            userScore={userScore}
            roomName={props.roomName}
            username={props.username}
            />
        </div>
      </div>

      {/* <p className='text-5xl font-bold'>
        Scoreboard: {userScore} - {oppScore}{' '}
      </p> */}
      {/* <button    // pretty sure this does nothing, was only added for purpose of testing
        className='btn'
        onClick={() => socket.emit('updateScore', 'idkPP')}>
        emit
      </button> */}
    </div>
  );
};
export default BattlePage;
