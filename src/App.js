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
    </div>
  );
}

export default App;
