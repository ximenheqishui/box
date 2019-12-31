<template>
  <div class="exception_404">
    <iframe src="./static/404.html"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'exception_404',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" type="text/scss">
  .exception_404{
    height:100%;
    iframe{
      border: none;
      margin: 0;
      padding: 0;
      width: 100%;
      height:100%;
    }
  }
</style>
