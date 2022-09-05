import axios from '/dist/axios.es5.js'

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  res.data.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)


axios({
  url: '/interceptor-get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})
