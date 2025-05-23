import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; 
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { setLoggedIn, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
