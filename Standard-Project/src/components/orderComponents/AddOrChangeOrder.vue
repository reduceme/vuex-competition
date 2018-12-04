<template>
  <div>
    <el-dialog
      :title="changeCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="1100px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-table
      max-height="500"
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="明细Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stNum"
        label="标准号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="stNameZh"
        label="中文名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="stNameF"
        label="外文名称"
        width="200">
      </el-table-column>
      <!-- <el-table-column
        prop="mbName"
        label="标准名称"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="score"
        label="积分">
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="机构">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">未接</span>
          <span v-else-if="scope.row.status==1">已接</span>
          <span v-else-if="scope.row.status==2">完成</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status==0 && scope.row.orgId==userInfo.orgId" type="primary" style="width: 100px" @click="verifyUserInfo(scope.row.orgId,scope.row.id),scope.row.status=(scope.row.orgId==userInfo.orgId)?1:0">确认订单</el-button>
          <el-button size="mini" v-if="scope.row.status==1 && scope.row.orgId==userInfo.orgId" type="primary" style="width: 100px" @click="finishOrder(scope.row.orgId,scope.row.id),scope.row.status=2">完成订单</el-button>
          <input type="hidden" id="orgId" :value="scope.row.orgId">
        </template>
      </el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="closeModal">取 消</el-button>
        <el-button type="primary" @click.native="addNewMember,upDataList()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import QS from "qs";
import { Message } from "element-ui";
export default {
  name: "add-or-change-criterion",
  props: {
    dialogVisible: Boolean,
    changeCtrl: Object,
    detailList: Array,
    orderId: Number
  },
  data() {
    return {
      popoverFlag: {
        remark: false
      },
      localDialogVisible: this.dialogVisible,
      formData: {
        stNameZh: this.changeCtrl.stNameZh,
        stNameF: this.changeCtrl.stNameF,
        stLang: this.changeCtrl.stLang,
        fName: this.changeCtrl.fName,
        tyName:this.changeCtrl.tyName,
        stIcs: this.changeCtrl.stIcs,
        countryRegion: this.changeCtrl.countryRegion,
        stOrgid: this.changeCtrl.stOrgid,
        stScore: this.changeCtrl.stScore,
        isProject: this.changeCtrl.isProject,
        remark: this.changeCtrl.remark,
        id: this.changeCtrl.id
      },
       rules: {
          stNameZh: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          stNameF: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
          },
      stOrgSelect: [{
          value: 1,
          label: '甲骨易'
        }, {
          value: 2,
          label: '语言桥'
        }],
        languageSelect: [],
        nationalArea: [],
        standardType: [],
        standardStfield: [],
        projectState: [
          {
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }
        ],
        tableData: this.detailList,
        userInfo : {},
        ordId : "",
    };
  },
  methods: {
    addNewMember() {
      this.localDialogVisible = false;
      this.$emit("closeModal", this.localDialogVisible);
      // this.addScoreOrMember();
      this.tableData = []
    },
    closeModal() {
      // this.popoverFlag.remark = false;
      this.localDialogVisible = false;
      this.$emit("closeModal", this.localDialogVisible);
      this.tableData = []
    },
    popoverHide() {
      this.popoverFlag.remark = false;
    },
    getUserInfo(){
      Axios.get("/member/get_user_details").then(response => {
        this.userInfo = response.data
      })
    },
    verifyUserInfo(orgId,id){
      if(this.userInfo.orgId){
        if(orgId == this.userInfo.orgId){
          Axios.get("/cart/confOd",{
            params: {
              orderId:this.ordId,
              odId: id,
              status: 1,
            }
          }).then(response => {
            if(response.status == 200){
              Message.success({
                message: "接单成功"
              })
              Axios.get('/order/updateOrderStatus',{
                params: {
                  orderId: this.ordId,
                  status: 4
                }
              }).then(response => {
              })
            }else{
              Message.error({
                message: "接单失败，请重试"
              })
            }
          })
        }else{
          Message.error({
            message: "接单失败：没有权限"
          })
        }
      }else{
        Message.error({
            message: "接单失败：没有权限"
          })
      }
    },
    finishOrder(orgId,id){
      if(this.userInfo.orgId){
        if(orgId == this.userInfo.orgId){
          Axios.get("/cart/confOd",{
            params: {
              orderId:this.ordId,
              odId: id,
              status: 2,
            }
          }).then(response => {
            if(response.status == 200){
              Message.success({
                message: "完成订单"
              })
              
            }else{
              Message.error({
                message: "完成失败，请重试"
              })
            }
          })
        }else{
          Message.error({
            message: "接单失败：没有权限"
          })
        }
      }else{
        Message.error({
            message: "接单失败：没有权限"
          })
      }
    },
    upDataList(){
      location.reload();
    }
  },
  mounted() {
    Axios.get("/type/get_language").then(response => {
      this.languageSelect = response.data
    })
    Axios.get("/type/get_nationalArea").then(response => {
      this.nationalArea = response.data
    })
    Axios.get("/type/get_standardType").then(response => {
      this.standardType = response.data
    })
    this.getUserInfo()
  },
  watch: {
    // 如果 `changeCtrl` 发生改变，这个函数就会运行
    changeCtrl: {
      handler(newchangeCtrl, oldchangeCtrl) {
        this.formData.stNameZh = newchangeCtrl.stNameZh;
        this.formData.stNameF = newchangeCtrl.stNameF;
        this.formData.stLang = newchangeCtrl.stLang;
        this.formData.fName = newchangeCtrl.fName;
        this.formData.tyName = newchangeCtrl.tyName;
        this.formData.stIcs = newchangeCtrl.stIcs;
        this.formData.countryRegion = newchangeCtrl.countryRegion;
        this.formData.stOrgid = newchangeCtrl.stOrgid;
        this.formData.stScore = newchangeCtrl.stScore;
        this.formData.isProject = newchangeCtrl.isProject;
        this.formData.remark = newchangeCtrl.remark;
        this.formData.id = newchangeCtrl.id;
      },
      deep: true
    },
    detailList: {
      handler(newList, oldList) {
        this.tableData = newList
      },
      deep: true
    },
    orderId: {
      handler(newId,oldId){
        this.ordId = newId
      }
    }
  }
};
</script>

<style>
@import "../../style/style.scss";

.el-dialog__body .el-input {
  width: 95%;
}
.el-select {
  width: 95%;
}
</style>
