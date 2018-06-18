<template>
    <div>
      <NavBar title="登陆"></NavBar>
      <Logo></Logo>
      <div class="form-wrapper">
        <cube-input
          class="input-margin"
          v-model="model.User"
          placeholder="请输入账号"
          :clearable="clearable"
        ></cube-input>
        <cube-input
          class="input-margin"
          v-model="model.Pwd"
          type="password"
          placeholder="请输入密码"
          :clearable="clearable"
          :eye="eye"
        ></cube-input>
        <div class="padd"></div>
        <cube-button class="loginBtn" @click="HandlerSubmit">登陆</cube-button>
        <cube-button :outline="true" class="loginBtn" @click="HandlerRegister">注册</cube-button>
      </div>
    </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import Fade from '../../components/Fade/Fade'
  import Logo from '../../components/Logo/Logo'
  import NavBar from '../../components/NavBar/NavBar'
  import axios from 'axios'

  export default {
    name: "login",
    data() {
      return {
        model: {
          User: '',
          Pwd: ''
        },
        clearable: true,
        eye: {open: false, reverse: false}
      }
    },
    components: {
      Fade,
      Logo,
      NavBar
    },
    computed:{
      ...mapGetters(['initState'])
    },
    methods: {
      ...mapActions(['login']),
      showToastType() {
        this.$createToast({
          txt: '账号或密码不能为空',
          time: 1500,
          type: 'warn'
        }).show()
      },
      HandlerSubmit() {
        if (!this.model.User || !this.model.Pwd) {
          this.showToastType()
          return false
        }
        this.login({
          user:this.model.User,
          pwd:this.model.Pwd,
        }).then(res => {
          this.$router.push({path: this.initState.redirectTo})
        }).catch(err => {
          console.log(err)
        })
      },
      HandlerRegister() {
        this.$router.push({path: '/register'})
      }
    }
  }
</script>

<style lang="stylus" scoped>


  .form-wrapper {
    padding: 12px;
    .input-margin {
      margin 20px 0
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
