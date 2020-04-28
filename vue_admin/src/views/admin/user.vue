<template>
  <div class="user main-table">
    <div class="search-box">
      <el-form @keyup.enter.native="search" ref="form" :inline="true" :model="searchData" label-width="80px" size="small">
         <el-form-item label="用户名" prop="user_name">
            <el-input   clearable v-model="searchData.user_name" placeholder="请输入用户名"></el-input>
          </el-form-item>
         <el-form-item label="部门" prop="dept_path">
           <el-cascader
             clearable
             placeholder="请选择部门"
             v-model="searchData.dept_path"
             :props="defaultProps"
             :options="department">
           </el-cascader>
          </el-form-item>
          <div v-show="sswitch" style="display: inline">
            <el-form-item label="手机号"  prop="mobile">
              <el-input  clearable v-model="searchData.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input  clearable v-model="searchData.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="searchData.sex"  clearable  placeholder="请选择">
                <el-option
                  v-for="item in sex"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户状态" prop="status">
              <el-select v-model="searchData.status"  clearable  placeholder="请选择">
                <el-option
                  v-for="item in status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" prop="date">
              <el-date-picker
                v-model="searchData.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        <el-form-item>
          <el-button size="mini" :loading="searchLoading" type="primary" @click="search">搜索</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
          <el-button size="mini" type="success" @click="sswitch = !sswitch">{{!sswitch ? '更多': '精简'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-box">
      <div class="left">
        <el-button @click="showDialog(false)"  size="mini" type="primary">添加用户</el-button>
        <el-button @click="deleteMore()"  size="mini" type="primary">批量删除</el-button>
      </div>
      <div class="right">
        <download  :disable="(!resultData.total || searchLoading)"  :token="token"  page="user" :queryData="lastPostData"></download>
      </div>
    </div>
    <div
      class="list-box"
      element-loading-text="数据加载中"
      v-loading="pageLoading || searchLoading"
      element-loading-background="rgba(255, 255, 255, 0.6)"
      ref="tableScrollbar">
      <el-table
        size="mini"
        :border="true"
        :stripe="true"
        :data="resultData.list"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          width="80"
          type="index"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="user_name"
          width="120"
          :sortable="true"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="sex_name"
          width="80"
          label="性别">
        </el-table-column>
        <el-table-column
          width="80"
          label="头像">
          <template slot-scope="scope">
            <el-avatar size="large" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="dept_name"
          label="所属部门">
        </el-table-column>
        <el-table-column
          prop="mobile"
          :sortable="true"
          label="手机">
        </el-table-column>
        <el-table-column
          prop="email"
          :sortable="true"
          label="邮箱">
        </el-table-column>
        <el-table-column
          :sortable="true"
          prop="create_time"
          width="180"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="operation"
          width="120"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showDialog(scope)" type="text" size="small">
              修改
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope, resultData.list)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :disabled="pageLoading || searchLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync ="searchData.pn"
      :page-sizes="searchData.pageSizes"
      :page-size.sync="searchData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.total">
    </el-pagination>

    <el-dialog  :title="dialog.isAdd ?  '添加用户': '修改用户'" :visible.sync="dialog.tag" height="80px" width="700px">
      <el-form size="small" :model="dialog.form" :rules="dialog.rules" ref="ruleForm" label-width="120px" @keyup.enter.native="submitFormD">
        <el-form-item label="用户名" prop="user_name">
          <el-input placeholder="请输入用户名"  v-model="dialog.form.user_name"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入用邮箱" type="email"  v-model="dialog.form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="mobile">
              <el-input placeholder="请输入用手机号"  v-model="dialog.form.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item  label="密码" prop="password">
              <el-input placeholder="请输入密码" type="password" v-model="dialog.form.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="重复密码" prop="password2">
              <el-input placeholder="请输入密码" type="password" v-model="dialog.form.password2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="dialog.form.sex">
                <el-radio v-for="item in sex" :key="item.id" :label="item.value">{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="dialog.form.avatar" :src="dialog.form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="dialog.form.status"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item label="部门" prop="dept_id">
          <el-cascader
            style="width: 100%"
            clearable
            placeholder="请选择部门"
            v-model="dialog.form.dept_path"
            :props="defaultProps"
            :options="department">
          </el-cascader>
        </el-form-item>
        <el-form-item label="角色">
          <el-select style="width: 100%" v-model="dialog.form.role_ids"  multiple clearable filterable  placeholder="请选择角色">
            <el-option
              v-for="item in role"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.tag = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="dialog.disableSubmit" :disabled="dialog.disableSubmit" @click="submitFormD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import download from '@/components/Download/index.vue'
  let defaultForm = {
    id: '',
    user_name: '',
    password: '',
    password2: '',
    email: '',
    mobile: '',
    sex: '',
    dept_id: '',
    dept_path: [],
    role_ids: [],
    status: 0,
    avatar: ''
  }
  export default {
    name: 'user',
    components: {
      download
    },
    data () {
      let validatePass1 = (rule, value, callback) => {
        if (this.dialog.form.password2 !== '') {
          this.$refs.ruleForm.validateField('password2')
        }
        callback()
      }
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.dialog.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      let validatePhone = (rule, value, callback) => {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号!'))
        } else {
          callback()
        }
      }
      return {
        uploadUrl: this.api.commonURL.uploadUrl,
        searchLoading: false, // 搜索中的loading
        pageLoading: false, // 分页的loading
        sswitch: false, // 是否展开高级搜索
        searchData: {
          pageSizes: [10, 25, 50, 100],
          pn: 1,
          page_size: 10,
          user_name: '',
          dept_id: '',
          dept_path: [],
          end_date: '',
          start_date: '',
          date: ['', ''],
          mobile: '',
          email: '',
          sex: '',
          status: ''
        },
        dialog: {
          tag: false,
          isAdd: true,
          form: JSON.parse(JSON.stringify(defaultForm)),
          rules: {
            user_name: [
              { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
            ],
            email: [
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            mobile: [
              { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
              { validator: validatePhone, trigger: ['blur', 'change'] }
            ],
            password: [
              { validator: validatePass1, trigger: 'blur' }
            ],
            password2: [
              { validator: validatePass2, trigger: ['blur', 'change'] }
            ]
          },
          disableSubmit: false
        },
        department: [],
        role: [],
        multipleSelection: [],
        status: [],
        sex: [],
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
        },
        lastPostData: {}, // 最后搜索的条件 php nodejs 用
        token: '', // 搜索返回的key  java用
        resultData: {
          total: 0,
          list: []
        }
      }
    },
    computed: {
    },
    watch: {
    },
    filters: {
    },
    methods: {
      // 表格勾选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSortChange (column, prop, order) {
        // 如果有需要排序的需求在再后台排序 现在前端单页面排序
        // console.log(column, prop, order)
      },
      // 表格序号
      indexMethod (index) {
        return (this.searchData.pn - 1) * this.searchData.page_size + (index + 1)
      },
      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
        // 这里加一个后台返回连接的
        // this.dialog.form.avatar = URL.createObjectURL(file.raw)
        this.dialog.form.avatar = res.data.path
      },
      // 图片上传之前的校验
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // 分页改变时候的回调
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.$nextTick(() => {
          this.getData(0)
        })
      },
      // 每页多少条变化时候的函数
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.searchData.pn = 1
        this.$nextTick(() => {
          this.getData(0)
        })
      },
      /**
       *  @param type 是1的时候是搜索请求   0的时候是分页请求
       * */
      getData (type) {
        let _this = this
        let postdata = {}
        if (type) {
          this.searchLoading = true
          postdata = JSON.parse(JSON.stringify(this.searchData))
          postdata.dept_id = postdata.dept_path.length ? postdata.dept_path[postdata.dept_path.length - 1] : ''
          if (postdata.date) {
            postdata.start_date = postdata.date[0] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(postdata.date[0])) : ''
            postdata.end_date = postdata.date[1] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(postdata.date[1])) : ''
          } else {
            postdata.end_date = ''
            postdata.start_date = ''
          }
          delete postdata.pageSizes
          delete postdata.dept_path
          delete postdata.date
          if (!_this.sswitch) {
            postdata.mobile = ''
            postdata.email = ''
            postdata.sex = ''
            postdata.date = ''
            postdata.status = ''
            postdata.end_date = ''
            postdata.start_date = ''
          }
          this.lastPostData = postdata
        } else {
          postdata = this.lastPostData
          postdata.pn = this.searchData.pn
          postdata.page_size = this.searchData.page_size
          this.pageLoading = true
        }
        this.api.getUser(postdata).then(res => {
          _this.pageLoading = false
          _this.searchLoading = false
          // throw new Error('运算错误')
          if (res.code === 0) {
            _this.resultData = res.data
            if (type) {
              _this.token = res.data.token
            }
            try {
              _this.$refs.tableScrollbar.scrollTop = 0
            } catch (e) {
              console.warn(e)
            }
          } else {
            _this.errorHandler(res.message || '获取用户信息失败')
          }
        }).catch(error => {
          _this.pageLoading = false
          _this.searchLoading = false
          _this.errorHandler(error.message)
        })
      },
      // 搜索条件恢复默认
      resetForm () {
        this.$refs['form'].resetFields()
      },
      // 搜索
      search () {
        this.searchData.pn = 1
        this.$nextTick(() => {
          this.getData(1)
        })
      },
      // 获取所有的部门
      getDepartment () {
        this.api.getDepartment({}).then(res => {
          if (res.code === 0) {
            this.department = res.data
            this.dialog.department = res.data
          } else {
            this.errorHandler(res.message || '获取部门失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      // 获取所有的角色
      getRole () {
        let _this = this
        _this.api.getRole({}).then(res => {
          if (res.code === 0) {
            _this.role = res.data
          } else {
            this.errorHandler(res.message || '获取角色失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      // 获取数据字典
      getOption () {
        this.api.getDictionaries({}).then(res => {
          if (res.code === 0) {
            this.sex = res.data.sex
            this.status = res.data.status
          } else {
            this.errorHandler(res.message || '获取数据字典失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      // 显示添加修改框
      showDialog (obj) {
        let _this = this
        _this.dialog.tag = true
        _this.$nextTick(() => {
          _this.resetFormD()
          if (obj) {
            _this.dialog.isAdd = false
            let data = JSON.parse(JSON.stringify(obj.row))
            data.password2 = ''
            data.password = ''
            data.dept_path = JSON.parse(data.dept_path)
            _this.dialog.form = data
          } else {
            _this.dialog.isAdd = true
            _this.dialog.form = JSON.parse(JSON.stringify(defaultForm))
          }
        })
      },
      // 删除一条
      deleteRow (scope, rows) {
        let _this = this
        _this.api.delUser({ id: scope.row.id }).then(res => {
          if (res.code === 0) {
            let index = rows.indexOf(scope.row)
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
        this.api.delUser({ id: arr.join(',') }).then(res => {
          if (res.code === 0) {
            this.getData(0)
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
      // 提交表单
      submitFormD (e) {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!_this.dialog.disableSubmit) {
              _this.dialog.disableSubmit = true
            } else {
              return false
            }
            let form = JSON.parse(JSON.stringify(_this.dialog.form))
            form.dept_id = form.dept_path.length ? form.dept_path[ form.dept_path.length - 1 ] : ''
            form.dept_path = JSON.stringify(form.dept_path)
            if (_this.dialog.isAdd) {
              _this.api.addUser(form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.tag = false
                  _this.getData(1)
                } else {
                  _this.errorHandler(res.message || '增加用户失败')
                }
              }).catch(error => {
                _this.dialog.disableSubmit = false
                _this.errorHandler(error.message)
              })
            } else {
              _this.api.updateUser(form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.code === 0) {
                  _this.dialog.tag = false
                  _this.getData(0)
                } else {
                  _this.errorHandler(res.message || '修改用户失败')
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
      // 重置表单
      resetFormD () {
        this.$refs.ruleForm.resetFields()
      }
    },
    mounted: function () {
      // 所有的方式加载数据
      this.getOption()
      this.getData(1)
      this.getDepartment()
      this.getRole()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .user{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 140px;
      height: 140px;
      display: block;
      object-fit: contain;
    }
  }
</style>
