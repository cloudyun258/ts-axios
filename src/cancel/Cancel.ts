/**
 * Cancel类
 */

class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(val: any): boolean {
  return val instanceof Cancel
}

export default Cancel
