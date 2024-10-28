type SuccessCallback<T> = {
  success?: (result: T) => void;
}

type UniPromisify<T> = T extends (option: infer R) => void
  ? R extends SuccessCallback<infer S>
    ? Promise<S>
    : never
  : never;

/**
 * @description 将 uni.api 转换为 promise 形式
 * @param api uni.api
 * @param options api 的配置参数
 * @returns 返回一个 promise
 * @example
 * ```ts
 * usePromisify(uni.getLocation, { type: 'wgs84' })
 *   .then(res => {
 *     console.log(res.latitude)
 *   })
 * ```
 */
export default function useUniPromisify<T extends(option: any) => void>(
  api: T,
  options?: Parameters<T>[0]
): UniPromisify<T> {
  return new Promise((resolve, reject) => {
    api({
      ...(options || {}),
      success: resolve,
      fail: reject
    })
  }) as UniPromisify<T>
}
