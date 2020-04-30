<template>
  <div class="dictionaries main-table">
    <div class="tool-box">
      <div class="left">
        <el-button size="mini" type="primary" @click="showDialog(false)">添加字段</el-button>
        <el-button @click="deleteRow(false)"  size="mini" type="primary">批量删除</el-button>
      </div>
      <div class="right">
      </div>
    </div>
    <result ref="result" apiName="Dictionaries" :selection="true">
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
          <el-button @click.native.prevent="deleteRow(scope)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </result>
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
  import result from '@/components/result/index.vue'
  export default {
    name: 'dictionaries',
    mixins: [boxGlobal.commonMixin],
    components: {
      result
    },
    data () {
      return {
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
        }
      }
    },
    filters: {},
    methods: {
      deleteRow (scope) {
        if (scope) {
          this.$refs.result.deleteRow(scope)
        } else {
          this.$refs.result.deleteMore()
        }
      },
      getData (data) {
        this.$refs.result.getData(data)
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
                  _this.getData({})
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
            for (let key in this.dialog.form) {
              this.dialog.form[key] = obj.row[key]
            }
          } else {
            this.dialog.isAdd = true
          }
        })
      }
    },
    mounted: function () {
      this.getData({})
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
