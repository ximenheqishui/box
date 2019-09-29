<template>
  <div class="sales-income">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按分局统计" name="areaarea">
        <areaarea></areaarea>
      </el-tab-pane>
      <el-tab-pane label="按加油站统计" name="station">
        <station></station>
      </el-tab-pane>
      <el-tab-pane label="按油品统计" name="youpin">
        <youpin></youpin>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import areaarea from './area.vue'
  import station from './station.vue'
  import youpin from './youpin.vue'
  export default {
    name: 'salesIncome',
    components: {
      areaarea,
      station,
      youpin
    },
    data () {
      return {
        activeName: 'areaarea'
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss" type="text/scss">
  .sales-income{
  }
</style>
