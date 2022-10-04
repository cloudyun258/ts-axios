const { Base64 } = require('js-base64')

const Router = require('@koa/router')
const router = new Router()

router.get('/', ctx => {
  ctx.redirect('/pages/demo.html')
})

router.get('/test', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'Hello World'
  }
})


/**
 * 第五章
 */
router.get('/c5-get', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.query
  }
})

router.post('/c5-post', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.post('/c5-post-buffer', async ctx => {
  const data = await new Promise(resolve => {
    const msg = []
    ctx.req.on('data', chunk => {
      console.log(chunk)
      if (chunk) {
        msg.push(chunk)
      }
    })
    ctx.req.on('end', () => {
      const buf = Buffer.concat(msg).toJSON()
      resolve(buf)
    })
  })
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data
  }
})


/**
 * 第六章
 */
router.get('/c6-error', ctx => {
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

router.get('/c6-timeout', async ctx => {
  await new Promise(resolve => {
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
 router.post('/c7-post', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.put('/c7-put', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.patch('/c7-patch', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.get('/c7-get', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-get'
  }
})

router.delete('/c7-delete', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-delete'
  }
})

router.head('/c7-head', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功'
  }
})

router.options('/c7-options', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'c7-options'
  }
})


/**
 * 第八章
 */
router.get('/interceptor-get', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: 'Hello'
  }
})


/**
 * 第九章
 */
router.post('/mergeConfig', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})


/**
 * 第十章
 */
router.get('/cancel', async ctx => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1500)
  })
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.query
  }
})


/**
 * 第十一章
 */
 router.post('/more/cookies', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: {
      name: ctx.cookies.get('name'),
      age: ctx.cookies.get('age'),
      postData: ctx.request.body
    }
  }
})

router.post('/more/csrf', ctx => {
  // 往浏览器设置 cookie
  ctx.cookies.set('CSRF-TOKEN-D', '123456abc')
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.body
  }
})

router.post('/more/http-auth', ctx => {
  const auth = ctx.request.headers.authorization
  const [type, credentials] = auth.split(' ')
  // 原生解析 base64 字符串方式：Buffer.from(credentials, 'base64').toString()
  const [username, password] = Base64.atob(credentials).split(':')
  if (type === 'Basic' && username === 'zhang-san' && password === '123456') {
      ctx.body = {
      code: 0,
      msg: '请求成功',
      data: ctx.request.body
    }
  } else {
    ctx.status = 401
  }
})

router.get('/more/code', ctx => {
  ctx.status = 304
})

router.get('/more/params', ctx => {
  ctx.body = {
    code: 0,
    msg: '请求成功',
    data: ctx.request.query
  }
})


module.exports = router
