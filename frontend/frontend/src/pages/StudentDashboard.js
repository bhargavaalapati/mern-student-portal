// src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import api from '../services/api';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { toast } from 'react-toastify'; 


const StudentDashboard = () => {
  // We need setUser from the context to keep everything in sync
  const { user, setUser } = useAuth(); 
  const [profile, setProfile] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/students/profile');
        setProfile(data);
        setName(data.name);
        setEmail(data.email);
        setCourse(data.course);
      } catch (error) {
        console.error('Failed to fetch profile', error);
        setErrorMessage('Could not load profile data.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
        const { data } = await api.put('/students/profile', { name, email, course });
        setProfile(data); 

        // --- THIS IS THE CRUCIAL FIX ---
        // After updating, we need to sync localStorage and the auth context
        const updatedUser = { ...user, name: data.name, email: data.email };
        setUser(updatedUser); // Update context state
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage

        toast.success('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
        toast.error('Failed to update profile. Please try again.');
        console.error('Update failed', error);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ paddingTop: '2rem' }}>
        <div className="w-100" style={{ maxWidth: '600px' }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Student Dashboard</h2>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Enrolled in:</strong> {profile.course}</p>
                    <p><strong>Enrollment Date:</strong> {new Date(profile.enrollmentDate).toLocaleDateString()}</p>
                    
                    <Form onSubmit={handleUpdate} className="mt-4">
                        <h3 className="text-center mb-3">Update Your Profile</h3>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="course" className="mt-3">
                            <Form.Label>Course</Form.Label>
                            <Form.Control type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
                        </Form.Group>
                        
                        <Button className="w-100 mt-4" type="submit">Update Profile</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    </Container>
  );
};

export default StudentDashboard;