import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import all your components
import AppNavbar from './components/Navbar'; 
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import { Container } from 'react-bootstrap';

function App() {
  const { user, loading } = useAuth();

  // This check prevents rendering issues while we wait to see if a user is logged in
  if (loading) {
    return <div>Loading Application...</div>;
  }

  return (
    <Router>
      {user && <AppNavbar />} {/* Your new navbar component goes here */}
      <Container className="py-4"> 
      <main className="py-4">
          <Routes>
            {/* Logic to redirect users after they log in */}
            <Route 
              path="/" 
              element={!user ? <LoginPage /> : (user.role === 'Admin' ? <Navigate to="/admin/dashboard" /> : <Navigate to="/student/dashboard" />)} 
            />
            
            {/* Prevent logged-in users from seeing login/signup pages */}
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            
            {/* Your Protected Dashboard Routes */}
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} 
            />
            <Route path="/admin/dashboard/:pageNumber" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
            <Route 
              path="/student/dashboard" 
              element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </main>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Router>
  );
}

export default App;