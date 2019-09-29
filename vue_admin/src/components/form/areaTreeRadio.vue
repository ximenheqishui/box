<template>
  <div class="area-tree-radio">
    <el-form-item label="所属区域" class="is-required" :class="{'is-error': isError }">
      <el-popover
        width="300"
        placement="bottom-start"
        trigger="click">
        <el-tree
          style="height: 340px;overflow-y: auto"
          ref="tree"
          @node-click="change"
          :data="data"
          accordion
          node-key="id"
          :default-expand-all="false"
        >
        </el-tree>
        <el-input  @blur="validate" readonly slot="reference" v-model="name" placeholder="请选择所属区域"></el-input>
      </el-popover>
      <div class="el-form-item__error" v-show="isError">
        请输入选择所属区域
      </div>
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
        isError: false,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        name: ''
      }
    },
    methods: {
      change (data, node, _this) {
        this.isError = false
        this.name = data.label
        this.$emit('getId', data.id)
      },
      clear () {
        this.isError = false
        this.name = ''
      },
      validate () {
        if (!this.name) {
          this.isError = true
        }
      }
    },
    mounted: function () {
      let data = JSON.parse(sessionStorage.getItem('areaTree'))
      if (data && data.length) {
        this.data = data
      } else {
        this.api.getAreaTree({}).then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data
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
