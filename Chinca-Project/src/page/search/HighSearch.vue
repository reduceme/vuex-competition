<template>
  <div>
    <div class="search-condition">
      <i class="arrow-down" title="展示/隐藏搜索条件" @click="toggleShow" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
      <el-form ref="form" :model="form" label-width="80px" v-show="isShow">
        <!-- <el-form-item label="标准状态">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="全部" name="type"></el-checkbox>
            <el-checkbox label="现行" name="type"></el-checkbox>
            <el-checkbox label="废止" name="type"></el-checkbox>
            <el-checkbox label="被替代" name="type"></el-checkbox>
            <el-checkbox label="即将实施" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->

        <el-form-item label="标准分类">
          <el-select v-model="form.sort1" @change="getStandard(form.sort1)">
            <el-option label="请选择" value=""></el-option>
            <el-option label="国际标准" value="1"></el-option>
            <el-option label="国外标准" value="2"></el-option>
            <el-option label="中国标准" value="3"></el-option>
          </el-select>
          <el-select v-model="form.sort2">
            <el-option
              v-for="item in changeList"
              :key="item.key"
              :label="item.tyName"
              :value="item.id">
          </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标准号">
          <el-input type="text" v-model="form.standard" placeholder="填写标准号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="分类号ICS" class="extra">
          <el-input type="text" v-model="form.standard_ics" placeholder="填写国际标准分类号ICS"></el-input>
        </el-form-item> -->
        <el-form-item label="分类号CSS" class="extra">
          <el-input type="text" v-model="form.standard_css" placeholder="填写中国标准分类号CSS"></el-input>
        </el-form-item>
        <el-form-item label="标准名称">
          <el-input type="text" v-model="form.name" placeholder="填写标准名称"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 15px">
          <el-button type="primary" @click="searchItem()">检索</el-button>
          <el-button @click="searchRestart()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <p class="bread-nav">
      <el-button type="text">检索结果</el-button>
    </p>
    <template v-if="standardList.length > 0">
      <ul class="content-list" :key="item.id" v-for="item in standardList">
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
  import Axios from 'axios'
  import Pagination from '../../components/Pagination'
  export default {
    components: { Pagination },
    name: 'high-search',
    data (){
      return {
        isShow: true,
        searchTxt: '',
        form: {
          type: [],
          standard: '',
          standard_ics: '',
          standard_css: '',
          name: '',
          sort1: '',
          sort2: '',
          date1_1: '',
          date1_2: '',
          date2_1: '',
          date2_2: ''
        },
        standardList:[],
        changeList: [],
        pageInfo: {
          pageSize: 20,
          currentPage: 1,
        },
        totalInfo: {
          total: 0,
        }
      }
    },
    methods: {
      showDetail (pid, type){
        this.$router.push({
          path: '/search/detail/'+ pid,
          query: {pid: pid, type: type}
        })
      },
      toggleShow (){
        this.isShow = !this.isShow
      },
      getStandard (formsort1){
        const self = this
        self.form.sort2 = ''
        self.changeList = []
        if(formsort1 == '2'){
            Axios.get('/type/get_foreign').then(response => {
            self.changeList = response.data
          })
        }else if(formsort1 == '3'){
          Axios.get('/type/get_china').then(response => {
            self.changeList = response.data
          })
        }
      },
      /* *
        * 分页大小改变
        * */
        paginationSizeChange: function (val) {
          this.pageInfo.pageSize = val
          this.searchItem()
        },
        /* *
        * 页码改变
        * */
        paginationCurrentChange: function (val) {
          this.pageInfo.currentPage = val
          this.searchItem()
        },
      searchItem (){
        const self = this
        self.searchTxt = self.$route.query.txt
        Axios.get('/type/select_standardAndType',{
          params: {
            tyId: self.form.sort2,
            stNum: self.form.standard,
            stIcs: self.form.standard_ics,
            stNameF: self.form.name,
            page: this.pageInfo.currentPage,
            pagesize: this.pageInfo.pageSize
          }
        }).then(response => {
          this.standardList = response.data.list
          this.totalInfo.total = response.data.total
        })
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
      }
    }
  }
</script>
<style lang="scss">
  @import "../../style/sort";
  .search-condition{
    position: relative;
    .el-form{
      background-color: #FCFCFC;
      border: 1px solid #E7E7E7;
      padding: 20px;
    }
    i.arrow-down{
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      z-index: 9;
      right: 10px;
      top: 10px;
      text-align: center;
      line-height: 30px;
      font-size: 22px;
      &:hover{
        cursor: pointer;
        background-color: #dedede;
      }
    }
    .el-form-item{
      margin-bottom: 5px;
    }
    .el-input>input,.el-select>input{
      border-radius: 0;
      width:250px
    }
    .el-button{
      border-radius: 0;
      width: 120px;
    }
    .el-button.el-button--default{
      background-color: #ccc;
      color: #fff;
      &:hover{
        opacity: .85;
      }
    }
    .el-form-item .line{
      text-align: center;
    }
    .el-col.el-col-24{
      div{
        display: inline-block;
        width: 250px!important;
      }
    }
    .el-col{
      overflow: hidden;
    }
  }
</style>
<style lang="scss" scoped>
  p.bread-nav{padding-bottom: 0;margin-bottom: 5px}
</style>
