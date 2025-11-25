import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './elements/NavBar/NavBar';
import Home from './pages/Home/Home';
import Editor from './pages/Editor/Editor';
import Discussions from './pages/Discussions/Discussions';
import Discussion from './pages/Discussion/Discussion';
import Projects from './pages/Projects/Projects';
import SignUp from './pages/Utilities/Register/SignUp';
import SignIn from './pages/Utilities/Login/SignIn';
import Userpage from './pages/Utilities/Userpage/Userpage';
import UserProjects from './pages/Utilities/UserProjects/UserProjects';
import UserSettings from './pages/Utilities/UserSettings/UserSettings';
import PublicUserpage from './pages/Utilities/PublicUserpage/PublicUserpage';
import RedirectElem from './RedirectElem';
import CollabEditor from './pages/Collaboratory/CollabEditor';
import PrivateRoute from './private/PrivateRoute';

import { useLocalStorage, useWindowResize } from './hooks';
import { THEMES, EDITOR_BREAKPOINTS } from './config/constants';

function App() {
  const [theme, setTheme] = useLocalStorage('mainThemeStored', THEMES.LIGHT);
  const { width } = useWindowResize();
  const editorSize = width >= EDITOR_BREAKPOINTS.SMALL ? "lg" : "sm";
  
  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Navbar theme={theme} setTheme={setTheme} />
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/editor/:id"
            element={
              <Editor
                theme={theme}
                editorSize={editorSize}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <Editor
                theme={theme}
                editorSize={editorSize}
              />
            }
          />
          <Route path="/discussions" element={<Discussions theme={theme} />} />
          <Route
            path="/discussion/:id"
            element={<Discussion theme={theme} />}
          />
          <Route
            path="/collaboratory"
            element={<RedirectElem />}
          />
          <Route path="/documents/:id" element={<CollabEditor />} />
          <Route path="/projects" element={<Projects theme={theme} />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<Userpage theme={theme} />} />
            <Route
              path="/user/projects"
              element={<UserProjects theme={theme} />}
            />
            <Route
              path="/user/settings"
              element={<UserSettings theme={theme} />}
            />
          </Route>
          <Route
            path="/public/user/:id"
            element={<PublicUserpage theme={theme} />}
          />
          <Route path="/login" element={<SignIn theme={theme} />} />
          <Route path="/register" element={<SignUp theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
