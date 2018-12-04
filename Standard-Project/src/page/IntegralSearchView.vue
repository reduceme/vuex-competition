<template>
  <div>
    <integral-search-bar @changeSearchData="changeSearchData($event)" :integralPageInfo="integralPageInfo"></integral-search-bar>
    <intefral-search-list :tableData="tableListInfo.tableData"></intefral-search-list>
    <pagination ref="pageChild" :pageInfo="integralPageInfo" :total="tableListInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import IntegralSearchBar from '../components/IntegralSearchBar.vue'
import IntefralSearchList from '../components/IntegralSearchList.vue'
import Pagination from '../components/Pagination'

export default {
  name: 'intrgral-search-view',
  components: { IntegralSearchBar, IntefralSearchList, Pagination },
  data () {
    return {
      /* *
      * 查询条件
      * */
      integralPageInfo: {
        pageSize: 20,
        currentPage: 1,
        memberName: '',
        phoneNumber: '',
        incomeType: '',
        startTime: '',
        endTime: ''
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
      this.integralPageInfo.memberName = val.memberName
      this.integralPageInfo.phoneNumber = val.phoneNumber
      this.integralPageInfo.incomeType = val.incomeType
      this.integralPageInfo.startTime = val.startTime[0]
      this.integralPageInfo.endTime = val.startTime[1]
      this.getScoreList()
    },
    /* *
     * 分页大小改变
     * */
    paginationSizeChange: function (val) {
      this.integralPageInfo.pageSize = val
      this.getScoreList()
    },
    /* *
     * 页码改变
     * */
    paginationCurrentChange: function (val) {
      this.integralPageInfo.currentPage = val
      this.getScoreList()
    },
    /* *
     * axios方法，根据查询条件，请求后台数据
     * */
    getScoreList: function () {
      Axios.get('/system/get_score', {
        params: {
          name: this.integralPageInfo.memberName,
          telephone: this.integralPageInfo.phoneNumber,
          type: this.integralPageInfo.incomeType,
          startTime: this.integralPageInfo.startTime,
          endTime: this.integralPageInfo.endTime,
          pageNo: this.integralPageInfo.currentPage,
          pageSize: this.integralPageInfo.pageSize
        }
      }).then(response => {
        if (response.status === 200) {
          let data = response.data
          let type = {
            1: '收入',
            0: '支出'
          }
          data.list.forEach(function (item) {
            item.type = type[item.type]
            item.time = item.time.split('.')[0]
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
    this.getScoreList()
  }
}
</script>
