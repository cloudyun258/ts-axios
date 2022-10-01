import axios from '/dist/axios.es5.js'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel', {
  params: {
    id: '100000'
  },
  cancelToken: source.token
}).catch(err => {
  if (axios.isCancel(err)) {
    console.log('Request canceled', err.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.get('/cancel', {
    params: {
      id: '100001'
    },
    cancelToken: source.token
  }).catch(err => {
    if (axios.isCancel(err)) {
      console.log(err.message)
    }
  })
}, 100)



let cancel
axios.get('/cancel', {
  params: {
    id: '100002'
  },
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(err => {
  if (axios.isCancel(err)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
