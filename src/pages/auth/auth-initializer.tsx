import { useEffect } from 'react';

import Axios from '@api/axios';
import { useAppDispatch } from '@store/hooks';
import { login, logout } from '@store/slices/auth-slice';

import { User } from '@/types/user';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: user }: { data: User } = await Axios.get<User>('/users');
        dispatch(login({ id: user.id }));
      } catch (err) {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthInitializer;
