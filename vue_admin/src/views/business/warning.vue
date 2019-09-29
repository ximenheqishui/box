<template>
  <div class="warning">
    <div class="warp">
      <div><span class="left">金额差额黄色预警阈值：</span><span class="right yellow">10%</span></div>
      <div><span class="left">金额差额橙色预警阈值：</span><span class="right orange">20%</span></div>
      <div><span class="left">金额差额红色预警阈值：</span><span class="right red">50%</span></div>
      <div><span class="left">金额申报日期阈值：</span><span class="right">15日</span></div>
    </div>
  </div>
</template>
// Center daily
<script>
  export default {
    name: 'warning',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" type="text/scss">
  .warning{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .warp{
      width: 340px;
      font-size: 20px;
      >div{
        color: #676a6c;
        margin-bottom: 15px;
        .left{
          display: inline-block;
          width: 230px;
          text-align: right;
          font-weight: 700;
        }
        .right{
          display: inline-block;
          padding-left: 30px;
        }
        .yellow{
          color: #f7d54e;
        }
        .orange{
          color:#ee7624;
        }
        .red{
          color: #cb3725;
        }
      }
    }
  }
</style>
