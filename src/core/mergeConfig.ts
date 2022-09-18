/**
 * 合并配置
 */

import { AnyObject, AxiosRequestConfig } from '../types'
import { deepMerge } from '../helpers/utils'

const strats = Object.create(null)

// 默认合并策略 ['method', 'timeout', ...]
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只取自定义配置，没有会返回 undefined
const stratKeysFromVal2 = ['url', 'params', 'data']
function fromVal2Strat(val1: any, val2: any): any {
  return val2
}

// 复杂对象合并
const stratKeysDeepMerge = ['headers']
function deepMergeStrat(val1: AnyObject, val2: AnyObject | undefined): AnyObject {
  if (!val2) {
    return deepMerge(val1)
  }
  return deepMerge(val1, val2)
}

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  customConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!customConfig) {
    customConfig = {}
  }

  const config = Object.create(null)

  for (const key in customConfig) {
    if (customConfig.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  for (const key in defaultConfig) {
    if (defaultConfig.hasOwnProperty(key)) {
      !customConfig[key] && mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(defaultConfig[key], customConfig![key])
  }

  return config
}

export default mergeConfig
