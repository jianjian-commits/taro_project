import Taro, { getSystemInfoSync } from "@tarojs/taro"

const getSystemInfo = () => {
  let systemInfo
  try {
    systemInfo = getSystemInfoSync()
  } catch (err) {
    throw new Error("获取系统信息失败")
  }
  console.log(systemInfo)

  const isIOS = systemInfo.system.toLocaleLowerCase().search("ios") !== -1
  let rect
  try {
    // 右上角胶囊信息
    rect = Taro.getMenuButtonBoundingClientRect
      ? Taro.getMenuButtonBoundingClientRect()
      : null
    console.log(rect)
    //取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      throw "获取右上角胶囊信息失败"
    }
  } catch (err) {
    // 如果获取不到就自己定义
    let gap // 胶囊按钮上下间距 使导航内容居中
    let width // 胶囊的宽度
    // 安卓环境下
    if (systemInfo.platform === "android") {
      gap = 8
      width = 96
      // 开发工具环境下
    } else if (systemInfo.platform === "devtools") {
      if (isIOS) {
        gap = 5.5 //开发工具中ios手机
      } else {
        gap = 7.5 //开发工具中android和其他手机
      }
    } else {
      gap = 4
      width = 88
    }
    if (!systemInfo.statusBarHeight) {
      //开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight =
        systemInfo.screenHeight - systemInfo.windowHeight - 20
    }
    rect = {
      //获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width: width,
    }
  }
  let navBarHeight
  if (!systemInfo.statusBarHeight) {
    //开启wifi和打电话下
    systemInfo.statusBarHeight =
      systemInfo.screenHeight - systemInfo.windowHeight - 20
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight
      return 2 * gap + rect.height
    })()

    systemInfo.statusBarHeight = 0
    systemInfo.navBarExtendHeight = 0 //下方扩展4像素高度 防止下方边距太小
  } else {
    navBarHeight = (function () {
      const gap = rect.top - systemInfo.statusBarHeight
      return systemInfo.statusBarHeight + 2 * gap + rect.height
    })()
    if (isIOS) {
      systemInfo.navBarExtendHeight = 4 //下方扩展4像素高度 防止下方边距太小
    } else {
      systemInfo.navBarExtendHeight = 0
    }
  }
  systemInfo.navBarHeight = navBarHeight //导航栏高度不包括statusBarHeight
  systemInfo.capsulePosition = rect //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
  systemInfo.ios = isIOS //是否ios
  return systemInfo
}

export { getSystemInfo }
