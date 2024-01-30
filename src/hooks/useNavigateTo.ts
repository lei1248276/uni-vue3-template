/* eslint-disable no-redeclare */
import type { Route } from '@/route'

type NavigateMethod = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack' | 'preloadPage'
type NavigateOptions<T> = T extends 'navigateTo'
  ? UniApp.NavigateToOptions & {url: Path}
  : T extends 'redirectTo'
    ? UniApp.RedirectToOptions & {url: Path}
    : T extends 'reLaunch'
      ? UniApp.ReLaunchOptions & {url: Path}
      : T extends 'switchTab'
        ? UniApp.SwitchTabOptions & {url: Path}
        : T extends 'navigateBack'
          ? UniApp.NavigateBackOptions
          : T extends 'preloadPage'
            ? UniApp.PreloadPageOptions & {url: Route['path']}
            : never
type Path = Route['path'] | `./${string}` | `../${string}` | `${Route['path']}?${string}`

/**
 * @description 默认使用"navigateTo"方法，跳转时会判断前后页面是否相同，current === to 取消跳转
 * @param path 跳转页面路径
 * @example useNavigateTo('/index' || './index' || '../index')
 */
export default function useNavigateTo(path: Path): void

/**
 * @description 默认使用"navigateTo"方法，跳转时会判断前后页面是否相同，current === to 取消跳转
 * @param options uni.navigateTo相同参数
 * @example useNavigateTo(UniApp.NavigateToOptions)
 */
export default function useNavigateTo(options: UniApp.NavigateToOptions & {url: Path}): void

/**
 * @description 指定路由方法（快捷方式）
 * @param method navigateTo | redirectTo | reLaunch | switchTab | navigateBack | preloadPage
 * @param path 页面路径
 * @example useNavigateTo('redirectTo', '/index' || './index' || '../index')
 * @example useNavigateTo('preloadPage', '/index') preloadPage必须传入绝对路径'/index'
 */
export default function useNavigateTo(method: NavigateMethod, path: Path): void

/**
 * @description 指定路由方法
 * @param method navigateTo | redirectTo | reLaunch | switchTab | navigateBack | preloadPage
 * @param options 对应方法的options参数
 * @example useNavigateTo('navigateTo', UniApp.NavigateToOptions)
 * @example useNavigateTo('redirectTo', UniApp.RedirectToOptions)
 */
export default function useNavigateTo<T extends NavigateMethod>(method: T, options: NavigateOptions<T>): void

/**
 * @description 路由返回跳转（快捷方式）
 * @param method navigateBack
 * @param options UniApp.NavigateBackOptions
 */
export default function useNavigateTo(method: 'navigateBack', options?: UniApp.NavigateBackOptions): void

export default function useNavigateTo<T extends NavigateMethod>(
  p1: Path | UniApp.NavigateToOptions & {url: Path} | T,
  p2?: Path | NavigateOptions<T>
) {
  if (!p1) return console.error('跳转路径不能为空')

  const options = { url: '', fail(err: any) { console.error(err) } }

  if (p1 === 'navigateBack') return uni.navigateBack(Object.assign(options, p2))

  if (typeof p1 === 'string' && !p2) {
    if (isEqualPath(p1)) return console.warn('跳转同一页面无效')

    options.url = p1
    // #ifdef H5
    //* web端页面跳转默认回到顶部
    ;(options as UniApp.NavigateToOptions).success = () => { window.scrollTo(0, 0) }
    // #endif
    return uni.navigateTo(options)
  } else if (p1 instanceof Object) {
    if (isEqualPath((p1 as UniApp.NavigateToOptions).url)) return console.warn('跳转同一页面无效')

    const obj = Object.assign(options, p1)
    // #ifdef H5
    //* web端页面跳转默认回到顶部
    obj.success = (res) => { window.scrollTo(0, 0); p1?.success?.(res) }
    // #endif
    return uni.navigateTo(obj)
  }

  if (typeof p2 === 'string') {
    options.url = p2
  } else {
    Object.assign(options, p2)
  }

  switch (p1) {
    case 'redirectTo':
      return uni.redirectTo(options)
    case 'reLaunch':
      return uni.reLaunch(options)
    case 'switchTab':
      return uni.switchTab(options)
    case 'preloadPage':
      return uni.preloadPage(options)
  }
}

function isEqualPath(path: string | UniApp.NavigateToOptions['url']) {
  const pages = getCurrentPages()
  return pages.length && (pages[pages.length - 1] as any).$page.fullPath === path
}
