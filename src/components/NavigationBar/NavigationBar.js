import React from "react";
import { Navbar, Container, Nav, NavDropdown, FormControl, Button, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';
import isaacLogo from './isaac-logo.png'


const NavigationBar = () => {
    return (
        <Container className="container-fluid">
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
            <Navbar bg="light" expand="lg" className="fixed-top">
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
                    <strong><Nav.Link href="#" className="link-text">Settings</Nav.Link></strong>
                </div>
            </Nav>
            </Navbar>
        </Container>
    )
}

export default NavigationBar;