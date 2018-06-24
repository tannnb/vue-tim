<template>
  <div class="chat-wrapper">
    <NavBar :title="$router.history.current.params.id"
            :onLeft="true"
            @handleGoBack="handleGoBack"
    />

    <div class="containerWrapper">

      <cube-scroll :data="chatMsg" ref="scroll">
        <ul  ref="chatWrapper">
          <li
            class="chatItme"
            :class="[$router.history.current.params.id == items.from? 'default':'myItem' ]" v-if="chatMsg"
            v-for="(items,index) in chatMsg"
            :key="index"
          >
            <span class="avatar"></span>
            <span class="content">{{items.content}}</span>
          </li>
        </ul>
      </cube-scroll>
    </div>

    <div class="inputWrapper">
      <input class="valModel" type="text" v-model="valModel" placeholder="请输入聊天信息">
      <span @click="handleSendMessage" class="send">发送</span>
    </div>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import NavBar from '../../components/NavBar/NavBar'

  export default {
    name: "chat",
    data() {
      return {
        chatlist: '',
        valModel: '',
        msgData: []
      }
    },
    components: {
      NavBar
    },
    created() {
      this.getMsgList()
    },
    mounted() {
      this.recvmsg()
    },
    computed: {
      ...mapGetters(['initState', 'chatMsg'])
    },
    methods: {
      ...mapActions(['getMsgList', 'sendMsg', 'recvmsg']),
      handleSendMessage() {

        this.sendMsg({
          from: this.initState._id,
          to: this.$router.history.current.params.id,
          msg: this.valModel
        })
        this.valModel = ''
        const len = this.$refs.chatWrapper.childNodes.length-1
        setTimeout(() => {
          this.$refs.scroll.scrollToElement(this.$refs.chatWrapper.childNodes[len],300)
        },100)
      },
      handleGoBack() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .chat-wrapper {
    width: 100%
    height 100%
  }

  .chatItme {
    display flex
    padding 10px
  }

  .default {
    .avatar {
      display inline-block
      flex 0 0 40px
      width 40px
      height 40px
      background #ddd
      border-radius 50%
    }
    .content {
      position: relative
      flex: 1
      margin 0 50px 0 20px
      padding 6px 10px
      line-height 32px
      background #fff
      color: #000
      border-radius 6px
      &:after {
        content ''
        position: absolute
        left: -20px
        top: 6px
        width 0
        height 0
        border-top: 10px solid transparent;
        border-right: 10px solid #fff;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
      }
    }
  }

  .myItem {
    flex-direction row-reverse
    .avatar {
        display inline-block
        flex 0 0 40px
        width 40px
        height 40px
        background #ddd
        border-radius 50%
    }
    .content {
      position: relative
      margin 0 20px 0 50px
      padding 6px 10px
      line-height 32px
      background #c1e2ec
      color: #000
      border-radius 6px
      &:before {
        content ''
        position: absolute
        right -20px
        top: 6px
        width 0
        height 0
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid #c1e2ec;
      }
    }
  }


  .containerWrapper {
    position: absolute
    top: 45px
    left: 0
    bottom 57px
    width 100%
    background #f5f5f5
    overflow hidden
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
