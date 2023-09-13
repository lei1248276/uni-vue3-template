/**
 * @description 仅用于web端，缓存数据到sessionStorage
 * @param key 缓存key
 * @param fallback 初始值，获取到缓存后会更新初始值
 */
export default function useSessionCache<T>(key: string, fallback: T): T {
  // #ifdef H5
  let data = sessionStorage.getItem(key)

  if (!data) return fallback

  isJSON(data) && (data = JSON.parse(data))

  if (isRef(fallback)) {
    fallback.value = data
  } else if (isReactive(fallback)) {
    Array.isArray(data) && Array.isArray(fallback)
      ? data.forEach((v, i) => { fallback[i] = v })
      : Object.assign(fallback as object, data)
  }
  // #endif

  return fallback
}

// #ifdef H5
function isJSON(data: any) {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    return false
  }
}
// #endif
