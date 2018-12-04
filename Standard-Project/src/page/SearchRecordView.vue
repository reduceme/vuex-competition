<template>
  <div>
    <search-record-bar @changeSearchData="changeSearchData($event)" :recordPageInfo="recordPageInfo"></search-record-bar>
    <search-record-list :tableData="tableListInfo.tableData"></search-record-list>
    <pagination ref="pageChild" :pageInfo="recordPageInfo" :total="tableListInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import SearchRecordBar from '../components/SearchRecordBar'
import SearchRecordList from '../components/SearchRecordList'
import Pagination from '../components/Pagination'
export default {
  name: 'search-record-view',
  components: { SearchRecordBar, SearchRecordList, Pagination },
  data () {
    return {
      /* *
       * 查询条件
       * */
      recordPageInfo: {
        pageSize: 20,
        currentPage: 1,
        memberName: '',
        phoneNumber: '',
        memberType: '',
        companyName: '',
        resultCount: ''
      },
      /* *
       * 从后台获取的数据赋值
       * */
      tableListInfo: {
        total: 0,
        tableData: []
      }
    }
  },
  methods: {
    changeSearchData (val) {
      this.recordPageInfo.memberName = val.memberName
      this.recordPageInfo.phoneNumber = val.phoneNumber
      this.recordPageInfo.memberType = val.memberType
      this.recordPageInfo.companyName = val.companyName
      this.recordPageInfo.resultCount = val.resultCount
      this.getSearchList()
    },
    /* *
     * 分页大小改变
     * */
    paginationSizeChange: function (val) {
      this.recordPageInfo.pageSize = val
      this.getSearchList()
    },
    /* *
     * 页码改变
     * */
    paginationCurrentChange: function (val) {
      this.recordPageInfo.currentPage = val
      this.getSearchList()
    },
    /* *
     * axios方法，根据查询条件，请求后台数据
     * */
    getSearchList () {
      Axios.get('/system/searchLog', {
        params: {
          mbCompanyName: this.recordPageInfo.companyName,
          memberLevel: this.recordPageInfo.memberType,
          phoneNumber: this.recordPageInfo.phoneNumber,
          resultType: this.recordPageInfo.resultCount,
          userRealName: this.recordPageInfo.memberName
        }
      }).then(response => {
        if (response.status === 200) {
          let data = response.data
          let type = {
            0: '普通会员',
            1: '充值会员',
            2: '商会会员'
          }
          data.list.forEach(function (item) {
            data.tmType = type[item.tmType]
            item.searchTime = item.searchTime.split('.')[0]
          })
          this.tableListInfo.tableData = data.list
          this.tableListInfo.total = data.total
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
    this.getSearchList()
  }
}
</script>

<style scoped></style>
