<template>
  <div class="search-content">
    <div class="search-display-method search-left-content">
      <div class="demo-input-suffix">
        <span class="search-title">下单时间：</span>
          <div class="block" style="position: absolute;top: 0;left: 300px;">
            <el-date-picker
              v-model="localInfo.orgTime"
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

      <div class="line-content"></div>

      <div class="content-search-button">
        <el-button type="primary" @click.native="getSearchData">搜索</el-button>
      </div>
    </div>
    
    <!-- <add-member-or-integral @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :modalCtrl="modalCtrl"></add-member-or-integral> -->
  </div>
</template>

<script>
import Axios from "axios";
import QS from "qs";
import { Message } from "element-ui";
// import AddMemberOrIntegral from '../../components/AddMemberOrIntegral'
export default {
  name: "criterion-type-search",
  // components: { AddMemberOrIntegral },
  props: {
    pageInfo: Object
  },
  data() {
    return {
      modalCtrl: {
      },
      formData: {
      },
      rules: {
      },
      dialogVisible: false,
      localInfo: {
        orgTime: this.pageInfo.orgTime || ""
      },
      optionsForStatus: [
        {
          status: "请选择",
          value: "",
          key: "select"
        },
        {
          status: "有效",
          value: "1",
          key: "valid"
        },
        {
          status: "无效",
          value: "0",
          key: "invalid"
        }
      ],
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
      test: this.$parent.username
    };
  },
  methods: {
    /**
     * 改变父组件Statistic的值
     * */
    getSearchData(val) {
      this.$emit("changeSearchData", this.localInfo);
    },
    changeDialogVisible(val) {
      this.dialogVisible = val;
    },
    closeModal() {
      this.dialogVisible = false;
    },
    addNewMember() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          Axios.post(
            "/org/add_org",
            QS.stringify({
              orgNum: this.formData.orgNum,
              orgName: this.formData.orgName,
              orgIntro: this.formData.orgIntro,
              orgLink: this.formData.orgLink,
              orgTel: this.formData.orgTel,
              remark: this.formData.remark
            })
          ).then(response => {
            if (response.status == 200) {
              if (response.data == 0) {
                Message.error({
                  message: "该机构名称已存在"
                });
                return;
              }
              if (response.data.message === "success") {
                Message.success({
                  message: "添加成功"
                });
              }
              this.formData.orgNum = "";
              this.formData.orgName = "";
              this.formData.orgIntro = "";
              this.formData.orgLink = "";
              this.formData.orgTel = "";
              this.formData.remark = "";
              this.dialogVisible = false;
              this.$parent.getScoreList();
            } else {
              Message.success({
                message: "添加失败"
              });
            }
          });
        }else{
           Message.error({
              message: "请确认信息"
           });
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../../style/style.scss";
@import "../../style/searchBarStyle.scss";

.search-left-content {
  width: 100%;
}

.search-right-content {
  margin-left: 1%;
  width: 12%;
}

.demo-input-suffix {
  width: 30%;
  position: relative;
}

.content-search-button {
  width: 40%;
}

.search-title {
  width: 100px;
}

.status-select .el-select .el-input {
  width: 100%;
}

.add-member-content {
  display: block;
  float: left;
  width: 100%;
  height: 100px;
  margin: 30px auto;
}
</style>
