import axios from '/dist/axios.es5.js'

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/mergeConfig',
  method: 'post',
  data: new URLSearchParams('?name=张三&age=36'),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})

axios({
  url: '/mergeConfig',
  method: 'post',
  data: {
    name: '李四',
    age: 99
  },
  headers: {
    test: 'abcde'
  }
}).then(res => {
  console.log(res.data)
})


axios({
  url: '/mergeConfig',
  method: 'post',
  data: {
    a: 1
  },
  transformRequest: [
    (data, headers) => {
      data.feature = '请求和响应配置化'
      headers.phone = '5180222'
      return data
    },
    ...axios.defaults.transformRequest
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => {
      if (typeof data === 'object') {
        data.data.number = '10086'
        data.data.b = 2
      }
      return data
    }
  ]
}).then(res => {
  console.log(res.data)
})


const instance = axios.create({
  timeout: 10000,
  transformRequest: [
    (data, headers) => {
      data.feature = '扩展 axios.create 静态方法'
      headers.phone = '5180342'
      return data
    },
    ...axios.defaults.transformRequest
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => {
      if (typeof data === 'object') {
        data.data.number = '10010'
        data.data.b = 2222
      }
      return data
    }
  ]
})

instance({
  url: '/mergeConfig',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
