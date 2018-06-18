const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const UserRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())

// 开启一个中间件
app.use('/user', UserRouter)

app.listen(9093, function () {
  console.log('9093')
})
