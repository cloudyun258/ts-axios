/**
 * 处理请求和响应数据
 */

import { isPureObject } from './utils'

export function transformReqData(data: any): any {
  if (isPureObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }
  return data
}
