import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import socket from '../routes/socket';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router';
// yes this is a jsx file monaco editor did not like tsx files so i changed it. its probably doable in tsx jsut pretend its type safe
function PreviewPopup({
  problems,
  currentProblem,
  setCurrentProblem,
  setUserScore,
  userScore,
  roomName,
  username,
}) {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {

    socket.on('opponentLeft', () => {
      alert('Opponent left');
      navigate('/home'); // navigate back to home
    });

    return () => {
      socket.off('opponentLeft');
    };
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  };
  // this function get triggered when we run that eval down there
  // we go to next problem if we get it right and let the other player know
  function success() {
    console.log('u get point');
    setCurrentProblem(currentProblem + 1);
    setUserScore(userScore + 1);
    //if user is at 2 they win game make something cool happen ig
    if (userScore + 1 >= 2) {
      console.log('u gapped that noob');
      navigate('/home');
    }
    socket.emit('updateScore', { roomName, username });
  };

  function fail() {
    console.log('u dont get point');
  };

  const problemTest = problems[currentProblem]?.answer;
  
  function handleSubmit() {
    const finalString = editorRef.current.getValue() + problemTest;
    try {
      eval(finalString);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeaveRoom = () => {
    // const roomName = roomName; // Get this value from your props or however you're passing it to BattlePage
    socket.emit('leaveRoom', roomName);
    navigate('/home'); // navigate back to home
  };

  return (
    <div className='flex flex-col'>
      <Editor
        theme='vs-dark'
        height='90vh'
        defaultLanguage='javascript'
        language='javascript'
        defaultValue='// some comment'
        onMount={handleEditorDidMount}
      />
      <div className='flex gap-5 mx-5 mt-7 justify-center items-center'>
        <button onClick={handleLeaveRoom} className='btn btn-wide'>
          Leave Room
        </button>
        <button className='btn px-60' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PreviewPopup;
