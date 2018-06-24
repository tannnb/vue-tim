<template>
  <div>
    <div class="cardWrapper"
         @click="handleSelectItem(items)"
         v-for="(items,index) in userList"
         :key="items._id">
      <div class="header">
        <div class="avatar">
          <img v-if="items.avatar" :src=' "../../components/x-grid/"+ items.avatar +".png" ' alt="">
        </div>
        <div class="user"> {{items.user}}</div>
        <div v-if="items.count" class="count">99</div>
      </div>
      <div class="symbol">
        <span v-if="items.company">{{items.company}}</span>
        <span v-if="items.money">{{items.money}}</span>
        <span>{{items.title}}</span>
      </div>
      <div class="desc"> {{items.desc}}</div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "bossContainer",
    data() {
      return {
        userList: []
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
      ...mapActions(['getUserList']),
      handleSelectItem(items){
        this.$router.push({path:`/chat/${items._id}`})
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .cardWrapper {
    margin 10px
    background white
    border 4px
    padding 10px
    .header {
      position: relative
      display flex
      align-items center
      .avatar {
        width 50px
        height 50px
        padding 4px
        border: 1px solid #eee
        border-radius 50%
        overflow hidden
        img {
          width 100%
        }
      }
      .user {
        padding-left 12px
        font-size 20px
        color #4f4f4f
      }
      .count{
        position: absolute
        right:10px
        top:20px
        width 26px
        height: 26px
        line-height 26px
        text-align center
        background #ef4f4f
        color: white
        font-size 14px
        border-radius 100px
      }
    }
    .symbol {
      display flex
      padding 6px 0
      span {
        display inline-block
        padding 5px
        margin-right 8px
        font-size 14px
        border-radius 2px
        background #e2e2e2
        color: #707070
      }
    }
    .desc {
      padding-top 4px
      line-height 20px
      font-size 15px
    }
  }

</style>
