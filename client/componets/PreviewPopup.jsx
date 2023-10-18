import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

function PreviewPopup() {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  function success() {}
  const fizzBuzz =
    'const arr = fizzbuzz(31); if(arr[0] === 1 && arr[2] === "fizz" && arr[9] === "buzz") {console.log("you win")};';
  function handleSubmit() {
    const finalString = editorRef.current.getValue() + fizzBuzz;
    try {
      eval(finalString);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <Editor
        height='90vh'
        defaultLanguage='javascript'
        language='javascript'
        defaultValue='// some comment'
        onMount={handleEditorDidMount}
      />
      <button className='btn' onClick={handleSubmit}>
        submit
      </button>
    </div>
  );
}

export default PreviewPopup;
