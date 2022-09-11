/**
 * 处理请求 URL
 */

import { AnyObject } from "../types"
import { isArray, isDate, isPureObject } from "./utils"

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: AnyObject): string {
  if (!params) {
    return url
  }

  // 参数键值对数组
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 把值统一处理成数组形式
    let values: string[]
    if (isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPureObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })

    let serializedParams = parts.join('&')
    if (serializedParams) {
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex)
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })

  return url
}
