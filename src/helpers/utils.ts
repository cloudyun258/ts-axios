/**
 * 全局工具函数
 */

const toString = Object.prototype.toString

export function isArray(val: any): boolean {
  return Array.isArray(val)
}

export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}

export function isPureObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isFormData(val: any): val is FormData {
  return toString.call(val) === '[object FormData]'
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return toString.call(val) === '[object URLSearchParams]'
}

export function extend<T, U>(source: T, target: U): T & U {
  // 原型属性也要复制，所以不需要调用 hasOwnProperty()
  for (const key in target) {
    (source as T & U)[key] = target[key] as any
  }
  return source as T & U
}

// 对象深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(Object.prototype)

  objs.forEach(obj => {
    Object.keys(obj || {}).forEach(key => {
      const val = obj[key]
      if (isPureObject(val)) {
        // result 身上已有该属性
        if (isPureObject(result[key])) {
          result[key] = deepMerge(result[key], val)
        } else {
          result[key] = deepMerge(val)
        }
      } else {
        result[key] = val
      }
    })
  })

  return result
}
