/**
 * 请求和响应处理流程
 */

import { buildURL } from '../helpers/url'
import { transformReqData, transformResData } from '../helpers/data'
import { processReqHeaders } from '../helpers/headers'
import { AnyObject, AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理请求参数
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformRequestHeader(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformReqData(data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResData(res.data)
  return res
}

function transformRequestHeader(config: AxiosRequestConfig): AnyObject {
  const { headers = {}, data } = config
  return processReqHeaders(headers, data)
}

export default dispatchRequest
