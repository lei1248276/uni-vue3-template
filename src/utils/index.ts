/** console.log 别名 */
export const log = console.log

/** Object.assign别名 */
export const extend: typeof Object.assign = Object.assign

/**
 * 删除数组元素
 * @example
 * ```ts
 * remove([1, 2, 3], 2) // [1, 3]
 * remove([{v: 1}, {v: 2}, {v: 3}], (v) => v.v === 2) // [{v: 1}, {v: 3}]
 * ```
 * */
export const remove = <T>(
  arr: T[],
  el: T | ((value: T, index: number, array: T[]) => boolean)
): boolean => {
  const i = typeof el === 'function'
    ? arr.findIndex(el as (value: T, index: number, array: T[]) => boolean)
    : arr.indexOf(el as T)

  if (i > -1) {
    arr.splice(i, 1)
    return true
  }
  return false
}

/**
 * 数组切片
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 * */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  const res: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size))
  }
  return res
}

/**
 * 错误捕获
 * @example
 * ```ts
 * const [err, res] = await catchError(fetchData())
 * if (err) console.error(err)
 * ```
 * */
export const catchError = async <T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> => {
  return promise
    .then((res) => [undefined, res] as [undefined, T])
    .catch((err) => [err])
}
