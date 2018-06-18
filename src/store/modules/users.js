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
  }
}


//actions
const actions = {

  // 判断权限
  authRoute() {
    return new Promise((resolve, reject) => {
      axios.get('/api/user/info').then(res => {
        if (res.status === 200 && res.data.code === 0) {
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
            resolve(res.data)
            commit('SET_AUTH_SUCCESS', res.data)
          } else {
            reject(res.data)
            commit('SET_ERROR_MSG', res.data)
          }
        })
    })
  },

  login({commit, state}, {user, pwd}) {
    return new Promise((resolve, reject) => {
      axios.post('/api/user/login', {user, pwd})
        .then(res => {
          if (res.status && res.data.code === 0) {
            commit('SET_AUTH_SUCCESS', res.data.data)
            resolve(res.data)
          } else {
            commit('SET_ERROR_MSG', res.data.msg)
          }
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
