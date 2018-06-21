<template>
  <div>
    <div v-for="(items,index) in userList">
      <div> {{items.avatar}}</div>
      <div> {{items.company}}</div>
      <div> {{items.desc}}</div>
      <div> {{items.money}}</div>
      <div> {{items.title}}</div>
      <div> {{items.user}}</div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "bossContainer",
    data(){
      return {
        userList:[]
      }
    },
    created() {
      if (this.initState) {
        const type = this.initState.type === 'genius' ? 'boss' : 'genius'
        this.getUserList(type).then(res => {
          this.userList = res.data.data
          console.log(res.data.data)
        })
      }
    },
    computed: {
      ...mapGetters(['initState'])
    },
    methods: {
      ...mapActions(['getUserList'])
    }
  }
</script>

<style scoped>

</style>
