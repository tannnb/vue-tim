<template>
  <div>
    <transition>
      <slot></slot>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "Fade"
    }
</script>

<style lang="stylus" scoped>
  .v-enter,.v-leave-to {
    transition: all 0.5s
  }
  .v-enter-active,.v-leave-active {
    opacity .5
  }

</style>
