<template>
  <div class="collection">
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
            <el-form-item label="加油枪编号">
              <el-select :disabled="!gunsNo.length" v-model="searchData.refuelingGunNo" clearable filterable  placeholder="请选择加油枪编号">
                <el-option
                  v-for="item in gunsNo"
                  :key="item.refuelingGunNo"
                  :label="item.refuelingGunNo"
                  :value="item.refuelingGunNo">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="起始时间">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                v-model="searchData.startDate"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="结束时间">
              <el-date-picker
                format="yyyy 年 MM 月 dd 日"
                v-model="searchData.endDate"
                type="date"
                placeholder="选择结束日期">
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
          <span class="switch">
            <span>实时刷新</span>
            <el-switch size="mini" v-model="sswitch"></el-switch>
          </span>
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
          label="所属区域"
          width="100">
        </el-table-column>
        <el-table-column
          prop="dutyNo"
          label="统一社会信用代码">
        </el-table-column>
        <el-table-column
          prop="dutyName"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="refuelingGunNo"
          width="100"
          label="加油枪编号">
        </el-table-column>
        <el-table-column
          prop="refuelingType"
          width="120"
          label="油品">
        </el-table-column>
        <el-table-column
          prop="acquisitionModuleNo"
          width="160"
          label="采集模块编号">
        </el-table-column>
        <el-table-column
          prop="quantity"
          width="100"
          label="加油量（L)">
        </el-table-column>
        <el-table-column
          prop="price"
          width="100"
          label="单价（元/L)">
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          width="100"
          label="总金额（元）">
        </el-table-column>
        <el-table-column
          prop="recordingTime"
          width="160"
          label="时间">
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
    name: 'collection',
    components: {
      'area-tree': areaTree,
      'select-company': selectCompany
    },
    data () {
      return {
        interval: 0,
        searchLoading: false, // 搜索中的loading
        pageLoading: false, // 分页的loading
        sswitch: false,
        searchData: {
          pageSizes: [10, 25, 50, 100],
          pn: 1,
          pageSize: 10,
          areaIds: [],
          dutyNo: '',
          startDate: '',
          endDate: '',
          refuelingGunNo: ''
        },
        lastPostData: {},
        resultData: {
          totalCount: 0,
          list: []
        },
        gunsNo: []
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.exportUrl.collection + '/?' + qs.stringify(this.lastPostData, { arrayFormat: 'repeat' })
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
          postdata.startDate = postdata.startDate ? this.dateFmt('yyyy-MM-dd', new Date(postdata.startDate)) : ''
          postdata.endDate = postdata.endDate ? this.dateFmt('yyyy-MM-dd', new Date(postdata.endDate)) : ''
          this.lastPostData = postdata
        } else {
          $('.main').animate({ scrollTop: 0 }, 500)
          postdata = this.lastPostData
          postdata.pn = this.searchData.pn
          postdata.pageSize = this.searchData.pageSize
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
        this.searchData.areaIds = id
      },
      getCompanyId (node) {
        this.searchData.dutyNo = node.dutyNo
        this.gunsNo = node.guns
        this.searchData.refuelingGunNo = ''
      },
      resetForm (ref) {
        this.$refs.areaTree.clear()
        this.$refs.selectCompany.clear()
        this.searchData.startDate = ''
        this.searchData.endDate = ''
      },
      submitForm (ref) {
        this.searchData.pn = 1
        this.$nextTick(() => {
          this.getData(1)
        })
      },
      refresh () {
        this.interval = setInterval(() => {
          if (this.sswitch) {
            this.getData(0)
          }
        }, 10000)
      }
    },
    beforeDestroy: function () {
      clearInterval(this.interval)
    },
    mounted: function () {
      this.getData(1)
      this.refresh()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .collection{
  }
</style>
