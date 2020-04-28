<template>
  <div class="dictionaries main-table">
    <div class="tool-box">
      <div class="left">
        <el-button size="mini" type="primary" @click="showDialog(false)">添加字段</el-button>
        <el-button @click="deleteMore()"  size="mini" type="primary">批量删除</el-button>
      </div>
      <div class="right">
      </div>
    </div>
    <div
      class="list-box"
      element-loading-text="数据加载中"
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      ref="tableScrollbar">
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
          prop="value"
          label="值"
          width="160">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="160">
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showDialog(scope)" type="text" size="small">
              编辑
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope, resultData.list)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchData.pn"
      :page-sizes="searchData.pageSizes"
      :page-size="searchData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.total">
    </el-pagination>
    <el-dialog :title="dialog.isAdd ?  '添加字段': '修改字段'" :visible.sync="dialog.tag" height="80px" width="600px">
      <el-form @keyup.enter.native="submitForm"  size="small" :model="dialog.form" :rules="dialog.rules" ref="ruleForm" label-width="120px">
        <el-form-item label="字段名称" prop="name">
          <el-input placeholder="请输入字段名称"  v-model="dialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input placeholder="请输入字段值"  v-model="dialog.form.value"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input placeholder="请输入字段类型"  v-model="dialog.form.type"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input @keyup.enter.native.stop.prevent="" type="textarea" :rows="4" placeholder="请输入备注" v-model="dialog.form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.tag = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="dialog.disableSubmit" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'dictionaries',
    components: {},
    data () {
      return {
        loading: true,
        dialog: {
          isAdd: true,
          form: {
            id: '',
            name: '',
            value: '',
            type: '',
            description: ''
          },
          rules: {
            name: [
              { required: true, message: '请输入字段名称', trigger: 'blur' }
            ],
            value: [
              { required: true, message: '请输入字段值', trigger: 'blur' }
            ],
            type: [
              { required: true, message: '请输入字段类型', trigger: 'blur' }
            ]
          },
          tag: false,
          disableSubmit: false
        },
        menuTree: [],
        multipleSelection: [],
        searchData: {
          pageSizes: [10, 20, 50, 100],
          pn: 1,
          page_size: 100
        },
        resultData: {
          list: [],
          total: 0
        }
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
        this.searchData.page_size = val
        this.$nextTick(() => {
          this.getData()
        })
      },
      deleteRow (scope, rows) {
        let index = scope.$index
        let id = String(scope.row.id)
        this.api.delDictionaries({ id: id }).then(res => {
          if (res.code === 0) {
            rows.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.errorHandler(res.message || '删除失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
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
        this.api.delDictionaries({ id: arr.join(',') }).then(res => {
          if (res.code === 0) {
            this.getData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.errorHandler(res.message || '删除失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      indexMethod (index) {
        return (this.searchData.pn - 1) * this.searchData.page_size + (index + 1)
      },
      getData () {
        let _this = this
        this.loading = true
        _this.api.getDictionaries({
          pn: _this.searchData.pn,
          page_size: _this.searchData.page_size
        }).then(res => {
          _this.loading = false
          if (res.code === 0) {
            _this.resultData = res.data
            try {
              _this.$refs.tableScrollbar.scrollTop = 0
            } catch (e) {
              console.warn(e)
            }
          } else {
            _this.errorHandler(res.message || '获取字典失败')
          }
        }).catch(error => {
          _this.loading = false
          _this.errorHandler(error.message)
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
              _this.api.addDictionaries(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.tag = false
                  _this.getData()
                } else {
                  _this.errorHandler(res.message || '添加失败')
                }
              }).catch(error => {
                _this.dialog.disableSubmit = false
                _this.errorHandler(error.message)
              })
            } else {
              _this.api.updateDictionaries(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.tag = false
                  _this.getData()
                } else {
                  _this.errorHandler(res.message || '修改菜单失败')
                }
              }).catch(error => {
                _this.dialog.disableSubmit = false
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
      showDialog (obj) {
        this.dialog.tag = true
        this.$nextTick(() => {
          this.resetForm()
          if (obj) {
            this.dialog.isAdd = false
            this.dialog.form = {
              id: obj.row.id,
              name: obj.row.name,
              value: obj.row.value,
              type: obj.row.type,
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
      }
    },
    mounted: function () {
      this.getData()
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
