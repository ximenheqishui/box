<template>
  <el-header>
    <div class="left">
      <div class="aside-switch">
        <span v-show="!$store.getters.isCollapse" @click="collapse" class="el-icon-s-fold"></span>
        <span v-show="$store.getters.isCollapse" @click="collapse" class="el-icon-s-unfold"></span>
      </div>
    </div>
    <div class="right">
      <div title="刷新" class="refresh" @click="refresh">
        <i class="el-icon-refresh"></i>
      </div>
      <el-dropdown trigger="click">
        <div>
          <el-avatar size="medium" :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePass">
             <span>修改个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOut">
            <span>退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改个人信息"  :visible.sync="dialog.tag" height="80px" width="700px">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.tag = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="dialog.disableSubmit" :disabled="dialog.disableSubmit" @click="submitFormD">确 定</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
  export default {
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
        sex: [],
        dialog: {
          role: [],
          tag: false,
          form: {
            password: '',
            password2: '',
            user_name: this.$store.getters.userInfo.user_name,
            email: this.$store.getters.userInfo.email,
            mobile: this.$store.getters.userInfo.mobile,
            sex: this.$store.getters.userInfo.sex,
            avatar: this.$store.getters.userInfo.avatar
          },
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
        }
      }
    },
    computed: {
    },
    methods: {
      refresh () {
        console.log(123)
        this.$router.replace({ path: '/refresh' })
      },
      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
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
      // 获取数据字典
      getOption () {
        this.api.getDictionaries({}).then(res => {
          if (res.code === 0) {
            this.sex = res.data.sex
          } else {
            this.errorHandler(res.message || '添加字典失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      logOut () {
        this.$store.dispatch('user/logOut').then((res) => {
          window.location.reload()
        })
      },
      changePass () {
        this.dialog.tag = true
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields()
        })
      },
      submitFormD () {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!_this.dialog.disableSubmit) {
              _this.dialog.disableSubmit = true
            } else {
              return false
            }
            _this.dialog.form.password = _this.dialog.form.password.trim()
            _this.api.updateUserInfo({
              password: _this.dialog.form.password,
              user_name: _this.dialog.form.user_name,
              email: _this.dialog.form.email,
              mobile: _this.dialog.form.mobile,
              sex: _this.dialog.form.sex,
              avatar: _this.dialog.form.avatar
            }).then(res => {
              _this.dialog.disableSubmit = false
              if (res.code === 0) {
                _this.$store.dispatch('user/logOut').then(() => {
                  window.location.reload()
                })
              } else {
                _this.errorHandler(res.message || '修改个人资料')
              }
            }).catch(error => {
              _this.dialog.disableSubmit = false
              _this.errorHandler(error.message)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      collapse () {
        this.$store.dispatch('css/changeCollapse')
      }
    },
    created () {
    },
    destroyed () {
    },
    mounted () {
      this.getOption()
    },
    watch: {
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .el-header{
    padding: 0 20px 0 10px;
    height: 50px !important;
    background-color: #fff;
    color: #fff;
    line-height: 50px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    flex-flow: nowrap row;
    justify-content: space-between;
    .left{
      flex: auto;
      display: flex;
      justify-content: flex-start;
      .aside-switch{
        cursor: pointer;
        color: #000;
        font-size: 26px;
        line-height: 50px;
      }
    }
    .right{
      display: flex;
      flex: none;
      justify-content: flex-end;
      width: 200px;
      color: #000;
      .refresh{
        transition: all 0.3s;
        transition-timing-function: ease, ease, ease;
        color: #409EFF;
        font-size: 30px;
        margin-right: 20px;
        transform: rotate(0deg);
        &:hover{
          transform: rotate(360deg);
        }
      }
      .el-dropdown-selfdefine {
       height: 50px;
        .el-avatar{
          vertical-align: middle;
        }
        i{
          font-weight: bold;
          color: #999;
        }
     }
    }
    .avatar-uploader ::v-deep .el-upload{
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader ::v-deep .el-upload:hover {
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
