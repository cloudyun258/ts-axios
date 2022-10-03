/**
 * 封装 cookie 操作
 */

const cookie = {
  getItem(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}


export default cookie
