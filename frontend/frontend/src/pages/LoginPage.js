// src/pages/LoginPage.js (Polished Version)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login({ email, password });
      // The login function in AuthContext already handles the toast
      if (user.role.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    // Row and Col are used for better alignment and centering
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="shadow-lg">
          <Card.Header as="h3" className="text-center p-3 bg-dark text-white">
            Student Portal Login
          </Card.Header>
          <Card.Body>
            <h4 className="text-center mb-4">🔐 Sign In</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </Form.Group>
              
              <Button variant="primary" className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;