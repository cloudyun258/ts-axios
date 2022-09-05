import axios from '/dist/axios.es5.js'

axios({
  url: '/c7-post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

axios.request({
  url: '/c7-post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

axios.get('/c7-get')

axios.options('/c7-options')

axios.delete('/c7-delete')

axios.head('/c7-head')

axios.post('/c7-post', { msg: 'post' })

axios.put('/c7-put', { msg: 'put' })

axios.patch('/c7-patch', { msg: 'patch' })
