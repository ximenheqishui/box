<template>
  <div class="home">
    <div class="search"></div>
    <div class="table-tool">
      <el-button size="mini" type="primary">添加员工</el-button>
      <el-button size="mini" type="primary">导出数据</el-button>
    </div>
    <div
            element-loading-text="数据加载中"
            v-loading="loading"
            element-loading-background="rgba(255, 255, 255, 0.6)">
      <el-table
              size="mini"
              align="left"
              :stripe="true"
              :data="tableData"
              style="width: 100%">
        <el-table-column
                fixed
                type="index"
                :index="indexMethod"
                label="序号"
                width="60">
        </el-table-column>
        <el-table-column
                fixed
                prop="name"
                label="姓名"
                width="80">
        </el-table-column>
        <el-table-column
                prop="sex"
                :formatter="sex"
                label="性别"
                width="60">
        </el-table-column>
        <el-table-column
                prop="date"
                label="日期"
                width="120">
        </el-table-column>
        <el-table-column
                label="年龄"
                width="60">
          <template slot-scope="scope">
            {{ scope.row.age }}岁
          </template>
        </el-table-column>
        <el-table-column
                prop="projectName"
                label="项目名称">
        </el-table-column>
        <el-table-column
                prop="post"
                width="160"
                label="岗位">
        </el-table-column>
        <el-table-column
                prop="idCard"
                width="160"
                label="身份证号">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="180">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">任命记录</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchData.pn"
              :page-sizes="searchData.pageSizes"
              :page-size="searchData.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        loading: false,
        searchData: {
          pageSizes: [10, 20, 50, 100],
          pn: 1,
          pageSize: 10
        },
        tableData: [{
          name: '王小虎',
          sex: 0,
          date: '2016-05-02',
          phone: '18765462765',
          age: '20',
          projectName: '中国邮政集团公司青岛市分公司',
          post: '黄岛邮储保安',
          idCard: '37082719850815163X',
          address: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀'
        }, {
          name: '王小虎',
          sex: 1,
          date: '2016-05-02',
          phone: '18765462765',
          age: '20',
          projectName: '中国邮政集团公司青岛市分公司',
          post: '黄岛邮储保安',
          idCard: '37082719850815163X',
          address: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀'
        }, {
          name: '王小虎',
          sex: 0,
          date: '2016-05-02',
          phone: '18765462765',
          age: '20',
          projectName: '中国邮政集团公司青岛市分公司',
          post: '黄岛邮储保安',
          idCard: '37082719850815163X',
          address: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀'
        }, {
          name: '王小虎',
          sex: 1,
          date: '2016-05-02',
          phone: '18765462765',
          age: '30',
          projectName: '中国邮政集团公司青岛市分公司',
          post: '黄岛邮储保安',
          idCard: '37082719850815163X',
          address: '上海市普s陀区金沙江路 1518 弄，上海市普s金沙江路 1518 弄上海市普s陀'
        }]
      }
    },
    filters: {
      filtersDate: function (dateStr) {
        return dateStr.split('')[0]
      }
    },
    methods: {
      sex: function (row, column, cellValue, index) {
        console.log(row, column, cellValue, index)
        if (!cellValue) return '男'
        return '女'
      },
      handleCurrentChange () {
        this.loading = true
      },
      handleSizeChange () {
        this.loading = false
      },
      formatter (row, column) {
        return row.address
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      indexMethod (index) {
        return 2 * index
        // return (this.searchData.pn - 1) * this.searchData.pageSize + (index + 1)
      }
    },
    mounted: function () {
      this.api.test({ aa: 123 }).then(function (response) {
        console.log(response)
      }).catch(function (e) {
        console.log(e)
      })
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  .table-tool{
    margin-bottom: 20px;
  }
</style>
