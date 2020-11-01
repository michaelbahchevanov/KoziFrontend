import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';
import isaacLogo from './isaac-logo.png'


export default function NavigationBar() {
  return (
    <Container fluid className='p-0 mb-5'>
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
      <Navbar bg="light" expand="lg">
            <Navbar.Brand className="m-auto">
                <img
                    alt=""
                    src={isaacLogo}
                    width="200px"
                    className="align-top logo img-fluid"
                />
            </Navbar.Brand>
            <Nav>
                <div className="text-center">
                    <i className="fa fa-cog link-icon" aria-hidden="true" />
                    <strong><Nav.Link href="#" className="link-text text-decoration-none">Settings</Nav.Link></strong>
                </div>
            </Nav>
      </Navbar>
    </Container>
  );
}
