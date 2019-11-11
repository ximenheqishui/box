<template>
  <div class="article">
    <el-form size="small" :model="form"  :rules="rules" ref="ruleForm" label-width="70px">
      <el-form-item label="标题" prop="title"  style="max-width: 600px">
        <el-input placeholder="请输入标题"  v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="type_id" style="max-width: 600px">
        <el-cascader
          style="width: 100%"
          clearable
          placeholder="请选择分类"
          v-model="form.type_path"
          :props="defaultProps"
          :options="type">
        </el-cascader>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword" style="max-width: 600px">
        <el-input placeholder='请输入关键词,用 "," 隔开'  v-model="form.keyword"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description" style="max-width: 600px">
        <el-input placeholder="请输入描述" :rows="4" type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.cover" :src="form.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <tinymce ref="tinymce"></tinymce>
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <el-switch
          v-model="form.status"
          :active-value="0"
          :inactive-value="1">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button style="margin:20px 20px 20px 0;letter-spacing: 10px" size="small" type="primary" :loading="disableSubmit" :disabled="disableSubmit" @click="submitForm">提交</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce/index.vue'
  let defaultForm = {
    id: '',
    title: '',
    type_id: '',
    type_path: [],
    keyword: '',
    description: '',
    content: '',
    status: 0,
    cover: ''
  }
  export default {
    name: 'articleEditor',
    components: {
      Tinymce
    },
    data () {
      return {
        uploadUrl: this.api.commonURL.uploadUrl,
        isAdd: true,
        form: JSON.parse(JSON.stringify(defaultForm)),
        rules: {
          user_name: [
            { required: true, message: '请输入名称', trigger: ['blur', 'change'] }
          ]
        },
        disableSubmit: false,
        type: [],
        status: [],
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
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

      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
        // 这里加一个后台返回连接的
        // this.dialog.form.avatar = URL.createObjectURL(file.raw)
        this.form.cover = res.path
      },
      // 图片上传之前的校验
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
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
          $('.main').animate({ scrollTop: 0 }, 500)
          postdata = this.lastPostData
          postdata.pn = this.searchData.pn
          postdata.page_size = this.searchData.page_size
          this.pageLoading = true
        }
        this.api.getUser(postdata).then(res => {
          _this.pageLoading = false
          _this.searchLoading = false
          if (res.code === 0) {
            _this.resultData = res.data
          } else {
            _this.$message({
              type: 'error',
              showClose: true,
              message: res.message
            })
          }
        }).catch(error => { // 状态码非2xx时
          _this.pageLoading = false
          _this.searchLoading = false
          _this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      },
      // 获取所有的部门
      getArticleType () {
        this.api.getArticleType({}).then(res => {
          if (res.code === 0) {
            this.type = res.data
          }
        }).catch(error => { // 状态码非2xx时
          console.log(error)
        })
      },
      // 获取数据字典
      getOption () {
        this.api.getOption({}).then(res => {
          if (res.code === 0) {
            this.sex = res.data.sex
            this.status = res.data.status
          }
        }).catch(error => { // 状态码非2xx时
          this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      },
      // 提交表单
      submitForm (e) {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            if (!_this.disableSubmit) {
              _this.disableSubmit = true
            } else {
              return false
            }
            _this.form.content = _this.$refs.tinymce.getContent()
            let form = JSON.parse(JSON.stringify(_this.form))
            form.type_id = form.type_path.length ? form.type_path[ form.type_path.length - 1 ] : ''
            form.type_path = JSON.stringify(form.type_path)
            if (_this.isAdd) {
              _this.api.addArticle(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  _this.$router.replace({
                    path: '/article/articleList'
                  })
                  // _this.getData(1)
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
              _this.api.updateArticle(form).then(res => {
                _this.disableSubmit = false
                if (res.code === 0) {
                  // _this.getData(0)
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
      // 重置表单
      resetForm () {
        this.$refs.ruleForm.resetFields()
      }
    },
    mounted: function () {
      // 所有的方式加载数据
      this.getOption()
      this.getArticleType()
      // this.getData(1)
    }
  }
</script>

<style lang="scss" type="text/scss">
  .article{
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
