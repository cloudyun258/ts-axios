/**
 * 全局类型定义
 */

export interface AnyObject {
  [key: string]: any
}

export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  params?: AnyObject
  data?: any
  headers?: AnyObject
  /*
    对于一个 AJAX 请求的响应，我们是可以指定响应数据类型的，该属性值默认为 ''
    比如设置为 json，那么浏览器会自动帮我们解析成 js 对象，无需手动调用 JSON.parse()
    但更多的情况是不会指定该属性，那么就需要手动调用 JSON.parse()
  */
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken

  withCredentials?: boolean // 允许跨域携带 Cookie
  csrfCookieName?: string
  csrfHeaderName?: string

  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  auth?: AxiosBasicCredentials // http授权
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: AnyObject) => string

  baseURL?: string

  [propName: string]: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number // http状态码
  statusText: string // http状态文本
  headers: AnyObject
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

// 返回给业务侧的类型
export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>

// 错误信息对象
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: XMLHttpRequest
  response?: AxiosResponse
}

// Axios类的实例对象
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager
    response: InterceptorManager
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 最终导出给业务侧的对象（混合对象）
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (val: any) => boolean
}

// 拦截器管理类的实例对象
export interface InterceptorManager<T = any> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: AnyObject): any
}

// CancelToken类的实例类型
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel // 取消请求时传入的文本

  throwIfRequested(): void
}

// 取消方法
export interface Canceler {
  (message?: string): void
}

// CancelToken类构造函数参数
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new(message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
