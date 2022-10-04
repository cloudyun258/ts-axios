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



axios.get('/more/code').then(res => {
  console.log('304 走 then', res)
}).catch(err => {
  console.log('304 走 catch', err)
})

axios.get('/more/code', {
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => {
  console.log('304 走 then', res)
}).catch(err => {
  console.log('304 走 catch', err)
})


axios.get('/more/params', {
  params: new URLSearchParams('name=zhang-san&age=18')
}).then(res => {
  console.log(res)
})

axios.get('/more/params', {
  params: { // ts-axios 库的默认序列号规则
    name: 'li-si',
    age: 24,
    hobby: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})

const instance = axios.create({
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' })
  }
})
instance.get('/more/params', {
  params: {
    name: 'wang-wu',
    age: 36,
    hobby: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})
