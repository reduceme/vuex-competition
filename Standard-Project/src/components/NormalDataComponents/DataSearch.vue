<template>
  <div class="search-content">
    <div class="search-display-method search-left-content">
      <div class="demo-input-suffix">
        <span class="search-title">名称：</span>
        <el-input v-model="localInfo.stNameZh"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span class="search-title">标准类型：</span>
        <!-- <el-input v-model="localInfo.stType"></el-input> -->
        <el-select v-model="localInfo.stType" clearable placeholder="选择类型：">
            <el-option :key="item.id" v-for="item in standardType" :label="item.tyName" :value="item.id"></el-option>
          </el-select>
      </div>
      <div class="demo-input-suffix">
        <span class="search-title">领域：</span>
        <el-input v-model="localInfo.stCategory"></el-input>
        <!-- <el-select v-model="localInfo.stCategory" clearable placeholder="选择类型：">
            <el-option :key="item.id" v-for="item in standardStfield" :label="item.fname" :value="item.id"></el-option>
        </el-select> -->
      </div>
      <div class="demo-input-suffix">
        <span class="search-title">机构：</span>
        <!-- <el-input v-model="localInfo.stOrgid"></el-input> -->
        <el-select v-model="localInfo.stOrgid" clearable placeholder="选择机构">
          <el-option :key="item.value" v-for="item in stOrgSelect" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="demo-input-suffix status-select">
        <span class="search-title">状态：</span>
        <el-select v-model="localInfo.incomeType" placeholder="请选择">
          <el-option
            v-for="item in optionsForStatus"
            :key="item.key"
            :label="item.status"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="line-content"></div>

      <div class="content-search-button">
        <el-button type="primary" style=" width: 80px;" @click.native="getSearchData">搜索</el-button>
      </div>
    <div class="add-member-content">
        <el-button type="primary" style=" width: 80px;" @click.native="dialogVisible = true">导入</el-button>
    </div>
    </div>
    <data-import @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible"></data-import>
    <!-- <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral> -->
  </div>
</template>

<script>
import Axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'
import DataImport from '../../components/NormalDataComponents/dataImport.vue'
export default {
  name: 'criterion-type-search',
  components: { DataImport },
  props: {
    pageInfo: Object
  },
  data () {
    return {
      formData: {
        stNameZh: '',
        stType: '',
        stCategory: '',
        stOrgid: ''
      },
      dialogVisible: false,
      localInfo: {
        stNameZh: this.pageInfo.stNameZh,
        stType: this.pageInfo.stType,
        stCategory: this.pageInfo.stCategory,
        stOrgid: this.pageInfo.stOrgid
      },
      optionsForStatus: [{
        status: '有效',
        value: '1',
        key: 'valid'
      }, {
        status: '无效',
        value: '0',
        key: 'invalid'
      }],
      test: this.$parent.username,
      standardType: '',
      standardStfield: '',
      stOrgSelect: [{
          value: 1,
          label: '甲骨易'
        }, {
          value: 2,
          label: '语言桥'
        }],
    }
  },
  methods: {
    /* *
     * 改变父组件Statistic的值
     * */
    getSearchData (val) {
      this.$emit('changeSearchData', this.localInfo)
    },
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    addNewMember(){
      console.log(this.formData);
      Axios.post('/type/add_type',QS.stringify({
          name: this.formData.tyName,
          num: this.formData.tyNum,
          remark: this.formData.remark
      })).then(response => {
        if(response.status == 200){
          if (response.data.message === 'success') {
            Message.success({
              message: '添加成功'
            })
          }
          this.formData.tyName = ''
          this.formData.tyNum = ''
          this.formData.remark = ''
          this.dialogVisible = false
          this.$parent.getScoreList()
        }else{
          Message.success({
              message: '添加失败'
            })
        }
      })
    }
  },
  mounted(){
    Axios.get("/type/get_standardType").then(response => {
      console.log(response);
      this.standardType = response.data
    })
    // Axios.get("/type/get_standardStfield").then(response => {
    //   console.log(response);
    //   this.standardStfield = response.data
    // })
  }
}
</script>

<style scoped>
  @import "../../style/style.scss";
  @import "../../style/searchBarStyle.scss";

  .search-left-content {
    width: 99.3%;
  }

  .search-right-content {
    margin-left: 1%;
    width: 12%;
  }

  .demo-input-suffix {
    width: 15%;
  }

  .content-search-button {
    width: 14%;
  }

  .search-title {
    width: 100px;
  }

  .status-select .el-select .el-input {
    width: 100%;
  }

  .add-member-content {
    display: block;
    height: 100px;
    margin: 30px auto;
  }
</style>
