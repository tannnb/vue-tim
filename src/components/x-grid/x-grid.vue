<template>
  <ul class="x-grids">
    <li
       v-for="(items,index) in avatarList"
       :key="index"
       :style="setGridRowCount"
       @click="handleSelectItem(items)"
       class="x-grid">
      <div class="x-grid-icon">
        <img :src=' "./"+ items +".png" '/>
      </div>
      <p class="x-grid-label">{{items}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      gridRowCount:{
        type:Number,
        default:4
      }
    },
    data(){
      return {
        avatarList:['boy', 'bull', 'chick', 'crab', 'girl', 'hedgehog',
          'hippopotamus', 'koala', 'lemur', 'man', 'pig', 'tiger', 'whale',
          'woman', 'zebra']
      }
    },
    computed:{
      setGridRowCount(){
        if(this.gridRowCount === 5){
          return `width:20%`
        }
        if(this.gridRowCount === 3){
          return `width:33.333%`
        }
      }
    },
    methods:{
      handleSelectItem(items){
        this.$emit('handleSelectItem',items)
      }
    }
  };
</script>

<style lang="stylus" scoped>


  .x-grids {
    position: relative;
    overflow: hidden;
    background white
    &:before, &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      color: #d6d6d6;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:before {
      right: 0;
      height: 1px;
      border-top: 1px solid #D9D9D9;
    }
    &:after {
      width: 1px;
      bottom: 0;
      border-left: 1px solid #D9D9D9;
    }
  }

  .x-grid {
    position: relative;
    float: left;
    padding: 12px 10px;
    width: 25%;
    box-sizing: border-box;
    &:active {
      background #cbcbcb
    }
    &:before, &:after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      color: #cbcbcb;
    }
    &:before {
      top: 0;
      width: 1px;
      border-right: 1px solid #D9D9D9;
      -webkit-transform-origin: 100% 0;
      transform-origin: 100% 0;
      -webkit-transform: scaleX(0.5);
      transform: scaleX(0.5);
    }
    &:after {
      left: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .x-grid-icon + .x-grid-label {
    margin-top: 5px;
  }

  .x-grid-icon {
    z-index: 2;
    width: 28px;
    height: 28px;
    margin: 0 auto;
    img {
      width 100%
      vertical-align top
    }
  }

  .x-grid-label {
    z-index: 2;
    display: block;
    text-align: center;
    color: #000;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

</style>
