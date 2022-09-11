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
  url: string
  method: Method
  params?: AnyObject
  data?: any
}
