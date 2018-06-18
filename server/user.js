const express = require('express')
const Router = express.Router()
const utils = require('utility');
const models = require('./model')
const User = models.getModel('user')


// 登陆信息 并 读取客户端cookies
Router.get('/info', function (req, res) {
  return res.json({code: 1})
})

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})


// 注册
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在'})
    }
    User.create({user, pwd: md5Pwd(pwd), type}, function (err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务器故障'})
      }
      return res.json({code: 0, msg: '恭喜您，注册成功!'})
    })
  })
})


function md5Pwd(pwd) {
  // 盐值
  const salt = 'vue-tannnb_'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
