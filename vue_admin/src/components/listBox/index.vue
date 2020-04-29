<template>
  <div
    class=""
    element-loading-text="数据加载中"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.6)"
    @scroll="listBoxScroll"
    ref="tableScrollbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'listBox',
    props: {
      loading: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        scrollTop: 0
      }
    },
    activated () {
      // 保持页面滚动条的位置
      try {
        this.$refs.tableScrollbar.scrollTop = this.scrollTop || 0
      } catch (e) {
        console.warn(e)
      }
    },
    methods: {
      listBoxScroll () {
        this.scrollTop = this.$refs.tableScrollbar.scrollTop
      },
      setScrollTop (top) {
        this.scrollTop = top || 0
        this.$refs.tableScrollbar.scrollTop = this.scrollTop
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped lang="scss">
</style>
