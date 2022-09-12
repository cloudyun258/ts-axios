/**
 * 全局类型定义
 */

export interface AnyObject {
  [key: string]: any
}

export type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'

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
