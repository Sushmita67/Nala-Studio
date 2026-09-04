import React, { createContext, useContext, useState, useEffect } from 'react';
import { users, User } from '../data/dummyData';

interface AuthContextType {
  currentUser: User | null;
  // login: (email: string, password: string) => Promise<boolean>;
  // register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!currentUser);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('currentUser');
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  // const login = async (email: string, password: string): Promise<boolean> => {
  //   // Simulate API call
  //   const user = users.find(u => u.email === email);
  //   if (user) {
  //     setCurrentUser(user);
  //     return true;
  //   }
  //   return false;
  // };

  // const register = async (userData: Partial<User>): Promise<boolean> => {
  //   // Simulate API call
  //   const newUser: User = {
  //     id: (users.length + 1).toString(),
  //     name: userData.name || '',
  //     email: userData.email || '',
  //     phone: userData.phone || '',
  //     loyaltyPoints: 0,
  //     membership: 'basic',
  //     favoriteTechs: [],
  //     preferences: {
  //       notifications: true,
  //       darkMode: false
  //     }
  //   };
  //
  //   // In a real app, this would be an API call
  //   users.push(newUser);
  //   setCurrentUser(newUser);
  //   return true;
  // };

  // const logout = () => {
  //   setCurrentUser(null);
  // };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}; 