const express = require('express')
const Router = express.Router()
const utils = require('utility');
const models = require('./model')
const User = models.getModel('user')
const _filter = {"pwd": 0, "__v": 0}

// 登陆信息 并 读取客户端cookies
Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '服务端错误,505'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

// 查询用户列表
Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
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
  User.findOne({user, pwd: md5Pwd(pwd)}, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: "用户名或密码错误"})
    }
    // 写入cookie
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})


function md5Pwd(pwd) {
  // 盐值
  const salt = 'vue-tannnb_'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
