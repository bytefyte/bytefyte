import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Editor from '@monaco-editor/react';

function PreviewPopup() {
  return (
    <Editor
      height='120vh'
      defaultLanguage='javascript'
      language='javascript'
      defaultValue='// some comment'
    />
  );
}

export default PreviewPopup;
