/**
 * 拦截器管理类
 */

import { ResolvedFn, RejectedFn } from '../types'

interface Interceptors<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

class InterceptorManager<T> {
  private interceptors: Array<Interceptors<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptors<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor)
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}

export default InterceptorManager
