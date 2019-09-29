<template>
  <div class="main menus">
    <div class="table-tool">
      <div class="left">
        <el-button size="mini" type="primary"  @click="append(0)">添加顶级菜单</el-button>
        <el-button size="mini" type="primary"  @click="deleteMore()">批量删除</el-button>
      </div>
      <div class="right">
        <el-link type="primary"  href="/static/fonts/demo_index.html" target="_blank">可用图标</el-link>
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
        <span style="padding: 0 6px;display: inline-block" @click="() => change(data)">
          <i :class="String(data.type) !== '2' ?  ('icon iconfont ' + data.icon) : 'icon iconfont icon-anniu' "></i>
          {{ node.label }}
        </span>
        <span>
          <el-button
            v-if="String(data.type) !== '2'"
            type="text"
            size="mini"
            @click="() => append(data)">
            添加{{ String(data.last_menu) === '1' ?  '按钮': '菜单' }}
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
    <el-dialog class="dialog-center" :title="isAdd ?  '添加子节点': '修改子节点'" :visible.sync="dialog" width="600px">
      <div>
        <div style="margin-bottom: 18px;line-height: 30px">
          <label style="width: 120px;text-align: right;display: inline-block">上级节点：</label>{{form.parent_name ? form.parent_name : '无'}}
        </div>
        <div style="margin-bottom: 18px;line-height: 30px">
          <label style="width: 120px;text-align: right;display: inline-block">节点类型：</label>
          页面菜单
        </div>
      </div>
      <el-form :model="form" :rules="rules" size="small" ref="ruleForm" label-width="120px" @keyup.enter.native="submitForm($event,'')">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="form.name"></el-input>
        </el-form-item>
        <el-tooltip class="item" effect="dark" content="必须唯一、由字母和数字组成" placement="right">
          <el-form-item label="唯一标识" prop="unique_id">
            <el-input  v-model="form.unique_id"></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="路径" prop="path">
          <el-input  v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="字体图标" prop="icon">
          <el-input  v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort_order">
           <el-input-number v-model="form.sort_order" controls-position="right" :min="1"></el-input-number>
           <span>&nbsp;&nbsp;&nbsp;&nbsp;值越小越靠前</span>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="form.status"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否最后一级" prop="last_menu">
          <el-switch
            v-model="form.last_menu"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="disableSubmit" @click="submitForm($event,'')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog class="dialog-center" :title="isAdd ?  '添加子节点': '修改子节点'" :visible.sync="dialog2" width="600px">
      <div>
        <div style="margin-bottom: 18px;line-height: 30px">
          <label style="width: 120px;text-align: right;display: inline-block">上级节点：</label>{{form.parent_name ? form.parent_name : '无'}}
        </div>
        <div style="margin-bottom: 18px;line-height: 30px">
          <label style="width: 120px;text-align: right;display: inline-block">节点类型：</label>
          操作按钮
        </div>
      </div>
      <el-form :model="form" :rules="rules2" size="small" ref="ruleForm2" label-width="120px" @keyup.enter.native="submitForm($event,2)">
        <el-form-item label="名称" prop="name">
          <el-input  v-model="form.name"></el-input>
        </el-form-item>
        <el-tooltip class="item" effect="dark" content="必须唯一、由字母和数字组成" placement="right">
          <el-form-item label="唯一标识" prop="unique_id">
            <el-input  v-model="form.unique_id"></el-input>
          </el-form-item>
        </el-tooltip>
        <el-form-item label="请求路径" prop="url">
          <el-input  v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="排序值" prop="sort_order">
          <el-input-number v-model="form.sort_order" controls-position="right" :min="1"></el-input-number>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;值越小越靠前</span>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="form.status"
            active-value="0"
            inactive-value="1">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog2 = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="disableSubmit" @click="submitForm($event,2)">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  let defaultForm = {
    id: '',
    url: '', // 填写后台的请求的url
    type: '1', // 1 菜单类型  2 按钮类型
    name: '', // 当前的名称
    path: '', // 路由
    parent_id: '', // 父节点id
    parent_name: '', // 父节点名称
    sort_order: '', // 排序值
    icon: '', // 字体图标
    unique_id: '', // 唯一标识
    status: '0', // 是否启用  0 是启用  1 是不启用
    last_menu: '0' // 是否为最后一级  0不是最后一层   1 是最后一层
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
        dataT: '', // 存储添加子节点的数据
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
          ],
          url: [
            { required: true, message: '请填写请求路径', trigger: 'blur' }
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
          if (res.data.code === 0) {
            this.data = res.data.data
          }
        }).catch(error => { // 状态码非2xx时
          console.log(error)
        })
      },
      submitForm (e, tag) {
        let _this = this
        if (e.type === 'keyup') {
          if (e.keyCode !== 13) return
        }
        this.$refs['ruleForm' + tag].validate((valid) => {
          if (valid) {
            if (!_this.disableSubmit) {
              _this.disableSubmit = true
            } else {
              return false
            }
            if (_this.isAdd) {
              _this.api.addMenu(_this.form).then(res => {
                _this.disableSubmit = false
                if (res.data.code === 0) {
                  _this.dialog = false
                  _this.dialog2 = false
                  let tdata = JSON.parse(JSON.stringify(_this.form))
                  tdata.id = res.data.data.id
                  console.log(JSON.stringify(tdata))
                  if (_this.dataT) {
                    if (!_this.dataT.children) {
                      this.$set(_this.dataT, 'children', [])
                    }
                    _this.dataT.children.push(tdata)
                  } else {
                    _this.data.push(tdata)
                  }
                } else {
                  console.log('添加失败')
                }
              }).catch(error => { // 状态码非2xx时
                _this.disableSubmit = false
                console.log(error)
              })
            } else {
              _this.api.updateMenu(_this.form).then(res => {
                _this.disableSubmit = false
                if (res.data.code === 0) {
                  _this.dialog = false
                  _this.dialog2 = false
                  // 给对象赋值
                  _this.dataT.id = _this.form.id
                  _this.dataT.url = _this.form.url
                  _this.dataT.type = _this.form.type
                  _this.dataT.name = _this.form.name
                  _this.dataT.path = _this.form.path
                  _this.dataT.parent_id = _this.form.parent_id
                  _this.dataT.parent_name = _this.form.parent_name
                  _this.dataT.sort_order = _this.form.sort_order
                  _this.dataT.icon = _this.form.icon
                  _this.dataT.unique_id = _this.form.unique_id
                  _this.dataT.status = _this.form.status
                  _this.dataT.last_menu = _this.form.last_menu
                } else {
                  console.log('添加失败')
                }
              }).catch(error => { // 状态码非2xx时
                _this.disableSubmit = false
                console.log(error)
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
        this.dataT = data
        this.isAdd = true
        // 判断是否最后一层
        if (data) {
          if (String(data.last_menu) === '1') {
            this.dialog2 = true
            this.$nextTick(() => {
              this.resetForm2()
              this.form = JSON.parse(JSON.stringify(defaultForm))
              this.form.type = '2'
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
        this.dataT = data
        this.isAdd = false
        if (String(data.type) === '2') {
          this.dialog2 = true
          this.$nextTick(() => {
            this.resetForm2()
            this.form = JSON.parse(JSON.stringify(data))
            this.form.status = String(this.form.status)
            this.form.last_menu = String(this.form.last_menu)
          })
        } else {
          this.dialog = true
          this.$nextTick(() => {
            this.resetForm()
            this.form = JSON.parse(JSON.stringify(data))
            this.form.status = String(this.form.status)
            this.form.last_menu = String(this.form.last_menu)
          })
        }
      },
      remove (node, data) {
        let _this = this
        _this.api.delMenu(data).then(res => {
          if (res.data.code === 0) {
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
          } else {
            console.log('添加失败')
          }
        }).catch(error => { // 状态码非2xx时
          console.log(error)
        })
      },
      deleteMore () {
        let key = this.$refs.tree.getCheckedKeys()
        if (!key.length) {
          return false
        }
        this.api.delMenu({ id: key.join(',') }).then(res => {
          if (res.data.code === 0) {
            this.getMenu()
          } else {
            console.log('添加失败')
          }
        }).catch(error => { // 状态码非2xx时
          console.log(error)
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
    .tool{
      margin-bottom: 20px;
    }
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
      padding: 15px 10px;
    }
  }
</style>
