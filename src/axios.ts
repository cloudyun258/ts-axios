/**
 * 构建并导出 axios 混合对象
 */

import { AxiosStatic, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// 添加创建新实例的静态方法
axios.create = (config?: AxiosRequestConfig) => {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = (promises) => {
  return Promise.all(promises)
}

axios.spread = (callback) => {
  return (arr) => {
    return callback.apply(null, arr)
  }
}

axios.Axios = Axios

export default axios
