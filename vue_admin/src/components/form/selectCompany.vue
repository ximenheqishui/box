<template>
  <div class="select-company">
    <el-form-item label="加油站">
      <el-select v-model="name" @change="change" clearable filterable  placeholder="请选择企业名称">
        <el-option
          v-for="item in data"
          :key="item.id"
          :label="item.dutyName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'selectCompany',
    props: {
    },
    data () {
      return {
        data: [],
        name: ''
      }
    },
    methods: {
      change (id) {
        let data = this.data
        let node = { id: '', guns: [] }
        for (let i = 0; i < data.length; i++) {
          if (String(data[i].id) === String(id)) {
            node = data[i]
            break
          }
        }
        this.$emit('getId', node)
      },
      clear () {
        this.name = ''
        this.$emit('getId', { id: '', guns: [] })
      }
    },
    mounted: function () {
      this.api.getStation({}).then(res => {
        if (res.code === 0) {
          this.data = res.data
        }
      }).catch(error => { // 状态码非2xx时
        console.log(error)
      })
    }
  }
</script>

<style scoped lang="scss">
</style>
