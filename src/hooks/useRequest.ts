interface AnyObject {
  [key: string]: any
}

interface DefaultConfig extends Omit<UniApp.RequestOptions, 'url' | 'success' | 'fail' | 'complete'>{
  baseURL?: string
  adapter?: (config: RequestConfig) => Promise<Response>
}

interface RequestConfig extends Omit<UniApp.RequestOptions, 'success' | 'fail'>{
  baseURL?: string
  getRequestTask?: (task: UniApp.RequestTask) => void
}

type Response = UniApp.RequestSuccessCallbackResult

type InterceptorsHandler<TValue> = {
  fulfilled: ((value: TValue) => TValue | string | AnyObject | ArrayBuffer) | null
  rejected: ((error: UniApp.GeneralCallbackResult) => any) | null
}

function isExternal(url: string) {
  return /^(https?:)/.test(url)
}

function extend(context: Record<string, any>, source: Record<string, any>) {
  const exclude = ['constructor']
  const keys = Object.getOwnPropertyNames(source).filter((v) => !exclude.includes(v))

  keys.forEach((key) => {
    const value = source[key]
    context[key] = typeof value === 'function' ? value.bind(context) : value
  })

  return context
}

class SimpleAxios {
  defaults: DefaultConfig
  interceptors
  constructor(instanceConfig: DefaultConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new Interceptors<RequestConfig>(),
      response: new Interceptors<Response>()
    }
  }

  request<
    T extends Response,
    R = T
  >(config: RequestConfig): Promise<R> {
    config = { ...this.defaults, ...config }
    config.url = isExternal(config.url) ? config.url : config.baseURL + config.url

    const chain: [
      InterceptorsHandler<any>['fulfilled'] | null,
      InterceptorsHandler<any>['rejected'] | null
    ] = [this.defaults?.adapter || dispatchRequest, null]

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    let promise: Promise<any> = Promise.resolve(config)
    let i = 0
    while (i < chain.length) {
      promise = promise.then(chain[i++], chain[i++])
    }

    return promise as Promise<R>
  }

  get<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'GET', url, ...config })
  }

  post<
    T extends Response,
    R = T
  >(url = '', data = {}, config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'POST', url, data, ...config })
  }

  // #ifndef MP-ALIPAY || MP-KUAISHOU || MP-JD
  put<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'PUT', url, ...config })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  delete<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'DELETE', url, ...config })
  }
  // #endif

  // #ifdef H5 || MP-WEIXIN
  connect<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'CONNECT', url, ...config })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  head<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'HEAD', url, ...config })
  }
  // #endif

  // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
  options<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'OPTIONS', url, ...config })
  }
  // #endif

  // #ifdef H5 || MP-WEIXIN
  trace<
    T extends Response,
    R = T
  >(url = '', config: Omit<RequestConfig, 'url'> = {}) {
    return this.request<T, R>({ method: 'TRACE', url, ...config })
  }
  // #endif
}

class Interceptors<TValue> {
  handlers: InterceptorsHandler<TValue>[] = []

  use(
    fulfilled: InterceptorsHandler<TValue>['fulfilled'] | null,
    rejected: InterceptorsHandler<TValue>['rejected'] | null
  ) {
    this.handlers.push({ fulfilled: fulfilled || null, rejected: rejected || null })

    return this.handlers.length - 1
  }

  eject(index: number) {
    this.handlers[index] = { fulfilled: null, rejected: null }
  }

  clear() {
    this.handlers = []
  }

  forEach(fn: (handler: InterceptorsHandler<TValue>) => void) {
    this.handlers.forEach((v) => { fn(v) })
  }
}

function dispatchRequest(config: RequestConfig): Promise<Response> {
  return new Promise((resolve, reject) => {
    const RequestTask = uni.request({
      ...config,
      success: resolve,
      fail: reject
    })
    config.getRequestTask && config.getRequestTask(RequestTask)
  })
}

interface SimpleAxiosInstance extends SimpleAxios{
  <R = Response>(config: RequestConfig): Promise<R>

  defaults: DefaultConfig
}

function createInstance(defaultConfig: DefaultConfig): SimpleAxiosInstance {
  const context = new SimpleAxios(defaultConfig)
  const instance = SimpleAxios.prototype.request.bind(context)

  return Object.assign(instance, extend(context, SimpleAxios.prototype)) as SimpleAxiosInstance
}

const globalDefaults: DefaultConfig = {
  baseURL: ''
}

interface SimpleAxiosStatic extends SimpleAxiosInstance{
  create(config?: DefaultConfig): SimpleAxiosInstance
}

const useRequest: SimpleAxiosStatic = Object.assign(createInstance(globalDefaults), {
  create(instanceConfig?: DefaultConfig) {
    return createInstance({ ...globalDefaults, ...instanceConfig })
  }
})

export default useRequest
