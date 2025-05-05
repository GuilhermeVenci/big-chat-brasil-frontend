'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiRequest from '@/utils/api';

const AuthGuard = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await apiRequest('/auth/me');
        if (!user) {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  return <>{children}</>;
};

export default AuthGuard;
