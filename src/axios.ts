/**
 * 构建并导出 axios 混合对象
 */

import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/axiosClass'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
