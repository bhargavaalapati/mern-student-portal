// src/pages/AdminDashboard.js - FINAL PAGINATED VERSION
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to read URL
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Table, Button, Card } from 'react-bootstrap';
import EditStudentModal from '../components/EditStudentModal';
import Paginate from '../components/Paginate'; // Import your Paginate component
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { pageNumber } = useParams() || { pageNumber: 1 }; // Get page number from URL

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch students for the specific page number
        const { data } = await api.get(`/students?pageNumber=${pageNumber}`);
        // Set state from the new response object
        setStudents(data.students);
        setPage(data.page);
        setPages(data.pages);
      } catch (error) {
        toast.error('Failed to fetch students');
      }
    };
    fetchStudents();
  }, [pageNumber]); // Add pageNumber as a dependency to re-fetch when it changes

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        await api.delete(`/students/${studentId}`);
        toast.success('Student record deleted successfully!');
        // Re-fetch the current page of students to reflect the deletion
        const { data } = await api.get(`/students?pageNumber=${pageNumber}`);
        setStudents(data.students);
        setPage(data.page);
        setPages(data.pages);
      } catch (error) {
        toast.error('Could not delete student record.');
      }
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
  };

  const handleCloseModal = () => {
    setEditingStudent(null);
  };

  const handleUpdateSuccess = (updatedStudent) => {
    setStudents(students.map((s) => (s._id === updatedStudent._id ? updatedStudent : s)));
  };

  return (
    <Card>
      <Card.Header as="h2" className="text-center">Admin Dashboard</Card.Header>
      <Card.Body>
        <Card.Title>Welcome, {user?.name}!</Card.Title> {/* Display admin's name */}
        <Card.Title>All Student Records</Card.Title>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(student)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(student._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* --- ADD THE PAGINATE COMPONENT AT THE BOTTOM --- */}
        <div className="d-flex justify-content-center">
          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      </Card.Body>

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </Card>
  );
};

export default AdminDashboard;