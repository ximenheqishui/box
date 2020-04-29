<template>
  <div class="login-wrap">
      <div class="title">
        <img src="./logo.png" alt="">
        <span>{{systemName}}</span>
      </div>
      <el-form :model="form" status-icon :rules="rules" ref="ruleForm" class="right" @keyup.enter.native="submitForm">
          <div class="head">
            用户登录 login
          </div>
          <el-form-item label="" prop="account">
            <el-input  class="input1" placeholder="请输入用户名" v-model="form.account" >
            <template slot="prepend"><span class="user"></span></template>
          </el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="input">
            <el-input placeholder="请输入密码" type="password" v-model="form.password" >
            <template slot="prepend" ><span class="password"></span></template>
          </el-input>
          </el-form-item>
         <el-button  class="btn" @click="submitForm" :disabled="disabled"  type="primary">登录</el-button>
      </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    mixins: [boxGlobal.commonMixin],
    data () {
      return {
        systemName: baseConfig.systemName,
        disabled: false,
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.form.account = this.form.account.trim()
            this.form.password = this.form.password.trim()
            this.disabled = true
            this.$store.dispatch('user/login', this.form).catch(error => {
              this.disabled = false
              this.errorHandler(error.message)
            })
          } else {
            return false
          }
        })
      }
    },
    mounted () {
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .login-wrap {
    width: 100%;
    height: 100%;
    background-image: url('./bg.png');
    background-size: 100% 100%;
    background-position: center;
    display: flex;
    flex-flow: row nowrap;
    align-items:center;
    justify-content: flex-end;
    .title{
      position: fixed;
      top:60px;
      left:90px;
      width: 100%;
      height: 60px;
      display: inline-flex;
      flex-flow: row nowrap;
      align-items:center;
      span{
        display: inline-block;
        font-size: 30px;
        font-weight: 700;
        color: #fff;
        margin-left: 20px;
      }
      img{
        height: 60px;
      }
    }
    .right{
      margin-right: 150px;
      flex: none;
      box-sizing: border-box;
      width: 380px;
      height: 478px;
      background-color: rgba(74,156,230,0.2);
      border-radius: 0 4px 4px 0;
      padding: 60px 34px;
      .head{
        font-size: 18px;
        color: #fff;
        padding-bottom: 16px;
        border-bottom: 1px solid #fff;
        margin-bottom: 33px;
      }
      .input{
        margin-top: 42px;
        margin-bottom: 18px;
      }
      .operation{
        padding: 0 0 0 4px ;
        >span{
          text-align: right;
          float:right;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
        }
      }
      .btn{
        margin-top: 42px;
        width: 322px;
        height: 48px;
        font-size: 20px;
        letter-spacing: 20px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .login-wrap {
      width: 100%;
      height: 100%;
      background-image: url('./bg.png');
      background-size: 100% 100%;
      background-position: center;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      .title{
        top:60px;
        width: 100%;
        height: 60px;
        display: inline-flex;
        flex-flow: row nowrap;
        align-items:center;
        span{
          display: inline-block;
          font-size: 30px;
          font-weight: 700;
          color: #fff;
          margin-left: 20px;
        }
        img{
          height: 60px;
        }
      }
      .right{
        margin-right: 0px;
        flex: none;
        box-sizing: border-box;
        width: 80%;
        height: auto;
        background-color: rgba(74,156,230,0.2);
        border-radius: 0 4px 4px 0;
        padding: 40px 34px;
        .head{
          font-size: 18px;
          color: #fff;
          padding-bottom: 16px;
          border-bottom: 1px solid #fff;
          margin-bottom: 33px;
        }
        .input{
          margin-top: 42px;
          margin-bottom: 18px;
        }
        .operation{
          padding: 0 0 0 4px ;
          >span{
            text-align: right;
            float:right;
            font-size: 14px;
            color: #fff;
            cursor: pointer;
          }
        }
        .btn{
          margin-top: 42px;
          width: 100%;
          height: 48px;
          font-size: 20px;
          letter-spacing: 20px;
        }
      }
    }
  }
</style>
<style lang="scss" type="text/scss">
  .login-wrap {
    .right{
        .el-input-group__prepend{
          border: none;
          color: #fff;
          background-color: #e2e2e2;
        }
        .input{
          .el-input-group__prepend{
            background-image: url('./password.png');
            background-position: 0px 2px;
          }
        }
        .input1{
          .el-input-group__prepend{
            background-image: url('./user.png');
            background-position: 2px 4px;
          }
        }
        .el-input__inner{
          border: 1px solid #e2e2e2;
        }
        .el-checkbox{
          color: #fff;
        }
      }
  }
</style>
