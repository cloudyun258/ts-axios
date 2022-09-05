import axios from '/dist/axios.es5.js'

axios({
  method: 'get',
  url: '/c5-get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/c5-get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
axios({
  method: 'get',
  url: '/c5-get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/c5-get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/c5-get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/c5-get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/c5-get?foo=bar',
  params: {
    bar: 'baz'
  }
})
