import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import './NavigationBar.css';
import isaacLogo from './isaac-logo.png'
import LoginPage from '../LoginPage/LoginPage';
import { useHistory } from 'react-router-dom';

export default function NavigationBar() {
  const history = useHistory();

  const toLogin = () => {
      history.push("/login");
  }


  return (
      <Container fluid className="px-0 pb-5" >
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <Navbar style={{ background: "white" }} expand="lg">
          <Navbar.Brand className="m-auto">
            <img
              alt=""
              src={isaacLogo}
              width="150px"
              className="align-top logo img-fluid"
            />
          </Navbar.Brand>
          <Nav>
            <div className="text-center">
              <i className="fa fa-sign-in link-icon" aria-hidden="true" />
              <strong><Nav.Link href="#" onClick={toLogin} className="link-text text-decoration-none">Login</Nav.Link></strong>
            </div>
          </Nav>
        </Navbar>
      </Container>
  );
}