<template>
  <div class="case-editor">
    <el-steps :active="steps" align-center>
      <el-step title="案件详情" description=""></el-step>
      <el-step title="添加当事人" description=""></el-step>
      <el-step title="调解设置" description=""></el-step>
    </el-steps>
    <div class="case-steps">
      <div class="item" v-if="steps === 0">
        <div class="head">案件详情</div>
        <el-form
          size="small"
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="80px">
          <el-form-item label="案件名称" prop="name">
            <el-input placeholder="请输入名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="案件类别" prop="type_path">
            <el-cascader
              style="width: 100%"
              clearable
              placeholder="请选择分类"
              v-model="form.type_path"
              :props="defaultProps"
              :options="type">
            </el-cascader>
          </el-form-item>
          <el-form-item label="案发时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="案发地点" prop="location">
            <el-input placeholder='请输入案发地点' v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="案件简述" prop="description">
            <el-input placeholder="请输入简述" :rows="4" type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="margin:20px 20px 20px 0;" size="mini" type="primary"
                       :loading="disableSubmit" :disabled="disableSubmit" @click="submitForm">创建案件
            </el-button>
            <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="item" v-if="steps === 1">
        <div class="head">添加当事人</div>
        <el-form
          v-for="(item, index) in formList"
          :key="item.id"
          size="small"
          :model="item.form"
          :rules="item.rules"
          ref="ruleForm"
          label-width="70px">
          <div>当事人{{index + 1}} <el-button v-if="formList.length > 2" size="mini" type="primary" @click="delForm(item.id,index)">删除</el-button></div>
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="item.form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="item.form.sex">
              <el-radio v-for="item2 in sex" :key="item2.id" :label="item2.value">{{item2.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input placeholder='请输入手机号' v-model="item.form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="id_card">
            <el-input placeholder='请输入手机号' v-model="item.form.id_card"></el-input>
          </el-form-item>
          <el-form-item label="常驻地址" prop="location">
            <el-input placeholder='请输入常驻地点' v-model="item.form.location"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="mini" type="primary" @click="addForm">添加</el-button>
          <el-button style="margin:20px 20px 20px 0;" size="mini" type="primary"
                     :loading="disableSubmit" :disabled="disableSubmit" @click="submitForm">创建案件
          </el-button>
          <el-button  @click="backList()" :disabled="disableSubmit"  style="margin:20px 20px 20px 0px;letter-spacing: 10px" size="mini" type="primary">返回</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
        </div>
      </div>
      <div class="item" v-if="steps === 2">
        <div class="head">案件详情</div>
        <el-form
          size="small"
          :model="form"
          ref="ruleForm"
          label-width="70px">
          <el-form-item label="约定时间" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调解人" prop="time">
            <el-date-picker
              v-model="form.time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button style="margin:20px 20px 20px 0;" size="mini" type="primary"
                       :loading="disableSubmit" :disabled="disableSubmit" @click="submitForm">提交
            </el-button>
            <el-button size="mini" @click="resetForm">发送邀请码给当事人</el-button>
            <el-button size="mini" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="item" v-if="steps === 3">
        <div class="head">完成</div>
        <el-button  @click="backList()" :disabled="disableSubmit"  style="margin:20px 20px 20px 0px;letter-spacing: 10px" size="mini" type="primary">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // 创建案件的表单
  let defaultForm = {
    id: '',
    name: '',
    type_path: [],
    type_id: '',
    time: '',
    location: '',
    description: ''
  }
  // 添加当事人的表单
  let defaultFormList = {
    id: '',
    name: '',
    sex: '',
    mobile: '',
    id_card: '',
    location: ''
  }
  let validatePhone = (rule, value, callback) => {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
      callback(new Error('请输入正确的手机号!'))
    } else {
      callback()
    }
  }
  let rules = {
    name: [
      { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
      { validator: validatePhone, trigger: ['blur', 'change'] }
    ]
  }
  export default {
    name: 'caseEditor',
    components: {
    },
    data () {
      return {
        steps: 0,
        uploadUrl: this.api.commonURL.uploadUrl,
        defaultForm: JSON.parse(JSON.stringify(defaultForm)),
        form: JSON.parse(JSON.stringify(defaultForm)),
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
          ]
        },
        disableSubmit: false,
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
        },
        type: [],
        sex: [],
        formList: [
          {
            id: 1,
            form: JSON.parse(JSON.stringify(defaultFormList)),
            rules: rules
          },
          {
            id: 2,
            form: JSON.parse(JSON.stringify(defaultFormList)),
            rules: rules
          }
        ]
      }
    },
    computed: {
    },
    watch: {},
    filters: {},
    methods: {
      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
        // 这里加一个后台返回连接的
        this.form.cover = res.data.path
      },
      // 图片上传之前的校验
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // 获取文章信息
      getData () {
        let _this = this
        if (!this.id) {
          _this.pageLoading = false
          return false
        }
        this.api.getArticle({ id: this.id }).then(res => {
          _this.pageLoading = false
          if (res.code === 0) {
            if (res.data && res.data.length) {
              let articleData = res.data[0]
              articleData.type_path = JSON.parse(articleData.type_path)
              _this.defaultForm = JSON.parse(JSON.stringify(articleData))
              _this.form = JSON.parse(JSON.stringify(articleData))
            }
          } else {
            _this.$message({
              type: 'error',
              showClose: true,
              message: res.message
            })
          }
        }).catch(error => { // 状态码非2xx时
          _this.pageLoading = false
          _this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      },
      // 获取所有文章分类
      getCaseType () {
        let _this = this

        async function getType () {
          await _this.api.getCaseType({}).then(res => {
            if (res.code === 0) {
              _this.type = res.data
            }
          }).catch(error => { // 状态码非2xx时
            console.log(error)
          })
          _this.getData()
        }
        getType()
      },
      // 提交表单
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
            if (form.type_path && form.type_path.length) {
              form.type_id = form.type_path[form.type_path.length - 1]
            } else {
              form.type_id = ''
            }
            form.type_path = JSON.stringify(form.type_path)
            if (!_this.id) {
              _this.api.addCase(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.steps = 1
                  _this.form.id = res.data.id
                  _this.id = res.data.id
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
            } else {
              _this.api.updateCase(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.steps = 1
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
      backList () {
        this.$router.back()
      },
      // 重置表单
      resetForm (ref) {
        this.$refs[ref].resetFields()
      },
      addForm () {
        this.formList.push({
          id: new Date().getTime(),
          form: JSON.parse(JSON.stringify(defaultFormList)),
          rules: rules
        })
      },
      delForm (id, index) {
        this.formList.splice(index, 1)
      },
      // 获取数据字典
      getOption () {
        this.api.getDictionaries({}).then(res => {
          if (res.code === 0) {
            this.sex = res.data.sex
          }
        }).catch(error => { // 状态码非2xx时
          this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      }
    },
    mounted: function () {
      this.id = this.$route.query.id || ''
      this.getCaseType()
      this.getOption()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .case-editor {
    .case-steps{
      max-width: 800px;
      margin: 40px auto 0px;
      .item{
        .head{
          padding: 10px 20px;
          font-size: 20px;
          color: #fff;
          background: #7187fe;
        }
        .el-form{
          padding: 20px;
          border: 1px solid #eee;
          .el-form-item{
            margin-left:auto;
            margin-right:auto;
            max-width: 400px;
          }
        }
      }
    }
    .el-icon-loading{
      width: 14px;
    }
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
      width: 250px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }

    .avatar {
      width: 240px;
      height: 140px;
      display: block;
      object-fit: contain;
    }
  }
</style>
