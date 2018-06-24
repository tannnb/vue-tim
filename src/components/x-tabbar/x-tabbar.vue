<template>
  <div class="x-tabbar">
    <router-link
      class="x-tabber-item"
      v-for="(items,index) in navList "
      :key="index"
      @click.native="handleSelect(items)"
      :to="items.path">
      <div class="x-tabber-icon">
        <Svg-icon :iconClass="items.icon"></Svg-icon>
        <span v-if="items.icon == 'msg'" class="count">{{unread}}</span>
      </div>
      <p class="x-tabber-label">{{items.text}}</p>
    </router-link>
  </div>
</template>

<script>
  import SvgIcon from '../../components/svg-icon/svg-nav'
  import {mapGetters} from 'vuex'

  export default {
    name: "x-tabbar",
    props: {
      navList: {
        type: Array,
        default: []
      }
    },
    components: {
      SvgIcon
    },
    computed:{
      ...mapGetters(['unread'])
    },
    methods: {
      handleSelect(items) {
        this.$emit('handleSelect', items)
      }
    }
  }
</script>

<style lang="stylus" scoped>


  .x-tabbar {
    display: flex;
    position: absolute;
    z-index: 10;
    bottom: 0;
    width: 100%;
    background-color: #f7f7fa;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #c0bfc4;
      color: #c0bfc4;
      transform-origin: 0 0;
      transform: scaleY(.5);
    }
    .x-tabber-item {
      display: block;
      flex: 1;
      padding: 5px 0 0;
      font-size: 0;
      color: #c3c3c3;
      text-align: center;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      .x-tabber-icon {
        position: relative;
        display: inline-block;
        width: 28px;
        height: 28px;
        .count{
          position: absolute
          top: -4px
          right: -14px
          display block
          width 24px
          height:24px
          line-height 24px
          font-size 14px
          border-radius 50%
          background #ff6a46
          color: #fff
        }
      }
      .x-tabber-label {
        text-align: center;
        color: #4f5252;
        font-size: 10px;
        line-height: 1.8;
      }

      &.router-link-exact-active, &.router-link-active {
        .x-tabber-icon {
          svg {
            color: #3a99f0
          }
        }
        .x-tabber-label {
          color: #3a99f0
        }
      }
    }
  }


</style>
