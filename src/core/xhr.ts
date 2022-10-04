/**
 * 发送请求
 */

import { parseResHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/utils'
import cookie from '../helpers/cookie'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      csrfCookieName,
      csrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toLocaleUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      // 默认值是 0，即永不超时
      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = true
      }
    }

    function addEvents(): void {

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

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
          'ECONNABORTED', // 一般用这个字符串 code 代表超时
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
    }

    function processHeaders(): void {

      // 如果上传的内容是 formData 对象（文件），则删除我们之前设置的 Content-Type，让浏览器自动设置（multipart/form-data）
      if (isFormData(data)) {
        delete headers!['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && csrfCookieName) {
        const csrfValue = cookie.getItem(csrfCookieName!)
        if (csrfValue && csrfHeaderName) {
          headers![csrfHeaderName] = csrfValue
        }
      }

      if (auth) {
        const base64Source = window.btoa(`${auth.username}:${auth.password}`)
        headers!['Authorization'] = `Basic ${base64Source}`
      }

      // 设置请求头
      Object.keys(headers!).forEach(name => {
        if (!data && name.toLocaleLowerCase() === 'content-type') {
          delete headers![name]
        } else {
          request.setRequestHeader(name, headers![name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
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

  })
}

export default xhr
