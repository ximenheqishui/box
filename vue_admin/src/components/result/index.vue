<template>
  <div
    class="result"
    element-loading-text="数据加载中"
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.6)">
    <div
      class="result-list"
      ref="tableScrollbar"
      @scroll="listBoxScroll">
      <el-table
        size="mini"
        :border="true"
        :stripe="true"
        :data="resultData.list"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        style="width: 100%">
        <el-table-column
          v-if="selection"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-if="index"
          fixed
          width="80"
          type="index"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <slot></slot>
      </el-table>
    </div>
    <el-pagination
      :disabled="loading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync ="searchData.pn"
      :page-sizes="pageSizes"
      :page-size.sync="searchData.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultData.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'listBox',
    props: {
      apiName: {
        type: String,
        required: true
      },
      selection: {
        type: Boolean,
        default: false
      },
      index: {
        type: Boolean,
        default: false
      },
      page_size: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        scrollTop: 0,
        multipleSelection: [],
        loading: false,
        searchData: {
          pn: 1,
          page_size: this.page_size
        },
        lastPostData: {},
        resultData: {
          total: 0,
          list: []
        }
      }
    },
    activated () {
      // 保持页面滚动条的位置
      try {
        this.$refs.tableScrollbar.scrollTop = this.scrollTop || 0
      } catch (e) {
        console.warn(e)
      }
    },
    computed: {
      pageSizes: function () {
        let defArr = [10, 25, 50, 100]
        function sortNumber (a, b) {
          return a - b
        }
        if (defArr.indexOf(this.page_size) < 0) {
          defArr.push(this.page_size)
          defArr.sort(sortNumber)
        }
        return defArr
      }
    },
    methods: {
      // 表格序号
      indexMethod (index) {
        return (this.searchData.pn - 1) * this.searchData.page_size + (index + 1)
      },
      // 表格勾选
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 页面排序
      handleSortChange (column, prop, order) {
        // 如果有需要排序的需求在再后台排序 现在前端单页面排序
        // console.log(column, prop, order)
      },
      // 分页改变时候的回调
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.$nextTick(() => {
          this.getData()
        })
      },
      // 每页多少条变化时候的函数
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
        this.$nextTick(() => {
          this.getData()
        })
      },
      // 监听滚动
      listBoxScroll () {
        this.scrollTop = this.$refs.tableScrollbar.scrollTop
      },
      // 设置滚动条位置
      setScrollTop (top) {
        this.scrollTop = top || 0
        this.$refs.tableScrollbar.scrollTop = this.scrollTop
      },
      // 搜索数据
      getData (searchData) {
        let _this = this
        this.loading = true
        let data = {}
        if (searchData) {
          _this.searchData.pn = 1
          data = Object.assign({
            pn: 1,
            page_size: _this.searchData.page_size
          }, searchData)
          this.lastPostData = data
        } else {
          data = this.lastPostData
          data.pn = this.searchData.pn
          data.page_size = this.searchData.page_size
        }
        this.api[`get${this.apiName}`](data).then(res => {
          if (res.code === 0) {
            _this.resultData = res.data
            try {
              _this.setScrollTop()
            } catch (e) {
              console.warn(e)
            }
          } else {
            _this.errorHandler(res.message || '获取失败')
          }
          if (searchData) {
            _this.$emit('searchComplete', res.data)
          }
          _this.loading = false
        }).catch(error => { // 状态码非2xx时
          _this.loading = false
          if (searchData) {
            _this.$emit('searchComplete', {
              total: 0
            })
          }
          _this.errorHandler(error.message)
        })
      },
      // 删除一条
      deleteRow (scope) {
        let rows = this.resultData.list
        let _this = this
        _this.api[`del${this.apiName}`]({ id: String(scope.row.id) }).then(res => {
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
      // 删除选中
      deleteMore () {
        if (!this.multipleSelection.length) {
          return false
        }
        let arr = []
        this.multipleSelection.forEach(function (item) {
          arr.push(item.id)
        })
        this.api[`del${this.apiName}`]({ id: arr.join(',') }).then(res => {
          if (res.code === 0) {
            this.getData()
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
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/mixin";
  .result{
    position: relative;
    width: 100%;
    flex: auto;
    height: 0;
    box-sizing: border-box;
    display: flex;
    flex-flow: nowrap column;
    .result-list{
      flex: auto;
      height: 0;
      overflow-x: hidden;
      overflow-y: auto;
      @include scrollBar('transparent', rgba(200,200,200,0.5));
      .el-table thead {
        color: #555;
        font-weight: 500;
      }
      .table-list {
      }
      .card-list{
      }
    }
    .el-pagination{
      flex: none;
      text-align: right;
      margin-top: 25px;
    }
  }
</style>
