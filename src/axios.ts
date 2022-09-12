/**
 * 构建并导出 axios 混合对象
 */

import { AxiosInstance } from './types'
import Axios from './core/axiosClass'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
