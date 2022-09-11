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
