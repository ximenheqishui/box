<template>
  <el-header>
    <div class="left">
      <div class="aside-switch">
        <span v-show="!$store.getters.isCollapse" @click="collapse" class="el-icon-s-fold"></span>
        <span v-show="$store.getters.isCollapse" @click="collapse" class="el-icon-s-unfold"></span>
      </div>
    </div>
    <div class="right">
      <span>{{$store.getters.userInfo.user_name}}</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-left: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePass">
             <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logOut">
            <span>退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialog.tag" height="80px" width="600px">
      <el-form size="small" :model="dialog.form" :rules="dialog.rules" ref="ruleForm" label-width="140px" @keyup.enter.native="submitFormD">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="dialog.form.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="password2">
          <el-input type="password" v-model="dialog.form.password2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.tag = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="dialog.disableSubmit" @click="submitFormD">确 定</el-button>
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
      return {
        dialog: {
          role: [],
          tag: false,
          form: {
            password: '',
            password2: ''
          },
          rules: {
            password: [
              { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
              { validator: validatePass1, trigger: 'blur' }
            ],
            password2: [
              { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
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
            _this.dialog.form.password2 = _this.dialog.form.password2.trim()
            _this.api.updateUser({ password: _this.dialog.form.password }).then(res => {
              _this.dialog.disableSubmit = false
              if (res.code === 0) {
                _this.$store.dispatch('user/logOut').then(() => {
                  window.location.reload()
                })
              } else {
                _this.$message({
                  message: res.message,
                  type: 'error'
                })
              }
            }).catch(error => { // 状态码非2xx时
              _this.dialog.disableSubmit = false
              _this.$message({
                message: error.message,
                type: 'error'
              })
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
      text-align: right;
      flex: none;
      width: 200px;
      color: #000;
    }
  }
</style>
