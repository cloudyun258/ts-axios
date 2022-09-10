/**
 * 发送请求
 */

import { AxiosRequestConfig } from './types'

function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null } = config

  const request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url, true)

  request.send(data)
}

export default xhr
