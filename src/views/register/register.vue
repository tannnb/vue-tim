<template>
  <div>
    <NavBar :onLeft="onLeft" @handleGoBack="handleGoBack" title="注册"></NavBar>
    <Logo></Logo>
    <div class="form-wrapper">
      <cube-input
        class="input-margin"
        v-model="model.User"
        placeholder="请输入用户名"
        :clearable="clearable"
      ></cube-input>
      <cube-input
        class="input-margin"
        v-model="model.Pwd"
        type="password"
        placeholder="请输入密码"
      ></cube-input>
      <cube-input
        class="input-margin"
        v-model="model.repeatPwd"
        type="password"
        placeholder="请输入确认密码"
      ></cube-input>
      <cube-radio-group v-model="model.type" :options="options" position="right"/>
      <div class="padd"></div>
      <cube-button :outline="true" class="loginBtn" @click="HandlerRegister">立即注册</cube-button>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {getRedirectPath} from '../../util/util'
  import Logo from '../../components/Logo/Logo'
  import NavBar from '../../components/NavBar/NavBar'

  export default {
    name: "register",
    components: {
      Logo,
      NavBar
    },
    data() {
      return {
        onLeft: true,
        position: 'top',
        model: {
          User: '',
          Pwd: '',
          repeatPwd: '',
          type: 'genius',
        },
        clearable: true,
        options: [
          {
            label: '我是BOSS',
            value: 'boss',
          },
          {
            label: '我是牛人',
            value: 'genius',
          }
        ]
      }
    },
    computed: {
      ...mapGetters(['initState'])
    },

    methods: {
      ...mapActions(['register']),
      showBtn() {
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-notification',
          content: '是否返回登录页？',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
          },
          onConfirm: () => {
            this.$router.push({path: '/login'})
          }
        }).show()
      },
      showToastType(text, type = 'warn') {
        this.$createToast({
          txt: text,
          time: 1500,
          type
        }).show()
      },
      handleGoBack() {
        this.showBtn()
      },
      HandlerRegister() {
        if (!this.model.User || !this.model.Pwd) {
          this.showToastType('账号密码不能为空')
          return;
        }

        if (this.model.Pwd !== this.model.repeatPwd) {
          this.showToastType('两次输入密码不一致')
          return;
        }

        this.register({
          user: this.model.User,
          pwd: this.model.Pwd,
          type: this.model.type
        }).then(res => {
          this.showToastType(res.msg, 'correct')
          this.model = {
            User: '',
            Pwd: '',
            repeatPwd: '',
            type: 'boss',
          }
          setTimeout(() => {
            this.$router.push({path: this.initState.redirectTo})
          }, 1500)
        }).catch(err => {
          this.showToastType(err.msg, 'error')
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .form-wrapper {
    padding: 12px;
    .input-margin {
      margin 10px 0
    }
    .padd {
      margin-top 60px
    }

    .loginBtn {
      margin-top 20px
      margin-bottom 10px
    }

  }

</style>
