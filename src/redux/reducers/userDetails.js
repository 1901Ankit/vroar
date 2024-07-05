import { createSlice } from "@reduxjs/toolkit";

const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    role: "",
    companyId: "",
    logo: null,
  },
  reducers: {
    user: (state, actions) => {
      return (state = actions.payload);
    },
    ClearUserData: (state, actions) => {
      return (state = initialState);
    },
  },
});

export const { user, ClearUserData } = userDetails.actions;
export default userDetails.reducer;
