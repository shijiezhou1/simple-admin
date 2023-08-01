import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("data/getData", async () => {
  const response = await axios.get("https://dummyjson.com/users");
  return response;
});

export const dataSlice = createSlice({
  name: "role",
  initialState: {
    value: [
      { id: 1, name: "admin" },
      { id: 2, name: "viewer" },
      { id: 3, name: "admin" },
    ],
    data: null,
    text: "some text",
  },
  reducers: {
    updateDynamicData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    increment: (state) => {
      state.value.push({ id: 4, name: "New role" });
    },
    decrement: (state) => {
      state.value.pop();
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload.data.users;
    },
  },
});

// action
export const { increment, decrement, updateDynamicData } = dataSlice.actions;

// state
export const selectData = (state) => state.data;

// reducer
export default dataSlice.reducer;
