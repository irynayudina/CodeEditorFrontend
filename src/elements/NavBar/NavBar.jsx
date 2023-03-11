import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import './Navbar.scss'
const NavBar = (props) => {  
  const [activeTab, setActiveTab] = useState(window.location.pathname)
    return (
      <Navbar bg={`${props.theme == "lighttheme" ? "primary" : "dark"}`} variant="dark" expand="lg" className={props.theme}> 
      <Container fluid={true}>
        <Navbar.Brand href="/" >Code-Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className={activeTab == '/' ? 'active' : ""}>Home</Nav.Link>
            <Nav.Link href="/editor" exact="true" activeclassname="active" className={activeTab == '/editor' ? 'active' : ""}>Editor</Nav.Link>
            <Nav.Link href="/discussions" className={activeTab == '/discussions' ? 'active' : ""}>Discussions</Nav.Link>
            <Nav.Link href="/challenges" className={activeTab == '/challenges' ? 'active' : ""}>Challenges</Nav.Link>
            <Nav.Link href="/collaboratory" className={activeTab == '/collaboratory' ? 'active' : ""}>Collaboratory</Nav.Link>
            <Nav.Link href="/projects" className={activeTab == '/projects' ? 'active' : ""}>Projects</Nav.Link>
            <NavDropdown title="User menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/user">My page</NavDropdown.Item>
              <NavDropdown.Item href="/user/projects">My projects</NavDropdown.Item>
              <NavDropdown.Item href="/user/notifications">Notifications</NavDropdown.Item>
              <NavDropdown.Item href="/user/messages">Messages</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/settings">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/singout">
                Sing out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
          <Nav className='ms-auto'>
            <Container>
              <Button variant={`${props.theme === "darktheme" ? "primary" : "secondary"}`} size="sm"
                onClick={() => props.setTheme("darktheme")}>Dark</Button>
              <Button variant={`${props.theme === "lighttheme" ? "primary" : "secondary"}`} size="sm"
                onClick={() => props.setTheme("lighttheme")}>Light</Button>
            </Container>
          </Nav>
        </Container>       
    </Navbar>
    )
}

export default NavBar