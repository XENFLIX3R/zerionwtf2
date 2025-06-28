import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const makeAuthRequest = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Please try again.');
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return { success: true, data: responseData };
    } catch (error) {
      console.error('Auth request error:', error);
      
      // Handle different types of errors
      if (error.name === 'SyntaxError') {
        return { success: false, error: 'Server error. Please try again later.' };
      }
      
      if (error.message.includes('Failed to fetch')) {
        return { success: false, error: 'Network error. Please check your connection.' };
      }

      return { success: false, error: error.message };
    }
  };

  const login = async (username, password) => {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    const result = await makeAuthRequest('/api/login', { username, password });
    
    if (result.success) {
      try {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setUser(result.data.user);
      } catch (error) {
        console.error('Error storing user data:', error);
        return { success: false, error: 'Failed to save login data' };
      }
    }

    return result;
  };

  const register = async (username, password) => {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    const result = await makeAuthRequest('/api/register', { username, password });
    
    if (result.success) {
      try {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        setUser(result.data.user);
      } catch (error) {
        console.error('Error storing user data:', error);
        return { success: false, error: 'Failed to save registration data' };
      }
    }

    return result;
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};