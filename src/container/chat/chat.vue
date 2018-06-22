<template>
  <div>
    <div>用户名：{{this.$store.state.users.initState.user}}</div>
    <div>{{chatlist}}</div>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    name: "chat",
    data() {
      return {
        chatlist: ''
      }
    },
    created(){
      const socket = io('ws://localhost:9093')
      socket.on('obj1',  (data) => {
        if(!data){
          return false
        }
        this.chatlist = data.hello
      })
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
