import React from 'react'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import './NavigationBar.css'
import isaacLogo from './kozi-isaac-logo.png'
import { useHistory } from 'react-router-dom'
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

export default function NavigationBar() {
  const history = useHistory()

  const toLogin = () => {
    history.push("/login")
  }

  const user = useAuthenticatedUser()

  return (
    <Container fluid className="px-0 pb-5" >
      <Navbar className="d-flex" style={{ background: "white", minHeight: 120 }} expand="lg">
        <div style={{ flex: 1 }}>
          <Navbar.Brand className="screen-center" >
            <img
              alt="Kozi Isaac logo"
              src={isaacLogo}
              width="300px"
              className="align-top logo img-fluid"
            />
          </Navbar.Brand>
        </div>

        {user && (
          <Nav>
            <Dropdown>
              <Dropdown.Toggle className='font-weight-bold' variant="none">
                {user.email}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight={true} >
                <Dropdown.Item onClick={user.logout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
        {!user && (
          <Nav>
            <div onClick={toLogin} className="text-center login-buttons">
              <FontAwesomeIcon icon={faSignInAlt} size="3x" />
              <Nav.Link href="login" className="text-decoration-none lead font-weight-bold">Login</Nav.Link>
            </div>
          </Nav>
        )}

      </Navbar>
    </Container>
  )
}