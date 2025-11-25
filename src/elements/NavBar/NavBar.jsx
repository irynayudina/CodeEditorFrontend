import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.scss'

import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice'

const NavBar = (props) => {  
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const toggleTheme = () => {
    const newTheme = props.theme === "lighttheme" ? "darktheme" : "lighttheme";
    props.setTheme(newTheme);
    localStorage.setItem("mainThemeStored", newTheme);
  }

  const isDark = props.theme === "darktheme";

  return (
    <Navbar
      expand="lg"
      className={`modern-navbar ${props.theme}`}
      variant={isDark ? "dark" : "light"}
    >
      <Container fluid={true}>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-modern">
          Code-Network <span className="brand-accent">&lt;/&gt;</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-modern" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={`nav-link-modern ${activeTab === "/" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/editor"
              className={`nav-link-modern ${activeTab.startsWith("/editor") ? "active" : ""}`}
            >
              Editor
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/discussions"
              className={`nav-link-modern ${activeTab.startsWith("/discussions") ? "active" : ""}`}
            >
              Discussions
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/projects"
              className={`nav-link-modern ${activeTab === "/projects" ? "active" : ""}`}
            >
              Projects
            </Nav.Link>
            {userInfo ? (
              <NavDropdown 
                title={userInfo.name} 
                id="basic-nav-dropdown"
                className="user-dropdown-modern"
              >
                <NavDropdown.Item as={Link} to="/user#projects">
                  My projects
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user#discussions">
                  Discussions
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user#people">
                  People
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/user#settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ""
            )}
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            <div className="theme-toggle-container">
              <button
                className={`theme-toggle ${isDark ? "dark" : "light"}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className="theme-toggle-slider">
                  <span className="theme-toggle-icon">
                    {isDark ? <FaMoon /> : <FaSun />}
                  </span>
                </span>
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar