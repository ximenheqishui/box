<template>
  <div class="tanker">
    <div class="search">
      <el-form ref="form" :model="searchData" class="" label-width="30%" size="small">
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
            <el-form-item label="可加油品">
              <el-select v-model="searchData.refuelingType"  clearable filterable  placeholder="">
                <el-option
                  v-for="item in tankerType"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="状态">
              <el-select v-model="searchData.status"  clearable filterable  placeholder="">
                <el-option
                  v-for="item in companyStatus"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
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
          <el-button  class="icon-change" :disabled="!resultData.totalCount"  :loading="searchLoading" size="mini" type="primary" icon="icon iconfont icon-daochu">
          数据导出
          </el-button>
        </a>
        <el-upload
          style="display: inline-block"
          :show-file-list="false"
          :action="downloadUrlImport">
          <el-button size="mini" type="primary">批量导入</el-button>
        </el-upload>
      </div>
      <div class="right">
        <a :href="downloadUrlM" target="_blank" style="display: inline-block;box-sizing: border-box">
          <el-button  size="mini" type="primary" >
            批量导入模板下载
          </el-button>
        </a>
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
          prop="areaName"
          label="所属区域">
        </el-table-column>
        <el-table-column
          prop="dutyNo"
          label="加油站名称">
        </el-table-column>
        <el-table-column
          prop="refuelingGunNo"
          label="加油枪编号">
        </el-table-column>
        <el-table-column
          prop="refuelingType"
          label="可加油品">
        </el-table-column>
        <el-table-column
          prop="acquisitionModuleNo"
          label="采集模块编号">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="operation"
          width="100"
          label="操作">
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
  import qs from 'qs'
  import areaTree from '@/components/form/areaTree.vue'
  import selectCompany from '@/components/form/selectCompany.vue'
  export default {
    name: 'tanker',
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
          areaIds: [],
          dutyNo: '',
          refuelingType: '',
          status: ''
        },
        lastPostData: {},
        resultData: {
          totalCount: 0,
          list: []
        },
        companyStatus: [],
        tankerType: []
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.exportUrl.tanker + '/?' + qs.stringify(this.lastPostData, { arrayFormat: 'repeat' })
      },
      downloadUrlM: function () {
        return this.api.exportUrl.tankerM
      },
      downloadUrlImport: function () {
        return this.api.exportUrl.tankerImport
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
        let postdata = {}
        if (type) {
          this.searchLoading = true
          postdata = JSON.parse(JSON.stringify(this.searchData))
          delete postdata.pageSizes
          if (!postdata.areaIds.length) {
            postdata.areaIds = ''
          }
          this.lastPostData = postdata
        } else {
          $('.main').animate({ scrollTop: 0 }, 500)
          postdata = this.lastPostData
          postdata.pn = this.searchData.pn
          postdata.pageSize = this.searchData.pageSize
          this.pageLoading = true
        }
        this.api.getTanker(postdata).then(res => {
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
        this.searchData.areaIds = id
      },
      getCompanyId (node) {
        this.searchData.dutyNo = node.dutyNo
      },
      resetForm (ref) {
        this.$refs.areaTree.clear()
        this.$refs.selectCompany.clear()
        this.searchData.refuelingType = ''
        this.searchData.status = ''
      },
      submitForm (ref) {
        this.searchData.pn = 1
        this.$nextTick(() => {
          this.getData(1)
        })
      },
      getOption () {
        this.api.getOption({}).then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.companyStatus = res.data.data.statuses
          }
        }).catch(error => { // 状态码非2xx时
          this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
        this.api.getTankerType({}).then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.tankerType = res.data.data
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
      this.getData(1)
      this.getOption()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .tanker{
  }
</style>
