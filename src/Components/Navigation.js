import React from 'react';
import SearchInput from './SearchInput.js';
import { Nav, Navbar } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home">College Fit For Me</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/cities">Cities</Nav.Link>
              <Nav.Link href="/universities">Universities</Nav.Link>
              <Nav.Link href="/attractions">Attractions</Nav.Link>
              <Nav.Link href="/visualizations">Visualizations</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <SearchInput />
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default Navigation;
