import * as types from '../mutation-types'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')


const state = {
  initChatMsg:{
    chatMsg: [],
    unread:0
  }
}


// getters
const getters = {
  chatMsg: state => state.initChatMsg
}


//mutations
const mutations = {
  [types.SET_MSG_LIST](state, payload) {
    state.initChatMsg = {
      ...state.initChatMsg,
      chatmsg: payload,
      unread:payload.filter(v => !v.read).length
    }
  }
}


//actions
const actions = {

  // 获取列表信息
  getMsgList({commit}) {
    return new Promise((resolve,reject) => {
      axios.get('/api/user/getMsgList').then(res => {
        console.log(res)
        /*if (res.status && res.data.code === 0) {
          resolve(res)
          commit('SET_MSG_LIST',res.data)
        }else{
          reject(res)
          commit('SET_MSG_LIST',res.data)
        }*/
      })
    })
  },

  sendMsg({commit},{from,to,msg}){
     socket.emit('sendMsg', {from,to,msg})
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
