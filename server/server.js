const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const UserRouter = require('./user')

const server = require('http').Server(app)
const io = require('socket.io')(server)


io.on('connection',function (socket) {
  console.log('socket连接成功')
  socket.on('sendMsg', function (data) {
    console.log(data)
    //io.emit('recvmsg',data)
  });
})


app.use(cookieParser())
app.use(bodyParser.json())

// 开启一个中间件
app.use('/user', UserRouter)

server.listen(9093, function () {
  console.log('9093')
})
