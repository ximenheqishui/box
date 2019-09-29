<template>
  <div class="company">
    <div class="search">
      <el-form ref="form" :model="searchData" class="" label-width="33%" size="small">
        <el-row :gutter="0">
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <area-tree @getId="getTreeId" ref="areaTree"></area-tree>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <select-company @getId="getCompanyId" ref="selectCompany"></select-company>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6" v-show="sswitch">
            <el-form-item label="法人代表">
              <el-input v-model="searchData.legalPerson" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" v-show="sswitch">
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="加油枪数">
              <el-input type="number" :min="0" v-model="searchData.refuelingGunAmount" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="期限">
              <el-select v-model="searchData.term"  clearable filterable  placeholder="">
                <el-option
                  v-for="item in companyTerm"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :md="8" :lg="7" :xl="6">
            <el-form-item label="监控类型">
              <el-select v-model="searchData.monitorType" clearable filterable  placeholder="">
                <el-option
                  v-for="item in monitorType"
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
            <el-form-item label="统一社会信用代码">
              <el-input v-model="searchData.dutyCode" placeholder=""></el-input>
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
          <el-button size="mini" type="success" @click="sswitch = !sswitch">{{!sswitch ? '高级查询': '关闭高级查询'}}</el-button>
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
        <el-button @click="showDialog(false)"  size="mini" type="primary">添加企业</el-button>
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
          prop="dutyNo"
          label="统一社会信用代码">
        </el-table-column>
        <el-table-column
          prop="dutyName"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="legalPerson"
          width="100"
          label="法人代表">
        </el-table-column>
        <el-table-column
          prop="legalIdentityNo"
          width="120"
          label="法人证件号">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="所属区域"
          width="100">
        </el-table-column>
        <el-table-column
          prop="termName"
          width="160"
          label="期限">
        </el-table-column>
        <el-table-column
          prop="monitorTypeName"
          width="100"
          label="监控类型">
        </el-table-column>
        <el-table-column
          prop="refuelingGunAmount"
          width="100"
          label="加油枪数">
        </el-table-column>
        <el-table-column
          prop="statusName"
          width="100"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="operation"
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showDialog(scope)" type="text" size="small">
              编辑
            </el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData,scope.row.id)" type="text" size="small">
              移除
            </el-button>
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

    <el-dialog  :title="dialog.isAdd ?  '添加企业': '修改企业'" :visible.sync="dialog.tag" height="80px" width="600px">
      <el-form size="small" :model="dialog.form" :rules="dialog.rules" ref="ruleForm" label-width="140px" @keyup.enter.native="submitFormD">
        <area-tree-radio @getId="getTreeIdRadio" ref="radioTree"></area-tree-radio>
        <el-form-item label="企业名称" prop="dutyName">
          <el-input  v-model="dialog.form.dutyName"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="dutyNo">
          <el-input  v-model="dialog.form.dutyNo"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalPerson">
          <el-input  v-model="dialog.form.legalPerson"></el-input>
        </el-form-item>
        <el-form-item label="法人证件号" prop="legalIdentityNo">
          <el-input  v-model="dialog.form.legalIdentityNo"></el-input>
        </el-form-item>
        <el-form-item label="期限" prop="term" class="is-required">
          <el-radio-group v-model="dialog.form.term">
            <el-radio v-for="item in dialog.companyTerm" :key="item.id" :label="item.id">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="监控类型" prop="monitorType" class="is-required">
          <el-radio-group v-model="dialog.form.monitorType">
            <el-radio v-for="item in dialog.monitorType" :key="item.id" :label="item.id">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status" class="is-required">
          <el-radio-group v-model="dialog.form.status">
            <el-radio v-for="item in dialog.companyStatus" :key="item.id" :label="item.id">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.tag = false">取 消</el-button>
        <el-button size="small" type="primary" :disabled="dialog.disableSubmit" @click="submitFormD">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import qs from 'qs'
  import areaTree from '@/components/form/areaTree.vue'
  import areaTreeRadio from '@/components/form/areaTreeRadio.vue'
  import selectCompany from '@/components/form/selectCompany.vue'
  export default {
    name: 'company',
    components: {
      'area-tree': areaTree,
      'area-tree-radio': areaTreeRadio,
      'select-company': selectCompany
    },
    data () {
      return {
        searchLoading: false, // 搜索中的loading
        pageLoading: false, // 分页的loading
        sswitch: false, // 是否展开高级搜索
        searchData: {
          pageSizes: [10, 25, 50, 100],
          pn: 1,
          pageSize: 10,
          areaIds: [],
          dutyNo: '',
          dutyCode: '',
          legalPerson: '', // 法人代表
          monitorType: '', // 监控类型
          refuelingGunAmount: '', // 加油枪数
          status: '', // 状态
          term: '' // 期限
        },
        dialog: {
          role: [],
          tag: false,
          isAdd: true,
          monitorType: [],
          companyTerm: [],
          companyStatus: [],
          form: {
            areaId: '', // 所属区域id
            dutyName: '', // 企业名称
            dutyNo: '', // 社会统一代码
            legalPerson: '', // 法人代表
            legalIdentityNo: '', // 证件号
            term: '', // 期限
            monitorType: '', // 监控类型
            status: '' // 状态
          },
          rules: {
            dutyName: [
              { required: true, message: '请输入企业名称', trigger: 'blur' }
            ],
            dutyNo: [
              { required: true, message: '请输入社会统一代码', trigger: 'blur' }
            ],
            legalPerson: [
              { required: true, message: '请输入法人代表', trigger: 'blur' }
            ],
            legalIdentityNo: [
              { required: true, message: '请输入法人代表证件号', trigger: 'blur' }
            ],
            term: [
              { required: true, message: '请选择期限', trigger: 'change' }
            ],
            monitorType: [
              { required: true, message: '请选择监控类型', trigger: 'change' }
            ],
            status: [
              { required: true, message: '请选择状态', trigger: 'change' }
            ]
          },
          disableSubmit: false
        },
        monitorType: [],
        companyTerm: [],
        companyStatus: [],
        lastPostData: {},
        resultData: {
          totalCount: 0,
          list: []
        }
      }
    },
    computed: {
      downloadUrl: function () {
        return this.api.exportUrl.company + '/?' + qs.stringify(this.lastPostData, { arrayFormat: 'repeat' })
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
          if (!_this.sswitch) {
            postdata.legalPerson = ''
            postdata.monitorType = ''
            postdata.refuelingGunAmount = ''
            postdata.term = ''
          }
          this.lastPostData = postdata
        } else {
          $('.main').animate({ scrollTop: 0 }, 500)
          postdata = this.lastPostData
          postdata.pn = this.searchData.pn
          postdata.pageSize = this.searchData.pageSize
          this.pageLoading = true
        }
        this.api.getCompany(postdata).then(res => {
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
      getTreeIdRadio (id) {
        this.dialog.form.areaId = id
      },
      resetForm (ref) {
        this.$refs.areaTree.clear()
        this.$refs.selectCompany.clear()
        this.searchData.dutyCode = ''
        this.searchData.legalPerson = ''
        this.searchData.monitorType = ''
        this.searchData.refuelingGunAmount = ''
        this.searchData.status = ''
        this.searchData.term = ''
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
            this.monitorType = res.data.data.monitorTypes
            this.companyTerm = res.data.data.terms
            this.companyStatus = res.data.data.statuses
            this.dialog.monitorType = res.data.data.monitorTypes
            this.dialog.companyTerm = res.data.data.terms
            this.dialog.companyStatus = res.data.data.statuses
          }
        }).catch(error => { // 状态码非2xx时
          this.$message({
            type: 'error',
            showClose: true,
            message: error.data.message
          })
        })
      },
      showDialog (obj) {
        let _this = this
        _this.dialog.tag = true
        _this.$nextTick(() => {
          _this.resetFormD()
          _this.$refs['radioTree'].clear()
          if (obj) {
            _this.dialog.isAdd = false
            _this.dialog.form = JSON.parse(JSON.stringify(obj.row))
            _this.$refs['radioTree'].name = _this.dialog.form.areaName
          } else {
            _this.dialog.isAdd = true
            _this.dialog.form = {
              areaId: '', // 所属区域id
              dutyName: '', // 企业名称
              dutyNo: '', // 社会统一代码
              legalPerson: '', // 法人代表
              legalIdentityNo: '', // 证件号
              term: '', // 期限
              monitorType: '', // 监控类型
              status: '' // 状态
            }
          }
        })
      },
      deleteRow (index, rows, id) {
        let _this = this
        _this.api.delCompany({ id: id }).then(res => {
          if (res.data.code === 0) {
            rows.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        }).catch(error => { // 状态码非2xx时
          _this.loading = false
          console.log(error)
        })
      },
      submitFormD (e) {
        let _this = this
        this.$refs.ruleForm.validate((valid) => {
          // 校验所属区域是否已经填写
          _this.$refs['radioTree'].validate()
          if (!_this.dialog.form.areaId) {
            return false
          }
          if (valid) {
            if (!_this.dialog.disableSubmit) {
              _this.dialog.disableSubmit = true
            } else {
              return false
            }
            if (_this.dialog.isAdd) {
              _this.api.addCompany(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.data.code === 0) {
                  _this.dialog.tag = false
                  _this.getData(0)
                } else {
                  console.log('添加失败')
                }
              }).catch(error => { // 状态码非2xx时
                _this.dialog.disableSubmit = false
                console.log(error)
              })
            } else {
              _this.api.updateCompany(_this.dialog.form).then(res => {
                _this.dialog.disableSubmit = false
                if (res.data.code === 0) {
                  _this.dialog.tag = false
                  _this.getData(0)
                } else {
                  console.log('修改失败')
                }
              }).catch(error => { // 状态码非2xx时
                _this.dialog.disableSubmit = false
                console.log(error)
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetFormD () {
        this.$refs.ruleForm.resetFields()
      }
    },
    mounted: function () {
      this.getData(1)
      this.getOption()
    }
  }
</script>

<style lang="scss" type="text/scss">
  .company{
  }
</style>
