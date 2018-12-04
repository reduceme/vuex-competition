<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="userId"
        label="用户ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="会员名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="type"
        label="收支类型">
      </el-table-column>
      <el-table-column
        prop="scoreNum"
        label="积分数量">
      </el-table-column>
      <el-table-column
        prop="remainScore"
        label="剩余积分">
      </el-table-column>
      <el-table-column
        prop="event"
        label="收支事宜">
      </el-table-column>
      <el-table-column
        prop="time"
        label="变动时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'integral-search-list',
  props: ['tableData'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
