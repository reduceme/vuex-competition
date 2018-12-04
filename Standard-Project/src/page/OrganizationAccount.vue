<template>
  <div>
    <criterion-type-search @changeSearchData="changeSearchData($event)" :pageInfo="integralPageInfo"></criterion-type-search>
    <criterion-type-list :tableData="tableListInfo.tableData"></criterion-type-list>
    <pagination ref="pageChild" :pageInfo="integralPageInfo" :total="tableListInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from 'element-ui'
import CriterionTypeSearch from '../components/OrganizationCount/InfoSearch'
import CriterionTypeList from '../components/OrganizationCount/InfoList.vue'
import Pagination from '../components/Pagination'

export default {
  name: 'organization-state',
  components: { CriterionTypeSearch, CriterionTypeList, Pagination },
  data () {
    return {
      /* *
      * 查询条件
      * */
      integralPageInfo: {
        pageSize: 20,
        currentPage: 1,
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
      console.log(val);
      this.integralPageInfo.startTime = val.orgTime[0]
      this.integralPageInfo.endTime = val.orgTime[1]
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
      Axios.get('/org/get_orgSettlement', {
        params: {
          startTime: this.integralPageInfo.startTime || "",
          endTime: this.integralPageInfo.endTime || "",
          pageNo: this.integralPageInfo.currentPage,
          pageSize: this.integralPageInfo.pageSize
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
