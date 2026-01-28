import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserPayload, LoginCredentials, RegisterDTO } from "../types/auth.types";
import { authService } from "../services/auth.service";

interface AuthContextType {
  user: UserPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Auth initialization failed", error);
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Re-throw to be handled by the UI
    }
  };

  const register = async (data: RegisterDTO) => {
    try {
      await authService.register(data);
      // Opcional: Auto-login luego del registro si el backend devolviera token
      // O simplemente no hacer nada y dejar que el UI redirija al login
      // En este caso, para ser consistentes con el authService que no devuelve token:
      await login({ email: data.email, password: data.password }); 
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    // Force reload/redirect could be handled here or in UI
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
