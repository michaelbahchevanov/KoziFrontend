import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Logo from './isaac-primary-logo-250px.svg';
import Cog from './Coggers.svg';

export default function NavigationBar() {
  return (
    <Container fluid className='p-0 mb-5'>
      <Navbar
        className='mt-0 w-100 d-flex'
        style={{ background: '#FFFFFF', height: '100px' }}
      >
        <img
          src={Logo}
          alt='Logo'
          style={{
            height: '99px',
            width: '250px',
          }}
          className='ml-auto pt-2'
        />
        <img src={Cog} alt='Cog' className='ml-auto mr-3' />
      </Navbar>
    </Container>
  );
}
