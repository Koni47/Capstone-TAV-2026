import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENTE' | 'CHOFER';
  company?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar token y usuario del localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      const userData = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(userData);
      // Asegurar que los datos estén sincronizados
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
<<<<<<< HEAD
=======
    const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';
    
>>>>>>> 5943737eb8d8a1590347f0fb6f15e9ac1b3d181c
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();
    
    // Guardar token y usuario
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('userEmail', data.user.email);
    localStorage.setItem('userName', data.user.name);
    
    setToken(data.accessToken);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
