import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  name: "jianjian",
  age: 10,
}
const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    changeName(state) {
      state.name = "xiaojin"
    },
    changeAge(state, action) {
      console.log(state)
      console.log(action)
    },
  },
})

export const { changeAge, changeName } = taskReducer.actions

export default taskReducer.reducer
