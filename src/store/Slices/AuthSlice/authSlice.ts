import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  user : {id:string, role: string , token: string } | null
}

interface JwtPayload {
  _id:string
  role: string;
  exp: number;
  iat: number;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      try {
        const decoded = jwtDecode<JwtPayload>(action.payload.token);
        state.user = {id:decoded._id, role: decoded.role, token: action.payload.token };
      } catch (error) {
        console.error("Invalid token:", error);
        state.user = null;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer;
