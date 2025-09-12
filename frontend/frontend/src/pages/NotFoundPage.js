// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import notFoundImage from '../assets/not_found.svg'; // Import your downloaded image

const NotFoundPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center" style={{ minHeight: '70vh' }}>
        <Col md={8}>
          <Image src={notFoundImage} fluid style={{ maxHeight: '300px', marginBottom: '2rem' }} />
          <h2>Oops! Page Not Found</h2>
          <p className="text-muted">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button as={Link} to="/" variant="primary">
            Go Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;