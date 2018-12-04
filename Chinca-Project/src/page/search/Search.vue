<template>
  <div>
    <p class="bread-nav">
      <el-button type="text">检索结果</el-button>
      <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
      <el-button type="text">{{searchTxt}}</el-button>
    </p>
    <template v-if="list.length > 0">
      <ul class="content-list" :key="item.id" v-for="item in list">
        <li>
          <el-row style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap">
            <el-col :span="8"><div class="grid-content bg-purple"><span class="list-question">标准号：</span><span class="list-answer">{{item.stNum}}</span></div></el-col>
            <el-tooltip class="item" effect="dark" :content="item.stNameF" placement="top">
              <el-col :span="8"><div class="grid-content bg-purple-light"><span class="list-question">外文名称：</span><span class="list-answer">{{item.stNameF}}</span></div></el-col>
            </el-tooltip>
          </el-row>
          <el-row style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap">
            <el-col :span="8"><div class="grid-content bg-purple"><span class="list-question">标准语种：</span><span class="list-answer">{{item.stLang}}</span></div></el-col>
            <el-tooltip class="item" effect="dark" :content="item.stNameZh" placement="top">
              <el-col :span="8"><div class="grid-content bg-purple-light"><span class="list-question">中文名称：</span><span class="list-answer">{{item.stNameZh}}</span></div></el-col>
            </el-tooltip>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple"><span class="list-question">发布日期：</span><span class="list-answer">{{item.createTimeStr}}</span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple">
              <el-button type="danger" @click.native="addToCart(item)">加入意向清单</el-button>
              <el-button type="primary" @click.native="showDetail(item.id,item.stNum)">查看详情</el-button>
            </div></el-col>
          </el-row>
        </li>
      </ul>
    </template>
    <template v-else>
      <p style="text-align: center;color: #808080;font-size: 14px">暂无搜索结果</p>
    </template>
    <pagination :pageInfo="pageInfo" :total="totalInfo.total" @handleSizeChange="paginationSizeChange($event)" @handleCurrentChange="paginationCurrentChange($event)"></pagination>
  </div>
</template>
<script>
  import Axios from "axios"
  import Pagination from '../../components/Pagination'
  export default {
    components: { Pagination },
    name: 'search',
    data (){
      return {
        searchTxt: '',
        list: [],
        pageInfo: {
          pageSize: 20,
          currentPage: 1,
        },
        totalInfo: {
          total: 0
        }
      }
    },
    mounted (){
      this.getScoreList()
    },
    watch: {
      /* 监听url参数?txt=XXX变化 */
      $route (newVal,oldVal){
        const self = this
        this.searchTxt = self.$route.query.txt.trim()
        Axios.get('/type/select_standardAndType',{
          params: {
            stNameZh: self.searchTxt
          }
        }).then(response => {
          self.list = response.data.list
        })
      }
    },
    methods: {
      showDetail (pid, type){
        this.$router.push({path: '/search/detail/'+ pid, query: {pid: pid,type: type}})
      },
      addToCart (data){
        const cartList = JSON.parse(sessionStorage.getItem('storage_userCart_')) || []
        this.$message({
          message: '加入成功',
          type: 'success'
        })
        const isAdd = cartList.some(item => {
          return item.id === data.id
        })
        if(!isAdd){
          cartList.push(data)
          sessionStorage.setItem('storage_userCart_',JSON.stringify(cartList))
        }
      },
      /* *
        * 分页大小改变
        * */
        paginationSizeChange: function (val) {
          this.pageInfo.pageSize = val
          this.getScoreList()
        },
        /* *
        * 页码改变
        * */
        paginationCurrentChange: function (val) {
          this.pageInfo.currentPage = val
          this.getScoreList()
        },
        getScoreList(){
          const self = this
          this.searchTxt = self.$route.query.txt
          Axios.get('/type/select_standardAndType',{
            params: {
              stNameZh: self.searchTxt,
              page: this.pageInfo.currentPage,
              pagesize: this.pageInfo.pageSize
            }
          }).then(response => {
            self.list = response.data.list
            self.totalInfo.total = response.data.total
          })
        }
    }
  }
</script>
<style lang="scss">
  @import "../../style/sort";
</style>
<style lang="scss" scoped>
  p.bread-nav{padding-bottom: 0;margin-bottom: 5px}
  .el-col{
    overflow: hidden;
  }
</style>
