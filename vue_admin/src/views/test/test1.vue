<template>
  <div class="test">
    <h1>这个是一个测试页面(其他页面都会删除只保留这一个页面)</h1>
    <button @click="btnClick">点击了多少次</button>
    <div>{{$store.getters.test.count}}</div>
    <button @click="btnClickTotal">获取历史访问次数</button>
    <div>历史访问次数{{$store.getters.test.total}}</div>

      <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
      </el-row>

  </div>
</template>

<script>
  export default {
    name: 'test',
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
      btnClick () {
        this.$store.commit('increment', { num: 1 })
      },
      btnClickTotal () {
        this.$store.dispatch('getTotal', { num: 2 })
      }
    }
  }
</script>
