// src/components/Navbar.js (Corrected - No LinkContainer)
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container fluid>
        {/* We now use the 'as' prop to make the brand a Link */}
        <Navbar.Brand as={Link} to="/">
          Student Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                {/* Same 'as' prop pattern for the Nav.Link */}
                <Nav.Link as={Link} to={user.role.toLowerCase() === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>
                    Dashboard
                </Nav.Link>
                <Button variant="outline-light" onClick={logout} className="ms-2">Logout</Button>
              </>
            ) : (
              <>
                {/* Apply the pattern to all Nav.Links */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;