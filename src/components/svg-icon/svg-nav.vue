<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      }
    }
  }
</script>

<style type="text/css">
  .icon {
    width: 26px;
    height: 26px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
