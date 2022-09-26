/**
 * 发送请求
 */

import { parseResHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 默认值是 0，即永不超时
    if (timeout) {
      request.timeout = timeout
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.open(method.toLocaleUpperCase(), url!, true)

    // 设置请求头
    Object.keys(headers!).forEach(name => {
      if (!data && name.toLocaleLowerCase() === 'content-type') {
        delete headers![name]
      } else {
        request.setRequestHeader(name, headers![name])
      }
    })

    request.onerror = () => {
      // 网络错误时没有响应对象 response
      reject(createError(
        'Network Error',
        config,
        null,
        request
      ))
    }

    request.ontimeout = () => {
      // 请求超时没有响应对象 response
      reject(createError(
        `Timeout of ${timeout} ms exceeded`,
        config,
        'ECONNABORTED', // 一般用这个 code 代表超时
        request
      ))
    }

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      // 超时或网络错误
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseResHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }

    request.send(data)
  })
}

export default xhr
