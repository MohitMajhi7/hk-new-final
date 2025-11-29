import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seedUsers } from '../data/seed';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', seedUsers);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user:', error);
      }
    }
  }, []);

  // Persist current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (email, password, role) => {
    const user = users.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      setCurrentUser(user);
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials or role' };
  };

  const signup = ({ name, email, password, role }) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    user: currentUser,
    users,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
