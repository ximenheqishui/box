<template>
  <div class="area-tree">
    <el-form-item label="所属区域">
      <el-popover
        placement="bottom"
        width="300"
        trigger="click">
        <el-tree
          style="height: 340px;overflow-y: auto"
          ref="tree"
          :current-change="change()"
          :data="data"
          accordion
          show-checkbox
          node-key="id"
          :default-expand-all="false"
        >
        </el-tree>
        <el-input readonly slot="reference" v-model="name" placeholder="请选择所属区域"></el-input>
      </el-popover>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'areaTree',
    props: {
    },
    data () {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        name: ''
      }
    },
    methods: {
      change () {
        if (this.$refs.tree) {
          let arr = this.$refs.tree.getCheckedNodes()
          let nameArr = []
          let idArr = []
          arr.forEach((item) => {
            nameArr.push(item.label)
            idArr.push(item.id)
          })
          this.name = nameArr.join('、')
          this.$emit('getId', idArr)
        }
      },
      clear () {
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedNodes([])
        }
      }
    },
    mounted: function () {
      let data = JSON.parse(sessionStorage.getItem('areaTree'))
      if (data && data.length) {
        this.data = data
      } else {
        this.api.getAreaTree({}).then(res => {
          if (res.code === 0) {
            this.data = res.data
            sessionStorage.setItem('areaTree', JSON.stringify(this.data))
          }
        }).catch(error => { // 状态码非2xx时
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
