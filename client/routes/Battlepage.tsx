import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PreviewPopup from '../componets/PreviewPopup';
type ChatMessage = {
  text: string;
  sender: string;
  time: string;
  youSent: boolean;
};


const BattlePage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message: ChatMessage = {
        text: newMessage,
        sender: 'You', // Replace with the sender's name or ID
        time: new Date().toLocaleTimeString(),
        youSent: true,
      };

interface battlePageProps {
  username: string,
  setUsername: Function
}

const BattlePage = (props: battlePageProps) => {
  return (
    <div className='flex'>
      {/* Your content on the left side */}
      <div className='flex-1'>Your content on the left side</div>

      setMessages([...messages, message]);
      setNewMessage('');
    }
  };
  return (
    <div className='relative h-screen'>
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
    </div>
  );
};
export default BattlePage;
