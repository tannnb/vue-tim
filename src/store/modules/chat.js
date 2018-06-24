import * as types from '../mutation-types'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')


const state = {
  initChatMsg: {
    chatMsg: [],
    unread: 0
  }
}


// getters
const getters = {
  chatMsg: state => state.initChatMsg.chatMsg,
  unread:state => state.initChatMsg.unread
}


//mutations
const mutations = {
  [types.SET_MSG_LIST](state, payload) {
    state.initChatMsg = {
      ...state.initChatMsg,
      chatMsg: payload,
      unread: payload.filter(v => !v.read).length
    }
  },
  [types.SET_MSG_RECV](state, payload) {
    state.initChatMsg = {
      ...state.initChatMsg,
      chatMsg: [...state.initChatMsg.chatMsg,payload],
      unread: state.initChatMsg.unread + 1
    }
  }
}


//actions
const actions = {

  // 获取列表信息
  getMsgList({commit}) {
    axios.get('/api/user/getMsgList').then(res => {
      if (res.status && res.data.code === 0) {
        commit('SET_MSG_LIST', res.data.msgs)
      }
    })
  },

  // 客户端想服务端发送信息
  sendMsg({commit}, {from, to, msg}) {
    socket.emit('sendMsg', {from, to, msg})
  },

  // 客户端接受信息
  recvmsg({commit}) {
    socket.on('recvmsg', function (data) {
      commit('SET_MSG_RECV', data)
    })
  }

}


export default {
  state,
  getters,
  actions,
  mutations
}
