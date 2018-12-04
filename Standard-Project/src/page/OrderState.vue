<template>
  <div>
    <criterion-type-search @changeSearchData="changeSearchData($event)" :pageInfo="integralPageInfo"></criterion-type-search>
    <data-list :tableData="tableListInfo.tableData"></data-list>
    <pagination ref="pageChild" :pageInfo="integralPageInfo" :total="tableListInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import CriterionTypeSearch from '../components/orderStateComments/OrderStateSearch'
import DataList from '../components/orderStateComments/OrderList.vue'
import Pagination from '../components/Pagination'

export default {
  name: 'industry-field',
  components: { CriterionTypeSearch, DataList, Pagination },
  data () {
    return {
      /* *
      * 查询条件
      * */
      integralPageInfo: {
        pageSize: 20,
        currentPage: 1,
        orderNum: '',
        mbName: '',
        orderTime: '',
        overTime: '',
        orderStatus: ''
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
      this.integralPageInfo.orderNum = val.orderNum
      this.integralPageInfo.mbName = val.mbName
      this.integralPageInfo.orderTime = val.orderTime[0]
      this.integralPageInfo.overTime = val.orderTime[1]
      this.integralPageInfo.orderStatus = val.orderStatus
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
      Axios.get('/order/getOrderList', {
        params: {
          pageNo: this.integralPageInfo.currentPage,
          pageSize: this.integralPageInfo.pageSize,
          orderNum: this.integralPageInfo.orderNum,
          mbName: this.integralPageInfo.mbName,
          orderTime: this.integralPageInfo.orderTime,
          overTime: this.integralPageInfo.overTime,
          orderStatus: this.integralPageInfo.orderStatus
        }
      }).then(response => {
        if (response.status === 200) {
          let data = response.data
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
