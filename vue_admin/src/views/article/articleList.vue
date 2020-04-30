<template>
  <div class="article main-table">
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
          <el-button size="mini" :loading="loading" type="primary" @click="search">搜索</el-button>
          <el-button size="mini" @click="resetForm">重置</el-button>
          <el-button size="mini" type="success" @click="sswitch = !sswitch">{{!sswitch ? '更多': '精简'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tool-box">
      <div class="left">
        <el-button @click="goPage(false)"  size="mini" type="primary">添加文章</el-button>
        <el-button @click="deleteRow(false)"  size="mini" type="primary">批量删除</el-button>
      </div>
      <div class="right">
      </div>
    </div>
    <result ref="result" apiName="Article" @searchComplete="searchComplete" :selection="true" :index="true">
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
            <el-button @click.native.prevent="deleteRow(scope)" type="text" size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
    </result>
  </div>
</template>

<script>
  import result from '@/components/result/index.vue'
  export default {
    name: 'articleList',
    mixins: [boxGlobal.commonMixin],
    components: {
      result
    },
    data () {
      return {
        loading: false, // 搜索中的loading
        sswitch: false, // 是否展开高级搜索
        searchData: {
          date: ['', ''],
          type_path: [],
          title: '',
          type_id: '',
          end_date: '',
          start_date: '',
          keyword: '',
          status: ''
        },
        type: [],
        status: [],
        defaultProps: {
          value: 'id',
          children: 'children',
          label: 'name',
          checkStrictly: true
        },
        lastPostData: {},
        resultData: {
          total: 0
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
        this.search()
      },
      // 搜索条件恢复默认
      resetForm () {
        this.$refs['form'].resetFields()
      },
      // 搜索
      search () {
        let data = JSON.parse(JSON.stringify(this.searchData))
        data.type_id = data.type_path.length ? data.type_path[data.type_path.length - 1] : ''
        if (data.date) {
          data.start_date = data.date[0] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(data.date[0])) : ''
          data.end_date = data.date[1] ? this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date(data.date[1])) : ''
        } else {
          data.end_date = ''
          data.start_date = ''
        }
        delete data.date
        delete data.type_path
        if (!this.sswitch) {
          data.keyword = ''
          data.status = ''
          data.end_date = ''
          data.start_date = ''
        }
        this.getData(data)
      },
      getData (data) {
        this.loading = true
        this.lastPostData = data
        this.$refs.result.getData(data)
      },
      searchComplete (result) {
        this.loading = false
        this.resultData = result
      },
      // 获取文章类别
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
      // 删除
      deleteRow (scope) {
        if (scope) {
          this.$refs.result.deleteRow(scope)
        } else {
          this.$refs.result.deleteMore()
        }
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
      this.search()
    }
  }
</script>

<style lang="scss" type="text/scss">
</style>
