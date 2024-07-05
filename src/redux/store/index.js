import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../reducers/modal";
import userReducer from "../reducers/user";
import userDetailsReducer from "../reducers/userDetails";
export default configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    userdetails: userDetailsReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware({
      serializableCheck: false,
    }),
});
