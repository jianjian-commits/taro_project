import { createSlice } from "@reduxjs/toolkit"

const globalReducer = createSlice({
  name: "globalReducer",
  initialState: {
    systemInfo: {},
  },
  reducers: {
    setSystemInfo(state, action) {
      state.systemInfo = action.payload
    },
  },
})

export const { setSystemInfo } = globalReducer.actions
export default globalReducer.reducer
