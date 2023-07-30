import { createSlice } from "@reduxjs/toolkit";
import url from "../url/url";

const initialState = {
  value: [],
  len: 0,
};

export const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
      changed(state, action) {
        const diff = action.payload - state.len; 
        if (action.payload <= 100 && action.payload >= 0) {
          state.value = state.value.map((item) => ({
            ...item,
            value: item.value + diff,
          }));
  
          state.len = action.payload;
        }
      },
      setData(state, action) {
        state.value=action.payload;
      },
    },
  });

export const { changed,setData } = chartSlice.actions;

export default chartSlice.reducer;

export function fetchData() {
  return async function fetchUserThunk(dispatch) {
    try {
      const res = await fetch(`${url}/bars`,
      {
        method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        credentials: "include",
      }
      );
      const result= await res.json();
      console.log(result.data);
      dispatch(setData(result ? result.data : []));
    } catch (err) {}
  };
}