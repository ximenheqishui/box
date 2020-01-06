<template>
  <div class="article-type">
    <div class="tool-box">
      <div class="left">
        <el-button size="mini" type="primary"  @click="append(0)">添加顶级分类</el-button>
        <el-button size="mini" type="primary"  @click="deleteMore()">批量删除</el-button>
      </div>
      <div class="right"></div>
    </div>
    <div class="department-tree">
      <el-input
        size="small"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        :data="data"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="padding: 0 6px;display: inline-block" @click="() => change(data)">
          <i :class="'icon iconfont ' + data.icon"></i>
          {{ node.label }}
        </span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加子分类
          </el-button>
          <el-button
             type="text"
             size="mini"
             @click="() => change(data)">
             修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <span style="color:#f56c6c">删除</span>
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
    <el-dialog :title="isAdd ?  '添加分类': '修改分类'" :visible.sync="dialog" width="600px">
      <div  class="header" v-if="form.parent_name">
        <label>上级分类：</label>
        {{ form.parent_name }}
      </div>
      <el-form :model="form" :rules="rules" size="small" ref="ruleForm" label-width="120px" @keyup.enter.native="submitForm()">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入类别名称" ></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort_order">
           <el-input-number v-model="form.sort_order" controls-position="right" :min="1"></el-input-number>
           <span>&nbsp;&nbsp;&nbsp;&nbsp;值越小越靠前</span>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="disableSubmit" @click="submitForm()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  let defaultForm = {
    id: '',
    name: '', // 当前的名称
    parent_id: '', // 父节点id
    parent_name: '', // 父节点名称
    sort_order: '', // 排序值
    status: 0 // 是否启用  0 是启用  1 是不启用
  }
  export default {
    name: 'articleType',
    components: {
    },
    data () {
      return {
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dialog: false, // dialog 弹框
        isAdd: true, // 是否是添加
        currentData: '', // 存储添加子节点的数据  引用赋值  保存当前数据的指针
        disableSubmit: false, // 是否禁用提交按钮
        form: JSON.parse(JSON.stringify(defaultForm)),
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        },
        options: []
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    filters: {
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      getArticleType () {
        this.api.getArticleType({}).then(res => {
          if (res.code === 0) {
            this.data = res.data
          } else {
            this.errorHandler(res.message || '获取文章类别失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      submitForm () {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!_this.disableSubmit) {
              _this.disableSubmit = true
            } else {
              return false
            }
            let form = JSON.parse(JSON.stringify(_this.form))
            // form.leader = form.leader.join(',')
            if (_this.isAdd) {
              _this.api.addArticleType(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog = false
                  let newData = JSON.parse(JSON.stringify(form))
                  newData.id = res.data.id
                  if (_this.currentData) {
                    if (!_this.currentData.children) {
                      this.$set(_this.currentData, 'children', [])
                    }
                    _this.currentData.children.push(newData)
                  } else {
                    _this.data.push(newData)
                  }
                } else {
                  _this.errorHandler(res.message || '新增文章类别失败')
                }
              }).catch(error => {
                _this.disableSubmit = false
                _this.errorHandler(error.message)
              })
            } else {
              _this.api.updateArticleType(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog = false
                  // 给对象赋值
                  _this.currentData.id = form.id
                  _this.currentData.name = form.name
                  _this.currentData.parent_id = form.parent_id
                  _this.currentData.parent_name = form.parent_name
                  _this.currentData.sort_order = form.sort_order
                  _this.currentData.status = form.status
                } else {
                  _this.errorHandler(res.message || '修改文章类别失败')
                }
              }).catch(error => {
                _this.disableSubmit = false
                _this.errorHandler(error.message)
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm () {
        this.$refs.ruleForm.resetFields()
      },
      append (data) {
        this.currentData = data
        this.isAdd = true
        this.dialog = true
        this.$nextTick(() => {
          this.resetForm()
          this.form = JSON.parse(JSON.stringify(defaultForm))
          if (data) {
            this.form.parent_id = data.id
            this.form.parent_name = data.name
          }
        })
      },
      change (data) {
        this.currentData = data
        this.isAdd = false
        this.dialog = true

        this.$nextTick(() => {
          this.resetForm()
          let form = JSON.parse(JSON.stringify(data))
          this.form = form
        })
      },
      remove (node, data) {
        let _this = this
        _this.api.delArticleType({ id: String(data.id) }).then(res => {
          if (res.code === 0) {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
            this.$message({
              message: res.message,
              type: 'success'
            })
          } else {
            _this.errorHandler(res.message || '删除文章类别失败')
          }
        }).catch(error => {
          _this.errorHandler(error.message)
        })
      },
      deleteMore () {
        let key = this.$refs.tree.getCheckedKeys()
        if (!key.length) {
          return false
        }
        this.api.delArticleType({ id: key.join(',') }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getArticleType()
          } else {
            this.errorHandler(res.message || '删除文章类别失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      }
    },
    mounted: function () {
      this.getArticleType()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .article-type{
    .department-tree{
      max-width: 700px;
      .el-input{
        margin-bottom: 10px;
      }
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
    .el-dialog__body{
      padding: 15px 20px;
      .header{
        margin-bottom: 18px;
        line-height: 30px;
        label{
          width: 120px;
          text-align: right;
          display: inline-block;
        }
      }
    }
  }
</style>
