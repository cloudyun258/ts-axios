import axios from '/dist/axios.es5.js'

document.cookie = 'name=zhang-san; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/'
document.cookie = 'age=26; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/'

axios.post('/more/cookies', { str: 'bodyData' }, {
  withCredentials: true
}).then(res => {
  console.log('cookies: ', res.data)
})

axios.post('/more/csrf', { str: 'CSRF测试' }).then(res => {
  console.log('cookies: ', res.data)
})
