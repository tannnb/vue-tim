const express = require('express')
const Router = express.Router()
const utils = require('utility');
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = {"pwd": 0, "__v": 0}

// 登陆信息 并 读取客户端cookies
Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '登录信息已过期，请重新登陆', data: {}})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '服务端错误,505', data: {}})
    }
    if (doc) {
      return res.json({code: 0, msg: '登陆信息验证通过', data: doc})
    }
  })
})


// 获取用户列表
Router.get('/list', function (req, res) {
  const {type} = req.query
  User.find({type}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, mag: '暂无用户信息', data: []})
    }
    return res.json({code: 0, mag: '获取成功', data: doc})
  })
})


Router.get('/getMsgList',function (req,res) {
  const {userid} = req.cookies
  Chat.find({},function (err,doc) {
    if(!err){
      return res.json({code:0,msgs:doc})
    }
  })
})


// 用户注册
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在', data: {}})
    }
    // 新增用户,并且写入cookie
    // 当用户刷新时，请求/info 再次读取cookies
    const userModel = new User({user, pwd: md5Pwd(pwd), type})
    userModel.save(function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务器故障', data: {}})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, msg: '注册成功，登陆中...', data: {user, type, _id}})
    })
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: "用户名或密码错误", data: {}})
    }
    // 写入cookie
    res.cookie('userid', doc._id)
    return res.json({code: 0, msg: '登陆成功', data: doc})
  })
})

// 更新并完善信息
Router.post('/update', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '登录信息已过期，请重新登陆', data: {}})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, msg: '更新成功', data})
  })
})


function md5Pwd(pwd) {
  // 盐值
  const salt = 'vue-tannnb_'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
