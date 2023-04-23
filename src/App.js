import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes, Switch, Redirect } from 'react-router-dom';
import Navbar from './elements/NavBar/NavBar';
import Home from './pages/Home/Home';
import Editor from './pages/Editor/Editor';
import Discussions from './pages/Discussions/Discussions';
import Challenges from './pages/Challenges/Challenges';
import Collaboratory from './pages/Collaboratory/Collaboratory'
import Projects from './pages/Projects/Projects'
import Login from './pages/Utilities/Login/Login'
import Register from './pages/Utilities/Register/Register'
import UserNotifications from './pages/Utilities/UserNotifications/UserNotifications'
import Userpage from './pages/Utilities/Userpage/Userpage'
import UserProjects from './pages/Utilities/UserProjects/UserProjects'
import UserSettings from './pages/Utilities/UserSettings/UserSettings'
function App() {
  const [theme, setTheme] = useState("darktheme")
  const [breakpoint, setBreakpoint] = useState("xxl")
  const [editorBreakpoint, setEditorBreakpoint] = useState(1400)
  useEffect(() => {
    const handleWindowResize = () => {
      setEditorBreakpoint(window.innerWidth)
      if (window.innerWidth >= 1400) setBreakpoint("xxl");
      else if (window.innerWidth >= 1200) setBreakpoint("xl");
      else if (window.innerWidth >= 992) setBreakpoint("lg");
      else if (window.innerWidth >= 768) setBreakpoint("md");
      else if (window.innerWidth >= 567) setBreakpoint("sm");
      else setBreakpoint("xs");
    };
    handleWindowResize(); // initially on load without resize
    window.addEventListener('resize', handleWindowResize);
    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    let mainThemeStored = localStorage.getItem('mainThemeStored')
    if (mainThemeStored) {
      setTheme(mainThemeStored)
    }
  }, [])
  
  return (
    <div className={`App ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <BrowserRouter>
      <Routes>      
          <Route path="/" exact="true" element={
            <Home />
          } />
          <Route path="/editor" element={
            <Editor theme={theme} editorSize={ editorBreakpoint >= 814 ? "lg" : "sm"} />
          } />
          <Route path="/discussions" element={
            <Discussions theme={theme} />
          } />
          <Route path="/challenges" element={
            <Challenges theme={theme} breakpoint={breakpoint} />
          } />
          <Route path="/collaboratory" element={
            <Collaboratory theme={theme} />
          } />
          <Route path="/projects" element={
            <Projects theme={theme} />
          } />
          <Route path="/user" element={
            <Userpage theme={theme} />
          } />
          <Route path="/user/projects" element={
            <UserProjects theme={theme} />
          } />
          <Route path="/user/notifications" element={
            <UserNotifications theme={theme} />
          } />
          <Route path="/user/settings" element={
            <UserSettings theme={theme} />
          } />
          {/* <Route path="/user/singout" element={
            // <UserSingout theme={theme} />
            <UserSettings theme={theme} />
          } /> */}
          <Route path="/user/login" element={
            <Login theme={theme} />
          }/>
          <Route path="/user/register" element={
            <Register theme={theme} />
          }/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
