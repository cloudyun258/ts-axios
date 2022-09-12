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

export interface AxiosResponse {
  data: any
  status: number // http状态码
  statusText: string // http状态文本
  headers: AnyObject
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

// 返回给业务侧的类型
export type AxiosPromise = Promise<AxiosResponse>

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
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

// 最终导出给业务侧的对象（混合对象）
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
