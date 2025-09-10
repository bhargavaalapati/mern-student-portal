// src/pages/SignupPage.js (Polished Version)
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify'; // Import toast for better feedback

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // By default, new signups are 'Student' role
      await signup({ name, email, password, role: 'Student' });
      toast.success('Account created successfully! Please log in.'); // Success feedback
      navigate('/login'); // Redirect to login page
    } catch (err) {
      setError('Failed to create an account. The email might already be in use.');
      console.error(err);
    }
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12} md={6} lg={4}>
        <Card className="shadow-lg">
          <Card.Header as="h3" className="text-center p-3 bg-dark text-white">
            Create Your Account
          </Card.Header>
          <Card.Body>
            <h4 className="text-center mb-4">✍️ Register</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

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
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Col>
    </Row>
  );
};

export default SignupPage;