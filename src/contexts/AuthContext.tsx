
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation for demo purposes
// In a real app, this would connect to your backend authentication service
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - would be replaced with actual API call
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, accept any email/password with basic validation
      if (!email.includes('@') || password.length < 6) {
        return false;
      }
      
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - would be replaced with actual API call
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic validation
      if (!email.includes('@') || password.length < 6) {
        return false;
      }
      
      const mockUser = {
        id: '1',
        name,
        email,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
