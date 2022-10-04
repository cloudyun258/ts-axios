import axios from '/dist/axios.es5.js'

axios.post('/more/http-auth', {
  test: 'http授权 401'
}, {
  auth: {
    username: 'zhang-san',
    password: '123456'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log('401 未授权', err)
})

axios.post('/more/http-auth', {
  test: 'http授权 401'
}, {
  auth: {
    username: 'li-si',
    password: 'abc123'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log('401 未授权', err)
})
