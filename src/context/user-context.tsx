'use client';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import apiRequest from '@/utils/api';
import { UserTypes } from '@/types/user';

interface UserContextProps {
  user: UserTypes | null;
  resetUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserTypes | null>(null);

  const resetUser = useCallback(() => setUser(null), []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiRequest('/auth/me');
        setUser(user);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
