import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface LoginCheck {
  userId: string | null;
}

const initialState: LoginCheck = { userId: null };

export const loginCheckSlice = createSlice({
  name: 'loginCheck',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<LoginCheck>) => ({
      userId: action.payload.userId,
    }),
    logout: () => ({
      userId: null,
    }),
  },
});

export const { login, logout } = loginCheckSlice.actions;

export default loginCheckSlice.reducer;
