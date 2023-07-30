import { createSlice } from "@reduxjs/toolkit";
const userData = localStorage.getItem("user");
const initialState = userData ? userData : null;
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    setUserEmail(state, action) {
      localStorage.setItem("user", action.payload);
      return action.payload
    },
    setLogout(state, action) {
      localStorage.removeItem("user");
      return action.payload
    },
  },
});

export const { setUser, setUserEmail,setLogout } = userSlice.actions;

export default userSlice.reducer;

export function fetchUser() {
  return async function fetchUserThunk(dispatch) {
    try {
      const data = localStorage.getItem("user");
      dispatch(setUser(data ? data : ""));
    } catch (err) {}
  };
}