import type { Pages, TabBarPages } from '../pages'

type Path = Pages[number]
type NavigateMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack' | 'preloadPage'
type NavigateOptions<T> = T extends 'navigateTo'
  ? UniApp.NavigateToOptions & { url: Path }
  : T extends 'redirectTo'
    ? UniApp.RedirectToOptions & { url: Path }
    : T extends 'reLaunch'
      ? UniApp.ReLaunchOptions & { url: Path }
      : T extends 'switchTab'
        ? UniApp.SwitchTabOptions & { url: TabBarPages[number] }
        : T extends 'navigateBack'
          ? UniApp.NavigateBackOptions
          : T extends 'preloadPage'
            ? UniApp.PreloadPageOptions & { url: Path }
            : never

/**
 * @description 路由跳转 - uni.navigateTo
 * @param path 跳转页面路径
 * @example ```typescript
 * useNavigate('/index' || './index' || '../index')
 * ```
 */
export default function useNavigate(path: Path): void

/**
 * @description 路由返回 - uni.navigateBack
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 * @example ```typescript
 * useNavigate(1)
 * ```
 */
// eslint-disable-next-line no-redeclare
export default function useNavigate(delta: number): void

/**
 * @description 指定路由方法跳转
 * @param method navigateTo | redirectTo | reLaunch | switchTab | navigateBack | preloadPage
 * @param options 对应方法的options参数
 * @example ```typescript
 * useNavigate('navigateTo', UniApp.NavigateToOptions)
 * useNavigate('redirectTo', UniApp.RedirectToOptions)
 * useNavigate('reLaunch', UniApp.ReLaunchOptions)
 * useNavigate('switchTab', UniApp.SwitchTabOptions)
 * useNavigate('navigateBack', UniApp.NavigateBackOptions)
 * useNavigate('preloadPage', UniApp.PreloadPageOptions)
 * ```
 */
// eslint-disable-next-line no-redeclare
export default function useNavigate<T extends NavigateMethod>(method: T, options: NavigateOptions<T>): void

// eslint-disable-next-line no-redeclare
export default function useNavigate<T extends NavigateMethod>(
  p1: Path | number | T,
  p2?: NavigateOptions<T>
) {
  if (!p1) return console.error('useNavigate 跳转路径不能为空')

  switch (typeof p1) {
    case 'number':
      uni.navigateBack({ delta: p1, fail: (err) => console.error(err) })
      break
    case 'string':
      if (p2) {
        switch (p1) {
          case 'navigateTo': return uni.navigateTo(p2 as UniApp.NavigateToOptions)
          case 'navigateBack': return uni.navigateBack(p2 as UniApp.NavigateBackOptions)
          case 'redirectTo': return uni.redirectTo(p2 as UniApp.RedirectToOptions)
          case 'reLaunch': return uni.reLaunch(p2 as UniApp.ReLaunchOptions)
          case 'switchTab': return uni.switchTab(p2 as UniApp.SwitchTabOptions)
          case 'preloadPage': return uni.preloadPage(p2 as UniApp.PreloadPageOptions)
        }
      } else {
        uni.navigateTo({ url: p1, fail: (err) => console.error(err) })
      }
      break
  }
}
