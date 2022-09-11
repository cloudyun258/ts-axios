const Router = require('@koa/router')
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.redirect('/pages/demo.html')
})

router.get('/test', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'Hello World'
  }
})


/**
 * 第五章
 */
router.get('/c5-get', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.query
  }
})

router.post('/c5-post', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.post('/c5-post-buffer', (ctx, next) => {
  const msg = []
  ctx.req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  ctx.req.on('end', () => {
    const buf = Buffer.concat(msg)
    console.log('接收到的 buffer 数据：', buf.toJSON())
  })
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})


/**
 * 第六章
 */
router.get('/c6-error', (ctx, next) => {
  if (Math.random() > 0.7) {
    ctx.body = {
      code: 0,
      msg: '测试 status > 200 错误',
      data: []
    }
  } else {
    ctx.status = 500
  }
})

router.get('/c6-timeout', async (ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  ctx.body = {
    code: 0,
    msg: '测试请求超时',
    data: []
  }
})


/**
 * 第七章
 */
 router.post('/c7-post', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.put('/c7-put', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.patch('/c7-patch', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.get('/c7-get', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-get'
  }
})

router.delete('/c7-delete', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-delete'
  }
})

router.head('/c7-head', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功'
  }
})

router.options('/c7-options', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-options'
  }
})


/**
 * 第八章
 */
router.get('/interceptor-get', (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'Hello'
  }
})




module.exports = router
