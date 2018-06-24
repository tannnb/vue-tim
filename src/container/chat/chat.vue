<template>
  <div class="chat-wrapper">
   <!-- <div>用户名：{{this.$store.state.users.initState.user}}</div>
    <ul>
      <li v-for="(items) in msgData">{{items.text}}</li>
    </ul>-->
    <div class="inputWrapper">
      <input class="valModel" type="text" v-model="valModel" placeholder="请输入聊天信息">
      <span @click="handleSendMessage" class="send">发送</span>
    </div>
  </div>
</template>

<script>

  import {mapActions,mapGetters} from 'vuex'

  export default {
    name: "chat",
    data() {
      return {
        chatlist: '',
        valModel: '',
        msgData: []
      }
    },
    created() {
     // this.getMsgList()
    },
    mounted() {

    },
    computed:{
      ...mapGetters(['initState'])
    },
    methods: {
      ...mapActions(['getMsgList','sendMsg']),
      handleSendMessage() {
        this.sendMsg({
          from:this.initState._id,
          to:this.$router.history.current.params.id,
          msg:this.valModel
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .chat-wrapper {
    width: 100%
    height 100%

  }

  .inputWrapper {
    display flex
    position: absolute
    bottom 0
    left 0
    right: 0
    padding 6px 10px
    border-top 1px solid #ddd
    background #e8e8e8
    .valModel {
      flex 1
      line-height 44px
      padding 0 10px
      background #fff
      outline none
    }
    .send {
      display block
      flex 0 0 100
      width 100px
      text-align center
      line-height 44px
      color: white
      background #4a4c5b
      cursor pointer
    }
  }

</style>
