<template>
  <el-header>
    <div class="left">
      <div class="aside-switch">
        <span v-show="!$store.getters.isCollapse" @click="collapse" class="el-icon-s-fold"></span>
        <span v-show="$store.getters.isCollapse" @click="collapse" class="el-icon-s-unfold"></span>
      </div>
    </div>
    <div class="right">
      <span>{{$store.getters.userInfo.name}}</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-left: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
             <span @click="changePass">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="logOut">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
  export default {
    data () {
      return {
        dialogVisible: false
      }
    },
    computed: {
    },
    methods: {
      logOut () {
        this.$store.dispatch('logOut')
      },
      changePass () {
        this.drawer = true
      },
      collapse () {
        this.$store.dispatch('changeCollapse')
      }
    },
    created () {
    },
    destroyed () {
    },
    mounted () {
    },
    watch: {
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .el-header{
    padding: 0 20px 0 10px;
    height: 50px !important;
    background-color: #fff;
    text-align: right;
    color: #fff;
    line-height: 50px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    .left{
      flex: auto;
      display: flex;
      justify-content: flex-start;
      .aside-switch{
        cursor: pointer;
        color: #000;
        font-size: 26px;
        line-height: 50px;
      }
    }
    .right{
      flex: none;
      width: 200px;
      color: #000;
    }
  }
</style>
