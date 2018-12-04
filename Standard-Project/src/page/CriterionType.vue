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
import CriterionTypeSearch from '../components/criterionComponents/CriterionTypeSearch.vue'
import CriterionTypeList from '../components/criterionComponents/CriterionTypeList.vue'
import Pagination from '../components/Pagination'

export default {
  name: 'critrion-type',
  components: { CriterionTypeSearch, CriterionTypeList, Pagination },
  data () {
    return {
      /* *
      * 查询条件
      * */
      integralPageInfo: {
        pageSize: 20,
        currentPage: 1,
        tyNum: '',
        tyName: ''
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
      this.integralPageInfo.tyNum = val.tyNum
      this.integralPageInfo.tyName = val.tyName
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
      Axios.get('/type/get_type', {
        params: {
          tyNum: this.integralPageInfo.tyNum,
          tyName: this.integralPageInfo.tyName,
          pageNo: this.integralPageInfo.currentPage,
          pageSize: this.integralPageInfo.pageSize
        }
      }).then(response => {
        if (response.status === 200) {
          let data = response.data
          // let type = {
          //   1: '收入',
          //   0: '支出'
          // }
          // data.list.forEach(function (item) {
          //   item.type = type[item.type]
          //   item.time = item.time.split('.')[0]
          // })
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
