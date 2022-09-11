import axios from '/dist/axios.es5.js'

axios({
  method: 'post',
  url: '/c5-post',
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
