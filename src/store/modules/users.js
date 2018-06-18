import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  initState: {}
}


// getters
const getters = {
  initState: state => state.initState
}


//mutations
const mutations = {
  [types.SET_AUTH_SUCCESS](state, payload) {
    state.initState = {...state.initState, isAuth: true, msg: '', ...payload}
  },
  [types.SET_ERROR_MSG](state, msg) {
    state.initState = {...state.initState, isAuth: false, msg}
  }
}


//actions
const actions = {

  // 判断权限
  authRoute() {
    return new Promise((resolve, reject) => {
      axios.get('/api/user/info').then(res => {
        if (res.status === 200 && res.data.code === 0) {
          // 有登陆信息
          resolve(res.data.code)
        } else {
          reject(res.data.code)
        }
      })
    })
  },

  // 用户注册
  register({commit, state}, {user, pwd, type}) {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/register', {user, pwd, type})
        .then(res => {
          if (res.status === 200 && res.data.code === 0) {
            commit('SET_AUTH_SUCCESS', {user, pwd, type})
          } else {
            commit('SET_ERROR_MSG', res.data.msg)
          }
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
