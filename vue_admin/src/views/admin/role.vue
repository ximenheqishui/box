<template>
    <div class="role">
        <div class="tool-box">
          <div class="left">
            <el-button size="mini" type="primary" @click="showRoleDialog(false)">添加角色</el-button>
            <el-button @click="deleteMore()"  size="mini" type="primary">批量删除</el-button>
          </div>
          <div class="right">
          </div>
        </div>
        <div
                class="list-box"
                element-loading-text="数据加载中"
                v-loading="loading"
                element-loading-background="rgba(255, 255, 255, 0.6)">
            <el-table
                    size="mini"
                    align="left"
                    :border="true"
                    :stripe="true"
                    :data="resultData.list"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        type="index"
                        :index="indexMethod"
                        label="序号"
                        width="80">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="name"
                        label="名称"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="备注">
                </el-table-column>
                <el-table-column
                  width="160"
                  prop="create_time"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  width="160"
                  prop="update_time"
                  label="更新时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="showMenuDialog(scope)" type="text" size="small">
                          菜单权限
                        </el-button>
                        <el-button @click.native.prevent="showRoleDialog(scope)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click.native.prevent="deleteRow(scope, resultData.list)" type="text" size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-show="resultData.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchData.pn"
                    :page-sizes="searchData.pageSizes"
                    :page-size="searchData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="resultData.total">
            </el-pagination>
        </div>
      <el-dialog :title="dialog.isAdd ?  '添加角色': '修改角色'" :visible.sync="dialog.roleDialog" height="80px" width="600px">
            <el-form size="small" :model="dialog.form" :rules="dialog.rules" ref="ruleForm" label-width="120px">
                <el-form-item label="角色名称" prop="name">
                    <el-input placeholder="请输入角色名称" @keyup.enter.native="submitForm" v-model="dialog.form.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="description">
                    <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="dialog.form.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialog.roleDialog = false">取 消</el-button>
                <el-button size="small" type="primary" :disabled="dialog.disableSubmit" @click="submitForm">确 定</el-button>
            </div>
      </el-dialog>
      <el-dialog title="菜单权限" :visible.sync="menuDialog" height="80px" width="600px">
        <el-tree
          element-loading-text="数据加载中"
          v-loading="treeLoading"
          element-loading-background="rgba(255, 255, 255, 0.6)"
          style="max-height: 320px;overflow-y: auto"
          :data="menuTree"
          :props="defaultProps"
          :check-strictly="true"
          show-checkbox
          node-key="id"
          default-expand-all
          ref="tree"
          :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="padding: 0 6px;display: inline-block">
                <i :class="String(data.type) !== '2' ?  ('icon iconfont ' + data.icon) : 'icon iconfont icon-anniu' "></i>
                {{ node.label }}
              </span>
            </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="menuDialog = false">取 消</el-button>
          <el-button size="small" type="primary" :disabled="dialog.disableSubmit" @click="submitFormMenu">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'role',
    components: {},
    data () {
      return {
        loading: true,
        treeLoading: false,
        menuDialog: false,
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        dialog: {
          isAdd: true,
          form: {
            id: '',
            name: '',
            description: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入角色名称', trigger: 'blur' }
            ]
          },
          roleDialog: false,
          disableSubmit: false
        },
        menuTree: [],
        multipleSelection: [],
        searchData: {
          pageSizes: [10, 20, 50, 100],
          pn: 1,
          pageSize: 10
        },
        resultData: {
          list: [],
          total: 0
        },
        roleId: ''
      }
    },
    filters: {},
    methods: {
      // 表格勾选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleCurrentChange (val) {
        this.searchData.pn = val
        this.$nextTick(() => {
          this.getData()
        })
      },
      handleSizeChange (val) {
        this.searchData.pn = 1
        this.searchData.pageSize = val
        this.$nextTick(() => {
          this.getData()
        })
      },
      deleteRow (scope, rows) {
        let index = scope.$index
        let id = String(scope.row.id)
        this.api.delRole({ id: id }).then(res => {
          if (res.code === 0) {
            rows.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      // 批量删除
      deleteMore () {
        if (!this.multipleSelection.length) {
          return false
        }
        let arr = []
        this.multipleSelection.forEach(function (item) {
          arr.push(item.id)
        })
        this.api.delRole({ id: arr.join(',') }).then(res => {
          if (res.code === 0) {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      indexMethod (index) {
        return (this.searchData.pn - 1) * this.searchData.pageSize + (index + 1)
      },
      getData () {
        let _this = this
        this.loading = true
        _this.api.getRole({
          pn: _this.searchData.pn,
          pageSize: _this.searchData.pageSize
        }).then(res => {
          _this.loading = false
          if (res.code === 0) {
            _this.resultData = res.data
            $('.main').animate({ scrollTop: 0 }, 500)
          }
        }).catch(error => {
          _this.loading = false
          _this.$message({
            message: error.message || '服务器忙...',
            type: 'error'
          })
        })
      },
      submitForm () {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!_this.dialog.disableSubmit) {
              _this.dialog.disableSubmit = true
            } else {
              return false
            }
            if (_this.dialog.isAdd) {
              _this.api.addRole(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.roleDialog = false
                  _this.getData()
                } else {
                  _this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(error => {
                _this.dialog.disableSubmit = false
                _this.$message({
                  message: error.message || '服务器忙...',
                  type: 'error'
                })
              })
            } else {
              _this.api.updateRole(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.roleDialog = false
                  _this.getData()
                } else {
                  _this.$message({
                    message: res.message,
                    type: 'error'
                  })
                }
              }).catch(error => {
                _this.dialog.disableSubmit = false
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
      showRoleDialog (obj) {
        this.dialog.roleDialog = true
        this.$nextTick(() => {
          this.resetForm()
          if (obj) {
            this.dialog.isAdd = false
            this.dialog.form = {
              id: obj.row.id,
              name: obj.row.name,
              description: obj.row.description
            }
          } else {
            this.dialog.isAdd = true
            this.dialog.form = {
              id: '',
              name: '',
              description: ''
            }
          }
        })
      },
      showMenuDialog (obj) {
        this.menuDialog = true
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
          this.roleId = obj.row.id
          this.treeLoading = true
          this.api.getRoleMenu({ role_id: this.roleId }).then(res => {
            this.treeLoading = false
            if (res.code === 0) {
              if (res.data && res.data.length) {
                this.$refs.tree.setCheckedKeys(res.data)
              }
            }
          }).catch(error => {
            this.treeLoading = false
            this.$message({
              message: error.message || '服务器忙...',
              type: 'error'
            })
          })
        })
      },
      submitFormMenu () {
        let _this = this
        if (!_this.dialog.disableSubmit) {
          _this.dialog.disableSubmit = true
        } else {
          return false
        }
        let ids = this.$refs.tree.getCheckedKeys()
        _this.api.updateRoleMenu({ role_id: _this.roleId, permissionIds: ids }).then(res => {
          _this.dialog.disableSubmit = false
          if (res.code === 0) {
            _this.menuDialog = false
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          } else {
            _this.$message({
              message: res.message,
              type: 'error'
            })
          }
        }).catch(error => {
          _this.dialog.disableSubmit = false
          _this.$message({
            message: error.message || '服务器忙...',
            type: 'error'
          })
        })
      },
      getMenuTree () {
        this.api.getMenu({ status: 0 }).then(res => {
          if (res.code === 0) {
            if (res.data && res.data.length) {
              this.menuTree = res.data
            }
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
      this.getData()
      this.getMenuTree()
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
