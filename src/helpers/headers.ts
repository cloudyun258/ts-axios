/**
 * 处理请求头和响应头
 */

import { AnyObject } from '../types'
import { isPureObject } from './utils'

/**
 * @description 规范化请求头名字
 * @param headers
 * @param normalizeName 规范化后的名字
 */
function normalizeHeadersName(headers: AnyObject, normalizeName: string) {
  Object.keys(headers).forEach(name => {
    if (!headers[normalizeName] && normalizeName.toLocaleLowerCase() === name.toLocaleLowerCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processReqHeaders(headers: AnyObject, data?: any): AnyObject {
  // 目前只处理了 Content-Type，其他请求头看需求调用（不是所有请求头都是首字母大写的，有些是全小写的）
  normalizeHeadersName(headers, 'Content-Type')
  if (isPureObject(data)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseResHeaders(headers: string): AnyObject {
  const res = Object.create(null)
  if (!headers) {
    return res
  }
  headers.split('\r\n').forEach(item => {
    let [key, val] = item.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    res[key] = val
  })

  return res
}
