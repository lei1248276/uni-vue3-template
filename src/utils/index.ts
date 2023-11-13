/**
 * @description: 验证手机号（宽松模式只要是1开头即可）
 */
export function validatePhone(phone: string) {
  return /^(?:(?:\+|00)86)?1\d{10}$/.test(phone + '')
}

/**
 * @description 转换静态图片路径(`/src/static/img/${iconPath}`)
 * @param iconPath 图片地址(需要带后缀)
 */
export function transImg(iconPath: string) {
  // #ifndef APP-PLUS
  return `/static/img/${iconPath}`
  // #endif

  // #ifdef H5
  // eslint-disable-next-line
  return new URL(`/src/static/img/${iconPath}`, import.meta.url).href
  // #endif
}
