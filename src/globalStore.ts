import { configureStore } from "@reduxjs/toolkit"

import globasReducer from "./globalReducer"
import taskReducer from "./pages/task/reducer"

const store = configureStore({
  reducer: {
    globasReducer,
    taskReducer,
  },
  // 解决 A non-serializable value was detected in an action,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
