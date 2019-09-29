<template>
  <div class="equipment">
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
            <el-form-item label="报警类型">
              <el-select v-model="searchData.alertType"  clearable filterable  placeholder="">
                <el-option
                  v-for="item in alertTypes"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
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
                v-model="searchData.alertTime"
                type="date"
                placeholder="选择开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="是否处理">
              <el-select v-model="searchData.dealFlag"  clearable filterable  placeholder="">
                <el-option
                  v-for="item in dealFlags"
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
          <el-button :disabled="!resultData.totalCount"  :loading="searchLoading" size="mini" type="primary" icon="icon iconfont icon-daochu">
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
          prop="areaName"
          label="所属区域">
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
          label="可加油品">
        </el-table-column>
        <el-table-column
          prop="alertTypeName"
          width="160"
          label="报警类型">
        </el-table-column>
        <el-table-column
          prop="alertTime"
          width="160"
          label="报警时间">
        </el-table-column>
        <el-table-column
          prop="alertDuration"
          width="160"
          label="持续时长">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="145"
          label="处理">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.dealFlag"
              placement="left"
              title="预警处理结果"
              width="600"
              trigger="click">
              <el-form label-width="80px">
                <el-form-item label="处理时间">
                  <el-input size="mini" readonly v-model="scope.row.dealTime"></el-input>
                </el-form-item>
                <el-form-item label="处理结果">
                  <el-input size="mini" :rows="4" readonly type="textarea" v-model="scope.row.dealResult"></el-input>
                </el-form-item>
              </el-form>
              <el-button  slot="reference"  size="mini" type="primary">查看确认结果</el-button>
            </el-popover>
          </template>
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
    name: 'equipment',
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
          dealFlag: '',
          alertType: '',
          alertTime: ''
        },
        lastPostData: {},
        resultData: {
          totalCount: 0,
          list: []
        },
        dealFlags: [
          {
            label: '是',
            id: 1
          },
          {
            label: '否',
            id: 0
          }
        ],
        alertTypes: []
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.exportUrl.equipment + '/?' + qs.stringify(this.lastPostData, { arrayFormat: 'repeat' })
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
          postdata.alertTime = postdata.alertTime ? this.dateFmt('yyyy-MM-dd', new Date(postdata.alertTime)) : ''
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
        this.api.getEquipment(postdata).then(res => {
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
        this.searchData.dealFlag = ''
        this.searchData.alertType = ''
        this.searchData.alertTime = ''
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
            this.alertTypes = res.data.data.alertTypes
          }
        }).catch(error => { // 状态码非2xx时
          this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      },
      showResult (row) {
        console.log(row)
      }
    },
    mounted: function () {
      this.getData(1)
      this.getOption()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .equipment{
  }
</style>
