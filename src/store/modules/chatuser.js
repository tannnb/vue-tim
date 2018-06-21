import * as types from '../mutation-types'
import axios from 'axios'
import {getRedirectPath} from '../../util/util'

const state = {
  userList: []
}


// getters
const getters = {
  userList: state => state.userList
}


//mutations
const mutations = {
  [types.SET_USER_LIST](state, payload) {
    state.userList = payload
  }
}


//actions
const actions = {

  // 获取列表信息
  getUserList({commit, state}, type) {
    return new Promise((resolve,reject) => {
      axios.get(`/api/user/list?type=${type}`).then(res => {
        if (res.status && res.data.code === 0) {
          resolve(res)
          commit('SET_USER_LIST',res.data)
        }else{
          reject(res)
          commit('SET_USER_LIST',res.data)
        }
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
