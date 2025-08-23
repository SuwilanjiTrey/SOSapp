// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const registerUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      subscription: false,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const findUserByPhone = (phoneNumber) =>
    users.find((u) => u.phoneNumber === phoneNumber);

  const validateCredentials = (phoneNumber, password) => {
    const user = findUserByPhone(phoneNumber);
    return user && user.password === password ? user : null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        users,
        login,
        logout,
        registerUser,
        findUserByPhone,
        validateCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
