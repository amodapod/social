'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // Add other user-related methods as needed
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user session on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        // TODO: Implement actual user session loading logic
        // const userData = await fetchUser();
        // setUser(userData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load user session');
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login logic
      // const userData = await loginUser(email, password);
      // setUser(userData);
    } catch (err) {
      setError('Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // TODO: Implement logout logic
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
