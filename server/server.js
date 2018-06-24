const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const UserRouter = require('./user')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const models = require('./model')
const Chat = models.getModel('chat')


io.on('connection', function (socket) {
  // 接受数据
  socket.on('sendMsg', function (data) {
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      // 广播到全局
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  });
})


app.use(cookieParser())
app.use(bodyParser.json())

// 开启一个中间件
app.use('/user', UserRouter)

server.listen(9093, function () {
  console.log('9093')
})
