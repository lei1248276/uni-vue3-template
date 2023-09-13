interface Location {
  longitude: string
  latitude: string
}

/**
 * @description 获取定位信息
 * @param type 'gcj02' | 'wgs84'
 */
export default function useLocation(type: 'gcj02' | 'wgs84' = 'gcj02'): Promise<Location> {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    wx.getLocation({
      type,
      success({ longitude, latitude }: Location) { resolve({ longitude: longitude.toString(), latitude: latitude.toString() }) },
      fail(err: any) { reject(err) }
    })
    // #endif

    // #ifdef APP-PLUS
    if (!uni.getSystemSetting().locationEnabled) return (toast.fail('请先开启定位'), reject('请先开启定位'))

    uni.getLocation({
      type,
      success({ longitude, latitude }) { resolve({ longitude: longitude.toString(), latitude: latitude.toString() }) },
      fail(err) { reject(err) }
    })
    // #endif
  })
}
