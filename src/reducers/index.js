import { configureStore } from "@reduxjs/toolkit";

import dataSlice from "./dataSlice";

const middlewares = [];

console.log("environment", process.env);

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger({
    collapsed: true,
  });
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    data: dataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});

export default store;
