// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify'; // --- 1. IMPORT TOAST ---

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    const response = await api.post('/users/register', userData);
    // No toast here, we redirect to login after signup
    return response.data;
  };

  const login = async (credentials) => {
    const response = await api.post('/users/login', credentials);
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    toast.success('Welcome! Logged in successfully.'); // --- 2. ADD LOGIN TOAST ---
    return user;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('You have been logged out.'); // --- 3. ADD LOGOUT TOAST ---
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};