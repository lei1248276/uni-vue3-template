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
  interceptors: {
    request: Interceptors<RequestConfig>
    response: Interceptors<Response>
  }
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
    const mergedConfig = { ...this.defaults, ...config }
    mergedConfig.url = isExternal(mergedConfig.url)
      ? mergedConfig.url
      : mergedConfig.baseURL + mergedConfig.url

    const requestInterceptors = this.interceptors.request.handlers
    const responseInterceptors = this.interceptors.response.handlers

    const chain: Array<InterceptorsHandler<any>['fulfilled'] | InterceptorsHandler<any>['rejected'] | null> =
      new Array(2 + (requestInterceptors.length + responseInterceptors.length) * 2)

    const defaultHandler = this.defaults?.adapter || dispatchRequest
    let currentIndex = 0

    for (let i = 0; i < requestInterceptors.length; i++) {
      const interceptor = requestInterceptors[i]
      chain[currentIndex++] = interceptor.fulfilled
      chain[currentIndex++] = interceptor.rejected
    }

    chain[currentIndex++] = defaultHandler
    chain[currentIndex++] = null

    for (let i = 0; i < responseInterceptors.length; i++) {
      const interceptor = responseInterceptors[i]
      chain[currentIndex++] = interceptor.fulfilled
      chain[currentIndex++] = interceptor.rejected
    }

    return chain.reduce((promise, handler, index) => {
      if (!handler) return promise
      return index % 2 === 0
        ? promise.then(handler as InterceptorsHandler<RequestConfig | Response>['fulfilled'])
        : promise.catch(handler)
    }, Promise.resolve(mergedConfig)) as Promise<R>
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
  >(url = '', data: Record<string, any> = {}, config: Omit<RequestConfig, 'url'> = {}) {
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
