import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TLogin {
  userId: string | null;
}

const initialState: TLogin = { userId: null };

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
