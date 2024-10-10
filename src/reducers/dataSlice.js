import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("data/getData", async () => {
  const response = await axios.get("https://dummyjson.com/users");
  return response;
});

const dataAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const dataSlice = createSlice({
  name: "role",
  initialState: dataAdapter.getInitialState({
    // value: [
    //   { id: 1, name: "admin" },
    //   { id: 2, name: "viewer" },
    //   { id: 3, name: "admin" },
    // ],
    data: null,
    // text: "some text",
    // text2: {
    //   abc:123,
    // }
  }),
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
    setData: (state, action) => {
      state.text2 = action.payload;
    },
    dataAddOne:dataAdapter.addOne,
    dataRemoveOne:dataAdapter.removeOne
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload.data.users;
    },
  },
});

// action
export const { increment, decrement, updateDynamicData, setData, dataAddOne, dataRemoveOne } = dataSlice.actions;

// state
export const selectData = (state) => state.data;

// reducer
export default dataSlice.reducer;
