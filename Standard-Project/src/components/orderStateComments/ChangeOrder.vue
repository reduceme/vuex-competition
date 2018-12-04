<template>
  <div>
    <el-dialog
      :title="changeCtrl.modalTitle"
      :visible.sync="dialogVisible"
      width="1100px"
      :show-close="false"
      :close-on-click-modal="false">
      <el-table
      :data="detailList"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="明细Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="stId"
        label="标准号"
        width="100">
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
      <!-- <el-table-column prop="orderStatus" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus == 1">购物车</span>
          <span v-else-if="scope.row.orderStatus==2">已生成订单</span>
          <span v-else-if="scope.row.orderStatus==3">商会已确认</span>
          <span v-else-if="scope.row.orderStatus==4">机构已接单</span>
          <span v-else-if="scope.row.orderStatus==5">已完成</span>
          <span v-else-if="scope.row.orderStatus==6">订单已取消</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-select v-model="orderState" style="width: 130px">
            <el-option :key="item.value" v-for="item in orderStateList" :label="item.state" :value="item.value"></el-option>
          </el-select>
          <el-button
            size="mini"
            type="primary" style="width: 60px">保存
          </el-button>
          <el-button
            size="mini"
            type="primary" @click="dialogVisible=true" style="width: 60px">明细
          </el-button>
          <el-button
            size="mini"
            type="primary" @click="deleteItem(scope.row),deleteDialogVisible = true" style="width: 80px">删除
          </el-button>
          <input type="hidden" id="deleteId" value= "">
        </template>
      </el-table-column> -->
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="closeModal">取 消</el-button>
        <el-button type="primary" @click.native="addNewMember">确 定</el-button>
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
    detailList: Array
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
        ]
    };
  },
  methods: {
    addNewMember() {
      this.localDialogVisible = false;
      this.$emit("closeModal", this.localDialogVisible);
      // this.addScoreOrMember();
    },
    closeModal() {
      // this.popoverFlag.remark = false;
      this.localDialogVisible = false;
      this.$emit("closeModal", this.localDialogVisible);
    },
    popoverHide() {
      this.popoverFlag.remark = false;
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
        this.detailList = newList
      },
      deep: true
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
