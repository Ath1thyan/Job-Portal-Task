import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="header">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Job Portal</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
