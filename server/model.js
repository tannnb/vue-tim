const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/vue-chat'

// 连接mongodb
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('连接mongodb 连接成功')
})


const models = {
  user: {
    "user": {"type": String, "require": true},
    "pwd": {"type": String, "require": true},
    "type": {"type": String, "require": true},
    "avatar": {"type": String},   // 头像
    "desc": {"type": String},     // 描述，简介
    "title": {"type": String},    // 职位名
    "company": {"type": String},  // 公司名称 ,type类型为boss所属
    "money": {"type": String},    // 薪资 ,type类型为boss所属
  },
  chat: {}
}


// 创建模型
for (let attr in models) {
  mongoose.model(attr, new mongoose.Schema(models[attr]))
}

module.exports= {
  getModel:function (name) {
    return mongoose.model(name)
  }
}
