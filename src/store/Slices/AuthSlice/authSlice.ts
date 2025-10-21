import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user : { role: string , token: string } | null
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer;
