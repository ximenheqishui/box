<script>
  export default {
    created () {
      const { params, query } = this.$route
      const { path } = params
      if (path) {
        this.$router.replace({ path: '/' + path, query })
      } else {
        this.$router.replace({ path: '/', query })
      }
    },
    render: function (h) {
      return h() // avoid warning message
    }
  }
</script>
