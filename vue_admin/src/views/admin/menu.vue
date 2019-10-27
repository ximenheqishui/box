<template>
  <div class="main menus">
    <div class="tool-box">
      <div class="left">
        <el-button size="mini" type="primary"  @click="append(0)">添加顶级菜单</el-button>
        <el-button size="mini" type="primary"  @click="deleteMore()">批量删除</el-button>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="menu-tree">
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
        <el-tooltip transition=""   class="item" effect="light" :content=" '唯一标识：' +  data.unique_id + (data.path ? '；路径：' + data.path: '') " placement="right">
              <span style="padding: 0 6px;display: inline-block">
                <i :class="data.type !== 2 ?  ('icon iconfont ' + data.icon) : 'icon iconfont icon-anniu' "></i>
                {{ node.label }}
              </span>
        </el-tooltip>
        <span>
          <el-button
            v-if="data.type !== 2"
            type="text"
            size="mini"
            @click="() => append(data)">
            添加{{ data.last_menu === 1 ?  '按钮': '菜单' }}
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
    <el-dialog :title="isAdd ?  '添加菜单': '修改菜单'" :visible.sync="dialog" width="600px">
      <div  class="header" v-if="form.parent_name">
        <label>上级节点：</label>
        {{ form.parent_name }}
      </div>
      <el-form :model="form" :rules="rules" size="small" ref="ruleForm" label-width="120px" @keyup.enter.native="submitForm('ruleForm')">
        <el-form-item label="名称" prop="name">
          <el-input  placeholder="请输入名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-tooltip effect="dark" content="必须唯一、由字母和数字组成" placement="right">
          <el-form-item label="唯一标识" prop="unique_id">
            <el-input placeholder="请输入唯一标识" v-model="form.unique_id"></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="路径" prop="path">
          <el-input placeholder="请输入页面路径" v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="字体图标" prop="icon">
          <el-input placeholder="请输入右侧可用图标中的Font class。如：icon-set" v-model="form.icon">
            <template slot="append">
              <el-link type="primary"  href="/static/fonts/demo_index.html" target="_blank">可用图标</el-link>
            </template>
          </el-input>
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
        <el-form-item label="是否最后一级" prop="last_menu">
          <el-switch
            v-model="form.last_menu"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="disableSubmit" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="isAdd ?  '添加按钮': '修改按钮'" :visible.sync="dialog2" width="600px">
      <div  class="header">
        <label>上级节点：</label>
        {{ form.parent_name }}
      </div>
      <el-form :model="form" :rules="rules2" size="small" ref="ruleForm2" label-width="120px" @keyup.enter.native="submitForm('ruleForm2')">
        <el-form-item label="名称" prop="name">
          <el-input  placeholder="请输入名称" v-model="form.name"></el-input>
        </el-form-item>
        <el-tooltip effect="dark" content="必须唯一、由字母和数字组成" placement="right">
          <el-form-item label="唯一标识" prop="unique_id">
            <el-input  placeholder="请输入唯一标识" v-model="form.unique_id"></el-input>
          </el-form-item>
        </el-tooltip>
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
        <el-button size="small" @click="dialog2 = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="disableSubmit" @click="submitForm('ruleForm2')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  let defaultForm = {
    id: '',
    type: 1, // 1 菜单类型  2 按钮类型
    name: '', // 当前的名称
    path: '', // 路由
    parent_id: '', // 父节点id
    parent_name: '', // 父节点名称
    sort_order: '', // 排序值
    icon: '', // 字体图标
    unique_id: '', // 唯一标识
    status: 0, // 是否启用  0 是启用  1 是不启用
    last_menu: 0 // 是否为最后一级  0不是最后一层   1 是最后一层
  }
  export default {
    name: 'menus',
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
        dialog2: false, // dialog 弹框
        isAdd: true, // 是否是添加
        currentData: '', // 存储添加子节点的数据  引用赋值  保存当前数据的指针
        disableSubmit: false, // 是否禁用提交按钮
        form: JSON.parse(JSON.stringify(defaultForm)),
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          unique_id: [
            { required: true, message: '请输唯一标识', trigger: 'blur' }
          ]
        },
        rules2: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          unique_id: [
            { required: true, message: '请输唯一标识', trigger: 'blur' }
          ]
        }
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
      getMenu () {
        this.api.getMenu({}).then(res => {
          if (res.code === 0) {
            this.data = res.data
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            message: error.message || '服务器忙...',
            type: 'error'
          })
        })
      },
      submitForm (form) {
        let _this = this
        this.$refs[form].validate((valid) => {
          if (valid) {
            if (!_this.disableSubmit) {
              _this.disableSubmit = true
            } else {
              return false
            }
            if (_this.isAdd) {
              _this.api.addMenu(_this.form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog = false
                  _this.dialog2 = false
                  let newData = JSON.parse(JSON.stringify(_this.form))
                  newData.id = res.data.id
                  // console.log(JSON.stringify(tdata))
                  if (_this.currentData) {
                    if (!_this.currentData.children) {
                      this.$set(_this.currentData, 'children', [])
                    }
                    _this.currentData.children.push(newData)
                  } else {
                    _this.data.push(newData)
                  }
                } else {
                  _this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(error => { // 状态码非2xx时
                _this.disableSubmit = false
                _this.$message({
                  message: error.message || '服务器忙...',
                  type: 'error'
                })
              })
            } else {
              _this.api.updateMenu(_this.form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog = false
                  _this.dialog2 = false
                  // 给对象赋值
                  _this.currentData.type = _this.form.type
                  _this.currentData.name = _this.form.name
                  _this.currentData.path = _this.form.path
                  _this.currentData.parent_id = _this.form.parent_id
                  _this.currentData.parent_name = _this.form.parent_name
                  _this.currentData.sort_order = _this.form.sort_order
                  _this.currentData.icon = _this.form.icon
                  _this.currentData.unique_id = _this.form.unique_id
                  _this.currentData.status = _this.form.status
                  _this.currentData.last_menu = _this.form.last_menu
                } else {
                  _this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(error => {
                _this.disableSubmit = false
                _this.$message({
                  message: error.message || '服务器忙...',
                  type: 'error'
                })
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
      resetForm2 () {
        this.$refs.ruleForm2.resetFields()
      },
      append (data) {
        this.currentData = data
        this.isAdd = true
        // 判断是否最后一层
        if (data) {
          if (data.last_menu === 1) {
            this.dialog2 = true
            this.$nextTick(() => {
              this.resetForm2()
              this.form = JSON.parse(JSON.stringify(defaultForm))
              this.form.type = 2
              this.form.parent_id = data.id
              this.form.parent_name = data.name
            })
          } else {
            this.dialog = true
            this.$nextTick(() => {
              this.resetForm()
              this.form = JSON.parse(JSON.stringify(defaultForm))
              this.form.parent_id = data.id
              this.form.parent_name = data.name
            })
          }
        } else {
          this.dialog = true
          this.$nextTick(() => {
            this.resetForm()
            this.form = JSON.parse(JSON.stringify(defaultForm))
          })
        }
      },
      change (data) {
        this.currentData = data
        this.isAdd = false
        if (data.type === 2) {
          this.dialog2 = true
          this.$nextTick(() => {
            this.resetForm2()
            this.form = JSON.parse(JSON.stringify(data))
          })
        } else {
          this.dialog = true
          this.$nextTick(() => {
            this.resetForm()
            this.form = JSON.parse(JSON.stringify(data))
          })
        }
      },
      remove (node, data) {
        let _this = this
        _this.api.delMenu({ id: String(data.id) }).then(res => {
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
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            message: error.message || '服务器忙...',
            type: 'error'
          })
        })
      },
      deleteMore () {
        let key = this.$refs.tree.getCheckedKeys()
        if (!key.length) {
          return false
        }
        this.api.delMenu({ id: key.join(',') }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.getMenu()
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.$message({
            message: error.message || '服务器忙...',
            type: 'error'
          })
        })
      }
    },
    mounted: function () {
      this.getMenu()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .menus{
    .menu-tree{
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
