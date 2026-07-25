import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('portfolio_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!token;

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    if (data.success) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('portfolio_admin_token', data.token);
      localStorage.setItem('portfolio_admin_user', JSON.stringify(data.user));
      return data;
    }
    throw new Error(data.message || 'Login failed');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
