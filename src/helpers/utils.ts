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

export function isPureObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function extend<T, U>(source: T, target: U): T & U {
  // 原型属性也要复制，所以不需要调用 hasOwnProperty()
  for (const key in target) {
    (source as T & U)[key] = target[key] as any
  }
  return source as T & U
}
