<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userRelName"
        label="会员名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="联系电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tmType"
        label="用户类型">
      </el-table-column>
      <el-table-column
        prop="companyName"
        label="公司">
      </el-table-column>
      <el-table-column
        prop="searchChar"
        label="搜索词">
      </el-table-column>
      <el-table-column
        prop="searchResult"
        label="结果数">
      </el-table-column>
      <el-table-column
        prop="searchTime"
        label="时间"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'search-record-list',
  props: ['tableData'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
