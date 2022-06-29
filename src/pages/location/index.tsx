import React, { useEffect, useState } from "react"
import Taro, {
  getLocation,
  openLocation,
  chooseLocation,
  startLocationUpdate,
  onLocationChange,
} from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import QQMapWX from "../packages/qqmap-wx-jssdk"
import "./index.less"

const Location = () => {
  const [postion, setPostion] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [address, setAddress] = useState<string>("")
  const [addressLong, setAddressLong] = useState<string>("")
  const getPositon = () => {
    getLocation({}).then(({ latitude, longitude }) => {
      setPostion({
        latitude,
        longitude,
      })
      openLocation({
        latitude,
        longitude,
        scale: 12,
      })
    })
  }

  const openMap = () => {
    chooseLocation({
      ...postion,
    }).then((result) => {
      setAddress(result.address)
    })
  }

  const addeventFn = ({ latitude, longitude }) => {
    new QQMapWX({
      key: "BLTBZ-BYNLK-EGBJR-AR5N4-HJZ5T-Z7FUT",
    }).reverseGeocoder({
      location: {
        latitude,
        longitude,
      },
      success: ({ result }) => {
        console.log(result.address, "resultAddree...")
        setAddressLong(result.address)
      },
      fail: (err) => {
        console.log(err, "err...")
      },
    })
  }

  /** @description 监听位置变化 */
  const locationFn = () => {
    startLocationUpdate({
      success: (res) => {
        onLocationChange(addeventFn)
      },
      fail: (res) => {
        console.log(res, "fail")
      },
    })
  }

  const oepnLongPostion = () => {
    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting["scope.userLocation"]) {
          Taro.authorize({
            scope: "scope.userLocation",
          })
            .then(() => {
              locationFn()
            })
            .catch((err) => {
              console.log(err, "err...")
            })
        } else {
          locationFn()
        }
      },
    })
  }

  /** @description 取消监听位置变化 */
  useEffect(() => {
    return () => {
      console.log("卸载...")
      Taro.stopLocationUpdate({
        success: function () {
          console.log("取消监听成功...")
          Taro.offLocationChange(({ errMsg }) => {
            console.log(errMsg, "errMsg...")
          })
        },
      })
    }
  }, [])

  return (
    <View>
      <Button onClick={() => getPositon()}>查看当前位置</Button>
      <Button onClick={() => openMap()}>打开地图选择位置</Button>
      <Text>位置: {address}</Text>
      <Button onClick={() => oepnLongPostion()}>开启实时定位</Button>
      <Text>位置: {addressLong}</Text>
    </View>
  )
}

export default Location
