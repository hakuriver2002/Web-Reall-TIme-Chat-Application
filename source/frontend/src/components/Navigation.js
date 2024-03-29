import React from 'react'
import logo from "../assets/logo_tdtu.png"
import {Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap'
import {useLogoutUserMutation} from '../services/serverAPI'
import { useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
const Navigation = () => {
  const user = useSelector((state) => state.user)
  const [logoutUser] = useLogoutUserMutation()

  const handleLogout = async (e) => {
    e.preventDefault()
    await logoutUser(user)
    // redirect to home page
    window.location.replace("/")
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/" >
            <Navbar.Brand >
                <img src={logo} style={{width: 50, height: 50}} alt='TDTU' />
            </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link> 
              </LinkContainer>
            )}
            
            <LinkContainer to="/chat">
            <Nav.Link>Chat</Nav.Link> 
            </LinkContainer>
            {user && (
              <NavDropdown title={
                <>
                  <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%"}} />
                  {user.username}
                </>
              } id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Help</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Rate app</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <Button variant='danger' onClick={handleLogout}>Logout</Button>
              </NavDropdown.Item>
            </NavDropdown>
            )}    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation