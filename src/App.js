import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Editor from './pages/editor/Editor';
// import Sun from './icons/sun/Sun';
import Navbar from './elements/NavBar/NavBar';
import ResizableDiv from './elements/Resizeable/ResizeableDiv';
import React, {useRef, useEffect, useState} from 'react';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Editor />
      <ResizableDiv />
    </div>
  );
}

export default App;
