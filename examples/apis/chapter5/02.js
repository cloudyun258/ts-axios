import axios from '/dist/axios.es5.js'

axios({
  method: 'post',
  url: '/c5-post',
  data: {
    id: 100010,
    age: 18,
    name: '张三'
  }
})

axios({
  method: 'post',
  url: '/c5-post-buffer',
  data: new Int32Array([21, 31, 44])
})

axios({
  method: 'post',
  url: '/c5-post',
  data: new URLSearchParams('?q=searchParams&topic=混合咖啡') // 支持传入 URLSearchParams 对象
})

axios({
  method: 'post',
  url: '/c5-post',
  headers: {
    'content-type': 'application/json', // 纯小写
    'Accept': 'application/json, text/plain, */*' // 其他请求头
  },
  data: {
    name: 'cloudyun',
    age: 23
  }
})
