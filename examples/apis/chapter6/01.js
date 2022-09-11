import axios from '/dist/axios.es5.js'

// 404
axios({
  method: 'get',
  url: '/c6-error111'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

// 500
axios({
  method: 'get',
  url: '/c6-error'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

// 网络错误
setTimeout(() => {
  axios({
    method: 'get',
    url: '/c6-error'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

// 超时
axios({
  method: 'get',
  url: '/c6-timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.dir(e)
})
