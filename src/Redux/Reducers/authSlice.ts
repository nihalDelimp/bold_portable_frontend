import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user : any
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user : {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setuser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
      },
      logout: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload
        state.user = {}
        state.accessToken = null
      },
  },
});

export const { setAccessToken, setIsAuthenticated , setuser , logout } = authSlice.actions;

export default authSlice.reducer;