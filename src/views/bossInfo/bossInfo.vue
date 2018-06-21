<template>
  <div>
    <NavBar title="BOSS信息完善"></NavBar>
    <div class="container">
      <cube-scroll>

        <div class="default-wrapper">
          <div class="default-avatar">
            <img :src=' "../../components/x-grid/"+ model.avatar +".png" ' alt="">
          </div>
        </div>

        <Avatar-select :gridRowCount="gridRowCount" @handleSelectItem="handleSelectItem"></Avatar-select>
        <cube-form
          :model="model"
          :schema="schema"
          @validate="validateHandler"
          @submit="submitHandler"></cube-form>
      </cube-scroll>

    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import NavBar from '../../components/NavBar/NavBar'
  import InputItem from '../../components/InputItem/InputItem'
  import AvatarSelect from '../../components/x-grid/x-grid'


  export default {
    name: "bossInfo",
    data() {
      return {
        model: {
          avatar: 'boy',
          title: '',
          company: '',
          money: '',
          desc: '',
        },
        schema: {
          fields: [
            {
              type: 'input',
              modelKey: 'title',
              label: '招聘职位',
              props: {placeholder: '请输入'},
              rules: {required: true}
            },
            {
              type: 'input',
              modelKey: 'company',
              label: '公司名称',
              props: {placeholder: '请输入公司名称'},
              rules: {required: true}
            },
            {
              type: 'input',
              modelKey: 'money',
              label: '职位薪资',
              props: {placeholder: '请输入公司名称'},
              rules: {required: true}
            },
            {
              type: 'textarea',
              modelKey: 'desc',
              label: '职位要求',
              props: {
                placeholder: '请输入职位要求',
                maxlength: 100,
              },
              rules: {
                required: true
              },
              debounce: 100
            },
            {
              type: 'submit',
              label: '确定'
            }
          ]
        },
        gridRowCount: 5
      }
    },
    computed: {
      ...mapGetters(['initState'])
    },
    components: {
      NavBar,
      AvatarSelect
    },
    methods: {
      ...mapActions(['update']),
      validateHandler() {
        console.log('ok')
      },
      submitHandler(e) {
        e.preventDefault()
        this.update(this.model)
          .then(res => {
            this.$router.push({path: this.initState.redirectTo})
          })
          .catch(err => {
            this.$createToast({
              txt: err.msg,
              type: 'correct',
              time: 2000
            }).show()
          })
      },
      handleSelectItem(items) {
        this.model.avatar = items
      }
    }
  }
</script>

<style lang="stylus">

  .container {
    position absolute
    top: 44px
    bottom: 0
    left: 0
    width 100%
    overflow hidden
  }

  .default-wrapper {
    display flex
    justify-content center
    align-items center
    .default-avatar {
      width 60px
      height 60px
      margin 20px 0
      border-radius 50%
      border: 1px solid #e7e7e7
      box-shadow 0 0px 10px #dddddd
      overflow hidden
      img {
        width 100%
      }
    }
  }

  .cube-form_standard .cube-textarea-wrapper.cube-textarea_expanded {
    height: 90px !important
  }


</style>
