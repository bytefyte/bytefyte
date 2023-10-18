import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket';

interface homeProps {
  username: string;
  setUsername: Function;
  roomName: string;
  setRoomName: Function;
}

const Home = (props: homeProps) => {
  const navigate = useNavigate();
  const [queued, queuedState] = useState(false);
  useEffect(() => {
    socket.on('matchFound', data => {
      console.log('Match found!', data.roomName);
      props.setRoomName(data.roomName);
      navigate('/battlePage');
    });
    return () => {
      if (intervalId) clearInterval(intervalId);
      socket.off('matchFound');
    };
  }, []);

  const handleQueueClick = () => {
    queuedState(!queued);
    socket.emit('joinQueue', props.username);
  };

  let intervalId: number;
  let second: number;
  let minute: number;

  useEffect(() => {
    if (queued) {
      second = 0;
      minute = 0;
      intervalId = window.setInterval(() => {
        if (second === 60) {
          minute++;
          second = 0;
        } else {
          second++;
        }
        console.log('clock is increasing', minute, second);
        document
          .getElementById('minute')
          ?.style.setProperty('--value', String(minute));
        document
          .getElementById('second')
          ?.style.setProperty('--value', String(second));
      }, 1000);
    } else {
      minute = 0;
      second = 0;
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    // Clean up interval on component unmount or when queued changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [queued]);

  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content text-center'>
          <div className='max-w-xl'>
            <h1 className='text-8xl font-bold text-center pb-8'>ByteFyte</h1>
            <h1 className='text-5xl font-bold text-center'>
              Welcome {props.username}
            </h1>
            <p className='py-6 text-3xl'>
              Hone your skills
              <br />
              Prove your strength
              <br />
              Win
            </p>
            {queued ? (
              <button
                className='btn btn-primary btn-wide text-2xl'
                onClick={e => queuedState(false)}>
                <span className='loading loading-spinner'></span> Queued
              </button>
            ) : (
              <button
                className='btn btn-primary btn-wide text-2xl'
                onClick={e => handleQueueClick()}>
                Fyte!
              </button>
            )}
            {/* TODO: Implement counting up, and reseting whenever queue is cancelled/ends */}
            {queued ? (
              <div>
                <div className='divider'></div>
                <span className='countdown text-4xl'>
                  <span
                    id='minute'
                    style={{ '--value': '0' } as React.CSSProperties}></span>
                  m
                  <span
                    id='second'
                    style={{ '--value': '0' } as React.CSSProperties}>
                    s
                  </span>
                  s
                </span>
              </div>
            ) : (
              <span></span>
            )}
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
