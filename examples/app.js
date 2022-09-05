const path = require('path')
const Koa = require('koa')
const app = new Koa()
const Router = require('./router')
// 中间件
const koaCors = require('@koa/cors')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')

// koa-body 配置对象
const uploadConfig = {
  multipart: true,
  formidable: {
    keepExtensions: true,
    maxFieldsSize: 100 * 1024 * 1024
  }
}

app.use(koaMount('/pages', koaStatic(path.join(__dirname, 'pages'))))
app.use(koaMount('/pages', koaStatic(path.join(__dirname, '../examples'))))
app.use(koaMount('/apis', koaStatic(path.join(__dirname, 'apis'))))
app.use(koaMount('/dist', koaStatic(path.join(__dirname, '../dist'))))
app.use(koaCors())
app.use(koaBody(uploadConfig))
app.use(Router.routes())

app.listen('3999', () => {
  console.log(`Run In: http://localhost:3999`)
})
