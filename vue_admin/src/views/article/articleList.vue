<template>
  <div class="article">
    <div class="search-box">
      <el-form @keyup.enter.native="search" ref="form" :inline="true" :model="searchData" label-width="80px" size="small">
         <el-form-item label="标题" prop="title">
            <el-input   clearable v-model="searchData.title" placeholder="请输入标题"></el-input>
          </el-form-item>
         <el-form-item label="文章类别" prop="type_path">
           <el-cascader
             clearable
             placeholder="请选择文章类别"
             v-model="searchData.type_path"
             :props="defaultProps"
             :options="type">
           </el-cascader>
          </el-form-item>
          <div v-show="sswitch" style="display: inline">
            <el-form-item label="关键词"  prop="keyword">
              <el-input  clearable v-model="searchData.keyword" placeholder="请输入关键词"></el-input>
            </el-form-item>
            <el-form-item label="文章状态" prop="status">
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
        <el-button @click="goPage(false)"  size="mini" type="primary">添加文章</el-button>
        <el-button @click="deleteMore()"  size="mini" type="primary">批量删除</el-button>
      </div>
      <div class="right">
<!--        <a :href=" !(!resultData.total || searchLoading) ? downloadUrl : 'javascript:void(0)'" target="_blank" style="display: inline-block;box-sizing: border-box">-->
<!--          <el-button class="icon-change" :disabled="!resultData.total"  :loading="searchLoading" size="mini" type="primary" icon="icon iconfont icon-daochu">-->
<!--            导出-->
<!--          </el-button>-->
<!--        </a>-->
      </div>
    </div>
    <div
      class="list-box"
      element-loading-text="数据加载中"
      v-loading="pageLoading || searchLoading"
      element-loading-background="rgba(255, 255, 255, 0.6)">
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
          prop="title"
          width="120"
          label="文章标题">
        </el-table-column>
        <el-table-column
          width="200"
          label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover" fit="contain">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          prop="type_name"
          label="文章类别">
        </el-table-column>
        <el-table-column
          prop="keyword"
          label="关键词">
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介">
        </el-table-column>
        <el-table-column
          width="80"
          prop="read_num"
          label="阅读量">
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
            <el-button @click.native.prevent="goPage(scope)" type="text" size="small">
              修改
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
        :current-page.sync ="searchData.pn"
        :page-sizes="searchData.pageSizes"
        :page-size.sync="searchData.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultData.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articleList',
    components: {
    },
    data () {
      return {
        uploadUrl: this.api.commonURL.uploadUrl,
        searchLoading: false, // 搜索中的loading
        pageLoading: false, // 分页的loading
        sswitch: false, // 是否展开高级搜索
        searchData: {
          pageSizes: [10, 25, 50, 100],
          pn: 1,
          page_size: 10,
          title: '',
          type_id: '',
          type_path: [],
          end_date: '',
          start_date: '',
          date: ['', ''],
          keyword: '',
          status: ''
        },
        type: [],
        multipleSelection: [],
        status: [],
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
        },
        lastPostData: {},
        resultData: {
          total: 0,
          list: []
        }
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.commonURL.exportUrl + '/article/?' + this.qs.stringify(this.lastPostData)
      }
    },
    watch: {
    },
    filters: {
    },
    methods: {
      refresh () {
        this.getData(1)
      },
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
          postdata.type_id = postdata.type_path.length ? postdata.type_path[postdata.type_path.length - 1] : ''
          if (postdata.date) {
            postdata.start_date = postdata.date[0] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(postdata.date[0])) : ''
            postdata.end_date = postdata.date[1] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(postdata.date[1])) : ''
          } else {
            postdata.end_date = ''
            postdata.start_date = ''
          }
          delete postdata.pageSizes
          delete postdata.type_path
          delete postdata.date
          if (!_this.sswitch) {
            postdata.date = ''
            postdata.keyword = ''
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
        this.api.getArticle(postdata).then(res => {
          _this.pageLoading = false
          _this.searchLoading = false
          if (res.code === 0) {
            _this.resultData = res.data
            $('.main').animate({ scrollTop: 0 }, 500)
          } else {
            _this.errorHandler(res.message || '获取文章失败')
          }
        }).catch(error => { // 状态码非2xx时
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
      getArticleType () {
        this.api.getArticleType({}).then(res => {
          if (res.code === 0) {
            this.type = res.data
          } else {
            this.errorHandler(res.message || '获取文章类别失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      // 获取数据字典
      getOption () {
        this.api.getDictionaries({}).then(res => {
          if (res.code === 0) {
            this.status = res.data.status
          } else {
            this.errorHandler(res.message || '获取字典失败')
          }
        }).catch(error => {
          this.errorHandler(error.message)
        })
      },
      // 显示添加修改框
      articleEditor (obj) {
        let _this = this
        _this.dialog.tag = true
        _this.$nextTick(() => {
          _this.resetFormD()
          if (obj) {
            _this.dialog.isAdd = false
            _this.dialog.form = JSON.parse(JSON.stringify(obj.row))
            _this.dialog.form.password2 = ''
            _this.dialog.form.password = ''
            _this.dialog.form.dept_path = JSON.parse(this.dialog.form.dept_path)
          } else {
            _this.dialog.isAdd = true
            _this.dialog.form = JSON.parse(JSON.stringify(defaultForm))
          }
        })
      },
      // 删除一条
      deleteRow (scope, rows) {
        let _this = this
        _this.api.delArticle({ id: scope.row.id }).then(res => {
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
        this.api.delArticle({ id: arr.join(',') }).then(res => {
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
      // 去文章编辑页面
      goPage (scope) {
        // 通知新页面需要刷新
        this.$store.dispatch('common/changeRefresh', true)
        if (scope) {
          this.$router.push({
            path: '/article/articleEditor',
            query: { id: scope.row.id }
          })
        } else {
          this.$router.push({
            path: '/article/articleEditor'
          })
        }
      }
    },
    mounted: function () {
      // 所有的方式加载数据
      this.getOption()
      this.getArticleType()
      this.getData(1)
    }
  }
</script>

<style lang="scss" type="text/scss">
</style>
