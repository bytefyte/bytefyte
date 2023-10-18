import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PreviewPopup from '../componets/PreviewPopup';
import socket from './socket';
type ChatMessage = {
    text: string;
    sender: string;
    time: string;
    youSent: boolean;
};

interface battlePageProps {
    username: string,
    setUsername: Function,
    roomName: string,
    setRoomName: Function
}

const BattlePage = (props: battlePageProps) => {
    const navigate = useNavigate()
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
      if (newMessage.trim() !== '') {
        const message: ChatMessage = {
          text: newMessage,
          sender: props.username,
          time: new Date().toLocaleTimeString(),
          youSent: true,
        };
    
        setMessages([...messages, message]);
        setNewMessage('');
    
        const roomName = props.roomName;
        socket.emit('sendMessage', { roomName, message: { ...message, youSent: false }, username: props.username }); // Here, you ensure you're sending `youSent` as false
      }
    };

    const handleLeaveRoom = () => {
      const roomName = props.roomName;  // Get this value from your props or however you're passing it to BattlePage
      socket.emit('leaveRoom', roomName);
      navigate('/home');  // navigate back to home
    };
  

    useEffect(() => {
      const roomName = props.roomName; 
    
      console.log('room name in battlepage:', roomName)
    
      socket.emit('joinRoom', roomName);
    
      socket.on('receiveMessage', message => {
        console.log('got message:', message)
    
        // Don't add the message if it's echoed back from the server for the sender
        if (message.sender !== props.username) {
          setMessages(prevMessages => [...prevMessages, { ...message, youSent: false }]);
        }
      });
    
      socket.on('opponentLeft', () => {
        alert('Opponent left');
        navigate('/home');  // navigate back to home
      });
    
      return () => {
        socket.off('receiveMessage');
        socket.off('opponentLeft');
      };
    }, []);
    

    return (
        <div className='relative h-screen'>
            {/* Your content on the left side */}
            <div className='flex-1'>Your content on the left side</div>

            <div
                className='absolute bottom-0 left-0 w-1/4 rounded-lg p-4 border overflow-y'
                id='chatWindow'>
                <div id='messageContainer overflow-y'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat ${message.youSent ? 'chat-start' : 'chat-end'}`}>
                            <div className='chat-image avatar'>
                                <div className='w-10 rounded-full'>
                                    <img src='https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg' />
                                </div>
                            </div>
                            <div className='chat-header'>
                                {message.sender}
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
                    />
                    <button className='btn' onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
            <div className='absolute top-0 right-0 w-1/2 h-screen bg-gray-200'>
                <div className='p-2'>
                    <PreviewPopup></PreviewPopup>
                </div>
            </div>
            <button onClick={handleLeaveRoom}>Leave Room</button>
        </div>
    );
};
export default BattlePage;
