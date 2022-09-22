/**
 * 请求和响应配置化
 */

import { AnyObject, AxiosTransformer } from '../types'

function transform(
  data: any,
  headers: AnyObject,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}

export default transform
