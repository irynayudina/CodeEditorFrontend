import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './elements/NavBar/NavBar';
import Editor from './pages/Editor/Editor';
import ResizePannel from './elements/ResizePannel/ResizePannel';

function App() {
  const [theme, setTheme] = useState("darktheme")
  return (
    <div className={`App ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Editor theme={theme}/>
    </div>
  );
}

export default App;
