<template>
  <div class="search-content">
    <div class="search-display-method search-left-content">
      <div class="demo-input-suffix">
        <span class="search-title">订单编号：</span>
        <el-input v-model="localInfo.orderNum"></el-input>
      </div>

      <div class="demo-input-suffix">
        <span class="search-title">公司名称：</span>
        <el-input v-model="localInfo.mbName"></el-input>
      </div>
      <div class="demo-input-suffix">
        <span class="search-title">下单时间：</span>
        <!-- <el-input v-model="localInfo.stCategory"></el-input> -->
          <div class="block" style="position: absolute;top: 0;left: 80px;">
            <el-date-picker
              v-model="localInfo.orderTime"
              type="daterange"
              align="right"
              unlink-panels
              :clearable="true"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2">
            </el-date-picker>
        </div>
      </div>
      <div class="demo-input-suffix status-select">
        <span class="search-title">状态：</span>
        <el-select v-model="localInfo.orderStatus" placeholder="请选择">
          <el-option
            v-for="item in orderStateList"
            :key="item.key"
            :label="item.state"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="line-content"></div>

      <div class="content-search-button">
        <el-button type="primary" style=" width: 80px;" @click.native="getSearchData">搜索</el-button>
      </div>
    <div class="add-member-content">
        <!-- <el-button type="primary" @click.native="dialogVisible = true">导入</el-button> -->
    </div>
    </div>
    <!-- <data-import @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible"></data-import> -->
    <!-- <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral> -->
  </div>
</template>

<script>
import Axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'
// import DataImport from '../../components/NormalDataComponents/dataImport.vue'
export default {
  name: 'criterion-type-search',
  // components: { DataImport },
  props: {
    pageInfo: Object
  },
  data () {
    return {
      dialogVisible: false,
      localInfo: {
        orderNum: this.pageInfo.orderNum,
        mbName: this.pageInfo.mbName,
        orderTime: this.pageInfo.orderTime || "",
        orderStatus: this.pageInfo.orderStatus
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
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderStateList : [{
        value: "",
        state: '请选择'
        },{
        value: 2,
        state: '已生成订单'
        },{
        value: 3,
        state: '商会已确认'
        },{
        value: 4,
        state: '机构已接单'
        },{
        value: 5,
        state: '已完成'
        },{
        value: 6,
        state: '已取消'
        }
      ]
    }
  },
  methods: {
    /* *
     * 改变父组件Statistic的值
     * */
    getSearchData (val) {
      if(!this.localInfo.orderTime){
        this.localInfo.orderTime = ""
      }
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
      this.standardType = response.data
    })
    // Axios.get("/type/get_standardStfield").then(response => {
    //   this.standardStfield = response.data
    // })
  }
}
</script>

<style scoped>
  /* @import url("//unpkg.com/element-ui@2.4.8/lib/theme-chalk/index.css"); */
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
    position: relative;
    text-align: left;
  }
  .demo-input-suffix:nth-child(3) {
    width: 46%
  }
  .content-search-button {
    width: 8%;
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
    margin: 30PX auto;
  }
</style>
