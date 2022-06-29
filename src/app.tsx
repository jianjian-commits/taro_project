import React from "react"
import { useDidShow } from "@tarojs/taro"
import { Provider, useDispatch } from "react-redux"
import globalStore from "./globalStore"
import "./app.less"
import { getSystemInfo } from "./utils"
import { setSystemInfo } from "./globalReducer"

const App = (props) => {
  // const {data, loading } = useRequest(fetchData, {
  //   defaultParams: [{ purchase_order_id: '409818043594571797' }],
  // })

  const Root = ({ children }) => {
    const dispatch = useDispatch()
    useDidShow(() => {
      dispatch(setSystemInfo(getSystemInfo()))
    })
    return <>{children}</>
  }

  return (
    <Provider store={globalStore}>
      <Root {...props} />
    </Provider>
  )
}

export default App
