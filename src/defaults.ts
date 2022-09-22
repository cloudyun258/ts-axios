/**
 * 请求默认配置
 */

import { processReqHeaders } from './helpers/headers'
import { transformReqData, transformResData } from './helpers/data'
import { AnyObject, AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers?: AnyObject): any {
      processReqHeaders(headers!, data)
      return transformReqData(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResData(data)
    }
  ]
}

const methodNoData = ['get', 'delete', 'head', 'options']
methodNoData.forEach(method => {
  defaults.headers![method] = {}
})

const methodWithData = ['post', 'put', 'patch']
methodWithData.forEach(method => {
  defaults.headers![method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
