<template>
  <div>
    <a v-if="link(path)" :href="path" target="_blank">
      <el-menu-item index="">
        <i class="icon iconfont" :class="icon"></i>
        <span slot="title">{{ name }}</span>
      </el-menu-item>
    </a>
    <el-menu-item v-else :index="path" >
      <i class="icon iconfont" :class="icon"></i>
      <span slot="title">{{ name }}</span>
    </el-menu-item>
  </div>
</template>

<script>

  export default {
    props: {
      path: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    methods: {
      link (url) {
        return /^(https?:|mailto:|tel:)/.test(url)
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .iconfont{
    margin-right: 12px;
    width: 24px;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
    color: #d2d9ef
  }
</style>
