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
