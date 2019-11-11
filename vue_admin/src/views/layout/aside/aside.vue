<template>
    <el-aside class="xee-aside" width="200px" :class="{'is-collapse':$store.getters.isCollapse}">
        <div class="aside-header">
          <template v-if="!$store.getters.isCollapse">
            {{systemName}}
          </template>
          <template v-else>
            <span style="font-size: 14px">{{systemName}}</span>
          </template>
        </div>
        <el-menu
                :router="true"
                :default-active="$route.path"
                :collapse="$store.getters.isCollapse"
                :collapse-transition="false"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="true"
                background-color="#304156"
                text-color="#d2d9ef"
                active-text-color="#409EFF">
            <template v-for="item in $store.getters.userInfo.menu">
                <el-submenu class="submenu" v-if="item.children && item.children.length" :index="item.name"
                            :key="item.name">
                    <template slot="title">
                        <i class="icon iconfont" :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <template v-for="item2 in item.children">
                        <el-submenu v-if="item2.children && item2.children.length" :index="item2.name" :key="item2.name">
                            <template slot="title">
                                <i class="icon iconfont" :class="item2.icon"></i>
                                <span>{{item2.name}}</span>
                            </template>
                            <menu-item  v-for="item3 in item2.children"  v-bind:key="item3.path" v-bind:path="item3.path" v-bind:name="item3.name" v-bind:icon="item3.icon"></menu-item>
                        </el-submenu>
                        <menu-item v-else v-bind:key="item2.path" v-bind:path="item2.path" v-bind:name="item2.name" v-bind:icon="item2.icon"></menu-item>
                    </template>
                </el-submenu>
                <menu-item v-else v-bind:key="item.path" v-bind:path="item.path" v-bind:name="item.name" v-bind:icon="item.icon"></menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
  import menuItem from './menuItem'
  export default {
    data () {
      return {
        systemName: baseConfig.systemName,
        isCollapse: false
      }
    },
    components: { menuItem },
    methods: {
      handleOpen (key, keyPath) {
        // console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        // console.log(key, keyPath)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "../../../assets/styles/mixin";
    .iconfont{
      margin-right: 12px;
      width: 24px;
      text-align: center;
      font-size: 16px;
      vertical-align: middle;
      color: #d2d9ef
    }
    .is-collapse {
        width: 64px !important;
        overflow-x: hidden;

        .aside-header {
            width: 64px !important;
        }
    }
    .el-aside {
        background-color: #304156;
        transition: all .5s;
        height: 100%;
        .aside-header {
            transition: all .5s;
            background: #2b2f3a;
            overflow: hidden;
            color: #fff;
            position: fixed;
            top: 0;
            line-height: 50px;
            height: 50px;
            z-index: 2;
            width: 198px;
            box-sizing: border-box;
            text-align: center;
        }

        .el-menu {
            border: none;
            height: calc(100% - 50px);
            margin-top: 50px;
            @include scrollBar();
            overflow-x: hidden;
        }
        /*.el-submenu .el-menu li{*/
        /*    background-color: #1f2d3d!important;*/
        /*    &:hover{*/
        /*      background-color: #001528!important;*/
        /*    }*/
        /*  }*/
    }
</style>
