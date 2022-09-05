import axios from '/dist/axios.es5.js'

axios({
  method: 'post',
  url: '/c5-post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    name: 'cloudyun258',
    age: 17,
    love: 'kano'
  }
}).then(res => {
  console.log(res)
})


axios({
  method: 'post',
  url: '/c5-post',
  responseType: 'json',
  data: {
    name: 'css世界',
    price: 49
  }
}).then(res => {
  console.log(res)
})
