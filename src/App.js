import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './elements/NavBar/NavBar';
import Editor from './pages/Editor/Editor';
import ResizePannel from './elements/ResizePannel/ResizePannel';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Editor />
      {/* <ResizePannel>
        <div>Side</div>
        <div>Left</div>
        <div>Right</div>
      </ResizePannel> */}
    </div>
  );
}

export default App;
