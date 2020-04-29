<template>
  <div>
    <template v-if="!itemData.show">
      <a v-if="link(itemData.path)" :href="itemData.path" target="_blank">
        <el-menu-item index="">
          <i class="icon iconfont" :class="itemData.icon"></i>
          <span slot="title">{{ itemData.name }}</span>
        </el-menu-item>
      </a>
      <el-menu-item v-else :index="itemData.path" >
        <i class="icon iconfont" :class="itemData.icon"></i>
        <span slot="title">{{ itemData.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>

  export default {
    props: {
      itemData: {
        type: Object,
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
