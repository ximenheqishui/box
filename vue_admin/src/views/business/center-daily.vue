<template>
  <div class="center-daily">
    <div class="search">
      <el-form ref="form" :model="searchData" class="" label-width="33%" size="small">
        <el-row :gutter="0">
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <area-tree @getId="getTreeId" ref="areaTree"></area-tree>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <select-company @getId="getCompanyId" ref="selectCompany"></select-company>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="统一社会信用代码">
              <el-input v-model="searchData.dutyCode" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="月份">
              <el-date-picker
                format="yyyy 年 MM 月"
                v-model="searchData.startDate"
                type="month"
                placeholder="选择月份">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-button size="mini" :loading="searchLoading" type="primary" @click="submitForm('form')">搜索</el-button>
          <el-button size="mini" @click="resetForm('form')">重置</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="table-tool">
      <div class="left">
        <a :href=" !(!resultData.totalCount || searchLoading) ? downloadUrl : 'javascript:void(0)'" target="_blank" style="display: inline-block;box-sizing: border-box">
          <el-button class="icon-change" :disabled="!resultData.totalCount"  :loading="searchLoading" size="mini" type="primary" icon="icon iconfont icon-daochu">
          导出
          </el-button>
        </a>
      </div>
      <div class="right">
      </div>
    </div>
    <div
      element-loading-text="数据加载中"
      v-loading="pageLoading || searchLoading"
      element-loading-background="rgba(255, 255, 255, 0.6)">
      <el-table
        size="mini"
        :border="true"
        :stripe="true"
        :data="resultData.list"
        style="width: 100%">
        <el-table-column
          fixed
          prop="relatedName"
          label="所属区域"
          width="100">
        </el-table-column>
        <el-table-column
          prop="dutyCode"
          label="统一社会信用代码">
        </el-table-column>
        <el-table-column
          prop="dutyName"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="createDate"
          width="160"
          label="月份">
        </el-table-column>
        <el-table-column
          prop="createDate"
          width="160"
          label="款项所属期起">
        </el-table-column>
        <el-table-column
          prop="createDate"
          width="160"
          label="款项所属期止">
        </el-table-column>
        <el-table-column
          prop="createDate"
          width="160"
          label="收入（元）">
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="resultData.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync ="searchData.pn"
        :page-sizes="searchData.pageSizes"
        :page-size.sync="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultData.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import areaTree from '@/components/form/areaTree.vue'
  import selectCompany from '@/components/form/selectCompany.vue'
  export default {
    name: 'centerDaily',
    components: {
      'area-tree': areaTree,
      'select-company': selectCompany
    },
    data () {
      return {
        searchLoading: false, // 搜索中的loading
        pageLoading: false, // 分页的loading
        searchData: {
          pageSizes: [10, 25, 50, 100],
          pn: 1,
          pageSize: 10,
          treeIds: [],
          dutyNo: '',
          startDate: '',
          dutyCode: ''
        },
        lastPostData: {},
        resultData: {
          totalCount: 0,
          list: []
        }
      }
    },
    computed: {
      downloadUrl: function () {
        let routeData = this.$router.resolve({
          path: this.api.exportUrl.collection,
          query: this.lastPostData })
        return routeData.href.substring(2)
      }
    },
    watch: {
    },
    filters: {
    },
    methods: {
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.$nextTick(() => {
          this.getData(0)
        })
      },
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
        let postdata = JSON.parse(JSON.stringify(this.searchData))
        delete postdata.pageSizes
        postdata.startDate = postdata.startDate ? this.dateFmt('yyyy-MM-dd', new Date(postdata.startDate)) : ''
        postdata.endDate = postdata.endDate ? this.dateFmt('yyyy-MM-dd', new Date(postdata.endDate)) : ''
        if (type) {
          this.searchLoading = true
          this.lastPostData = postdata
        } else {
          this.pageLoading = true
        }
        this.api.getCollection(postdata).then(res => {
          _this.pageLoading = false
          _this.searchLoading = false
          if (res.data.code === 0) {
            _this.resultData = res.data.data
          } else {
            _this.$message({
              type: 'error',
              showClose: true,
              message: res.data.message
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
      getTreeId (id) {
        this.searchData.treeIds = id
      },
      getCompanyId (node) {
        this.searchData.dutyNo = node.id
      },
      resetForm (ref) {
        this.$refs.areaTree.clear()
        this.$refs.selectCompany.clear()
        this.searchData.startDate = ''
        this.searchData.endDate = ''
      },
      submitForm (ref) {
        this.getData(1)
      }
    },
    beforeDestroy: function () {
    },
    mounted: function () {
      this.getData(1)
    }
  }
</script>

<style lang="scss" type="text/scss">
  .center-daily{
  }
</style>
