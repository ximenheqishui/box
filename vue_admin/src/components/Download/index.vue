<template>
  <a :href=" !disable ? downloadUrl : 'javascript:void(0)'" target="_blank" style="display: inline-block;box-sizing: border-box">
    <el-button class="icon-change" :disabled="disable"  size="mini" type="primary" icon="icon iconfont icon-daochu">
      导出
    </el-button>
  </a>
</template>

<script>
  export default {
    name: 'download',
    props: {
      page: {
        type: String,
        required: true
      },
      disable: {
        type: Boolean,
        default: true
      },
      queryData: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.commonURL.exportUrl + `/${this.page}/?token=${this.$store.getters.token}&` + this.qs.stringify(this.queryData)
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>

<style scoped lang="scss">
</style>
