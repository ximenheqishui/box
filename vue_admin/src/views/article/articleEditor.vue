<template>
  <div class="article-editor">
      <el-form
        element-loading-text="数据加载中"
        v-loading="pageLoading"
        element-loading-background="rgba(255, 255, 255, 0.6)"
        size="small"
        :model="form"
        ref="ruleForm"
        label-width="70px">
        <el-form-item label="标题" prop="title" style="max-width: 600px">
          <el-input placeholder="请输入标题" v-model="form.title"></el-input>
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
          <el-input placeholder='请输入关键词,用 "," 隔开' v-model="form.keyword"></el-input>
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
          <el-button style="margin:20px 20px 20px 0;letter-spacing: 10px" size="mini" type="primary"
                     :loading="disableSubmit" :disabled="disableSubmit" @click="submitForm">提交
          </el-button>
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
    mixins: [boxGlobal.commonMixin],
    components: {
      Tinymce
    },
    data () {
      return {
        pageLoading: true,
        id: '',
        uploadUrl: this.api.commonURL.uploadUrl,
        defaultForm: JSON.parse(JSON.stringify(defaultForm)),
        form: JSON.parse(JSON.stringify(defaultForm)),
        disableSubmit: false,
        type: [],
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
        }
      }
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
      refresh () {
        this.$router.replace({ path: '/refresh' })
      },
      // 图片上传成功后的操作
      handleAvatarSuccess (res, file) {
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
              _this.$refs.tinymce.setContent(_this.defaultForm.content)
            }
          } else {
            _this.errorHandler(res.message || '获取文章失败')
          }
        }).catch(error => {
          _this.pageLoading = false
          _this.errorHandler(error.message)
        })
      },
      // 获取所有文章分类
      async getArticleType () {
        let _this = this
        await _this.api.getArticleType({}).then(res => {
          if (res.code === 0) {
            _this.type = res.data
          } else {
            _this.errorHandler(res.message || '获取文章类别失败')
          }
        }).catch(error => {
          _this.errorHandler(error.message)
        })
        _this.getData()
      },
      // 提交表单
      submitForm () {
        let _this = this
        if (!_this.disableSubmit) {
          _this.disableSubmit = true
        } else {
          return false
        }
        _this.form.content = _this.$refs.tinymce.getContent()
        let form = JSON.parse(JSON.stringify(_this.form))
        if (form.type_path && form.type_path.length) {
          form.type_id = form.type_path[form.type_path.length - 1]
        } else {
          form.type_id = ''
        }
        form.type_path = JSON.stringify(form.type_path)
        if (!_this.id) {
          _this.api.addArticle(form).then(res => {
            _this.disableSubmit = false
            if (res.code === 0) {
              // 删除当前页面的tag
              _this.$store.dispatch('tagsView/delView', _this.$route)
              // 确定下次页面跳转需要刷新
              _this.$store.dispatch('common/changeRefresh', true)
              _this.$router.replace({
                path: '/article/articleList'
              })
            } else {
              _this.errorHandler(res.message || '添加文章失败')
            }
          }).catch(error => {
            _this.disableSubmit = false
            _this.errorHandler(error.message)
          })
        } else {
          _this.api.updateArticle(form).then(res => {
            _this.disableSubmit = false
            if (res.code === 0) {
              _this.$store.dispatch('tagsView/delView', _this.$route)
              _this.$store.dispatch('common/changeRefresh', true)
              _this.$router.replace({
                path: '/article/articleList'
              })
            } else {
              _this.errorHandler(res.message || '修改文章失败')
            }
          }).catch(error => {
            _this.disableSubmit = false
            _this.errorHandler(error.message || '添加文章失败')
          })
        }
      },
      // 重置表单
      resetForm () {
        this.$refs.tinymce.setContent(this.defaultForm.content)
        this.form = JSON.parse(JSON.stringify(this.defaultForm))
      }
    },
    mounted: function () {
      this.id = this.$route.query.id || ''
      this.getArticleType()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .article-editor {
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
