import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './elements/NavBar/NavBar';
import Editor from './pages/Editor/Editor';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import ProductsPage from './pages/ProductsPage';
// import NotFoundPage from './pages/NotFoundPage';

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
      console.log(breakpoint, " ", window.innerWidth)
    };
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
    window.removeEventListener('resize', handleWindowResize);
    };
}, [breakpoint]);
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={HomePage} />
    //     <Route path="/about" component={AboutPage} />
    //     <Route path="/contact" component={ContactPage} />
    //     <Route path="/products" component={ProductsPage} />
    //     <Route path="*" component={NotFoundPage} />
    //   </Switch>
    // </Router>
    <div className={`App ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Editor theme={theme} editorSize={ editorBreakpoint >= 814 ? "lg" : "sm"} />
    </div>
  );
}

export default App;
