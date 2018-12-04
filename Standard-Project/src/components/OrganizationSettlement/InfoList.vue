<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="orgName"
        label="机构名称">
      </el-table-column>
      <el-table-column
        prop="orgAccount"
        label="上传标准">
      </el-table-column>
      <el-table-column
        prop="orgPs"
        label="完成服务">
      </el-table-column>
      <el-table-column
        prop="score"
        label="占比">
      </el-table-column>
    </el-table>
<el-dialog
  title="提示"
  :visible.sync="deleteDialogVisible"
  width="30%"
 >
  <span>确定要删除该标准吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteData">确 定</el-button>
  </span>
</el-dialog>
    <!-- <add-criterion @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :changeInfoCtrl="changeInfoCtrl"></add-criterion> -->
        <add-or-change-criterion @closeModal="changeDialogVisible($event)" :dialogVisible="dialogVisible" :changeCtrl="changeCtrl"></add-or-change-criterion>
    <!-- <audit-member-info @closeAuditModal="changeAuditDialogVisible($event)" :auditDialogVisible="auditDialogVisible" :memberInfoCtrl="memberInfoCtrl"></audit-member-info> -->
  </div>
</template>

<script>
import Axios from 'axios'
import { Message } from "element-ui";
import AddOrChangeCriterion from '../../components/OrganizationSettlement/ChangeInfo'
export default {
  name: 'member-search-list',
  components: { AddOrChangeCriterion },
  props: ['tableData'],
  data () {
    return {
      changeCtrl: {
        modalTitle: '修改',
        orgNum: '',
        orgName: '',
        orgIntro: '',
        orgLink: '',
        orgTel: '',
        remark: '',
        id: ''
      },
      dialogVisible: false,
      deleteDialogVisible: false
    }
  },
  methods: {
    changeDialogVisible (val) {
      this.dialogVisible = val
    },
    getUserInfoItem (item) {
      this.changeCtrl.orgNum = item.orgNum
      this.changeCtrl.orgName = item.orgName
      this.changeCtrl.orgIntro = item.orgIntro
      this.changeCtrl.orgLink = item.orgLink
      this.changeCtrl.orgTel = item.orgTel
      this.changeCtrl.remark = item.remark
      this.changeCtrl.id = item.id
      this.dialogVisible = true
    },
    deleteData(){
      var id = document.getElementById("deleteId").value
      Axios.get('/org/delete_org',{
        params:{
          id: id
        }
      }).then(response => {
        if(response.status == 200){
          Message.success({
            message: "删除成功"
          });
          this.deleteDialogVisible = false
          this.$parent.getScoreList()
        }
      })
    },
    deleteItem(e){
      document.getElementById("deleteId").value = e.id
    }
  }
}
</script>

<style scoped></style>
