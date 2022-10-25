/**
 * CancelToken类
 */

import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve as ResolvePromise
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  // 检测 token 是否已经使用过，如果使用过则直接抛异常取消请求
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}

export default CancelToken

/*

  axios取消请求方案：
    1、第一种
      const controller = new AbortController()
      axios.get('/foo/bar', {
        signal: controller.signal
      }).then(res => {
        console.log(res)
      })
      // 取消请求
      controller.abort()

      或

      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      axios.get('/foo/bar', {
        cancelToken: source.token
      }).then(res => {
        console.log(res)
      })
      // 取消请求（message 参数是可选的）
      source.cancel('取消请求...')

    这种方式，只要执行了一次取消请求操作，那么用到了同一个 signal 或 toaken 的未响应请求都同时会被取消，后续请求也不会再发出去（直接取消）

    2、第二种
    const CancelToken = axios.CancelToken
    let cancel

    axios.get('/user/12345', {
      cancelToken: new CancelToken(c => {
        // executor 函数接收一个 cancel 函数作为参数
        cancel = c
      })
    })

    // 取消请求
    cancel()

    这种方式，每次的 cancelToken 都是一个新的值，互不影响

*/
