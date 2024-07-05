import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  role: "",
  isAuthenticated: false,
  loginToken: "",
};
const user = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      return (state = actions.payload);
    },
    logout: (state) => {
      return (state = initialState);
    },
  },
});
export const { login, logout } = user.actions;
export default user.reducer;
