/**
 * 发送请求
 */

import { parseResHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLocaleUpperCase(), url, true)

    // 设置请求头
    Object.keys(headers!).forEach(name => {
      if (!data && name.toLocaleLowerCase() === 'content-type') {
        delete headers![name]
      } else {
        request.setRequestHeader(name, headers![name])
      }
    })

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseResHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType === 'text' ? request.responseText : request.response
      const response : AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    request.send(data)
  })
}

export default xhr
