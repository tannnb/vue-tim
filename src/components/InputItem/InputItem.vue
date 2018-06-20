<template>
  <div class="input-item">
    <label class="name">{{label}}</label>
    <input v-if="inputShowFlag" class="val" type="text" v-model="query">
    <textarea class="areaVal" v-if="!inputShowFlag" v-model="query"></textarea>
  </div>
</template>

<script>
  export default {
    name: "InputIItem",
    props: {
      label: {
        type: String,
        default: ''
      },
      inputShowFlag: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        query: ''
      }
    },
    created() {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .input-item {
    display flex
    padding 6px 12px
    border-bottom 1px solid #e9e9e9
    .name {
      flex-grow: 2
      line-height 40px
    }
    .val {
      flex-grow: 3
      line-height 40px
      outline none
    }
    .areaVal{
      flex-grow: 3
      min-height 90px
      line-height 30px
      font-size 15px
      outline none
      border none
      resize none
    }
  }
</style>
