import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '@/types/user';

interface AuthState {
  user: Pick<User, 'id'> | null;
  loading: boolean;
}

const initialState: AuthState = { user: null, loading: true };

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<Pick<User, 'id'>>) => ({
      user: action.payload,
      loading: false,
    }),
    logout: () => ({
      user: null,
      loading: false,
    }),
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
