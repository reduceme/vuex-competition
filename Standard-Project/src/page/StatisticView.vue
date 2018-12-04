<template>
  <div>
    <member-search-bar @click="searchBar" ref="searchChild" :pageInfo="pageInfo" @changeSearchData="searchBar($event)"></member-search-bar>
    <member-search-list :tableData="tableListInfo.tableData"></member-search-list>
    <pagination ref="pageChild" :pageInfo="pageInfo" :total="tableListInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import MemberSearchBar from '../components/MemberSearchBar'
import MemberSearchList from '../components/MemberSearchList'
import Pagination from '../components/Pagination'

export default {
  name: 'statistic-view',
  components: { MemberSearchBar, MemberSearchList, Pagination },
  data () {
    return {
      /* *
      * 查询条件
      * */
      pageInfo: {
        pageSize: 20,
        currentPage: 1,
        memberName: '',
        phoneNumber: '',
        memberStatus: ''
      },
      /* *
      * 从后台获取的数据赋值
      * */
      tableListInfo: {
        total: 0,
        tableData: []
      },
      username: 'test'
    }
  },
  methods: {
    /* *
    * 获取头部搜索条件
    * */
    searchBar: function (val) {
      this.pageInfo.memberName = val.memberName
      this.pageInfo.phoneNumber = val.phoneNumber
      this.pageInfo.memberStatus = val.memberStatus
      this.getTableList()
    },
    /* *
    * 分页大小改变
    * */
    paginationSizeChange: function (val) {
      this.pageInfo.pageSize = val
      this.getTableList()
    },
    /* *
    * 页码改变
    * */
    paginationCurrentChange: function (val) {
      this.pageInfo.currentPage = val
      this.getTableList()
    },
    /* *
    * axios方法，根据查询条件，请求后台数据
    * */
    getTableList () {
      Axios.get('/system/statistics', {
        params: {
          name: this.pageInfo.memberName,
          telephone: this.pageInfo.phoneNumber,
          status: this.pageInfo.memberStatus,
          pageNo: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize
        }
      }).then((response) => {
        let data = response.data
        if (response.status === 200) {
          let mbClass = {
            0: '普通会员',
            1: '充值会员',
            2: '商会会员'
          }
          let apprStat = {
            0: '无效',
            1: '有效'
          }
          data.results.forEach(function (item) {
            item.mbClass = mbClass[item.mbClass]
            item.apprStat = apprStat[item.apprStat]
          })
          this.tableListInfo.tableData = data.results
          this.tableListInfo.total = data.totalCount
        } else {
          Message.error({
            message: '获取列表失败'
          })
        }
      }).catch(response => {
        Message.error({
          message: '网络连接失败'
        })
      })
    }
  },
  mounted () {
    this.getTableList()
  }
}
</script>

<style scoped>
.el-dialog__header {
  background: #4286DC;
}
</style>
