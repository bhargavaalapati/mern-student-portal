// src/components/EditStudentModal.js (Refactored with React Bootstrap and Toasts)
import React, {useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';

const EditStudentModal = ({ student, onClose, onUpdateSuccess }) => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    useEffect(() => {
        if (student) {
            setName(student.name);
            setCourse(student.course);
        }
    }, [student]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: updatedStudent } = await api.put(`/students/${student._id}`, { name, course });
            toast.success('Student updated successfully!'); // Success toast
            onUpdateSuccess(updatedStudent);
            onClose();
        } catch (error) {
            toast.error('Failed to update student'); // Error toast
            console.error('Update failed.', error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formStudentName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentCourse">
                        <Form.Label>Course</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={course} 
                            onChange={(e) => setCourse(e.target.value)} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditStudentModal;