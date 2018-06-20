<template>
  <div class="NavBar-wrapper">
    <span v-if="onLeft" class="leftButton"> <i @click="handleGoBack" class="cubeic-back"></i> </span>
    <h2 class="title">{{title}}</h2>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    props: {
      title: {
        type: String,
        default: ''
      },
      onLeft:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      handleGoBack(){
        this.$emit('handleGoBack')
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .NavBar-wrapper {
    position: relative
    z-index 10
    border-bottom 1px solid #efefef
    .leftButton{
      position: absolute
      left:0px
      top:14px
      i{
        padding 10px
      }
    }
    .title {
      width 80%
      margin 0 auto
      line-height 44px
      font-size 18px
      font-weight 500
      text-align center
    }
  }

</style>
