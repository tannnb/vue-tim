import * as types from '../mutation-types'
import axios from 'axios'
import {getRedirectPath} from '../../util/util'

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
    state.initState = {
      ...state.initState,
      redirectTo: getRedirectPath(payload.data),
      isAuth: true,
      msg: payload.msg,
      ...payload.data
    }
  },
  [types.SET_ERROR_MSG](state, payload) {
    state.initState = {
      ...state.initState,
      isAuth: false,
      msg: payload.msg
    }
  },
  [types.SET_LOGOUT](state,payload){
    state.initState = payload
  }
}


//actions
const actions = {

  // 判断权限
  authRoute({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user/info').then(res => {
        if (res.status === 200 && res.data.code === 0) {
          resolve(res.data.code)
          commit('SET_AUTH_SUCCESS', res.data)
        } else {
          reject(res.data.code)
          commit('SET_ERROR_MSG', res.data)
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
            resolve(res.data)
            commit('SET_AUTH_SUCCESS', res.data)
          } else {
            reject(res.data)
            commit('SET_ERROR_MSG', res.data)
          }
        })
    })
  },

  // 登陆
  login({commit, state}, {user, pwd}) {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/login', {user, pwd})
        .then(res => {
          if (res.status && res.data.code === 0) {
            resolve(res.data)
            commit('SET_AUTH_SUCCESS', res.data)
          } else {
            reject(res.data)
            commit('SET_ERROR_MSG', res.data)
          }
        })
    })
  },

  // 更新数据，完善信息
  update({commit,state},data){
    return new Promise((resolve,reject) => {
      axios.post('/api/user/update',data)
        .then(res => {
          if (res.status && res.data.code === 0) {
            resolve(res.data)
            commit('SET_AUTH_SUCCESS', res.data)
          } else {
            reject(res.data)
            commit('SET_ERROR_MSG', res.data)
          }
        })
    })
  },

  // 退出登录
  logoutSubmit({commit,state}){
    commit('SET_LOGOUT',{})
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
