// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the route is for admins only and the user is not an admin, redirect
  if (adminOnly && user.role !== 'Admin') {
    // Redirect non-admins from admin routes
    return <Navigate to="/student/dashboard" />;
  }

  // If all checks pass, render the component
  return children;
};

export default ProtectedRoute;