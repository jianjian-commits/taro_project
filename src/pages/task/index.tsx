import React from "react"
import { navigateTo } from "@tarojs/taro"
import { View, Button } from "@tarojs/components"
import "./index.less"

const Task = () => {
  const jupToPage = (name: string) => {
    navigateTo({
      url: `/pages/${name}/index`,
    })
  }
  return (
    <View>
      <Button onClick={() => jupToPage("location")}>定位</Button>
    </View>
  )
}

export default Task
