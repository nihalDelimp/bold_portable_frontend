import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string ;
  user : any,
  isResetPassword : boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  user : {},
  isResetPassword : false
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
    setResetPassword: (state, action: PayloadAction<boolean>) => {
      state.isResetPassword = action.payload;
    },
    setuser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
      },
      logout: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload
        state.user = {}
        state.accessToken = ''
      },
  },
});

export const { setAccessToken, setIsAuthenticated , setResetPassword , setuser , logout } = authSlice.actions;

export default authSlice.reducer;