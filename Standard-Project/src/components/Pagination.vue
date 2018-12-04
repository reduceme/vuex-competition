<template>
  <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="localCurrentPage"
      :page-sizes="[20, 100, 200, 300, 400]"
      :page-size="localPageSize"
      layout="sizes, prev, pager, next, total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pageInfo: Object,
    total: Number
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSizeChange', `${val}`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', `${val}`)
    }
  },
  data () {
    return {
      localPageSize: this.pageInfo.pageSize,
      localCurrentPage: this.pageInfo.currentPage
    }
  }
}
</script>

<style>
.el-pagination {
  padding-top: 15px;
  float: right;
}
</style>
