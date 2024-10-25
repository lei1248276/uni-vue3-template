/** Object.assign别名 */
export const extend: typeof Object.assign = Object.assign

/** 删除数组元素 */
export const remove = <T>(arr: T[], el: T): void => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
}

/** 数组切片 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}
