import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.scss'
const NavBar = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" >Code-Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#editor" exact activeClassName="active">Editor</Nav.Link>
            <Nav.Link href="#discussions">Discussions</Nav.Link>
            <Nav.Link href="#challenge">Challenges</Nav.Link>
            <Nav.Link href="#comparefiles">CompareFiles</Nav.Link>
            <Nav.Link href="#collaboratory">Collaboratory</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <NavDropdown title="User menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My page</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My projects</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Notifications</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Messages</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Sing out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
        <Container>Themes</Container>
    </Navbar>
    )
}

export default NavBar