import React, { useCallback } from "react"
import { View, Text } from "@tarojs/components"
import { useSelector } from "react-redux"
import "./index.less"

const NavBar = (props) => {
  const systemInfo = useSelector(
    (state) => (state as any).globasReducer.systemInfo
  )

  const setStyle = () => {
    const {
      statusBarHeight,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      windowWidth,
    } = systemInfo
    const { back, home, title, color } = props
    const rightDistance = windowWidth - capsulePosition.right //胶囊按钮右侧到屏幕右侧的边距
    const leftWidth = windowWidth - capsulePosition.left //胶囊按钮左侧到屏幕右侧的边距

    // 设置最外层容器的样式，宽度要减去胶囊的
    const navigationbarinnerStyle = {
      color,
      height: navBarHeight + navBarExtendHeight,
      paddingTop: statusBarHeight,
      paddingRight: leftWidth,
      paddingBottom: navBarExtendHeight,
    }

    let navBarLeft
    // 返回上一层和返回home只有一个存在时
    if ((back && !home) || (!back && home)) {
      navBarLeft = {
        width: capsulePosition.width,
        height: capsulePosition.height,
        marginLeft: 0,
        marginRight: rightDistance,
      }
      // 两个按钮都存在 或者 标题存在时
    } else if ((back && home) || title) {
      navBarLeft = {
        width: capsulePosition.width,
        height: capsulePosition.height,
        marginLeft: rightDistance,
      }
    } else {
      navBarLeft = {
        width: "auto",
        marginLeft: 0,
      }
    }
    return {
      navigationbarinnerStyle,
      navBarLeft,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance,
    }
  }

  const handleSearchClick = () => {}

  const {
    navigationbarinnerStyle,
    navBarLeft,
    navBarHeight,
    capsulePosition,
    navBarExtendHeight,
    ios,
    rightDistance,
  } = setStyle()

  console.log(systemInfo)
  console.log(navBarExtendHeight)

  const {
    title,
    background,
    backgroundColorTop,
    back,
    home,
    searchBar,
    searchText,
    iconTheme,
    extClass,
    renderCenter,
    renderLeft,
    renderRight,
  } = props

  let nav_bar_center
  if (title) {
    nav_bar_center = (
      <Text
        style={{
          fontWeight: "normal",
        }}
      >
        {title}
      </Text>
    )
  } else if (searchBar) {
    nav_bar_center = (
      <View
        className='nav-bar-search'
        style={{
          height: capsulePosition.height,
        }}
        onClick={handleSearchClick}
      >
        <View className='nav-bar-search__icon' />
        <View className='nav-bar-search__input'>{searchText}</View>
      </View>
    )
  } else {
    nav_bar_center = renderCenter
  }

  return (
    <View
      className={extClass}
      style={{
        background: backgroundColorTop ? backgroundColorTop : background,
        height: navBarHeight + navBarExtendHeight,
      }}
    >
      <View
        className='nav-bar__inner'
        style={{
          ...navigationbarinnerStyle,
          background,
        }}
      >
        <View className='nav-bar__left' style={navBarLeft}>
          {back && !home && (
            <View
              onClick={() => {}}
              className={`nav-bar__button nav-bar__btn_goback ${iconTheme}`}
            />
          )}
          {!back && home && (
            <View
              onClick={() => {}}
              className={`nav-bar__button nav-bar__btn_gohome ${iconTheme}`}
            />
          )}
          {back && home && (
            <View className='nav-bar__buttons'>
              <View
                onClick={() => {}}
                className={`nav-bar__button nav-bar__btn_goback ${iconTheme}`}
              />
              <View
                onClick={() => {}}
                className={`nav-bar__button nav-bar__btn_gohome ${iconTheme}}`}
              />
            </View>
          )}
          {!back && !home && renderLeft}
        </View>
        <View
          className='nav-bar__center'
          style={{ paddingLeft: rightDistance }}
        >
          {nav_bar_center}
        </View>
        <View className='nav-bar__right' style={{ marginRight: rightDistance }}>
          {renderRight}
        </View>
      </View>
    </View>
  )
}

export default NavBar
